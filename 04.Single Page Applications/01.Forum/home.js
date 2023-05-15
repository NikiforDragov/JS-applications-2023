import { createElement } from "./utils.js";

const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

export async function showHome(e) {
    e.preventDefault();
    localStorage.clear()
    window.location = './index.html'
}

if (!window.location.href.includes("theme-content.html")) {
    loadPost();
  }
function loadComment(e) {
    e.preventDefault()
    const target = e.target.parentNode
    const postId = target.getAttribute('dataset_id');

    localStorage.setItem('postId', postId);
    window.location = './theme-content.html'
}

async function loadPost() {
    const topicDivElm = document.querySelector('.topic-title');
    topicDivElm.replaceChildren();


    try {
        const response = await fetch(url);
        if (!response.ok) {
            const error = response.json();
            throw new Error(error.message);
        }

        const posts = await response.json();

        for (const [postId, post] of Object.entries(posts)) {
            const topicContainerDivElement = createElement('div', '', topicDivElm, {
                class: 'topic-container',
            });

            const topicNameWrapperDivElement = createElement('div', '', topicContainerDivElement, {
                class: 'topic-name-wrapper',
            });

            const topicNameDivElement = createElement('div', '', topicNameWrapperDivElement, {
                class: 'topic-name',
            });

            const anchorElement = createElement('a', '', topicNameDivElement, {
                'href': '#',
                'dataset_id': postId,
                class: 'normal',
            });
            anchorElement.addEventListener('click', loadComment)

            createElement('h2', post.title , anchorElement, {});

            const columnsDivElement = createElement('div', '', topicNameDivElement, {
                class: 'columns',
            });

            const divElement = createElement('div', '', columnsDivElement, {});
            const dateParaElement = createElement('p', 'Date:', divElement, {});
            createElement('time', post.createdDate, dateParaElement, {});
            const nickNameDivElement = createElement('div', '', divElement, {
                class: 'nick-name',
            });

            const usernameParaElement = createElement('p', 'Username: ', nickNameDivElement, {});
            createElement('span', post.username, usernameParaElement, {});
        }

    } catch (error) {
        alert(error)
    }
}

export async function createPost(e) {
    e.preventDefault();

    const formElement = document.querySelector('form');

    const formData = new FormData(formElement);

    const title = formData.get('topicName').trim();
    const username = formData.get('username').trim();
    const content = formData.get('postText').trim();
    const createdDate = new Date();

    try {
        if (!title) {
            throw new Error('Title is required!');
        } else if (!username) {
            throw new Error('Username is required!');
        } else if (!content) {
            throw new Error('Content is required!');
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ title, username, content, createdDate }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }

        formElement.reset();
        await loadPost()
    } catch (error) {
        alert(error.message)
    }
}

export function cancelPost(e) {
    e.preventDefault();

    const formElement = document.querySelector('form');

    formElement.reset();
}