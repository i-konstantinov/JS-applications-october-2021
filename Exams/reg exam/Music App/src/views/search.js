import { searchAlbums } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const searchTemplate = (data, onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    ${data.search ? html`
        <div class="search-result">
            ${data.results.length > 0 ? data.results.map(album => html`
                <div class="card-box">
                    <img src=${album.imgUrl}>
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${album.name}</p>
                            <p class="artist">Artist: ${album.artist}</p>
                            <p class="genre">Genre: ${album.genre}</p>
                            <p class="price">Price: ${album.price}</p>
                            <p class="date">Release Date: ${album.releaseDate}</p>
                        </div>
                        ${data.loggedUser ? html`<div class="btn-group">
                            <a href=${"/details/" + album._id} id="details">Details</a>
                        </div>` : null}
        
                    </div>
                </div>`)
                :
                html`<p class="no-result">No result.</p>`}
        </div>`
    : null}

</section>`;

export function searchPage(ctx) {
    const data = {};
    data.loggedUser = getUserData() ? true : false;
    data.search = false;
    data.results = [];
    ctx.render(searchTemplate(data, onSearch));

    async function onSearch(ev) {
        ev.preventDefault();
        const query = ev.target.parentElement.children[0].value;
        if (query == '' || query == null || query == undefined) {
            return alert('Search field is empty!');
        }
        data.search = true;
        data.results = await loadSearchData(query);
        ctx.render(searchTemplate(data, onSearch));
    }
}

async function loadSearchData(query) {
    const resultArr = await searchAlbums(query);

    return resultArr;
}