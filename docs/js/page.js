const THEME = 'theme';
const DARK = 'dark';
const LIGHT = 'light';
const OVERRIDE = 'override';

let currentTheme;
let isDefaultDarkTheme;

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.classList.remove(DARK);
  document.documentElement.classList.remove(LIGHT);
  document.documentElement.classList.add(theme);
  const themeToggle = document.querySelector('.theme-toggle')
  themeToggle.setAttribute('aria-checked', theme === DARK);
}

function onThemeToggle() {
  setTheme(currentTheme === DARK ? LIGHT : DARK);
  if (isDefaultDarkTheme && currentTheme === LIGHT || !isDefaultDarkTheme && currentTheme === DARK) {
    window.localStorage.setItem(THEME, OVERRIDE);
  } else {
    window.localStorage.removeItem(THEME);
  }
}

function onLoad() {
  document.documentElement.classList.remove('no-transitions');
  const themeToggle = document.querySelector('.theme-toggle')
  themeToggle.classList.add('transition');
  themeToggle.addEventListener('click', onThemeToggle);
  themeToggle.addEventListener('keydown', (event) => {
    if (event.code !== 'Space') {
      return;
    }
    onThemeToggle();
    event.preventDefault();
  });
}

window.addEventListener('load', onLoad);

document.documentElement.classList.add('no-transitions');
const storedTheme = window.localStorage.getItem(THEME) 
isDefaultDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (storedTheme === OVERRIDE) {
  setTheme(isDefaultDarkTheme ? LIGHT : DARK);
} else {
  setTheme(isDefaultDarkTheme ? DARK : LIGHT)
}
