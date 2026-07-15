#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const content = require("../src/content.js");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");
const buildDir = path.join(root, "build");
const templatesDir = path.join(srcDir, "templates");
const generatedComment =
  "<!-- Generated into build/ from src/content.js by scripts/build-content.js. Do not edit generated output directly. -->";

const iconAliases = {
  arrowLeft: "arrow-left",
  arrowRight: "arrow-right",
  checkCircle: "check-circle",
  checkCircleOpen: "check-circle-open",
  mapPin: "map-pin",
  shieldCheck: "shield-check",
};

const templateCache = new Map();
const iconCache = new Map();

// Domain policies
function sortAgents(agents) {
  return agents.slice().sort(function (a, b) {
    const aHasSort = typeof a.sort === "number";
    const bHasSort = typeof b.sort === "number";

    if (aHasSort && bHasSort) {
      return a.sort - b.sort || a.name.localeCompare(b.name);
    }

    if (aHasSort) return -1;
    if (bHasSort) return 1;

    return a.name.localeCompare(b.name);
  });
}

function formatList(items) {
  if (items.length < 2) return items[0] || "";
  if (items.length === 2) return items.join(" and ");

  return items.slice(0, -1).join(", ") + ", and " + items[items.length - 1];
}

function getFeaturedAgent() {
  return (
    sortAgents(content.agents).find(function (agent) {
      return agent.featured === true;
    }) || sortAgents(content.agents)[0]
  );
}

function resolveHref(hrefKey) {
  const contact = content.site.contact;

  if (hrefKey === "email") return "mailto:" + contact.email;
  if (hrefKey && contact[hrefKey]) return contact[hrefKey];

  return hrefKey || "#";
}

function phoneHref(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  return digits ? "tel:" + digits : "#";
}

function smsHref(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  return digits ? "sms:" + digits : "#";
}

function renderAgentContactActions(agent, variant) {
  const actions = [];
  const linkClass = variant === "hero" ? ' class="cta"' : "";

  if (agent.phone) {
    actions.push(
      '<a' +
        linkClass +
        ' href="' +
        escapeHtml(phoneHref(agent.phone)) +
        '">' +
        icon("phone") +
        " " +
        escapeHtml(agent.phone) +
        "</a>",
    );
    actions.push(
      '<a' +
        linkClass +
        ' href="' +
        escapeHtml(smsHref(agent.phone)) +
        '">' +
        icon("msg") +
        " Text</a>",
    );
  }

  if (agent.email) {
    actions.push(
      '<a' +
        linkClass +
        ' href="mailto:' +
        escapeHtml(agent.email) +
        '">' +
        icon("mail") +
        " Email</a>",
    );
  }

  return actions.join("\n");
}

// Application use cases
function getRootPageModels() {
  return [
    {
      page: content.pages.home,
      activePath: "index.html",
      template: "pages/home.html",
      cta: content.site.cta,
    },
    {
      page: content.pages.services,
      activePath: "services.html",
      template: "pages/services.html",
      cta: content.pages.services.cta,
    },
    {
      page: content.pages.testimonials,
      activePath: "testimonials.html",
      template: "pages/testimonials.html",
      cta: content.pages.testimonials.cta,
    },
    {
      page: content.pages.contact,
      activePath: "contact.html",
      template: "pages/contact.html",
      cta: content.pages.contact.cta,
    },
    {
      page: content.pages.notFound,
      activePath: "",
      template: "pages/404.html",
      cta: null,
    },
    {
      page: content.team,
      path: "team.html",
      activePath: "team.html",
      template: "pages/team.html",
      cta: content.team.cta,
    },
    {
      page: content.about,
      path: "about.html",
      activePath: "about.html",
      template: "pages/about.html",
      cta: content.about.cta,
    },
  ];
}

function getFeaturedListingModel() {
  return {
    page: content.pages.featuredListing,
    activePath: "featured-listing.html",
    template: "pages/featured-listing.html",
    cta: content.pages.featuredListing.cta,
  };
}

function getAgentPageModels() {
  return content.agents.map(function (agent) {
    return { agent: agent };
  });
}

// Presentation primitives
function readTemplate(relativePath) {
  if (!templateCache.has(relativePath)) {
    templateCache.set(
      relativePath,
      fs.readFileSync(path.join(templatesDir, relativePath), "utf8"),
    );
  }

  return templateCache.get(relativePath);
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getPathValue(source, dottedPath) {
  return dottedPath.split(".").reduce(function (current, key) {
    if (current == null) return "";
    return current[key];
  }, source);
}

function renderString(template, data) {
  return template
    .replace(/\{\{\{\s*([\w.]+)\s*\}\}\}/g, function (_, key) {
      return String(
        getPathValue(data, key) == null ? "" : getPathValue(data, key),
      );
    })
    .replace(/\{\{\s*([\w.]+)\s*\}\}/g, function (_, key) {
      return escapeHtml(getPathValue(data, key));
    });
}

function renderTemplate(relativePath, data) {
  return renderString(readTemplate(relativePath), data);
}

function icon(name) {
  const fileName = iconAliases[name] || name;

  if (!iconCache.has(fileName)) {
    iconCache.set(
      fileName,
      readTemplate(path.join("icons", fileName + ".html")).trim(),
    );
  }

  return iconCache.get(fileName);
}

function paragraphs(items) {
  return (items || [])
    .map(function (text) {
      return renderTemplate("partials/paragraph.html", { text: text });
    })
    .join("\n");
}

function repeatHtml(html, times) {
  return Array.from({ length: times }, function () {
    return html;
  }).join("\n");
}

function starRating(count) {
  return Array.from({ length: count }, function () {
    return icon("star");
  }).join("");
}

function renderEyebrow(label) {
  return renderTemplate("partials/eyebrow-pill.html", { label: label });
}

function renderHeadRoot(page, prefix, extraHeadHtml) {
  return renderTemplate("partials/head-root.html", {
    title: page.title,
    description: page.description || "",
    prefix: prefix,
    extraHeadHtml: extraHeadHtml || "",
  });
}

function renderHeadAsset(page, prefix, extraHeadHtml) {
  return renderTemplate("partials/head-asset.html", {
    title: page.title,
    description: page.description || "",
    ogTitle: page.ogTitle || page.title,
    ogDescription: page.ogDescription || page.description || "",
    prefix: prefix,
    extraHeadHtml: extraHeadHtml || "",
  });
}

function renderExtraHead(page) {
  const rows = [];

  if (page.robots)
    rows.push(
      '<meta name="robots" content="' + escapeHtml(page.robots) + '" />',
    );
  if (page.canonical)
    rows.push(
      '<link rel="canonical" href="' + escapeHtml(page.canonical) + '" />',
    );
  if (page.ogImage) {
    rows.push(
      '<meta property="og:image" content="' + escapeHtml(page.ogImage) + '" />',
    );
    rows.push(
      '<meta name="twitter:image" content="' +
        escapeHtml(page.ogImage) +
        '" />',
    );
  }

  return rows.join("\n  ");
}

function brandParts() {
  const brand = content.site.brand;

  return {
    brandName: brand.name,
    brandShortName: brand.shortName,
    brandSubName: brand.subName,
    brandMark: brand.mark,
    brandFirst: "Hawaii",
    brandAccent: "Military",
    brandTagline: brand.tagline,
  };
}

function renderBrandLogo(style, prefix, light) {
  const brand = content.site.brand;
  const markHtml =
    brand.useSimulatedLogo !== false
      ? renderBrandMark(style, brand)
      : '<span class="brand-image-mark"><img src="' +
        escapeHtml(prefix + "assets/" + brand.logoPath) +
        '" alt="" /></span>';

  if (style === "asset") {
    return (
      markHtml +
      '<span class="brand-text"><span class="brand-name">' +
      escapeHtml(brand.shortName) +
      '</span><span class="brand-sub">' +
      escapeHtml(brand.subName) +
      "</span></span>"
    );
  }

  return (
    markHtml +
    '<span>Hawaii <span style="color:' +
    (light ? "var(--accent)" : "var(--primary)") +
    '">Military</span><small>' +
    escapeHtml(brand.tagline) +
    "</small></span>"
  );
}

function renderBrandMark(style, brand) {
  if (style === "asset") {
    return '<span class="brand-mark">' + icon("home-mark") + "</span>";
  }

  return '<span class="logo-mark">' + escapeHtml(brand.mark) + "</span>";
}

function renderNav(style, activePath, prefix, asFooter) {
  const partial =
    style === "asset"
      ? "partials/nav-link-asset.html"
      : "partials/nav-link-root.html";

  return content.site.nav
    .map(function (item) {
      const href = prefix + item.href;
      const isActive = activePath === item.href;
      const linkHtml = renderTemplate(partial, {
        href: href,
        label: item.label,
        activeClass: isActive ? "active" : "",
        currentAttribute: isActive && !asFooter ? ' aria-current="page"' : "",
      });

      return asFooter ? "<li>" + linkHtml + "</li>" : linkHtml;
    })
    .join("");
}

function renderSocials() {
  return content.site.social
    .map(function (item) {
      return renderTemplate("partials/social-link.html", {
        href: item.href,
        label: item.label,
        iconHtml: icon(item.icon),
      });
    })
    .join("");
}

function chromeData(style, activePath, prefix) {
  const contact = content.site.contact;
  const footer = content.site.footer;

  return {
    ...brandParts(),
    prefix: prefix,
    brandLogoHtml: renderBrandLogo(style, prefix, style === "asset"),
    phoneHref: contact.phoneHref,
    phoneDisplay: contact.phoneDisplay,
    email: contact.email,
    address: contact.address,
    navHtml: renderNav(style, activePath, prefix, false),
    mobileNavHtml: renderNav(style, activePath, prefix, false),
    footerNavHtml: renderNav(style, activePath, prefix, true),
    socialHtml: renderSocials(),
    footerBlurb: footer.blurb,
    navHeading: footer.navHeading,
    contactHeading: footer.contactHeading,
    copyright: footer.copyright,
    year: new Date().getFullYear(),
    phoneIcon: icon("phone"),
    mailIcon: icon("mail"),
    mapPinIcon: icon("mapPin"),
    menuIcon: icon("menu"),
    closeIcon: icon("x"),
    homeMarkIcon: icon("home-mark"),
  };
}

function renderHeader(style, activePath, prefix) {
  return renderTemplate(
    style === "asset"
      ? "partials/header-asset.html"
      : "partials/header-root.html",
    chromeData(style, activePath, prefix),
  );
}

function renderFooter(style, activePath, prefix) {
  return renderTemplate(
    style === "asset"
      ? "partials/footer-asset.html"
      : "partials/footer-root.html",
    chromeData(style, activePath, prefix),
  );
}

function renderCta(style, cta, prefix) {
  if (!cta) return "";

  const merged = { ...content.site.cta, ...cta };
  const contact = content.site.contact;

  return renderTemplate(
    style === "asset" ? "partials/cta-asset.html" : "partials/cta-root.html",
    {
      prefix: prefix,
      eyebrow: merged.eyebrow,
      title: merged.title,
      subtitle: merged.subtitle,
      note: merged.note,
      primaryLabel: merged.primaryLabel || content.site.cta.primaryLabel,
      secondaryLabel: merged.secondaryLabel || contact.email,
      phoneHref: contact.phoneHref,
      email: contact.email,
      phoneIcon: icon("phone"),
      mailIcon: icon("mail"),
      arrowRightIcon: icon("arrowRight"),
    },
  );
}

function renderShell(options) {
  return renderTemplate("layouts/" + options.style + ".html", {
    headHtml: options.headHtml,
    generatedComment: generatedComment,
    headerHtml: options.headerHtml,
    mainHtml: options.mainHtml,
    ctaHtml: options.ctaHtml || "",
    footerHtml: options.footerHtml,
    scriptPath: options.scriptPath,
  });
}

function renderRootPage(options) {
  const prefix = options.prefix || "";

  return renderShell({
    style: "root",
    headHtml: renderHeadRoot(
      options.page,
      prefix,
      renderExtraHead(options.page),
    ),
    headerHtml: renderHeader("root", options.activePath, prefix),
    mainHtml: options.mainHtml,
    ctaHtml: renderCta("root", options.cta, prefix),
    footerHtml: renderFooter("root", options.activePath, prefix),
    scriptPath: prefix + "js/site.js",
  });
}

function renderAssetPage(options) {
  const prefix = options.prefix || "";

  return renderShell({
    style: "asset",
    headHtml: renderHeadAsset(
      options.page,
      prefix,
      renderExtraHead(options.page),
    ),
    headerHtml: renderHeader("asset", options.activePath, prefix),
    mainHtml: options.mainHtml,
    ctaHtml: renderCta("asset", options.cta, prefix),
    footerHtml: renderFooter("asset", options.activePath, prefix),
    scriptPath: prefix + "js/site.js",
  });
}

// Presentation composites
function renderPageHero(hero) {
  return renderTemplate("pages/page-hero.html", {
    image: hero.image,
    eyebrowHtml: renderEyebrow(hero.eyebrow),
    heading: hero.heading,
    introHtml: paragraphs([hero.intro]),
  });
}

function renderHomePage(model) {
  const page = model.page;
  const testimonials = renderTestimonials(content.shared.testimonials, 4);

  const mainHtml = renderTemplate(model.template, {
    ...page,
    phoneHref: content.site.contact.phoneHref,
    phoneIcon: icon("phone"),
    arrowRightIcon: icon("arrowRight"),
    starsHtml: starRating(5),
    shieldIcon: icon("shield"),
    heroStatsHtml: page.hero.imageStats.map(renderHeroStat).join(""),
    trustBarHtml: page.trustBar.map(renderHomeTrustItem).join(""),
    whyCardsHtml: page.why.cards.map(renderWhyCard).join("\n"),
    processStepsHtml: page.process.steps
      .map(function (step) {
        return renderTemplate("partials/process-step-number.html", step);
      })
      .join("\n"),
    testimonialsHtml: testimonials,
  });

  return renderRootPage({ ...model, mainHtml: mainHtml });
}

function renderHeroStat(item) {
  return renderTemplate("partials/hero-stat.html", item);
}

function renderHomeTrustItem(item) {
  return renderTemplate("partials/home-trust-item.html", {
    ...item,
    iconHtml: icon(item.icon),
  });
}

function renderWhyCard(card) {
  const bulletsHtml = card.bullets
    .map(function (text) {
      return renderTemplate("partials/check-list-item.html", {
        text: text,
        checkIcon: icon("check"),
      });
    })
    .join("\n");

  return renderTemplate("partials/why-card.html", {
    ...card,
    bulletsHtml: bulletsHtml,
  });
}

function renderServiceCard(card) {
  const bulletsHtml = card.bullets
    .map(function (text) {
      return renderTemplate("partials/service-list-item.html", {
        text: text,
        checkIcon: icon("checkCircle"),
      });
    })
    .join("\n");

  return renderTemplate("partials/service-card.html", {
    ...card,
    bulletsHtml: bulletsHtml,
  });
}

function renderServicesPage(model) {
  const page = model.page;
  const mainHtml = renderTemplate(model.template, {
    ...page,
    heroHtml: renderPageHero(page.hero),
    serviceCardsHtml: page.cards.map(renderServiceCard).join("\n"),
    processStepsHtml: page.process.steps
      .map(function (step) {
        return renderTemplate("partials/process-step-icon.html", {
          ...step,
          iconHtml: icon(step.icon),
        });
      })
      .join("\n"),
  });

  return renderRootPage({ ...model, mainHtml: mainHtml });
}

function renderTestimonialsPage(model) {
  const page = model.page;
  const mainHtml = renderTemplate(model.template, {
    ...page,
    heroHtml: renderPageHero(page.hero),
    testimonialsHtml: renderTestimonials(content.shared.testimonials, 4),
    statsHtml: page.stats
      .map(function (stat) {
        return renderTemplate("partials/stat-card.html", stat);
      })
      .join("\n"),
    longFormHtml: renderLongFormTestimonials(page.longForm.testimonials),
  });

  return renderRootPage({ ...model, mainHtml: mainHtml });
}

function renderContactPage(model) {
  const page = model.page;
  const mainHtml = renderTemplate(model.template, {
    ...page,
    heroHtml: renderPageHero(page.hero),
    methodsHtml: page.methods
      .map(function (method) {
        return renderTemplate("partials/contact-method.html", {
          ...method,
          href: resolveHref(method.hrefKey),
          iconHtml: icon(method.icon),
        });
      })
      .join(""),
    infoCardsHtml: page.infoCards
      .map(function (card) {
        return renderTemplate("partials/contact-info-card.html", {
          ...card,
          iconHtml: icon(card.icon),
        });
      })
      .join("\n"),
  });

  return renderRootPage({ ...model, mainHtml: mainHtml });
}

function renderTeamPage(model) {
  const page = content.team;
  const sortedAgents = sortAgents(content.agents);
  const agentNames = formatList(
    sortedAgents.map(function (agent) {
      return agent.name;
    }),
  );
  const teamPage = {
    ...page,
    description:
      "Meet " +
      agentNames +
      ", real estate professionals serving clients across Oahu.",
  };
  const heroHtml = renderPageHero({
    image: "hero-bg-team.jpg",
    eyebrow: page.eyebrow,
    heading: page.heading,
    intro: agentNames + " " + page.intro[0],
  });
  const mainHtml = renderTemplate(model.template, {
    heroHtml: heroHtml,
    teamCardsHtml: sortedAgents.map(renderTeamCard).join("\n"),
  });

  return renderRootPage({ ...model, page: teamPage, mainHtml: mainHtml });
}

function renderTeamCard(agent) {
  const showContactButtons =
    content.site.settings &&
    content.site.settings.showAgentCardContactButtons === true;

  return renderTemplate("partials/team-card.html", {
    ...agent,
    prefix: "",
    profileHref: "agents/" + agent.slug + ".html",
    contactActionsHtml: showContactButtons
      ? renderAgentContactActions(agent, "card")
      : "",
    sortAttribute:
      typeof agent.sort === "number"
        ? ' data-sort="' + escapeHtml(agent.sort) + '"'
        : "",
  });
}

function renderAboutPage(model) {
  const page = content.about;
  const featuredAgent = getFeaturedAgent();
  const featuredAbout =
    featuredAgent.featuredAbout && featuredAgent.featuredAbout.length
      ? featuredAgent.featuredAbout
      : featuredAgent.about;
  const heroHtml = renderPageHero({
    image: "hero-bg-about.jpg",
    eyebrow: page.eyebrow,
    heading: page.heading,
    intro: page.intro[0],
  });
  const mainHtml = renderTemplate(model.template, {
    ...page,
    heroHtml: heroHtml,
    featuredAgent: featuredAgent,
    featuredAboutHtml: paragraphs(featuredAbout),
    backgroundCardsHtml: page.cards.map(renderBackgroundCard).join("\n"),
    arrowRightIcon: icon("arrowRight"),
  });

  return renderRootPage({ ...model, page: page, mainHtml: mainHtml });
}

function renderBackgroundCard(card) {
  return renderTemplate("partials/background-card.html", {
    ...card,
    iconHtml: icon(card.icon),
  });
}

function renderAgentPage(model) {
  const agent = model.agent;
  const page = {
    title: agent.title,
    description: agent.description,
  };
  const mainHtml = renderTemplate("pages/agent.html", {
    agent: agent,
    contactActionsHtml: renderAgentContactActions(agent, "hero"),
    arrowLeftIcon: icon("arrowLeft"),
    aboutHtml: paragraphs(agent.about),
    badgesHtml: agent.badges.map(renderBadge).join("\n"),
    sectionRowsHtml: renderSectionRows(agent.sections),
  });

  return renderRootPage({
    page: page,
    activePath: "team.html",
    prefix: "../",
    cta: agent.cta,
    mainHtml: mainHtml,
  });
}

function renderBadge(badge) {
  return renderTemplate("partials/badge-card.html", {
    ...badge,
    iconHtml: icon(badge.icon),
  });
}

function renderPills(pills) {
  if (!pills || !pills.length) return "";

  return renderTemplate("partials/pills.html", {
    itemsHtml: pills
      .map(function (pill) {
        return renderTemplate("partials/pill.html", { label: pill });
      })
      .join(""),
  });
}

function renderContentSection(section) {
  return renderTemplate("partials/content-section.html", {
    title: section.title,
    paragraphsHtml: paragraphs(section.paragraphs),
    pillsHtml: renderPills(section.pills),
  });
}

function renderSectionRows(sections) {
  const rows = [];

  for (let index = 0; index < sections.length; index += 2) {
    rows.push(
      renderTemplate("partials/section-row.html", {
        sectionsHtml: sections
          .slice(index, index + 2)
          .map(renderContentSection)
          .join("\n"),
      }),
    );
  }

  return rows.join("\n\n");
}

function renderTestimonials(items, repetitions) {
  const cardsHtml = items
    .map(function (testimonial) {
      return renderTemplate("partials/testimonial-card.html", {
        ...testimonial,
        starsHtml: starRating(5),
        quoteIcon: icon("quote"),
      });
    })
    .join("\n");

  return repeatHtml(cardsHtml, repetitions || 1);
}

function excerpt(value, length) {
  if (value.length <= length) return value;

  return (
    value
      .slice(0, length)
      .trim()
      .replace(/[,.!?;:]+$/, "") + "…"
  );
}

function renderLongFormTestimonials(items) {
  return (items || [])
    .map(function (testimonial) {
      return renderTemplate("partials/long-testimonial-card.html", {
        author: testimonial.author,
        excerpt: excerpt(testimonial.body, 220),
        summaryLabel: "Read full testimonial",
        quoteIcon: icon("quote"),
        bodyHtml: paragraphs([testimonial.body]),
      });
    })
    .join("\n");
}

function renderFeaturedListingPage(model) {
  const page = model.page;
  const mainHtml = renderTemplate(model.template, {
    ...page,
    homeIcon: icon("home"),
    mapPinIcon: icon("mapPin"),
    specsHtml: page.specs
      .map(function (spec) {
        return renderTemplate("partials/listing-spec.html", {
          ...spec,
          iconHtml: icon(spec.icon),
        });
      })
      .join("\n"),
    overviewHtml: paragraphs(page.overview.paragraphs),
    highlightsHtml: page.highlights
      .map(function (text) {
        return renderTemplate("partials/listing-highlight.html", {
          text: text,
          iconHtml: icon("checkCircleOpen"),
        });
      })
      .join("\n"),
    detailsHtml: page.details
      .map(function (detail) {
        return renderTemplate("partials/listing-detail.html", detail);
      })
      .join("\n"),
    tourOptionsHtml: page.tour.options
      .map(function (option, index) {
        return renderTemplate("partials/listing-tour-option.html", {
          ...option,
          href: resolveHref(option.hrefKey),
          variantClass: index === 0 ? "" : "glass",
          iconHtml: icon(option.icon),
        });
      })
      .join("\n"),
  });

  return renderAssetPage({ ...model, mainHtml: mainHtml });
}

function renderNotFoundPage(model) {
  const page = model.page;
  const mainHtml = renderTemplate(model.template, page);

  return renderRootPage({ ...model, page: page, mainHtml: mainHtml });
}

// Infrastructure
function writeFile(relativePath, html) {
  const target = path.join(buildDir, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html.trimEnd() + "\n", "utf8");
}

function shouldCopySourceFile(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");

  if (normalized === "content.js") return false;
  if (normalized === "README.md") return false;
  if (normalized.startsWith("templates/")) return false;
  if (/\.html$/i.test(normalized)) return false;
  if (/^agents\/.*\.html$/i.test(normalized)) return false;

  return true;
}

function shouldCopySourceDirectory(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");

  if (normalized === "templates" || normalized.startsWith("templates/"))
    return false;

  return true;
}

function copyDirectory(sourceDir, targetDir, relativeBase) {
  fs.mkdirSync(targetDir, { recursive: true });

  fs.readdirSync(sourceDir).forEach(function (name) {
    const source = path.join(sourceDir, name);
    const target = path.join(targetDir, name);
    const relativePath = path.join(relativeBase || "", name);
    const stat = fs.statSync(source);

    if (stat.isDirectory()) {
      if (!shouldCopySourceDirectory(relativePath)) return;
      copyDirectory(source, target, relativePath);
      return;
    }

    if (!shouldCopySourceFile(relativePath)) return;

    fs.copyFileSync(source, target);
  });
}

function removeDirectory(targetDir) {
  if (!fs.existsSync(targetDir)) return;

  fs.readdirSync(targetDir).forEach(function (name) {
    const current = path.join(targetDir, name);
    const stat = fs.statSync(current);

    if (stat.isDirectory()) {
      removeDirectory(current);
      return;
    }

    fs.unlinkSync(current);
  });

  fs.rmdirSync(targetDir);
}

function prepareBuildDirectory() {
  removeDirectory(buildDir);
  fs.mkdirSync(buildDir, { recursive: true });
  copyDirectory(srcDir, buildDir, "");
}

function renderRootModel(model) {
  if (model.template === "pages/home.html") return renderHomePage(model);
  if (model.template === "pages/services.html")
    return renderServicesPage(model);
  if (model.template === "pages/testimonials.html")
    return renderTestimonialsPage(model);
  if (model.template === "pages/contact.html") return renderContactPage(model);
  if (model.template === "pages/team.html") return renderTeamPage(model);
  if (model.template === "pages/about.html") return renderAboutPage(model);
  if (model.template === "pages/404.html") return renderNotFoundPage(model);

  throw new Error("No renderer registered for " + model.template);
}

function main() {
  prepareBuildDirectory();

  getRootPageModels().forEach(function (model) {
    const outputPath = model.path || model.page.path;
    writeFile(outputPath, renderRootModel(model));
  });

  const listingModel = getFeaturedListingModel();
  writeFile(listingModel.page.path, renderFeaturedListingPage(listingModel));

  getAgentPageModels().forEach(function (model) {
    writeFile(
      path.join("agents", model.agent.slug + ".html"),
      renderAgentPage(model),
    );
  });

  console.log(
    "Rendered " +
      (getRootPageModels().length + 1) +
      " root/listing pages and " +
      getAgentPageModels().length +
      " agent profile pages into build/.",
  );
}

main();
