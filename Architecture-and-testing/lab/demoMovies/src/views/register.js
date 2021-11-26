import { showSection } from "../dom.js";
import { showHomePage } from "./home.js";

import { register } from "../api/data.js";

const registerSection = document.getElementById('registerSection');
registerSection.remove();

const form = registerSection.querySelector('form')
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showRegisterPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(registerSection);
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('rePass').trim();

    if (password != rePass) {
        alert('Passwords not matching!');
        return;
    }

    await register(email, password);

    ctx.updateUserNav();
    ctx.goTo('home');
}