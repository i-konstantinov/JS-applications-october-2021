// Initialization
// - find relevant section

import { showView } from "./dom.js";
import { showHome } from "./home.js";

const { token } = JSON.parse(localStorage.getItem('userData'));

// - detach section from DOM
const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onCreateSubmit);
section.remove();

// Display logic
export function showCreate() {
    showView(section);
}

async function onCreateSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    const newMovie = { title, description, img }

    try {
        if (Object.values(newMovie).some(field => field == '')) {
            throw new Error('All fields required!');
        }
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(newMovie)
        })

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        showHome();
    } catch (err) {
        alert(err.message);
    }
}
