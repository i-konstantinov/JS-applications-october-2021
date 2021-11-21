import { e, showSection } from "./dom.js";
import { updateUserNav } from './app.js'
import { showLoginPage } from "./login.js";

const catalogSection = document.getElementById('catalogSection');
const ul = catalogSection.querySelector('ul');
catalogSection.remove();


export function showCatalogPage() {
    showSection(catalogSection);
    
    loadMovies();
}

async function loadMovies() {
    ul.replaceChildren(e('p', {}, 'Loading...'));

    const options = {
        method: 'get',
        headers: {}
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData != undefined && userData != null) {
        options.headers['X-Authorization'] = userData.token;
    } else {
        updateUserNav();
        showLoginPage();
    }

    const response = await fetch('http://localhost:3030/data/movies', options);
    
    if (response.status == 403) {
        localStorage.removeItem('userData');
        updateUserNav();
        showLoginPage();
    }

    const movies = await response.json();

    ul.replaceChildren(...movies.map(createMovieCard));

}

function createMovieCard(movie) {
    return e('li', {}, movie.title);
}