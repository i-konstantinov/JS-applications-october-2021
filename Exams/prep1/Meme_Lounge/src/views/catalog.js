import { getAllMemes } from "../api/data.js";
import { html } from "../lib.js";


const catalogTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes.length > 0 ? memes.map(m => html`<div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${m.title}</p>
                    <img class="meme-image" alt="meme-img" src=${m.imageUrl}>
                </div>
                <div id="data-buttons">
                    <a class="button" href=${"/details/" + m._id}>Details</a>
                </div>
            </div>
        </div>`)
        :
        html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;


export async function catalogPage(ctx) {
    const data = await loadMemes();
    ctx.render(catalogTemplate(data));
}

async function loadMemes() {
    const data = await getAllMemes();
    return data;
}
