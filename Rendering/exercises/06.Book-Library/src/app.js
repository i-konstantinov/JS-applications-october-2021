import { render } from "./api.js";
import { showCatalog } from "./catalog.js";
import { showCreate } from "./create.js";
import { showUpdate } from "./update.js";

// main module:
// init other modules with dependencies
// - rendering
// - communication b/n modules


const container = document.body;

const ctx = {
   update
}

update();

function update() {
    render([
        showCatalog(ctx),
        showCreate(ctx),
        showUpdate(ctx)
    ], container);
}

