
import { page, render } from "./lib.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

import * as api from './api/data.js';
import { getUserData } from "./util.js";

window.api = api;

const root = document.querySelector('div.container');

document.getElementById('logoutBtn').addEventListener('click', onLogout);


page(decorateContext);
page('/', catalogPage)
page('/details/:id', detailsPage)
page('/create', createPage)
page('/edit/:id', editPage)
page('/login', loginPage)
page('/register', registerPage)
page('/my-furniture', catalogPage)

page.start();

function decorateContext(ctx, next) {
    ctx.render = (context) => render(context, root);
    ctx.updateNav = updateNav;
    next();
}


updateNav();
page.redirect('/');

function updateNav() {
    const isLoggedUser = getUserData() != undefined ? true : false;

    if (isLoggedUser) {
        Array.from(document.querySelectorAll('.guest')).map(e => e.style.display = 'none');
        Array.from(document.querySelectorAll('.user')).map(e => e.style.display = 'inline-block');
    } else {
        Array.from(document.querySelectorAll('.guest')).map(e => e.style.display = 'inline-block');
        Array.from(document.querySelectorAll('.user')).map(e => e.style.display = 'none');
        
    }
}


async function onLogout() {
    await api.logout();
    updateNav();
    page.redirect('/');   
}