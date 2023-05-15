import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllProducts } from '../data/services.js';
import { productCard } from './common.js';
const catalogTemplate = (products) => html`
<h2>Products</h2>
<section id="dashboard">
    ${products.length > 0 ?  products.map(productCard)
     : html`<h2>No products yet.</h2>`}
</section>`

export async function catalogPage(ctx) {
    const products = await getAllProducts()
    ctx.render(catalogTemplate(products));
}