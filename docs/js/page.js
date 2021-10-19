const THEME = 'theme';
const DARK = 'dark';
const LIGHT = 'light';
const DEFAULT = 'default';

function setTheme(theme) {
  document.documentElement.classList.remove(DARK);
  document.documentElement.classList.remove(LIGHT);
  document.documentElement.classList.add(theme);
}

function setThemeSelection(theme) {
  const menuElement = document.querySelector('.theme-menu');
  menuElement.classList.remove(`${DARK}-selected`);
  menuElement.classList.remove(`${LIGHT}-selected`);
  menuElement.classList.remove(`${DEFAULT}-selected`);
  menuElement.classList.add(`${theme}-selected`);
}

function openThemeMenu(anchor) {
  const menuElement = document.querySelector('.theme-menu');
  const targetRect = anchor.getBoundingClientRect();
  menuElement.classList.toggle('show');
  menuElement.style.top = `${targetRect.top + event.target.clientHeight}px`;
}

function closeThemeMenu() {
  const menuElement = document.querySelector('.theme-menu');
  menuElement.classList.remove('show');
}

function onThemeClick(event) {
  openThemeMenu(event.target);
  event.preventDefault();
}

function onDarkThemeClick(event) {
  setTheme(DARK);
  setThemeSelection(DARK);
  window.localStorage.setItem(THEME, DARK);
  closeThemeMenu();
  event.preventDefault();
}

function onLightThemeClick(event) {
  setTheme(LIGHT);
  setThemeSelection(LIGHT);
  window.localStorage.setItem(THEME, LIGHT);
  closeThemeMenu();
  event.preventDefault();
}

function onDefaultThemeClick(event) {
  setThemeSelection(DEFAULT);
  window.localStorage.setItem('theme', undefined);
  setDefaultTheme();
  closeThemeMenu();
  event.preventDefault();
}

function setDefaultTheme() {
  if (window.matchMedia('prefers-color-scheme: dark')) {
    setTheme(DARK);
  }
  if (window.matchMedia('prefers-color-scheme: light')) {
    setTheme(LIGHT);
  }
}

function onLoad() {
  document.documentElement.style.transition = 'color 500ms, background-color 500ms', 1000;
}

window.addEventListener('load', onLoad);

const theme = window.localStorage.getItem('theme') 
if (theme !== 'undefined') {
  document.documentElement.classList.add(theme);
  setThemeSelection(theme);
} else {
  setDefaultTheme();
  setThemeSelection(DEFAULT);
}
