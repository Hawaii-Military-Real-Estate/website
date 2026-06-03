/* ============ Site-wide config (edit menu / footer / CTA / contact here) ============ */
const SITE = {
  brand: {
    name: "Hawaii Military Real Estate",
    tagline: "Ohana Owned · VA Loan Experts",
  },
  phone: "(808) 123-4567",
  phoneHref: "tel:8081234567",
  email: "info@yourcompany.com",
  address: "98-123 Oahu St, Aiea, HI 96701",
  nav: [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services" },
    { href: "team.html", label: "Team" },
    { href: "testimonials.html", label: "Testimonials" },
    { href: "contact.html", label: "Contact" },
  ],
  social: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Facebook", href: "#", icon: "facebook" },
  ],
  footerBlurb:
    "Helping military families buy, sell and manage homes across Oahu and the neighbor islands. An ohana-owned business.",
  cta: {
    title: "Ready to Make Your Move?",
    subtitle:
      "Whether you're PCSing in or out, we're here 7 days a week with Aloha service.",
    note: "Replies within 2 hours during business hours.",
  },
};

/* ============ Icons (inline SVG) ============ */
const I = {
  phone:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
  mapPin:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  x: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  arrowRight:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  arrowLeft:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  shield:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  award:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  users:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  check:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  check2:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 17 10"/></svg>',
  heart:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  quote:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 .985 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>',
  msg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  search:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  hand: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 12V4a2 2 0 1 1 4 0v8"/><path d="M11 12V4a2 2 0 0 0-4 0v10"/><path d="M3 14v3a4 4 0 0 0 4 4h2"/><path d="M21 12a9 9 0 0 1-9 9"/></svg>',
  key: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>',
  clock:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  cal: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  insta:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  fb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  shieldCheck:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
};

/* ============ Header / Footer rendering (PREFIX = "" for root pages, "../" for subfolders) ============ */
let PREFIX = "";
function renderHeader(active = "") {
  const navHtml = SITE.nav
    .map(
      (n) =>
        `<a href="${PREFIX}${n.href}" class="${active === n.href ? "active" : ""}">${n.label}</a>`,
    )
    .join("");
  const mobNav = SITE.nav
    .map(
      (n) =>
        `<a href="${PREFIX}${n.href}" class="${active === n.href ? "active" : ""}">${n.label}</a>`,
    )
    .join("");
  return `<header class="site-header">
    <div class="container">
      <div class="row">
        <a class="logo" href="${PREFIX}index.html">
          <span class="logo-mark">HM</span>
          <span>${SITE.brand.name.split(" ")[0]} <span style="color:var(--primary)">Military</span><small>${SITE.brand.tagline}</small></span>
        </a>
        <nav class="nav-desktop">${navHtml}</nav>
        <a class="btn-call" href="${SITE.phoneHref}">${I.phone} ${SITE.phone}</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">${I.menu}</button>
      </div>
    </div>
    <div class="nav-mobile" id="navMobile">${mobNav}<a class="btn-call" href="${SITE.phoneHref}">${I.phone} ${SITE.phone}</a></div>
  </header>`;
}

function renderFooter() {
  const links = SITE.nav
    .map((n) => `<li><a href="${PREFIX}${n.href}">${n.label}</a></li>`)
    .join("");
  const socials = SITE.social
    .map(
      (s) =>
        `<a href="${s.href}" aria-label="${s.label}">${I[s.icon] || ""}</a>`,
    )
    .join("");
  return `<footer class="site-footer">
    <div class="container">
      <div class="grid">
        <div>
          <a class="logo" href="${PREFIX}index.html">
            <span class="logo-mark">HM</span>
            <span>${SITE.brand.name.split(" ")[0]} <span style="color:var(--accent)">Military</span><small>${SITE.brand.tagline}</small></span>
          </a>
          <p style="margin-top:1rem;font-size:.92rem;color:rgba(255,255,255,.7);max-width:28rem">${SITE.footerBlurb}</p>
          <div class="socials">${socials}</div>
        </div>
        <div>
          <h4>Navigate</h4>
          <ul>${links}</ul>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <ul class="contact-list">
            <li>${I.phone}<a href="${SITE.phoneHref}">${SITE.phone}</a></li>
            <li>${I.mail}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li>${I.mapPin}<span>${SITE.address}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="copyright container">© 2024 ${SITE.brand.name} · An Ohana Owned Business. All Rights Reserved.</div>
  </footer>`;
}

function renderCTA(opts = {}) {
  const c = { ...SITE.cta, ...opts };
  return `<section class="cta-band"><div class="box">
    <img class="bg" src="${PREFIX}assets/cta-sunset.jpg" alt="" loading="lazy">
    <div class="ovr"></div>
    <div class="inner">
      <div class="eyebrow-pill"><span style="width:6px;height:6px;border-radius:999px;background:#fff;display:inline-block;animation:pulse 2s ease-in-out infinite"></span> Standing By for Your Mission</div>
      <h2>${c.title}</h2>
      <p>${c.subtitle}</p>
      <div class="row">
        <a class="btn-white" href="${SITE.phoneHref}">${I.phone} Call ${SITE.phone} ${I.arrowRight}</a>
        <a class="btn-ghost" href="mailto:${SITE.email}">${I.mail} ${SITE.email}</a>
      </div>
      <p class="note">${c.note}</p>
    </div>
  </div></section>`;
}

function sortTeamCards() {
  document.querySelectorAll("[data-team-grid]").forEach((grid) => {
    const cards = Array.from(grid.querySelectorAll("[data-agent-card]"));
    if (!cards.length) return;

    const getSort = (card) => {
      const value = card.dataset.sort ? card.dataset.sort.trim() : "";
      if (!value) return null;
      const number = Number(value);
      return Number.isFinite(number) ? number : null;
    };

    const getName = (card) => {
      const heading = card.querySelector("h3");
      return (card.dataset.agentName || (heading ? heading.textContent : ""))
        .trim()
        .toLocaleLowerCase();
    };

    cards
      .sort((a, b) => {
        const aSort = getSort(a);
        const bSort = getSort(b);
        const aHasSort = aSort !== null;
        const bHasSort = bSort !== null;

        if (aHasSort && bHasSort) {
          return aSort - bSort || getName(a).localeCompare(getName(b));
        }

        if (aHasSort) return -1;
        if (bHasSort) return 1;

        return getName(a).localeCompare(getName(b));
      })
      .forEach((card) => grid.appendChild(card));
  });
}

/* ============ Mount + interactions ============ */
function mountChrome(activePath, prefix = "") {
  PREFIX = prefix;
  const h = document.getElementById("header-mount");
  const f = document.getElementById("footer-mount");
  if (h) h.outerHTML = renderHeader(activePath);
  if (f) f.outerHTML = renderFooter();
  document.querySelectorAll("[data-cta]").forEach((el) => {
    const opts = {};
    if (el.dataset.title) opts.title = el.dataset.title;
    if (el.dataset.subtitle) opts.subtitle = el.dataset.subtitle;
    if (el.dataset.note) opts.note = el.dataset.note;
    el.outerHTML = renderCTA(opts);
  });

  // mobile menu
  const t = document.getElementById("menuToggle");
  const m = document.getElementById("navMobile");
  if (t && m)
    t.addEventListener("click", () => {
      const open = m.classList.toggle("open");
      t.innerHTML = open ? I.x : I.menu;
    });

  sortTeamCards();

  // reveal observer
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}
