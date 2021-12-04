import { html } from '../lib.js';

import { deleteAlbum, getById } from '../api/data.js'

import { getUserData } from '../util.js';
 

const DetailsTemplate = (data, owner, onDelete) => html`
<section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src=${data.imgUrl}>
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${data.name}</h1>
                        <h3>Artist: ${data.artist}</h3>
                        <h4>Genre: ${data.genre}</h4>
                        <h4>Price: ${data.price}</h4>
                        <h4>Date: ${data.releaseDate}</h4>
                        <p>${data.description}</p>
                    </div>

                    ${owner ? html`<div class="actionBtn">
                        <a href=${"/edit/" + data._id} class="edit">Edit</a>
                        <a @click=${onDelete} href="" class="remove">Delete</a>
                    </div>` : null}
                </div>
            </div>
        </section>`;



export async function detailsPage(ctx) {
    const user = getUserData();
    const albumId = ctx.params.id;
    
    const album = await loadAlbum(albumId);
    
    const isOwner = user && user.id == album._ownerId;

    ctx.render(DetailsTemplate(album, isOwner, onDelete));

    async function onDelete(ev) {

        const choise = confirm("Are you sure you want to delete this album?");

        if (choise) {
            await deleteAlbum(albumId);
            ctx.page.redirect('/catalog');
        }
    }
}

async function loadAlbum(id) {
    const album = await getById(id);
    
    return album;
}

