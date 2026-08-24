/* =========================================================
   GRADA — LANGUAGE SWITCHER
   Georgian / English
========================================================= */

function initLanguageSwitcher() {
  const languageButtons = document.querySelectorAll(".lang-btn[data-lang]");
  const supportedLanguages = ["ka", "en"];
  const storageKey = "grada-language";

  // ვამოწმებთ ბოლოს რომელი ენა ჰქონდა არჩეული მომხმარებელს
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

  // არჩეული ენის დამახსოვრება
  function saveLanguage(lang) {
    try {
      localStorage.setItem(storageKey, lang);
    } catch (error) {
      console.log("Language could not be saved.");
    }
  }

  // ენის შეცვლის მთავარი ფუნქცია
  function setLanguage(lang) {
    if (!supportedLanguages.includes(lang)) {
      lang = "ka";
    }

    // HTML-ის ენის შეცვლა
    document.documentElement.lang = lang;

    // ყველა data-ka / data-en ტექსტის შეცვლა
    document.querySelectorAll("[data-ka][data-en]").forEach((element) => {
      const translation = element.dataset[lang];

      if (!translation) return;

      // META tag-ის შემთხვევაში ვცვლით content-ს
      if (element.tagName === "META") {
        element.setAttribute("content", translation);
      } else {
        element.textContent = translation;
      }
    });

    // ფორმების placeholder-ების თარგმნა
    document
      .querySelectorAll("[data-placeholder-ka][data-placeholder-en]")
      .forEach((element) => {
        const translation = element.getAttribute(`data-placeholder-${lang}`);

        if (translation) {
          element.setAttribute("placeholder", translation);
        }
      });

    // aria-label-ების თარგმნა
    document
      .querySelectorAll("[data-aria-ka][data-aria-en]")
      .forEach((element) => {
        const translation = element.getAttribute(`data-aria-${lang}`);

        if (translation) {
          element.setAttribute("aria-label", translation);
        }
      });

    // KA / EN აქტიური ღილაკის შეცვლა
    languageButtons.forEach((button) => {
      const isActive = button.dataset.lang === lang;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", isActive);
    });

    // ენის დამახსოვრება
    saveLanguage(lang);
  }

  // KA / EN ღილაკებზე დაჭერა
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLanguage = button.dataset.lang;
      setLanguage(selectedLanguage);
    });
  });

  // გვერდის გახსნისას ბოლოს არჩეული ენის ჩატვირთვა
  setLanguage(getSavedLanguage());
}

// DOM-ის ჩატვირთვის შემდეგ გაშვება
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
} else {
  initLanguageSwitcher();
}

/* =========================================================
   MOBILE BURGER MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    document.body.classList.toggle("menu-open", isOpen);
  });

  /* მენიუს ლინკზე დაჭერისას დაიხუროს */
  const navLinks = mainNav.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    });
  });

  /* ESC-ით დახურვა */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      mainNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    }
  });

  /* Desktop-ზე დაბრუნებისას მენიუს reset */
  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) {
      mainNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    }
  });
}
