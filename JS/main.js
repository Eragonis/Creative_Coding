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