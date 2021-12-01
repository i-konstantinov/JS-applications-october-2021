import { html, render } from "../node_modules/lit-html/lit-html.js";


const container = document.getElementById('root');

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

const listTemplate = (names) => html`<ul>
                                    ${names.map(
                                        n => html`<li>${n}</li>`
                                        )}
                                    </ul>`;

function onSubmit(ev) {
    ev.preventDefault();
    const cities = document.getElementById('towns').value.split(',').map(c => c.trim());
    
    render(listTemplate(cities), container);
}
