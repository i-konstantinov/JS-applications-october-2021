import { getAllIdeas } from '../api/data.js';
import { e } from '../dom.js'

let ctx = null;

const section = document.getElementById('dashboard-holder');
section.remove();

section.addEventListener('click', onDetails);

export async function showCatalogPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
    loadIdeas();
}

async function loadIdeas() {
    section.replaceChildren(e('h1', {}, "Loading..."));
    const ideas = await getAllIdeas();
    if (ideas.length == 0) {
        section.replaceChildren(e('h1', {}, "No ideas yet! Be the first one :)"));
    } else {
        const fragment = document.createDocumentFragment();
        ideas.map(idea => createIdeaCard(idea)).forEach(card => fragment.appendChild(card));
        section.replaceChildren(fragment);
    }
}

function createIdeaCard(idea) {
    const card = e('div', { className: 'card overflow-hidden current-card details' });
    card.style.width = '20rem';
    card.style.height = '18rem';
    card.innerHTML = `<div class="card-body">
                            <p class="card-text">${idea.title}</p>
                        </div>
                        <img class="card-image" src="${idea.img}" alt="Card image cap">
                        <a data-id="${idea._id}" class="btn" href="">Details</a>`;
    return card;
}

function onDetails(ev) {
    if (ev.target.tagName == "A") {
        ev.preventDefault();
        ctx.goTo('details', ev.target.dataset.id);
    }
}
