import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteProduct, getProductById } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (product, isCreator, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${product.imageUrl} alt="example1" />
        <p id="details-title">${product.name}</p>
        <p id="details-category">
            Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${product.price}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">0</span> times.</h4>
                <span>${product.description}</span>
            </div>
        </div>
        ${isCreator ? html`
        <div id="action-buttons">
            <a href="/catalog/${product._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>

            <!--Bonus - Only for logged-in users ( not authors )-->
            <!-- <a href="" id="buy-btn">Buy</a> -->
        </div>` : null}
    </div>
</section>`;

export async function detailsPage(ctx) {
    const productId = ctx.params.id;
    const product = await getProductById(productId);
    const userId = getUserData() ? getUserData()._id : null
    const isCreator = userId === product._ownerId

    ctx.render(detailsTemplate(product, isCreator, onDelete))

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${product.name}`);
        if (confirmed) {
            await deleteProduct(productId);
            ctx.page.redirect('/catalog')
        }
    }
}