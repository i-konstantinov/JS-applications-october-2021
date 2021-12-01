import { createBook, html } from "./api.js";

// create module:
// handle form

const createTemplate = (onSuccess) => html`
<form @submit=${ev => onSubmit(ev, onSuccess)} id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>`;

export function showCreate(ctx) {
    if (ctx.book == undefined) {
        return createTemplate(ctx.update);
    } else {
        return null;
    }
    
}

async function onSubmit(ev, onSuccess) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const author = formData.get('author')
    const title = formData.get('title')

    if (author == '' || title == '') {
        alert('All fields required!');
        return;
    }

    await createBook({author, title});

    ev.target.reset();
    onSuccess();
}