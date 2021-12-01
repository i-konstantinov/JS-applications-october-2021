import { towns as townsList } from './towns.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const body = document.querySelector('body');
body.replaceChildren();

const listTemplate = (names, string) => html`
            <ul>
               ${names.map(name => html`
               <li class=${string && name.toLocaleLowerCase().includes(string.toLocaleLowerCase()) ? "active" : "" }>
                  ${name}</li>`)}
            </ul>`;

const articleTemplate = (namesList, searchField, matchesFound) => html`
<article>
   <div id="towns">
      ${listTemplate(namesList, searchField)}
   </div>
   <input type="text" id="searchText" />
   <button @click=${onSearch}>Search</button>
   <div id="result">
      ${matchesFound != null ? `${matchesFound} matches found` : null}
   </div>
</article>`;


let input = null;
let matches = null;

onRender();

function onSearch() {
   matches = 0;
   input = document.getElementById('searchText').value;
   townsList.forEach(townName => {
      if (townName.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
         matches += 1;
      }
   })
   onRender();
}

function onRender() {
   render(articleTemplate(townsList, input, matches), body);
}
