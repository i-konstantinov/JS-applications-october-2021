import { showSection } from './dom.js';
import { showHomePage, showAboutPage } from './views/home.js';
import { showCatalogPage } from './views/catalog.js';
import { showLoginPage } from './views/login.js';
import { showRegisterPage } from './views/register.js';
import { logout } from './api/data.js';

document.querySelector('nav').addEventListener('click', onNavigate);

const views = {
    'home': showHomePage,
    'catalog': showCatalogPage,
    'about': showAboutPage,
    'login': showLoginPage,
    'register': showRegisterPage,
    'logout': onLogout
}

const links = {
    'homeLink': 'home',
    'catalogLink': 'catalog',
    'aboutLink': 'about',
    'loginLink': 'login',
    'registerLink': 'register',
    'logoutLink': 'logout'
}


const context = {
    updateUserNav,
    goTo,
    showSection
}


//  start app in home view
updateUserNav()
goTo('home');


function onNavigate(ev) {
    if (ev.target.tagName == 'A') {
        const name = links[ev.target.id];
        if (name) {
            ev.preventDefault();
            goTo(name);
        }
    }
}


function goTo(name, ...params) {
    const view = views[name];
    if (typeof view == 'function') {
        view(context, ...params);
    }
}


export function updateUserNav() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData != null) {
        document.getElementById('userNav').style.display = 'inline-block';
        document.getElementById('guestNav').style.display = 'none';
    } else {
        document.getElementById('guestNav').style.display = 'inline-block';
        document.getElementById('userNav').style.display = 'none';
    }
}


async function onLogout(ev) {
    // ev.stopImmediatePropagation()

    await logout();

    updateUserNav();
    goTo('home');
}