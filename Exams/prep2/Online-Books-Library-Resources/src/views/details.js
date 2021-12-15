import { html } from '../lib.js';
import { getById, deleteBook} from '../api/data.js';
import { getUserData } from '../util.js';


const detailsTemplate = (book, data, onDelete) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${data.creator ? html`
            <a class="button" href=${'/edit/' + book._id}>Edit</a>
            <a @click = ${onDelete} class="button" href="javascript:void(0)">Delete</a>` : null}
        
            <a 
            class="button" 
            href="javascript:void(0)"
            style=${data.loggedUser == true && data.creator == false ? 'display: block' : 'display: none'}
            >Like</a>
            
            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const book = await loadBook(ctx.params.id);
    const data = {};
    const user = getUserData();
    if (user && user != null) {
        data.creator = user.id == book._ownerId;
        data.loggedUser = true;
    } else {
        data.creator = false;
        data.loggedUser = false;
    }

    ctx.render(detailsTemplate(book, data, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this book?');
        if (choise) {
            await deleteBook(book._id);
            ctx.page.redirect('/');
        }
    }
}

async function loadBook(id) {
    return await getById(id);
}