import { logout } from "./api/data.js";

import { page, render } from "./lib.js";

import { getUserData } from "./util.js";

import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { profilePage } from "./views/profile.js";
import { registerPage } from "./views/register.js";


const root = document.getElementById('content');


document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    updateNav();
    page.redirect('/');
});


page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/profile', profilePage);
page.start();


function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);  
    ctx.updateNav = updateNav;
    next();
}

updateNav();
page.redirect('/');

function updateNav() {
    const loggedUser = getUserData() ? true : false;
    if (loggedUser) {
        document.getElementById('profileLink').style.display = 'inline-block';
        document.getElementById('createLink').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('registerLink').style.display = 'none';
    } else {
        document.getElementById('profileLink').style.display = 'none';
        document.getElementById('createLink').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('loginLink').style.display = 'inline-block';
        document.getElementById('registerLink').style.display = 'inline-block';

    }
}