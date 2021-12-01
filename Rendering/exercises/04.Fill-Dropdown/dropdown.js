import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = "http://localhost:3030/jsonstore/advanced/dropdown";

const optionsTemplate = (data) => html`
<option value=${data._id}>${data.text}</option>`;

const container = document.getElementById('menu');


// start:
// add event listeners
// call getData
document.querySelector('form').addEventListener('submit', onSubmit);

getData();


// getData:
// fetch data and parse data
// call update
async function getData() {
    const res = await fetch(url);
    const data = Object.values(await res.json());
    
    update(data);
}


// update
// render template
function update(items) {
    render(items.map(optionsTemplate), container);
}


// on submit
// read input
// make POST request
// on success, call getData
async function onSubmit(ev) {
    ev.preventDefault();
    
    const input = document.getElementById('itemText');
    if (input.value == '') {
        return;
    }

    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text: input.value})
        })

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        input.value = null;
        getData();

    } catch (err) {
        alert(err.message);
    }
}