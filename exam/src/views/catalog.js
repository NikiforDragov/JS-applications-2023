import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllFruits } from '../data/services.js';
import { fruitCard } from './common.js';

const catalogTemplate = (fruits) => html`
<h2>Fruits</h2>
<section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${fruits.length > 0 ? html`
    ${fruits.map(fruitCard)}
    ` : html`<h2>No fruit info yet.</h2>`}
</section>`


export async function catalogPage(ctx) {
    const fruits = await getAllFruits()

    ctx.render(catalogTemplate(fruits));
}