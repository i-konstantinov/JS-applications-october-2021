import { html } from "../lib.js";
import { register } from "../api/data.js";


const registerTemplate = (onSubmit, errorMsg) => html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
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
                <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class=${"form-control" + (errorMsg ? " is-invalid" : "") } id="rePass" type="password" name="rePass">
                    </div>

                <input type="submit" class="btn btn-primary" value="Register" />

            </div>
        </div>
    </form>
</div>`;



export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    // декларираме onSubmit вътре в registerPage
    // заради клоужъра, можем да използваме ctx;
    // register aвтоматично set-ва креденшълите;
    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('rePass').trim();

        try {
            if (password != repass) {
                throw new Error('Passwords don\'t match!')
            }
            
            await register(email, password);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (err) {
            ctx.render(registerTemplate(onSubmit, err.message));
        }

    }
}