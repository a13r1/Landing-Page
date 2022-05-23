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

/* Global variables */
const sections = document.querySelectorAll("section");

/* Helper functions */
/**
 * @description This function generates a navigation item (li) that contains an anchor (a)
 *              with reference to the corresponding section it should navigate to.
 * @param {section} section
 * @returns {li}
 */
function generateNavItem(section) {
  const navLink = document.createElement("a");
  navLink.textContent = section.getAttribute("data-nav");
  navLink.classList.add("menu__link");
  // link each anchor with its corresponding section id
  navLink.setAttribute("href", "#" + section.getAttribute("id"));
  // listen on anchor click to scroll to the desired section
  navLink.addEventListener("click", function (event) {
    event.preventDefault();
    /*
            behavior: 'smooth' --> smoothly move to the desired section, no jumping
            block: 'center' --> position the desired section in the center of the viewport
            */
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  const navItem = document.createElement("li");
  navItem.appendChild(navLink);
  return navItem;
}

/* Main functions */
//
/**
 * @description the main function to build the navigation bar dynamically from the existing sections
 */
function buildNav() {
  const navList = document.getElementById("navbar__list");
  /*
        hide the 'ul' to enhance the performance when too many sections are added to the page
        (no reflow and repaint for each single 'li')
      */
  navList.style.display = "none";
  for (const section of sections) {
    navList.appendChild(generateNavItem(section));
  }
  // highlight the first navigation item on loading
  document.querySelector(".menu__link").classList.add("active__link");
  navList.style.display = "block";
}

// build the nav
buildNav();

// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", function () {
  /*
        get the index of the closest section to the top of the viewport
        'section' in the above comment means the top of the section
      */
  let minDistance = Infinity;
  let closestSectionIndex = -1;
  for (let i = 0; i < sections.length; i++) {
    // top is the distance from the top of the section to the top of the viewport
    const { top } = sections[i].getBoundingClientRect();
    /*
            compare against absolute value as the distance may be negative in case of the section
            top being above the top of the viewport
            */
    if (minDistance > Math.abs(top)) {
      minDistance = Math.abs(top);
      closestSectionIndex = i;
    }
  }
  // remove 'active' class from all sections and 'active__link' class from all navigation items
  const navItems = document.querySelectorAll(".menu__link");
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("active");
    navItems[i].classList.remove("active__link");
  }
  /*
        only add 'active' class to the closest section to the top of the viewport
        and add 'active__link' to the corresponding navigation item to be highlighted
      */
  sections[closestSectionIndex].classList.add("active");
  navItems[closestSectionIndex].classList.add("active__link");
});
