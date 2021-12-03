import { html } from "../lib.js";
import { createItem } from "../api/data.js";


const createTemplate = (onSubmit, msg, missing) => html`
<div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <!--form-->
        <form @submit = ${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    ${msg ? html`<div class="form-group">${msg}</div>` : null}
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${'form-control' + (missing.make ? ' is-invalid' : ' is-valid')} id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class=${"form-control" + (missing.model ? " is-invalid" : " is-valid")} id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class=${"form-control" + (missing.year ? " is-invalid" : " is-valid")} id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class=${"form-control" + (missing.description ? " is-invalid" : " is-valid")} id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class=${"form-control" + (missing.price ? " is-invalid" : " is-valid")} id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class=${"form-control" + (missing.img ? " is-invalid" : " is-valid")} id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control is-valid" id="new-material" type="text" name="material">
                    </div>
                    <!--btn-->
                    <input type="submit" class="btn btn-primary" value="Create" />
                
                </div>
            </div>
        </form>
    
    </div>`;



export function createPage(ctx) {
    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(createTemplate(onSubmit, errorMsg, errors));

    }

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = [...new FormData(ev.target).entries()];
        
        const data = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});
        
        const missing = formData.filter(([k, v]) => k != 'material' && v == '');
        try {
            if (missing.length > 0) {
                
                const errors = missing.reduce((a, [k]) => Object.assign(a, {[k]: true}), {});
                
                throw {
                    error: new Error('Please fill all mandatory fields'),
                    errors: errors
                }
            }
            
            data.year == Number(data.year);
            data.price == Number(data.price);
            
            await createItem(data);

            ctx.page.redirect('/my-furniture');

        } catch (err) {
            const message = err.message || err.error.message;
            update(message, err.errors || {});
        }        
    }
}

