const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});
/* =========================================================
   MOBILE NAVBAR
   Desktop navbar stays unchanged.
   Mobile: hamburger menu appears and opens/closes navbar links.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navContainer = document.querySelector(".nav-container");

  if (!navbar || !navContainer) return;

  /* -----------------------------------------
     Find existing navbar elements
  ----------------------------------------- */

  const navElements = Array.from(navContainer.children);

  if (!navElements.length) return;

  /*
    We keep the existing navbar elements.
    On mobile, everything except the brand and
    hamburger is placed inside the mobile menu.
  */

  const brand =
    navContainer.querySelector(".nav-brand") ||
    navElements[0];

  const existingMenu =
    navContainer.querySelector(".nav-links") ||
    navContainer.querySelector(".nav-menu");

  const cta =
    navContainer.querySelector(".nav-cta-btn");

  /* -----------------------------------------
     Create hamburger button
  ----------------------------------------- */

  let hamburger = navContainer.querySelector(".mobile-menu-btn");

  if (!hamburger) {
    hamburger = document.createElement("button");

    hamburger.className = "mobile-menu-btn";
    hamburger.type = "button";
    hamburger.setAttribute("aria-label", "Open navigation menu");
    hamburger.setAttribute("aria-expanded", "false");

    hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    navContainer.appendChild(hamburger);
  }

  /* -----------------------------------------
     Create mobile menu
  ----------------------------------------- */

  let mobileMenu = navbar.querySelector(".mobile-nav-menu");

  if (!mobileMenu) {
    mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile-nav-menu";

    /*
      If navbar already has a nav-links/nav-menu,
      clone its links into the mobile menu.
    */

    if (existingMenu) {
      mobileMenu.innerHTML = existingMenu.innerHTML;
    } else {
      /*
        Otherwise collect links/buttons directly
        from the existing navbar.
      */

      const links = navContainer.querySelectorAll(
        "a:not(.nav-brand), button:not(.mobile-menu-btn)"
      );

      links.forEach((element) => {
        const clone = element.cloneNode(true);

        if (!clone.classList.contains("mobile-menu-btn")) {
          mobileMenu.appendChild(clone);
        }
      });
    }

    navbar.appendChild(mobileMenu);
  }

  /* -----------------------------------------
     Mobile menu styling helper classes
     are handled by FOP.css
  ----------------------------------------- */

  /* -----------------------------------------
     Open / Close menu
  ----------------------------------------- */

  function openMenu() {
    mobileMenu.classList.add("is-open");
    hamburger.classList.add("is-open");

    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close navigation menu");

    document.body.classList.add("mobile-menu-open");
  }

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    hamburger.classList.remove("is-open");

    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("mobile-menu-open");
  }

  function toggleMenu() {
    if (mobileMenu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  /* -----------------------------------------
     Hamburger click
  ----------------------------------------- */

  hamburger.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  /* -----------------------------------------
     Close after clicking a navigation link
  ----------------------------------------- */

  mobileMenu.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");

    if (clickedLink) {
      closeMenu();
    }
  });

  /* -----------------------------------------
     Close when clicking outside navbar
  ----------------------------------------- */

  document.addEventListener("click", (event) => {
    if (!navbar.contains(event.target)) {
      closeMenu();
    }
  });

  /* -----------------------------------------
     ESC closes menu
  ----------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* -----------------------------------------
     If screen becomes desktop size,
     automatically close mobile menu.
  ----------------------------------------- */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});