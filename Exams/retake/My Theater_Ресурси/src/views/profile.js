import { html } from "../lib.js";
import { getUserData } from "../util.js";
import { getMyTheaters } from "../api/data.js";


const profileTemplate = (data, user) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${data.length > 0 ?
        data.map(t => html`
        <div class="eventBoard">
            <div class="event-info">
                <img src=${t.imageUrl}>
                <h2>${t.title}</h2>
                <h6>${t.date}</h6>
                <a href=${'/details/' + t._id} class="details-button">Details</a>
            </div>
        </div>`)
        : html`
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`}
        
    </div>
</section>`;


export async function profilePage(ctx) {
    const user = getUserData();
    const theaters = await loadMyTheaters(user.id);
    ctx.render(profileTemplate(theaters, user));
}

async function loadMyTheaters(userId) {
    return await getMyTheaters(userId);
}