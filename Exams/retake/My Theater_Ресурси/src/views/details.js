import { deleteTheater, getById, getLikesByTheaterId, getMyLikeByTheaterId, addLike } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js"; 


const detailsTemplate = (theater, data, onDelete, onLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theater.title}</h1>
            <div>
                <img src=${theater.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theater.description}</p>
            <h4>Date: ${theater.date}</h4>
            <h4>Author: ${theater.author}</h4>
            
            ${data.loggedUser ? 
            html`
            <div class="buttons">
                
                ${data.creator ?
                html`
                <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href=${'/edit/' + theater._id} >Edit</a>`
                : null}
                
                ${data.loggedUser == true && data.creator == false && data.myLike == false ?
                html`<a @click=${() => onLike(theater._id)} class="btn-like" href="javascript:void(0)">Like</a>`
                : null}
                
            </div>`
            : null}

            <p class="likes">Likes: ${data.totalLikes}</p>
        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const user = getUserData();

    const [theater, totalLikes, myLike] = await Promise.all([
        loadTheater(ctx.params.id),
        getLikesByTheaterId(ctx.params.id),
        user ? getMyLikeByTheaterId(ctx.params.id, user.id) : 0
    ])

    const data = {};
    if (user && user != null) {
        data.loggedUser = true;
        data.creator = user.id == theater._ownerId;
    } else {
        data.loggedUser = false;
        data.creator = false;
    }

    data.myLike = myLike != 0;
    data.totalLikes = totalLikes;
    
    ctx.render(detailsTemplate(theater, data, onDelete, onLike));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this article?');
        if (choise) {
            await deleteTheater(ctx.params.id);
            ctx.page.redirect('/profile');
        }
    }

    async function onLike(theaterId) {
        await addLike(theaterId);
        ctx.page.redirect('/details/' + theaterId);
    }
}

async function loadTheater(id) {
    return await getById(id);
}