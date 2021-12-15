import {html} from '../lib.js';
import { getAll } from '../api/data.js';


const dashboardTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${books.length > 0 ? 
        html`<ul class="other-books-list">
            ${books.map(book => html`<li class="otherBooks">
            <h3>${book.title}</h3>
            <p>Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <a class="button" href=${'/details/' + book._id}>Details</a>
        </li>`)}
        </ul>`
    : html`<p class="no-books">No books in database!</p>`}
</section>`;


export async function dashboardPage(ctx) {
    const books = await loadBooks();
    ctx.render(dashboardTemplate(books));
}

async function loadBooks() {
    return await getAll();
}