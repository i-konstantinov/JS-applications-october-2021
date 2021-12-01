import { page, render } from "./lib.js";
import { catalogPage } from "./views/catalog.js";

page.start();

const root = document.querySelector('main');


page(decorateContext)
page('/home', catalogPage);


async function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    next();
} 