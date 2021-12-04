import { login } from '../api/data.js';
import { html } from '../lib.js';


const loginTemplate = (onsubmit) => html`
<section id="loginPage">
            <form @submit=${onsubmit}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`;



export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const email = formData.get('email');
        const password = formData.get('password');

        try {
            await login(email, password);

            ctx.updateNav();
            ctx.page.redirect('/');

        } catch (err) {
            alert(err.message);
        }
    }
}