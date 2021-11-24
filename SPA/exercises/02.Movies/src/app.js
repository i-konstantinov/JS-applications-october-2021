
import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

// Create placeholder func for every view / section:
// - home
// - add movie
// - edit movie
// Config and test navigation (btn => module)
// Implement modules:
// - create async functions for requests (създаваме ги и ги тестваме отделно от фронт енда)
// - implement DOM logic

// Order of views:
// - catalog (home view)*
// - login/register
// - create
// - details
// - likes
// - edit (зареждане на филма => попул на форм => валидация => асинк заявка => редирект)
// - delete


const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
};

const nav = document.querySelector('nav');
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', onLogout);
nav.addEventListener('click', (ev) => {
    const view = views[ev.target.id];
    if (typeof view == "function") {
        ev.preventDefault();
        view();
    }
});


// start app in home view
showHome();
updateNav();


export function updateNav() {
    const loggedUser = JSON.parse(localStorage.getItem('userData'));
    if (loggedUser && loggedUser != null) {
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${loggedUser.email}`;
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        nav.querySelector('#welcomeMsg').textContent = `Welcome, guest`;
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}


// logout logic
async function onLogout(ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    const loggedUser = JSON.parse(localStorage.getItem('userData'));
    try {
        const res = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                "X-Authorization": loggedUser.token
            }
        });
        if (res.status != 204) {
            const error = await res.json();
            throw new Error(error.message);
        }
        localStorage.removeItem('userData');
        updateNav();
        showLogin();

    } catch (err) {
        alert(err.message);
    }
}