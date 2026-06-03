(function () {
  function initMenus() {
    document.querySelectorAll("[data-menu-btn]").forEach(function (button) {
      const targetSelector = button.getAttribute("data-menu-target");
      const menu = targetSelector
        ? document.querySelector(targetSelector)
        : null;
      const openIcon = button.querySelector("[data-menu-open]");
      const closeIcon = button.querySelector("[data-menu-close]");

      if (!menu) return;

      button.addEventListener("click", function () {
        const isOpen = menu.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));

        if (openIcon) openIcon.hidden = isOpen;
        if (closeIcon) closeIcon.hidden = !isOpen;
      });
    });
  }

  function initReveal() {
    const items = Array.from(document.querySelectorAll(".reveal"));

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("in");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initSite() {
    initMenus();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", initSite);
  window.initSite = initSite;
})();
