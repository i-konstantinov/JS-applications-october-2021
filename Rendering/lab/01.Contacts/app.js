import { contacts } from "./contacts.js";
import { html, render } from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js';


const contactTemplate = (data, onDetails) => html`<div class="contact card">
     <div>
         <i class="far fa-user-circle gravatar"></i>
     </div>
     <div class="info">
         <h2>Name: ${data.name}</h2>
         <button class="detailsBtn" @click=${() => onDetails(data)}>${data.details ? "HIDE" : "DETAILS"}</button>
         <div class="details" id=${data.id} style=${styleMap({display: data.details?'block':'none'})}>
             <p>Phone number: ${data.phone}</p>
             <p>Email: ${data.email}</p>
         </div>
     </div>`;

function start() {
    const container = document.getElementById('contacts');

    onRender();

    // преди да е цъкнат DETAILS, contact няма св-во details, т.е. == false
    function onDetails(contact) {
        contact.details = !(contact.details); // буквално казваме това е равно на обратното, т.е. true = false / false = true;
        onRender();
    }

    function onRender() {
        render(contacts.map(c => contactTemplate(c, onDetails)), container);
    }
}

start();

// // моето решение преди горното, което е в клас
// function start() {
//     const container = document.getElementById('contacts');

//     container.addEventListener('click', showDetails);

//     const contactTemplate = (data) => html`<div class="contact card">
//     <div>
//         <i class="far fa-user-circle gravatar"></i>
//     </div>
//     <div class="info">
//         <h2>Name: ${data.name}</h2>
//         <button class="detailsBtn">Details</button>
//         <div class="details" id=${data.id}>
//             <p>Phone number: ${data.phone}</p>
//             <p>Email: ${data.email}</p>
//         </div>
//     </div>`;

//     function showDetails(ev) {
//         if (ev.target.tagName == "BUTTON") {
//             const details = ev.target.parentElement.children[2];
//             if (details.style.display == 'none') {
//                 details.style.display = 'block';
//                 ev.target.textContent = "HIDE"
//             } else {
//                 details.style.display = 'none';
//                 ev.target.textContent = "DETAILS"
//             }
//         }
//     }

//     render(contacts.map(contactTemplate), container);

// }

// start();