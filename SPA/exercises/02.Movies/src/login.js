// Initialization
// - find relevant section

import { updateNav } from "./app.js";
import { showView } from "./dom.js";
import { showHome } from "./home.js";

// - find section
// - get form and extract data
// - detach section from DOM
const section = document.getElementById('form-login');

const form = section.querySelector('form');
form.addEventListener('submit', onLogin);

section.remove();

// Display logic
export function showLogin() {
    showView(section);
}

async function onLogin(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        form.reset();
        updateNav();
        showHome();

    } catch (err) {
        alert(err.message)
    }
}
