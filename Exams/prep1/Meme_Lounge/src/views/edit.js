import { getMemeById, editMeme } from "../api/data.js";
import { html, until } from "../lib.js";


const editTemplate = (dataPromise) => html`
<section id="edit-meme">
    ${until(dataPromise, html`<h1>Stand by...</h1>`)}
</section>`;


const formTemplate = (data, onSubmit) => html`
<form @submit=${onSubmit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">

        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${data.title}>

        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description" .value=${data.description}>
        </textarea>

        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${data.imageUrl}>

        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>`;


export function editPage(ctx) {
    const memeId = ctx.params.id;
    const dataPromise = getMemeById(memeId);
    
    ctx.render(editTemplate(loadData(dataPromise)));

    async function loadData(promise) {
        const result = await promise;
        return formTemplate(result, onSubmit);
    }

    async function onSubmit(ev) {
        ev.preventDefault();
    
        const formData = new FormData(ev.target);
        const fields = {};
        [...formData.entries()].forEach(([k, v]) => fields[k] = v);
    
        try {
            for (let f in fields) {
                if (fields[f] == '') {
                    throw new Error('All fields required');
                }
            }
            
            await editMeme(ctx.params.id, fields);
            ctx.page.redirect('/details/' + memeId);
            
        } catch (err) {
            alert(err.message);
        }
    }
}
