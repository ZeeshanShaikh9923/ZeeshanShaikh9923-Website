// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const body = document.body;
const themeButtons = document.querySelectorAll("#themeToggle button");

function setTheme(theme) {
    if (theme === "light") {
        body.classList.add("light");
    } else {
        body.classList.remove("light");
    }
    themeButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.theme === theme);
    });
    localStorage.setItem("zeeshan-theme", theme);
}

const savedTheme = localStorage.getItem("zeeshan-theme") || "dark";
setTheme(savedTheme);

themeButtons.forEach(btn => {
    btn.addEventListener("click", () => setTheme(btn.dataset.theme));
});

// Project filter
const filterPills = document.querySelectorAll(".filter-pill");
const projectCards = document.querySelectorAll(".project-card");

filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
        const filter = pill.dataset.filter;
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");

        projectCards.forEach(card => {
            const tags = card.dataset.tags.split(" ");
            if (filter === "all" || tags.includes(filter)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// Matrix background
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
let width, height, columns, drops;
const characters = "01#@$%&*{}[]<>/\\=+_";
const fontSize = 14;

function initMatrix() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    if (!ctx) return;
    ctx.fillStyle = "rgba(2, 6, 23, 0.18)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#22c55e";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.96) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    requestAnimationFrame(drawMatrix);
}

window.addEventListener("resize", initMatrix);
initMatrix();
requestAnimationFrame(drawMatrix);