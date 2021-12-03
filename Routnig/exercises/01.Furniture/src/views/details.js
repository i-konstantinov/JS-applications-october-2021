import { deleteItem, getById } from "../api/data.js";
import { html, until } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (promise) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            ${until(promise, html`<h2>Loading details &hellip;</h2>`)}
        </div>
    </div>`;


const itemTemplate = (item, isOwner, onDelete) => html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${item.img} />
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <p>Make: <span>${item.make}</span></p>
                <p>Model: <span>${item.model}</span></p>
                <p>Year: <span>${item.year}</span></p>
                <p>Description: <span>${item.description}</span></p>
                <p>Price: <span>${item.price}</span></p>
                <p>Material: <span>${item.material}</span></p>
                ${isOwner ? html`<div>
                    <a href=${"/edit/" + item._id} class="btn btn-info">Edit</a>
                    <a @click=${onDelete} href=”javascript:void(0)” class="btn btn-red">Delete</a>
                </div>` : null}
            </div>`;


export function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadItem(ctx.params.id, onDelete)));

    async function onDelete(ev) {
        const choise = confirm("Are you sure you want to delete this item?");
        if (choise) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/my-furniture');
        } else {
            ctx.page.redirect('/my-furniture');
        }
    }
}

async function loadItem(itemId, onDelete) {
    const item = await getById(itemId);

    const user = getUserData();

    let matchingOwner = user != null && user.id == item._ownerId;

    return itemTemplate(item, matchingOwner, onDelete);
}
