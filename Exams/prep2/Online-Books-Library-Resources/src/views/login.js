import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemplate = (onLogin) => html`
<section id="login-page" class="login">
    <form @submit = ${onLogin} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>`;


export function loginPage(ctx) {
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
            return alert('All fields required!');
        }
    }
}