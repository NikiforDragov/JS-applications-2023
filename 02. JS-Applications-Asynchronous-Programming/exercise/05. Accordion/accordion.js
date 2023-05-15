async function solution() {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list/');
        if (!response.ok) throw new Error();
        const data = await response.json();

       data.forEach(article => {
            const accordionDiv = document.createElement('div');
            accordionDiv.className = 'accordion'

            accordionDiv.innerHTML = `<div class="head">
            <span>${article.title}</span>
            <button class="button" id="${article._id}" onclick="moreOnClick(event)">More</button>
        </div>
        <div class="extra"></div>`
            const mainSection = document.getElementById('main');
            mainSection.appendChild(accordionDiv);
        })
    } catch (error) {
        console.log(error);
    }


}
async function moreOnClick(event) {
    try {
        const currentTarget = event.currentTarget;
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${currentTarget.id}`;
        const parent = currentTarget.parentNode.parentNode;
        const extraDiv = parent.querySelector('div.extra');

        const response = await fetch(url);

        if (!response.ok) throw new Error();

        const data = await response.json();

        extraDiv.innerHTML = `<p>${data.content}</p>`;

        if (currentTarget.textContent === 'More') {
            extraDiv.style.display = 'block';
            currentTarget.textContent = 'Less'
        } else if (currentTarget.textContent === 'Less') {
            extraDiv.style.display = 'none';
            currentTarget.textContent = 'More';
        }
    } catch (error) {
        console.log(error);
    }
}