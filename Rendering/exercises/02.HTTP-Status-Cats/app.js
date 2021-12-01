import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';

const catData = cats;

const catCard = (cat) => html`
<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button @click=${() => onToggleInfo(cat)} class="showBtn">${cat.info ? "Hide status code" : "Show status code"}
    </button>
    ${cat.info ? html`
        <div class="status" id=${cat.id}>
            <h4>${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>` : null}
</div>
</li>`;

function onToggleInfo(obj) {
    // if (obj.info == true) {
    //     obj.info = null;
    // } else {
    //     obj.info = true;
    // }
    obj.info = !obj.info;
    update();
}

const root = document.getElementById('allCats');

catData.forEach(c => c.info = false);

update();

function update() {
    render(html`<ul>${catData.map(catCard)}</ul>`, root);
}




// // Моето решение с рекурсия /копирана логика от лаб/демо /
// const catsTemplate = (collection, onShow) => html`<ul>
//     ${collection.map(c => createCatCard(c, onShow))}
// </ul>`;

// const createCatCard = (cat, onShow) => html`<li>
// <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
// <div class="info">
//     <button class="showBtn" @click=${() => onShow(cat)}>${cat.details ? "Hide status code" : "Show status code"}</button>
//     <div class="status" style=${styleMap({display: cat.details ? "block" : "none"})} id=${cat.id}>
//         <h4>${cat.statusCode}</h4>
//         <p>${cat.statusMessage}</p>
//     </div>
// </div>
// </li>`;

// const container = document.getElementById('allCats');

// onRender();

// function onShowStatusCode(obj) {
//     obj.details = !(obj.details);
//     onRender();
// }

// function onRender() {
//     render(catsTemplate(cats, onShowStatusCode), container);

// }
