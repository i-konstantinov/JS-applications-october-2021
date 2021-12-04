import { getAll } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const catalogTemplate = (data) => html`
<section id="catalogPage">
            <h1>All Albums</h1>
            ${data.albums.length == 0 ? html`<p>No Albums in Catalog!</p>`
            :
            data.albums.map(album => html`<div class="card-box">
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
            </div>`)}
            

        </section>`;


export async function catalogPage(ctx) {
    
    const data = await loadAlbums();
    ctx.render(catalogTemplate(data));
}

async function loadAlbums() {
    const loggedUser = getUserData() ? true : false;
    const data = {};
    const albums = await getAll();
    data.albums = albums;
    data.loggedUser = loggedUser;
    // console.log(data);
    return data;
}
