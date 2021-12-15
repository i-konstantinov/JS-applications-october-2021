import { html } from '../lib.js';
import { getById, deleteBook, getLikesByBookId, getMyLikeByBookId, addLike} from '../api/data.js';
import { getUserData } from '../util.js';


const detailsTemplate = (book, data, onDelete, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${data.creator ? html`
            <a class="button" href=${'/edit/' + book._id}>Edit</a>
            <a @click = ${onDelete} class="button" href="javascript:void(0)">Delete</a>` : null}

            ${data.loggedUser == true && data.creator == false && data.myLike == false ?
            html`<a 
            @click = ${() => onLike(book._id)}
            class="button" 
            href="javascript:void(0)"
            >Like</a>` 
            : null}
            
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${data.totalLikes}</span>
            </div>

        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const user = getUserData();

    const [book, totalLikes, myLike] = await Promise.all([
        loadBook(ctx.params.id),
        getLikesByBookId(ctx.params.id),
        user ? getMyLikeByBookId(ctx.params.id, user.id) : 0
    ])
    
    const data = {};
    if (user && user != null) {
        data.loggedUser = true;
        data.creator = user.id == book._ownerId;
    } else {
        data.loggedUser = false;
        data.creator = false;
    }

    data.myLike = myLike != 0;
    data.totalLikes = totalLikes;

    ctx.render(detailsTemplate(book, data, onDelete, onLike));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this book?');
        if (choise) {
            await deleteBook(book._id);
            ctx.page.redirect('/');
        }
    }

    async function onLike(bookId) {
        await addLike(bookId);
        ctx.page.redirect('/details/' + bookId);
    }
}

async function loadBook(id) {
    return await getById(id);
}