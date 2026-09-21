document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.textContent = open ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  const today = new Date();
  const dateInput = document.getElementById("pickupDate");
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  dateInput.min = localDate;

  function showMessage(element, message, type = "success") {
    element.textContent = message;
    element.className = `form-message ${type}`;
  }

  document.getElementById("pickupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = form.elements.name.value.trim();
    showMessage(document.getElementById("pickupMessage"),
      `✓ Thanks ${name}! Your demo pickup request has been validated successfully.`);
    form.reset();
    dateInput.min = localDate;
  });

  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    showMessage(document.getElementById("contactMessage"),
      "✓ Message validated successfully. In this demo, it is not sent to a server.");
    form.reset();
  });

  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    showMessage(document.getElementById("loginMessage"),
      "✓ Demo login successful. No real account or database is connected.");
    form.reset();
  });

  const locations = {
    vashi: "Vashi Collection Centre — sample result • Electronics drop-off available",
    nerul: "Nerul Collection Centre — sample result • Small devices accepted",
    kharghar: "Kharghar Collection Centre — sample result • Household e-waste",
    panvel: "Panvel Collection Centre — sample result • Electronics & accessories",
    belapur: "Belapur Collection Centre — sample result • Scheduled drop-off",
    thane: "Thane Collection Centre — sample result • E-waste intake"
  };

  function searchLocation() {
    const input = document.getElementById("locationInput");
    const result = document.getElementById("locationResult");
    const value = input.value.trim().toLowerCase();
    const match = Object.keys(locations).find(key => value.includes(key));
    result.textContent = match
      ? `📍 ${locations[match]}`
      : value
        ? `🔎 No demo centre found for "${input.value}". Try Vashi, Nerul, Kharghar, Panvel, Belapur or Thane.`
        : "Enter a location to see a sample result.";
  }

  document.getElementById("locationBtn").addEventListener("click", searchLocation);
  document.getElementById("locationInput").addEventListener("keydown", e => {
    if (e.key === "Enter") searchLocation();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
