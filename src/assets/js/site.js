/* =========================================================
   Hawaii Military Real Estate · site script
   Edit NAV, FOOTER, CTA, CONTACT below to change globally.
   ========================================================= */

const CONTACT = {
  phoneDisplay: "(808) 123-4567",
  phoneHref: "tel:8081234567",
  smsHref: "sms:8081234567",
  email: "info@yourcompany.com",
  address: "98-123 Oahu St, Aiea, HI 96701",
  instagram: "#",
  facebook: "#",
};

const NAV = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "services.html", label: "Services" },
  { href: "team.html", label: "Team" },
  { href: "testimonials.html", label: "Testimonials" },
  { href: "featured-listing.html", label: "Featured Listing" },
  { href: "contact.html", label: "Contact" },
];

const CTA_DEFAULTS = {
  title: "Ready to Make Your Move?",
  subtitle:
    "Whether you're PCSing in or out, we're here 7 days a week with Aloha service.",
  note: "Replies within 2 hours during business hours.",
};

/* ---------- inline icons (only those we need) ---------- */
const I = {
  phone:
    '<svg class="icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>',
  msg: '<svg class="icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  pin: '<svg class="icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  arrow:
    '<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
  shield:
    '<svg class="icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  award:
    '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/></svg>',
  users:
    '<svg class="icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  home: '<svg class="icon" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
  check:
    '<svg class="icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
  checkCircle:
    '<svg class="icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m22 4-10 10-3-3"/></svg>',
  bed: '<svg class="icon" viewBox="0 0 24 24"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>',
  bath: '<svg class="icon" viewBox="0 0 24 24"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 0 1.5 1.5 0 0 0 0 2.12L7 8"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M17 19v2"/><path d="M2 12v3a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-3"/></svg>',
  square:
    '<svg class="icon" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
  menu: '<svg class="icon icon-lg" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>',
  x: '<svg class="icon icon-lg" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  ig: '<svg class="icon" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  fb: '<svg class="icon" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  chevL:
    '<svg class="icon" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>',
  chevR:
    '<svg class="icon" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>',
  quote:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>',
  heart:
    '<svg class="icon" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  clock:
    '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  calendar:
    '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  search:
    '<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
  hand: '<svg class="icon" viewBox="0 0 24 24"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/></svg>',
  key: '<svg class="icon" viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>',
};

/* ---------- helpers ---------- */
const el = (sel, root = document) => root.querySelector(sel);
const els = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const brand = (variant = "dark") => `
  <a href="index.html" class="brand ${variant === "light" ? "light" : ""}" aria-label="Hawaii Military Real Estate">
    <span class="brand-mark">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 18 L16 8 L28 18"/><path d="M7 17 V26 H25 V17"/><path d="M13 26 V20 H19 V26"/>
      </svg>
    </span>
    <span class="brand-text">
      <span class="brand-name">Hawaii Military</span>
      <span class="brand-sub">Real Estate</span>
    </span>
  </a>`;

function renderHeader() {
  const host = el("#site-header");
  if (!host) return;
  const here = location.pathname.split("/").pop() || "index.html";
  const navLinks = NAV.map(
    (n) =>
      `<a href="${n.href}"${n.href === here ? ' aria-current="page"' : ""}>${n.label}</a>`,
  ).join("");
  const mobileLinks = NAV.map(
    (n) =>
      `<a href="${n.href}"${n.href === here ? ' aria-current="page"' : ""}>${n.label}</a>`,
  ).join("");

  host.innerHTML = `
    <header class="site-header">
      <div class="container header-row">
        ${brand("dark")}
        <nav class="main-nav" aria-label="Primary">${navLinks}</nav>
        <a href="${CONTACT.phoneHref}" class="call-btn">${I.phone}${CONTACT.phoneDisplay}</a>
        <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" data-menu-btn>
          <span data-menu-open>${I.menu}</span>
          <span data-menu-close hidden>${I.x}</span>
        </button>
      </div>
      <div class="mobile-nav" data-mobile-nav>
        <div class="container inner">
          ${mobileLinks}
          <a href="${CONTACT.phoneHref}" class="call-btn-mobile">${I.phone}${CONTACT.phoneDisplay}</a>
        </div>
      </div>
    </header>`;

  const btn = el("[data-menu-btn]");
  const nav = el("[data-mobile-nav]");
  const open = el("[data-menu-open]");
  const close = el("[data-menu-close]");
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
    open.hidden = isOpen;
    close.hidden = !isOpen;
  });
}

function renderFooter() {
  const host = el("#site-footer");
  if (!host) return;
  host.innerHTML = `
    <footer class="site-footer">
      <div class="container grid">
        <div>
          ${brand("light")}
          <p class="about">Helping military families buy, sell and manage homes across Oahu and the neighbor islands. An ohana-owned business.</p>
          <div class="socials">
            <a href="${CONTACT.instagram}" aria-label="Instagram">${I.ig}</a>
            <a href="${CONTACT.facebook}" aria-label="Facebook">${I.fb}</a>
          </div>
        </div>
        <div class="f-col">
          <h4>Navigate</h4>
          <ul>${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul>
        </div>
        <div class="f-col">
          <h4>Get in touch</h4>
          <ul>
            <li>${I.phone}<a href="${CONTACT.phoneHref}">${CONTACT.phoneDisplay}</a></li>
            <li>${I.mail}<a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
            <li>${I.pin}<span>${CONTACT.address}</span></li>
          </ul>
        </div>
      </div>
      <div class="f-bottom"><div class="container inner">© ${new Date().getFullYear()} Hawaii Military Real Estate · An Ohana Owned Business. All Rights Reserved.</div></div>
    </footer>`;
}

function renderCTA() {
  const host = el("#site-cta");
  if (!host) return;
  const title = host.dataset.title || CTA_DEFAULTS.title;
  const subtitle = host.dataset.subtitle || CTA_DEFAULTS.subtitle;
  const note = host.dataset.note || CTA_DEFAULTS.note;

  host.innerHTML = `
    <section class="cta-wrap">
      <div class="cta">
        <img src="assets/images/cta-sunset.jpg" alt="" aria-hidden="true" loading="lazy" width="1920" height="1080">
        <div class="cta-inner">
          <div class="copy reveal">
            <span class="pill"><span class="dot"></span> Standing By for Your Mission</span>
            <h2>${title}</h2>
            <p>${subtitle}</p>
            <div class="cta-actions">
              <a href="${CONTACT.phoneHref}" class="btn btn-white btn-lg">${I.phone} Call ${CONTACT.phoneDisplay} ${I.arrow}</a>
              <a href="mailto:${CONTACT.email}" class="btn btn-ghost-light btn-lg">${I.mail} ${CONTACT.email}</a>
            </div>
            <p class="cta-note">${note}</p>
          </div>
        </div>
      </div>
    </section>`;
}

/* ---------- reveal-on-scroll ---------- */
function initReveal() {
  const items = els(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );
  items.forEach((i) => io.observe(i));
}

/* ---------- home testimonial slider ---------- */
const HOME_T = [
  {
    quote:
      "David and Tonya helped us buy sight-unseen while still in Germany. The process was seamless and felt like family.",
    name: "Lt. Col. Harris",
    role: "U.S. Army · PCS to Schofield",
    img: "assets/images/avatar-1.jpg",
  },
  {
    quote:
      "Sold our home in 4 days, above asking price, while we were already on the mainland. Unmatched professionalism.",
    name: "The Parkers",
    role: "Navy Family · Pearl Harbor",
    img: "assets/images/avatar-2.jpg",
  },
  {
    quote:
      "They treated us like ohana from day one. We couldn't have asked for a smoother PCS move to Oahu.",
    name: "Capt. Rodriguez",
    role: "USMC · MCBH Kaneohe Bay",
    img: "assets/images/avatar-3.jpg",
  },
  {
    quote:
      "Living on Oahu is expensive but they found us a gem within BAH. Forever grateful for their care.",
    name: "Sgt. J. Mitchell",
    role: "Air Force · Hickam Field",
    img: "assets/images/avatar-4.jpg",
  },
];

function initHomeSlider() {
  const root = el("#home-slider");
  if (!root) return;
  let i = 0;
  root.innerHTML = `
    <div class="t-card">
      <div class="row">
        <div class="pic"><img data-img alt=""></div>
        <div class="body">
          <span class="quote-mark">${I.quote.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" width="36" height="36"')}</span>
          <div class="stars">${I.star.repeat(5)}</div>
          <blockquote data-q></blockquote>
          <div class="author"><div class="n" data-n></div><div class="r" data-r></div></div>
        </div>
      </div>
    </div>
    <div class="t-controls">
      <button class="t-btn" data-prev aria-label="Previous">${I.chevL}</button>
      <div class="t-dots" data-dots></div>
      <button class="t-btn" data-next aria-label="Next">${I.chevR}</button>
    </div>`;
  const img = el("[data-img]", root),
    q = el("[data-q]", root),
    n = el("[data-n]", root),
    r = el("[data-r]", root);
  const dotsHost = el("[data-dots]", root);
  dotsHost.innerHTML = HOME_T.map(
    (_, k) => `<button data-dot="${k}" aria-label="Slide ${k + 1}"></button>`,
  ).join("");
  const render = () => {
    const t = HOME_T[i];
    img.src = t.img;
    img.alt = t.name;
    q.textContent = `"${t.quote}"`;
    n.textContent = t.name;
    r.textContent = t.role;
    els("[data-dot]", root).forEach((d, k) =>
      d.classList.toggle("active", k === i),
    );
  };
  const go = (next) => {
    i = (next + HOME_T.length) % HOME_T.length;
    render();
  };
  el("[data-prev]", root).addEventListener("click", () => go(i - 1));
  el("[data-next]", root).addEventListener("click", () => go(i + 1));
  els("[data-dot]", root).forEach((d) =>
    d.addEventListener("click", () => go(+d.dataset.dot)),
  );
  setInterval(() => go(i + 1), 6000);
  render();
}

/* ---------- agent modal ---------- */
function initAgentModals() {
  const buttons = els("[data-agent]");
  if (!buttons.length) return;
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
    <button class="close" aria-label="Close">${I.x}</button>
    <div class="grid">
      <div class="pic"><img data-m-img alt=""></div>
      <div class="body">
        <div class="yrs" data-m-yrs></div>
        <h3 data-m-name></h3>
        <p class="role" data-m-role></p>
        <p class="bio" data-m-bio></p>
        <div class="specs-title">${I.award} Specialties</div>
        <div class="chips" data-m-chips></div>
        <div class="ctas">
          <a class="primary" data-m-call>${I.phone} ${CONTACT.phoneDisplay}</a>
          <a class="secondary" data-m-email></a>
        </div>
      </div>
    </div>
  </div>`;
  document.body.appendChild(backdrop);
  const close = () => backdrop.classList.remove("open");
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });
  el(".close", backdrop).addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const a = JSON.parse(btn.dataset.agent);
      el("[data-m-img]", backdrop).src = a.image;
      el("[data-m-img]", backdrop).alt = a.name;
      el("[data-m-yrs]", backdrop).textContent = a.years;
      el("[data-m-name]", backdrop).textContent = a.name;
      el("[data-m-role]", backdrop).textContent = a.role;
      el("[data-m-bio]", backdrop).textContent = a.bio;
      el("[data-m-chips]", backdrop).innerHTML = a.specialties
        .map((s) => `<span>${s}</span>`)
        .join("");
      el("[data-m-call]", backdrop).href = CONTACT.phoneHref;
      const emailA = el("[data-m-email]", backdrop);
      emailA.href = `mailto:${a.email}`;
      emailA.innerHTML = `${I.mail} ${a.email}`;
      backdrop.classList.add("open");
    });
  });
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderCTA();
  initReveal();
  initHomeSlider();
  initAgentModals();
});

window.__ICONS = I;
window.__CONTACT = CONTACT;
