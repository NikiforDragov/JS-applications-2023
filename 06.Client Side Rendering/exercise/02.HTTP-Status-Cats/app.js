import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js'

const cardTemplate = (data) => html`
            <li>
                <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${onClick}>Show status code</button>
                    <div class="status" style="display: none" id="${data.id}">
                        <h4>Status Code: ${data.statusCode}</h4>
                        <p>${data.statusMessage}</p>
                    </div>
                </div>
            </li>
`

const ulTemplate = (data) => html`
<ul>
    ${data.map((cat) => cardTemplate(cat))}
</ul>
`

const renderComponentCats = (data) => {
    render(ulTemplate(data), document.getElementById('allCats'))
}

renderComponentCats(cats);

function onClick(e) {
    e.preventDefault()
    const target = e.target.parentNode;
   const status = target.querySelector('.status').style.display;
    
    if(status === 'none') {
        target.querySelector('.status').style.display = 'block';
        target.querySelector('button').textContent = 'Hide status code'
    } else {
        target.querySelector('.status').style.display = 'none';
        target.querySelector('button').textContent = 'Show status code'
    }

}