// Initialization
// - find relevant section

import { showDetails } from "./details.js";
import { showView } from "./dom.js";

// - detach section from DOM
const section = document.getElementById('edit-movie');
const form = section.querySelector('form');


section.remove();
// Display logic
export function showEdit(movieId) {
    populateForm(movieId);
    showView(section);
}

async function onSubmit(id) {
    const { token } = JSON.parse(localStorage.getItem('userData'));

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');
    const edited = {title, description, img};

    await fetch('http://localhost:3030/data/movies/' + id, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(edited)
    });
    showDetails(id);
}

async function populateForm(id) {
    const res = await fetch("http://localhost:3030/data/movies/" + id);
    const movie = await res.json();
    
    form.querySelector('#title').value = movie.title;
    form.querySelector('textarea').textContent = movie.description;
    form.querySelector('#imageUrl').value = movie.img;

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        onSubmit(movie._id);
    });
}
