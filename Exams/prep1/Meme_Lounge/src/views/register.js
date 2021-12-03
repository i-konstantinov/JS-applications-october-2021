import { register } from "../api/data.js";
import { html, until } from "../lib.js";


const registerTemplate = (onSubmit) => html`
<section id="register">
                <form @submit = ${onSubmit} id="register-form">
                    <div class="container">
                        <h1>Register</h1>

                        <label for="username">Username</label>
                        <input id="username" type="text" placeholder="Enter Username" name="username">
                        
                        <label for="email">Email</label>
                        <input id="email" type="text" placeholder="Enter Email" name="email">
                        
                        <label for="password">Password</label>
                        <input id="password" type="password" placeholder="Enter Password" name="password">
                        
                        <label for="repeatPass">Repeat Password</label>
                        <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                        
                        <div class="gender">
                            <input type="radio" name="gender" id="female" value="female">
                            <label for="female">Female</label>
                            
                            <input type="radio" name="gender" id="male" value="male" checked>
                            <label for="male">Male</label>
                        </div>
                        
                        <input type="submit" class="registerbtn button" value="Register">
                        
                        <div class="container signin">
                            <p>Already have an account? <a href="/login">Sign in</a>.</p>
                        </div>
                    </div>
                </form>
            </section>`;


export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const fields = {};
        [...formData.entries()].forEach(([k, v]) => fields[k] = v);
        
        try {
            for (let f in fields) {
                if (fields[f] == '') {
                    throw new Error('All fields required');
                }
            }
            if (fields.password != fields.repeatPass) {
                throw new Error('Passwords must match');
            }
            
            await register(fields.username, fields.email, fields.password, fields.gender);

            ctx.updateNav();
            ctx.page.redirect('/memes');

        } catch (err) {
            alert(err.message)
        }
    }
}
