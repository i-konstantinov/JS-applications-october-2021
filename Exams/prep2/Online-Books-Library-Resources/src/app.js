import {page, render} from './lib.js';
import { getUserData } from './util.js';
import { addBookPage } from './views/addBook.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myBooksPage } from './views/myBooks.js';
import { registerPage } from './views/register.js';
import * as api from './api/data.js';
import { logout } from './api/api.js';
window.api = api;

const root = document.getElementById('site-content');

page(decorateContext);
page('/', dashboardPage)
page('/login', loginPage)
page('/register', registerPage)
page('/add', addBookPage)
page('/my', myBooksPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
page.start();

page.redirect('/');
updateNav();


document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    updateNav();
    page.redirect('/');
});


function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const loggedUser = getUserData();
    const guestLinks = document.getElementById('guest');
    const userLinks = document.getElementById('user');
    if (loggedUser && loggedUser != null) {
        userLinks.querySelector('span').textContent = `Welcome, ${loggedUser.email}`;
        guestLinks.style.display = 'none';
        userLinks.style.display = 'inline-block';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}

