import { login } from "../api/data.js";
import { html } from "../lib.js";


const loginTemplate = (onLogin) => html`
<section id="loginaPage">
    
    <form @submit = ${onLogin} class="loginForm">
        <h2>Login</h2>
        
        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>
        
        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>`;


export async function loginPage(ctx) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(ev) {
        ev.preventDefault();
        const form = ev.target;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        
        if (email != '' && password != '') {
            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/');

        } else {
            return alert('All fields are required!')
        }
    }
}