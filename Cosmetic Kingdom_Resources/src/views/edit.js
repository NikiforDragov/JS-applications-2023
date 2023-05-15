import { html } from "../../node_modules/lit-html/lit-html.js";
import { editProduct, getProductById } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (product, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Product</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="name" .value=${product.name} id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" .value=${product.imageUrl} id="product-image"
                placeholder="Product Image" />
            <input type="text" name="category" .value=${product.category} id="product-category"
                placeholder="Category" />
            <textarea id="product-description" name="description" .value=${product.description}
                placeholder="Description" rows="5" cols="50"></textarea>

            <input type="text" name="price" .value=${product.price} id="product-price" placeholder="Price" />
            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const product = await getProductById(id);

    ctx.render(editTemplate(product, createSubmitHandler(onSubmit)));

    async function onSubmit({
        name,
        imageUrl,
        category,
        description,
        price,
    }) {
        if ([name,
            imageUrl,
            category,
            description,
            price].some(f => f === '')) {
            return alert('All fields are required!')
        }

        await editProduct(id, {
            name,
            imageUrl,
            category,
            description,
            price,
        })
        ctx.page.redirect(`/details/${id}`);
    }
}