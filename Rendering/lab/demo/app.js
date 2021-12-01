
import { html, render } from './node_modules/lit-html/lit-html.js';

const articleTemplate = (data) => html`<article>
            <h3>${data.title}</h3>
            <div class=${data.color}>
                <p>${data.content}</p>
            </div>
            <footer>Author: ${data.author}</footer>
            <div class="comments">
                
            </div>
        </article>`;


async function start() {
    const data = await (await fetch('./data.json')).json();

    const main = document.querySelector('main');

    const result = data.map(articleTemplate);

    render(result, main);
}

start();