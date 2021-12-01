import { html, render } from "../node_modules/lit-html/lit-html.js";



// add event listeners
// get data and parse
// call update
const url = "http://localhost:3030/jsonstore/advanced/table";

const container = document.querySelector('tbody');

document.getElementById('searchBtn').addEventListener('click', onSearch);
let data = null;

getData()


async function getData() {
   const resp = await fetch(url);
   const rawData = await resp.json();
   data = Object.values(rawData);
   data.forEach(e => e.match = false);

   update(data);
}


// update:
// render template
function update(rows) {
   render(rowsTemplate(rows), container);
}


// on search
// read input
// compare input with all data fields
// mark matching items
// call update
function onSearch(ev) {
   data.forEach(e => e.match = false);
   const input = document.getElementById('searchField');
   
   if (input.value != '') {
      for (let person of data) {
         for (let attr in person) {
            if (attr != 'match' && person[attr].includes(input.value)) {
               person.match = true;
               break; 
            } 
         }
      }
   }

   input.value = '';
   update(data);
}


// template
// display student data
// highlight student based on match
const rowsTemplate = (students) => html`
${students.map(student => html`<tr class=${student.match ? "select" : ""}><td>${student.firstName} ${student.lastName}</td><td>${student.email}</td><td>${student.course}</td></tr>`)}
`;