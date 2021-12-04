import { html } from '../lib.js';
import { getById, editAlbum } from '../api/data.js';


const editTemplate = (album, onSubmit) => html`
<section class="editPage">
    <form @submit = ${onSubmit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" .value=${album.name}>

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${album.imgUrl}>

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" .value=${album.price}>

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${album.releaseDate}>

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" .value=${album.artist}>

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" .value=${album.genre}>

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10" .value=${album.description}></textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>`;


export async function editPage(ctx) {
    const albumId = ctx.params.id;
    const album = await loadAlbum(albumId);

    ctx.render(editTemplate(album, onSubmit));

    async function onSubmit(ev) {

        ev.preventDefault();

        const formData = new FormData(ev.target);
        const fields = {};
        [...formData.entries()].forEach(([k, v]) => fields[k] = v);

        try {
            for (let f in fields) {
                if (fields[f] == '') {
                    throw new Error('All fields required!')
                }
            }
            
           await editAlbum(album._id, fields);
        
            ctx.page.redirect('/details/' + album._id);

        } catch (err) {
            alert(err.message);
        }
    }
}

async function loadAlbum(id) {
    const album = await getById(id);
    return album;
}
