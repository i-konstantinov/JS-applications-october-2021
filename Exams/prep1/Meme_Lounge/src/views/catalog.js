import { getAllMemes } from "../api/data.js";
import { html, until } from "../lib.js";


const catalogTemplate = (dataPromise) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
    ${until(dataPromise, html`<p class="no-memes">Loading memes...</p>`)}
    </div>
</section>`;

const memesSection = (memes) => html`
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
html`<p class="no-memes">No memes in database.</p>`}`;



export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadMemes()));
}

async function loadMemes() {
    const data = await getAllMemes();
    return memesSection(data);
}
