import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteShoe, getById } from '../data/services.js';
import { getUserData } from '../util.js';

const detailsTemplate = (shoe, isCreator, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src=${shoe.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
            <p>
                Model: <span id="details-model">${shoe.model}</span>
            </p>
            <p>Release date: <span id="details-release">${shoe.release}</span></p>
            <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
            <p>Value: <span id="details-value">${shoe.value}</span></p>
        </div>

        ${isCreator ? html`
        <div id="action-buttons">
            <a href="/catalog/${shoe._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>` : null}
    </div>
</section>`;

export async function detailsPage(ctx) {
    const shoeId = ctx.params.id;
    const shoe = await getById(shoeId);
    const userData = getUserData();
    let isCreator = false;
    if (userData) {
        if (userData._id === shoe._ownerId) {
            isCreator = true;
        }
    }

    ctx.render(detailsTemplate(shoe, isCreator, onDelete))

    async function onDelete() {
        await deleteShoe(shoeId);
        ctx.page.redirect('/catalog');
    }

}