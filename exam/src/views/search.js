import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchFruit } from '../data/services.js';


const fruitTemplate = (fruit) => html`
<div class="fruit">
    <img src=${fruit.imageUrl} alt="example1" />
    <h3 class="title">${fruit.name}</h3>
    <p class="description">${fruit.description}</p>
    <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>`

const searchTemplate = (fruitList, userId, ctx) => html`
<section id="search">
    <div class="form">
        <h2>Search</h2>
        <form @submit=${e=> onSearch(e, ctx)} class="search-form">
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
        </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result">
        <!--If there are matches display a div with information about every fruit-->
        ${fruitList.length === 0 ? html`<p class="no-result">No result.</p>` : fruitList.map(fruit =>
        fruitTemplate(fruit, userId))}
    </div>
</section>`;

async function onSearch(event, ctx) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const query = formData.get('search').trim();
    if (query === '') {
        return alert(`All fields are required!`);
    }
    ctx.page.redirect(`/search?query=${query}`);
}

export async function searchPage(ctx) {
    const userId = localStorage.getItem('userId')

    const brand = ctx.querystring.split('=')[1];
    const fruitList = brand == undefined ? [] : await searchFruit(brand);

    ctx.render(searchTemplate(fruitList, userId, ctx), document.querySelector('main'));
}