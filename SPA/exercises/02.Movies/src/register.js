// Initialization
// - find relevant section

import { showView } from "./dom.js";

// - detach section from DOM
const section = document.getElementById('form-sign-up');

const form = section.querySelector('form');
form.addEventListener('submit', onRegister);

section.remove();

// Display logic
export function showRegister() {
    showView(section);
}

async function onRegister(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');
    
    try {
        if (Object.values({email, password, rePass}).some(x => x == null)) {
            throw new Error('All fields required!');
        }
        if (password != rePass) {
            throw new Error('Passwords not matching!');
        }

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