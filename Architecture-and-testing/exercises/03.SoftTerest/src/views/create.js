import { createIdea } from "../api/data.js";

let ctx = null;

const section = document.getElementById('createPage');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onCreate);

export async function showCreatePage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onCreate(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageURL').trim();

    if (title.length < 6) {
        return alert('The title should be at least 6 characters long');
    } else if (description.length < 10) {
        return alert("The description should be at least 10 characters long");
    } else if(img.length < 5) {
        return alert("The image should be at least 5 characters long");
    }

    await createIdea({title, description, img});
    ctx.goTo('catalog');
    form.reset();
}