const themes = {
  light: {
    background: "#f6f8fc",
    text: "black",
    contentBackground: "#fff",
  },
  dark: {
    background: "black",
    text: "#f6f8fc",
    contentBackground: "#221c37",
  },
};

function setTheme(newTheme) {
  const themeColors = themes[newTheme];
  const html = document.documentElement;

  Object.keys(themeColors).map(function (key) {
    html.style.setProperty(`--${key}`, themeColors[key]);
  });
}

const darkModeToggle = document.getElementById("themeToggle");
darkModeToggle.addEventListener("change", ({ target }) => {
  setTheme(target.checked ? "dark" : "light");
});
