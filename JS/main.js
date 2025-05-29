const button = document.getElementById("darkModeToggle");
const body = document.body;

function updateButtonText() {
  if (body.classList.contains("dark-mode")) {
    button.innerHTML = "<strong>Light Mode</strong>";
  } else {
    button.innerHTML = "<strong>Dark Mode</strong>";
  }
}

// Dark Mode aktivieren, wenn bereits gespeichert
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
}
updateButtonText();

button.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Dark Mode Zustand speichern
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
  updateButtonText();
});

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".links a");
  const modal = document.getElementById("modal");
  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");
  let targetUrl = "";

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      targetUrl = event.target.getAttribute("data-url");
      // modal.style.display = "flex";
      window.location.href = targetUrl;
    });
  });

  yesButton.addEventListener("click", () => {
    if (targetUrl) {
      // window.location.href = targetUrl;
    }
  });

  noButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
