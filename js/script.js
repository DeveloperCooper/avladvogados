// Navbar Hamburger

const elements = {
    date: document.querySelector(".date"),

    scrollLinks: document.querySelectorAll(".navbarListLink, .footerListLink, .dropdownLinks"),
    navbarList: document.querySelector(".navbarList"),
    toggle: document.querySelector(".navbarButton"),
    dropdownButton: document.querySelector(".navbarListLinkNone"),
    navbarDropdown: document.querySelector(".navbarDropdown"),
    hiddenTop: document.querySelectorAll('.hiddenTop'),
}

//Show Navbar
elements.toggle.addEventListener("click", e => {
    elements.navbarList.classList.toggle("navbarList--showLinks");
});

//Dropdown
const navbarDropdown = document.querySelector(".navbarDropdown");
const navbarListLinkNone = document.querySelector(".navbarListLinkNone");

navbarListLinkNone.addEventListener("click", () => {
  navbarDropdown.classList.toggle("navbarDropdown--active");
});

const dropdownItems = navbarDropdown.querySelectorAll("li");
dropdownItems.forEach(item => {
  item.addEventListener("click", () => {
    navbarDropdown.classList.remove("navbarDropdown--active");
    elements.navbarList.classList.remove("navbarList--showLinks");
  });
});

// Animation Scroll
elements.scrollLinks.forEach(link => {
    link.addEventListener("click", e => {
        if (!link.classList.contains("dropdownClick")) {
            elements.navbarList.classList.remove("navbarList--showLinks");
        }

        const id = link.getAttribute("href").substring(1);
        const element = document.querySelector(id);

        if (element) {
            const position = element.offsetTop - 100;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

            e.preventDefault();
        }
    });
});


//Scroll Animation
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting === true) {
          entry.target.classList.add('show')
           } else {
               entry.target.classList.remove('show')
      }
  });
});

elements.hiddenTop.forEach((todosElementos) => myObserver.observe(todosElementos));

//Slider
const slider = document.querySelector(".slider");
const prevBtn = document.querySelector(".prev-slide");
const nextBtn = document.querySelector(".next-slide");
let currentIndex = 0;
let interval;

prevBtn.addEventListener("click", () => {
  clearInterval(interval);
  currentIndex = (currentIndex - 1 + 4) % 4;
  updateSliderPosition();
  startAutoPlay();
});

nextBtn.addEventListener("click", () => {
  clearInterval(interval);
  currentIndex = (currentIndex + 1) % 4;
  updateSliderPosition();
  startAutoPlay();
});

function updateSliderPosition() {
  const slideWidth = slider.clientWidth;
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function startAutoPlay() {
  const screenWidth = window.innerWidth;
  
  
  if (screenWidth <= 1000) {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % 4;
      updateSliderPosition();
    }, 3000);
  }
}

startAutoPlay();