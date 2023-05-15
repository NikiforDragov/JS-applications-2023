import { html } from '../../node_modules/lit-html/lit-html.js';
import { albumById, deleteAlbum } from '../data/services.js';
import { getUserData } from '../util.js';

const detailsTemplate = (album,isCreator,onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">0</span></div>

        ${isCreator ? html`
        <div id="action-buttons">
            <!-- <a href="" id="like-btn">Like</a> -->
            <a href="/details/${album._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>` : null}
    </div>
</section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const album = await albumById(id);
    const userData = getUserData();
    const userId = userData ? userData._id : null;
    let isCreator = false;

    if(userId === album._ownerId) {
        isCreator = true;
    } else {
        isCreator = false;
    }

    ctx.render(detailsTemplate(album,isCreator,onDelete));

    async function onDelete() {
        await deleteAlbum(id)
        ctx.page.redirect('/catalog');
    }
}