/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("main section");
const navList = document.getElementById("navbar__list");
const navListFragment = document.createDocumentFragment();

// this might improve perfomance
let activeMenu = undefined;
let activeSection = undefined;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const isNearTopViewport = (element) => {
  const rec = element.getBoundingClientRect();
  const headerHeight = document.querySelector(".page__header").offsetHeight;
  return rec.top <= headerHeight + 50 && rec.top >= 0 && rec.bottom > 100;
};

const activateMenu = (menu) => {
  // get previous active menu
  if (activateMenu !== menu) {
    // deactivate prev active menu
    activeMenu && activeMenu.classList.remove("is__active");

    // activate menu
    menu.classList.add("is__active");

    activeMenu = menu;
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
for (const section of sections) {
  const li = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.setAttribute("href", `#${section.getAttribute("id")}`);
  anchor.className = "menu__link";
  anchor.textContent = section.getAttribute("data-nav");
  li.appendChild(anchor);
  navListFragment.appendChild(li);
}

// add nav content to the page
navList.appendChild(navListFragment);

// Add class 'active' to section when near top of viewport
const updateActiveSection = () => {
  for (const section of sections) {
    if (isNearTopViewport(section)) {
      if (activeSection !== section) {
        // deactivate prev active menu
        activeSection && activeSection.classList.remove("is__active");

        // activate the section
        section.classList.add("is__active");

        activeSection = section;

        const menuToActivate = document.querySelector(
          `a[href="#${section.getAttribute("id")}"]`
        );

        activateMenu(menuToActivate);
      }

      return;
    }
  }
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to anchor ID using scrollIntoView event
navList.addEventListener("click", (event) => {
  event.preventDefault();

  // get linked section
  const section = document.getElementById(
    event.target.getAttribute("href").replace("#", "")
  );

  // scroll to linked section
  section.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("scroll", updateActiveSection);

// Build menu

// Set sections as active
