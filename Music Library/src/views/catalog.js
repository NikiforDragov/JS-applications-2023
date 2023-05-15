import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllAlbums } from '../data/services.js';
import { albumCard } from './common.js';

const catalogTemplate = (albums) => html`
<section id="dashboard">
    <h2>Albums</h2>
    ${albums.length > 0 ? html`
    <ul class="card-wrapper">
        ${albums.map(albumCard)}
    </ul>` : html`
    <h2>There are no albums added yet.</h2>`}
</section>`

export async function catalogPage(ctx) {
    const albums = await getAllAlbums();

    ctx.render(catalogTemplate(albums));
}