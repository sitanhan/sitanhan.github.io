const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const storedTheme = localStorage.getItem("site-theme");

if (storedTheme) {
  root.dataset.theme = storedTheme;
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setThemeIcon() {
  const iconName = root.dataset.theme === "dark" ? "sun" : "moon";
  themeToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;
  refreshIcons();
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("site-theme", nextTheme);
  setThemeIcon();
});

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const originalText = button.textContent.trim();
    await copyText(button.dataset.copy);
    button.innerHTML = '<i data-lucide="check"></i> 已复制';
    refreshIcons();
    window.setTimeout(() => {
      button.innerHTML = `<i data-lucide="copy"></i> ${originalText}`;
      refreshIcons();
    }, 1400);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  setThemeIcon();
  refreshIcons();
});
