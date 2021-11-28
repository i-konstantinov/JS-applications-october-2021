import { getById, deleteById } from "../api/data.js";
import { e } from "../dom.js";

let ctx = null;

const section = document.getElementById('detailsPage');
section.remove();

section.addEventListener('click', onDelete);

export async function showDetailsPage(ctxTarget, id) {
    ctx = ctxTarget;
    ctx.showSection(section);
    loadIdea(id);
}

async function loadIdea(id) {
    section.replaceChildren(e('h2', {}, "Loading..."))

    const idea = await getById(id);

    const img = e('img', { className: "det-img", src: `${idea.img}` });
    const desc = e('div', { className: "desc" });
    desc.innerHTML = `<h2 class="display-5">${idea.title}</h2>
                        <p class="infoType">Description:</p>
                        <p class="idea-description">${idea.description}</p>
                        `;
    
    const fragment = document.createDocumentFragment();
    fragment.appendChild(img);
    fragment.appendChild(desc);

    const isLoggedUser = JSON.parse(sessionStorage.getItem('userData'));
    // console.log(`owner: ${idea._ownerId}\ncurrent: ${isLoggedUser.id}`)
    if (isLoggedUser != undefined && isLoggedUser.id == idea._ownerId) {
        const deleteBtn = e('div', { className: "text-center" });
        deleteBtn.innerHTML = `<a data-id="${idea._id}" class="btn detb" href="#">Delete</a>`;
        fragment.appendChild(deleteBtn);
    }

    section.replaceChildren(fragment);
}

async function onDelete(ev) {
    if (ev.target.tagName == 'A') {
        await deleteById(ev.target.dataset.id);
        ctx.goTo('catalog');
    }
}