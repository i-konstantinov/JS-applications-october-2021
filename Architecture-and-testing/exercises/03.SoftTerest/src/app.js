import { showHomePage } from "./views/home.js";
import { showCatalogPage } from "./views/catalog.js";
import { showLoginPage } from "./views/login.js";
import { showRegisterPage } from "./views/register.js";
import { showCreatePage } from "./views/create.js";
import { showDetailsPage } from "./views/details.js";
import { showSection } from "./dom.js";
import { logout } from "./api/data.js";


const links = {
    "homeLink": "home",
    "catalogLink": "catalog",
    "loginLink": "login",
    "registerLink": "register",
    "createLink": "create",
}

const views = {
    "home": showHomePage,
    "catalog": showCatalogPage,
    "login": showLoginPage,
    "register": showRegisterPage,
    "create": showCreatePage,
    "details": showDetailsPage
}

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

document.getElementById('logoutBtn').addEventListener('click', async (ev) => {
    ev.preventDefault();
    await logout();
    updateNav();
    goTo('home');
});

const ctx = {
    goTo,
    showSection,
    updateNav
}

// Start app in home view
// with updated nav
goTo('home');
updateNav();

function onNavigate(ev) {
    const name = links[ev.target.id];
    if (name) {
        ev.preventDefault();
        goTo(name);
    }
}

function goTo(n, ...params) {
    const view = views[n];
    if (typeof view == 'function') {
        view(ctx, ...params);
    }
}

function updateNav() {
    const isLoggedUser = sessionStorage.getItem('userData') != undefined ? true : false;
    if (isLoggedUser) {
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
    } else {
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
    }
}