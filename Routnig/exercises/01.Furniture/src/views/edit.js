import { html, until } from "../lib.js";
import { getById, editItem } from "../api/data.js";


const editTemplate = (itemPromise) => html`
    
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        
        ${until(itemPromise, html`<h3>Loading data...</h3>`)}
    </div>`;


const formTemplate = (item, onSubmit, msg, missing) => html`
        ${msg ? html`<h2>${msg}</h2>` : null}

        <form @submit=${(event) => onSubmit(event, item._id)}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${"form-control" + (missing.make ? " is-invalid" : " is-valid")} id="new-make" type="text" name="make" .value=${item.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class=${"form-control" + (missing.model ? " is-invalid" : " is-valid")} id="new-model" type="text" name="model" .value=${item.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class=${"form-control" + (missing.year ? " is-invalid" : " is-valid")} id="new-year" type="number" name="year" .value=${item.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class=${"form-control" + (missing.description ? " is-invalid" : " is-valid")} id="new-description" type="text" name="description" .value=${item.description}>
                    </div>
                </div>


                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class=${"form-control" + (missing.price ? " is-invalid" : " is-valid")} id="new-price" type="number" name="price" .value=${item.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class=${"form-control" + (missing.image ? " is-invalid" : " is-valid")} id="new-image" type="text" name="img" .value=${item.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
                    </div>
                    

                    
                    <input type="submit" class="btn btn-info" value="Edit" />
                
                </div>
            </div>
        </form>`;


export function editPage(ctx) {
    const itemPromise = getById(ctx.params.id);
    
    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(editTemplate(loadItem(itemPromise, errorMsg, errors)));
    }

    async function loadItem(itemPromise, errorMsg, errors) {
        const result = await itemPromise;
        return formTemplate(result, onSubmit, errorMsg, errors);
    }
    
    async function onSubmit(ev, itemId) {
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

            if (data.make.length < 4 || data.model.length < 4) {
                throw {
                    error: new Error('Make and Model must be at least 4 symbols long'),
                    errors: {make: true, model: true}
                }
            } else if (Number(data.year) < 1950 || Number(data.year) > 2050) {
                throw {
                    error: new Error('Year must be between 1950 and 2050'),
                    errors: {year: true}
                }
            } else if (data.description.length < 11) {
                throw {
                    error: new Error('Description must be more than 10 symbols'),
                    errors: {description: true}
                }
            } else if (data.price < 0) {
                throw {
                    error: new Error('Price must be a positive number'),
                    errors: {price: true}
                }
            }
            
            data.year == Number(data.year);
            data.price == Number(data.price);
            
            await editItem(itemId, data);

            ctx.page.redirect('/details/' + itemId);

        } catch (err) {
            const message = err.message || err.error.message;
            update(message, err.errors || {});
        }
    }
}
