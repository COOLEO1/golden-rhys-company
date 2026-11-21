(() => {
  const root = document.documentElement;
  const languageButton = document.getElementById("languageSwitch");
  const menuButton = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const form = document.getElementById("enquiryForm");
  const feedback = document.getElementById("formFeedback");
  let language = localStorage.getItem("nyanja-view-lodge-language") || "en";

  const applyLanguage = (next) => {
    language = next === "ny" ? "ny" : "en";
    root.lang = language === "ny" ? "ny" : "en";
    document.querySelectorAll("[data-en][data-ny]").forEach((element) => {
      element.innerHTML = element.dataset[language];
    });
    languageButton.setAttribute("aria-label", language === "en" ? "Switch to Chichewa" : "Switch to English");
    languageButton.innerHTML = language === "en" ? "<strong>EN</strong> <i>/</i> NY" : "EN <i>/</i> <strong>NY</strong>";
    localStorage.setItem("nyanja-view-lodge-language", language);
    if (feedback) feedback.textContent = "";
  };

  languageButton.addEventListener("click", () => applyLanguage(language === "en" ? "ny" : "en"));
  applyLanguage(language);

  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const arrival = form.elements.arrival;
  const departure = form.elements.departure;
  arrival.min = localDate;
  departure.min = localDate;
  arrival.addEventListener("change", () => {
    departure.min = arrival.value || localDate;
    if (departure.value && departure.value <= arrival.value) departure.value = "";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!arrival.value || !departure.value || departure.value <= arrival.value) {
      feedback.textContent = language === "en"
        ? "Please choose a departure date after your arrival date."
        : "Chonde sankhani tsiku lochoka lotsatira tsiku lofika.";
      return;
    }
    feedback.textContent = language === "en"
      ? "Thanks for exploring this concept. This is a demonstration form; no reservation has been sent."
      : "Zikomo poyesa chitsanzochi. Fomuyi ndi yowonetsera chabe; palibe booking yomwe yatumizidwa.";
    form.reset();
    arrival.min = localDate;
    departure.min = localDate;
  });

  const revealItems = document.querySelectorAll(".section-heading, .intro-grid, .intro-photo, .room-card, .experience-card, .story-copy, .story-image, .journal-grid article, .enquire-heading, .enquiry-form");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach((item) => { item.classList.add("reveal"); observer.observe(item); });
  } else { revealItems.forEach((item) => item.classList.add("visible")); }
})();