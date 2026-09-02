// Mobile nav toggle (hamburger menu).
// DOM interaction: querySelector + addEventListener, visibly shows/hides
// the nav list without a page reload. Fully keyboard accessible — the
// toggle is a real <button>, and Escape closes the menu and returns
// focus to the button that opened it.
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#primary-nav");

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    const isOpen = menu.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Closing on link click matters on mobile: without it, the menu would
  // stay open underneath the page the person just navigated to.
  menu.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });
})();
