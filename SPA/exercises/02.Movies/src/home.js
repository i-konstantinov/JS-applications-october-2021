import { showView, e } from "./dom.js";
import { showCreate } from "./create.js";
import { showDetails } from "./details.js";
import { showLogin } from "./login.js";

const loggedUser = JSON.parse(localStorage.getItem('userData'));


// Initialization
// - find relevant section
// - detach section from DOM
const section = document.getElementById('home-page');

const catalog = section.querySelector(".card-deck.d-flex.justify-content-center");

const addMovieBtn = section.querySelector('#createLink');

let moviesCache = null;
let lastLoaded = null;
const maxAge = 60000;

addMovieBtn.addEventListener('click', (ev) => {
    // ev.preventDefault();
    if (loggedUser == undefined) {
        showLogin();
    } else {
        showCreate();
    }
})

catalog.addEventListener('click', (ev) => {
    ev.preventDefault();
    let target = ev.target;

    if (target.tagName == 'BUTTON') {
        target = target.parentElement;
    }
    if (target.tagName == 'A') {
        const id = target.dataset.id;
        showDetails(id);
    }
});

section.remove();

// Display logic
export function showHome() {
    getMovies();
    showView(section);
}

async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading movies...'));

    const now = Date.now();

    if (moviesCache == null || (now - lastLoaded) > maxAge) {
        const res = await fetch("http://localhost:3030/data/movies");
        const data = await res.json();
        moviesCache = data;
        lastLoaded = now;
    }
    catalog.replaceChildren(...moviesCache.map(createMovieCard));
}

function createMovieCard(movieObj) {
    const element = e('div', { className: 'card mb-4' });
    element.innerHTML = `<img class="card-img-top" src="${movieObj.img}" alt="Card image cap" width="400">
                        <div class="card-body">
                            <h4 class="card-title">${movieObj.title}</h4>
                        </div>
                        <div class="card-footer">
                            <a data-id=${movieObj._id} href="#">
                                <button type="button" class="btn btn-info">Details</button>
                            </a>
                        </div>`;
    return element;
}

/*
<div class="card mb-4">
    <img class="card-img-top" src=""
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title"></h4>
    </div>
    <div class="card-footer">
        <a href="#">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>
</div>
*/