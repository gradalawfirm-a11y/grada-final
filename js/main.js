/* =========================================================
   GRADA — LANGUAGE SWITCHER
   Georgian / English
========================================================= */

function initLanguageSwitcher() {
  const languageButtons = document.querySelectorAll("[data-lang]");
  const supportedLanguages = ["ka", "en"];
  const storageKey = "grada-language";

  function getSavedLanguage() {
    try {
      const savedLanguage = localStorage.getItem(storageKey);

      if (supportedLanguages.includes(savedLanguage)) {
        return savedLanguage;
      }

      return "ka";
    } catch (error) {
      return "ka";
    }
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(storageKey, lang);
    } catch (error) {
      console.log("Language could not be saved.");
    }
  }

  function setLanguage(lang) {
    if (!supportedLanguages.includes(lang)) {
      lang = "ka";
    }

    document.documentElement.lang = lang;

    /* ყველა data-ka / data-en ტექსტი */
    document.querySelectorAll("[data-ka][data-en]").forEach(function (element) {
      const translation = element.getAttribute("data-" + lang);

      if (!translation) return;

      if (element.tagName === "META") {
        element.setAttribute("content", translation);
      } else {
        element.textContent = translation;
      }
    });

    /* Placeholder-ები */
    document
      .querySelectorAll("[data-placeholder-ka][data-placeholder-en]")
      .forEach(function (element) {
        const translation = element.getAttribute("data-placeholder-" + lang);

        if (translation) {
          element.setAttribute("placeholder", translation);
        }
      });

    /* aria-label-ები */
    document
      .querySelectorAll("[data-aria-ka][data-aria-en]")
      .forEach(function (element) {
        const translation = element.getAttribute("data-aria-" + lang);

        if (translation) {
          element.setAttribute("aria-label", translation);
        }
      });

    /* ყველა KA / EN ღილაკის active მდგომარეობა */
    languageButtons.forEach(function (button) {
      const isActive = button.dataset.lang === lang;

      button.classList.toggle("active", isActive);

      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    saveLanguage(lang);
  }

  /* KA / EN ღილაკებზე დაჭერა */
  languageButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const selectedLanguage = button.dataset.lang;

      if (!supportedLanguages.includes(selectedLanguage)) {
        return;
      }

      setLanguage(selectedLanguage);
    });
  });

  /* გვერდის გახსნისას ბოლოს არჩეული ენა */
  setLanguage(getSavedLanguage());
}

/* =========================================================
   MOBILE BURGER MENU
========================================================= */

function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    document.body.classList.toggle("menu-open", isOpen);
  });

  /* ლინკზე დაჭერისას მენიუ დაიხუროს */
  const navLinks = mainNav.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    });
  });

  /* ESC */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      mainNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    }
  });

  /* Desktop-ზე დაბრუნებისას reset */
  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) {
      mainNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    }
  });
}

/* =========================================================
   GRADA HOME SLIDER — AUTO PLAY
========================================================= */

function initHomeSlider() {
  const slider = document.getElementById("gradaSlider");

  if (!slider) return;

  const slides = slider.querySelectorAll(".grada-slide");
  const dots = slider.querySelectorAll(".grada-dot");
  const prevBtn = slider.querySelector(".grada-prev");
  const nextBtn = slider.querySelector(".grada-next");

  if (!slides.length) return;

  let current = 0;
  let autoPlay;

  function showSlide(index) {
    if (index >= slides.length) {
      index = 0;
    }

    if (index < 0) {
      index = slides.length - 1;
    }

    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });

    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });

    slides[index].classList.add("active");

    if (dots[index]) {
      dots[index].classList.add("active");
    }

    if (slides[index].classList.contains("grada-slide-photo")) {
      slider.classList.add("photo-active");
    } else {
      slider.classList.remove("photo-active");
    }

    current = index;
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function previousSlide() {
    showSlide(current - 1);
  }

  function restartAutoPlay() {
    clearInterval(autoPlay);

    autoPlay = setInterval(function () {
      nextSlide();
    }, 4500);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
      restartAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      previousSlide();
      restartAutoPlay();
    });
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      showSlide(index);
      restartAutoPlay();
    });
  });

  showSlide(0);
  restartAutoPlay();
}

/* =========================================================
   GRADA — HOME FAQ ACCORDION
========================================================= */

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".home-faq-item");

  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    const button = item.querySelector(".home-faq-question");

    if (!button) return;

    button.addEventListener("click", function () {
      const isOpen = item.classList.contains("active");

      faqItems.forEach(function (faqItem) {
        faqItem.classList.remove("active");

        const faqButton = faqItem.querySelector(".home-faq-question");

        if (faqButton) {
          faqButton.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        item.classList.add("active");

        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

/* =========================================================
   INITIALIZE EVERYTHING
========================================================= */

function initGradaWebsite() {
  initLanguageSwitcher();
  initMobileMenu();
  initHomeSlider();
  initFaqAccordion();
  initCurrentYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGradaWebsite);
} else {
  initGradaWebsite();
}
