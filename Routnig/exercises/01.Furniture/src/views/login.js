import { html } from "../lib.js";
import { login } from "../api/data.js";


const loginTemplate = (onSubmit, errorMsg) => html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>

    <form @submit=${(ev)=> onSubmit(ev)}>
        <div class="row space-top">
            <div class="col-md-4">

                ${errorMsg ? html`<div class="form-group">${errorMsg}</div>` : null}

                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class=${"form-control" + (errorMsg ? " is-invalid" : "")} id="email" type="text"
                        name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class=${"form-control" + (errorMsg ? " is-invalid" : "") } id="password" type="password"
                        name="password">
                </div>

                <input type="submit" class="btn btn-primary" value="Login" />

            </div>
        </div>
    </form>
</div>`;



export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    // декларираме onSubmit вътре в loginPage
    // заради клоужъра, можем да използваме ctx;
    // login aвтоматично set-ва креденшълите;
    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (err) {
            ctx.render(loginTemplate(onSubmit, err.message));
        }

    }
}