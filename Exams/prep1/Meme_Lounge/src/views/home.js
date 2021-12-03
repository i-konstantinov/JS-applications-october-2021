import { html, until } from "../lib.js";
import { getUserData } from "../util.js";


const indexTemplate = () => html`
<section id="welcome">
    <div id="welcome-container">
        <h1>Welcome To Meme Lounge</h1>
        <img src="/images/welcome-meme.jpg" alt="meme">
        <h2>Login to see our memes right away!</h2>
        <div id="button-div">
            <a href="/login" class="button">Login</a>
            <a href="/register" class="button">Register</a>
        </div>
    </div>
</section>`;


export function indexPage(ctx) {
    const loggedUser = getUserData() ? true : false;
    if (loggedUser) {
        // ctx.updateNav();
        ctx.page.redirect("/memes");
    } else {
        ctx.render(indexTemplate());
    }
}
