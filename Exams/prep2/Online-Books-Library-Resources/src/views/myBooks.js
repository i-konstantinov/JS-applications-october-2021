import {html} from '../lib.js';
import { getMyBooks} from '../api/data.js';
import { getUserData } from '../util.js';


const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length > 0 ?
    html`<ul class="my-books-list">
        ${books.map(book => html`
        <li class="otherBooks">
            <h3>${book.title}</h3>
            <p>Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <a class="button" href=${'/details/' + book._id}>Details</a>
        </li>`)}
    </ul>` : 
    html`<p class="no-books">No books in database!</p>`}
    
</section>`;

export async function myBooksPage(ctx) {
    const userId = getUserData().id;

    const books = await loadMyBooks(userId);
    
    ctx.render(myBooksTemplate(books));
}

async function loadMyBooks(id) {
    return await getMyBooks(id);
}