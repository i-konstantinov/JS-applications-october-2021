import { getUserMemes } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const userProfileTemplate = (memes, user) => html`<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : memes.map(e => memeCard(e))}
    </div>
</section>`;


const memeCard = (meme) => html`<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href=${"/details/" + meme._id}>Details</a>
</div>`;


export async function userPage(ctx) {
    const userInfo = getUserData();

    const memes = await getUserMemes(userInfo.id);

    ctx.render(userProfileTemplate(memes, userInfo));

}
