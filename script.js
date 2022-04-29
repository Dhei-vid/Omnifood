"use strict";

// Opening and closing mobile navigation
const nav_btn = document.querySelector(".btn-mobile-nav");
const headerEL = document.querySelector(".header");
const allLinks = document.querySelectorAll("a:link");

// removing the nav-open at the start
// headerEL.classList.remove("nav-open");

nav_btn.addEventListener("click", function () {
  headerEL.classList.toggle("nav-open");
});

// Implementing smooth scroll
// console.log(allLinks);

allLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const href = link.getAttribute("href");

    // Scrolling to the top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Close mobile navigation
    const links = link.getAttribute("class");
    if (link.classList.contains("main-nav-link")) {
      headerEL.classList.remove("nav-open");
    }
  })
);

// Implementing sticky navigation
const sectHeroEl = document.querySelector(".section-hero");
const header = document.querySelector(".header");

const navHeight = header.getBoundingClientRect().height;

console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) document.body.classList.add("sticky");
  else document.body.classList.remove("sticky");
};

const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObs.observe(sectHeroEl);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

checkFlexGap();
