
import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";

import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js"
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";

const root = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout);


page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

page.start();


function decorateContext(ctx, next) {
    ctx.render = (context) => render(context, root);
    ctx.updateNav = updateNav;
    next();
}

updateNav()
page.redirect('/');


function updateNav() {
    const loggedUser = getUserData() ? true : false;

    if (loggedUser) {
        document.getElementById('createLink').style.display = "inline-block";
        document.getElementById('logoutBtn').style.display = "inline-block";
        document.getElementById('loginLink').style.display = "none";
        document.getElementById('registerLink').style.display = "none";
    } else {
        document.getElementById('createLink').style.display = "none";
        document.getElementById('logoutBtn').style.display = "none";
        document.getElementById('loginLink').style.display = "inline-block";
        document.getElementById('registerLink').style.display = "inline-block";
    }
}


async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/home');
}