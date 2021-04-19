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
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const getOffsetFromTop = (element) => element.getBoundingClientRect().top;

const isNearTopViewport = (element) =>
  getOffsetFromTop(element) >= 50 && getOffsetFromTop(element) > 0;

const updateActiveSection = () => {
  for (const section of sections) {
    if (isNearTopViewport(section)) {
      //   get prev active section
      const prevActiveSection = document.querySelector(
        "main section.is__active"
      );

      // deactivate prev active menu
      prevActiveSection && prevActiveSection.classList.remove("is__active");

      // activate the clicked link
      section.classList.add("is__active");

      // get previous active menu
      const prevActiveMenu = document.querySelector(
        ".navbar__menu .menu__link.is__active"
      );

      // deactivate prev active menu
      prevActiveMenu && prevActiveMenu.classList.remove("is__active");

      // activate linked menu
      document
        .querySelector(`a[href=${"#" + section.getAttribute("id")}]`)
        .classList.add("is__active");
    }
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
// document.addEventListener("scroll", () => {
//   setTimeout(() => {
//     console.log(window.scrollY);
//   }, 100);
// });

// Scroll to anchor ID using scrollIntoView event
navList.addEventListener("click", (event) => {
  event.preventDefault();

  // get previous active menu
  const prevActiveMenu = document.querySelector(
    ".navbar__menu .menu__link.is__active"
  );

  // deactivate prev active menu
  prevActiveMenu && prevActiveMenu.classList.remove("is__active");

  // activate the clicked link
  event.target.classList.add("is__active");

  // get linked section
  const section = document.getElementById(
    event.target.getAttribute("href").replace("#", "")
  );

  // scroll to linked section
  section.scrollIntoView({ behavior: "smooth" });
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Set sections as active
