import { html } from '../lib.js';
import { getById, editBook } from '../api/data.js';


const editTemplate = (book, onSave) => html`
<section id="edit-page" class="edit">
    
    <form @submit = ${onSave} id="edit-form" action="#" method="">
        
        <fieldset>
            <legend>Edit my Book</legend>
            
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value=${book.title}>
                </span>
            </p>
            
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description" .value=${book.description}></textarea>
                </span>
            </p>
            
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                </span>
            </p>
            
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" value="Fiction">
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`;

export async function editPage(ctx) {
    const currentId = ctx.params.id;
    const currentBook = await loadBook(currentId);
    
    ctx.render(editTemplate(currentBook, onSave));

    async function onSave(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const fields = {};
        [...formData.entries()].forEach(([k, v]) => fields[k] = v);

        for (let f in fields) {
            if (fields[f] == '') {
                return alert('All fields are required!');
            }
        }

        await editBook(currentId, fields);
        ctx.page.redirect('/details/' + currentId);
    }
}

async function loadBook(id) {
    return await getById(id);
}