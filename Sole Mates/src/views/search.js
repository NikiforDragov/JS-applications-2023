import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchShoe } from '../data/services.js';
import { getUserData } from '../util.js';

const shoeTemplate = (shoe, userData) => html`
<li class="card">
    <img src=${shoe.imageUrl} alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${shoe.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    ${userData ? html`<a class="details-btn" href="">Details</a>` : null}
</li>`

const searchTemplate = (userData) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    <div id="search-container">
        <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->

        </ul>

        <!-- Display an h2 if there are no posts -->
        <!-- <h2>There are no results found.</h2> -->
    </div>
</section>`;

export function searchPage(ctx) {
    const userData = getUserData() ? getUserData() : null;
    console.log(ctx);
    ctx.render(searchTemplate());

    async function onSearch() {
        const query = ctx.querystring.trim();
        if(query === '') return alert('All fields are required!');
    }
}