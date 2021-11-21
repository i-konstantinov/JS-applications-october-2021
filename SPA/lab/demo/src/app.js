import { showHomePage, showAboutPage } from './home.js';
import { showCatalogPage } from './catalog.js';
import { showLoginPage } from './login.js';
import { showRegisterPage } from './register.js';

document.querySelector('nav').addEventListener('click', onNavigate);

const sections = {
    'home': showHomePage,
    'catalog': showCatalogPage,
    'about': showAboutPage,
    'login': showLoginPage,
    'register': showRegisterPage,
    'logout': onLogout
}

//  start app in home view
showHomePage();

updateUserNav()

function onNavigate(ev) {
    // updateUserNav();
    if (ev.target.tagName == 'A') {
        const view = sections[ev.target.id];
        if (typeof view == 'function') {
            ev.preventDefault();
            view();
        }
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

async function onLogout() {
    const { token } = JSON.parse(localStorage.getItem('userData'));
    
    try {
        const res = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                'X-Authorization': token
            }
        })
        if (res.status != 204) {
            const error = await res.json();
            throw new Error(error.message);
        }

        localStorage.removeItem('userData');
        updateUserNav();
        showHomePage();

    } catch (err) {
        alert(err.message);
    }
}