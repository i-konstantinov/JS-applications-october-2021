import { deleteMeme, getMemeById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            ${isOwner ? html`<a class="button warning" style="display: inline-block;" href=${"/edit/" + meme._id}>Edit</a>
            <button @click=${onDelete} class="button danger" style="display: inline-block;">Delete</button>` : null}

        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const meme = await loadById(ctx.params.id);
    
    const user = getUserData();
    const  isOwner = user && user.id == meme._ownerId;

    ctx.render(detailsTemplate(meme, isOwner, onDelete));
    
    async function onDelete(ev) {
        const choise = confirm("Are you suer you want to delete this meme?!");

        if (choise) {
            await deleteMeme(ctx.params.id);
            ctx.page.redirect('/memes');
        }   
    }
}

async function loadById(memeId) {
    const meme = await getMemeById(memeId);
    return meme;
}


/*_createdOn: 1616577827124
​
_id: "4"
​
_ownerId: "847ec027-f659-4086-8032-5173e2f9c93a"
​
description: "Being a programmer is a fun job. And many funny incidents occur throughout a programmer’s career. Here are a few jokes that can be relatable to you as a programmer."
​
imageUrl: "/images/3.png"
​
title: "Bad code can present some problems"*/