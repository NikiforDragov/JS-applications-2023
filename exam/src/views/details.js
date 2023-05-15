import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteFruit, getById } from '../data/services.js';
import { getUserData } from '../util.js';


const detailsTemplate = (fruit, isCreator, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fruit.imageUrl} alt="example1" />
        <p id="details-title">${fruit.name}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p>${fruit.description}</p>
                <p id="nutrition">Nutrition</p>
                <p id="details-nutrition">${fruit.nutrition}</p>
            </div>
            ${isCreator ? html`
            <div id="action-buttons">
                <a href="/catalog/${fruit._id}/edit" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>` : null}
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const fruitId = ctx.params.id;
    const fruit = await getById(fruitId);
    const userData = getUserData();
    let isCreator = false;
    if (userData) {
        if (userData._id === fruit._ownerId) {
            isCreator = true;
        }
    }

    ctx.render(detailsTemplate(fruit, isCreator, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure!');
        if (choice) {
            await deleteFruit(fruitId)
            ctx.page.redirect('/catalog')
        }
    }
}