import { render, page } from "./lib.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { indexPage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { userPage } from "./views/userProfile.js";

import * as api from "./api/data.js";

import { getUserData } from "./util.js";


window.api = api;

const root = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext)
page('/home', indexPage)
page('/memes', catalogPage)
page('/login', loginPage)
page('/register', registerPage)
page('/user', userPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)

page.start()

function decorateContext(ctx, next) {
    ctx.render = (context) => render(context, root);
    ctx.updateNav = updateNav;
    next();
}

updateNav();

page.redirect('/home')

function updateNav() {
    const loggedUser = getUserData();
    if (loggedUser != undefined && loggedUser != null) {        
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.user span').textContent = `Welcome, ${loggedUser.email}`
    } else {
        document.querySelector('.guest').style.display = 'block';
        document.querySelector('.user').style.display = 'none';
    }
}


async function onLogout(ev) {
    
    await api.logout();
    updateNav();
    page.redirect('/home');
}
