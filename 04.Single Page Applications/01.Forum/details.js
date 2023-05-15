import { showHome } from "./home.js";
import { createElement as createElements } from "./utils.js";

const homeAnchorElement = document.querySelector("a");
homeAnchorElement.addEventListener("click", showHome);

function fetchPost() {
    const postId = localStorage.getItem("postId");
    loadPost(postId);
}

fetchPost();

async function loadPost(postId) {
    try {
        const response = await fetch(
            `http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`
        );
        if (!response.ok) {
            const error = response.json();
            throw new Error(error.message)
        };

        const post = await response.json();

        const themeContentDivElement = document.querySelector('.theme-content');
        themeContentDivElement.replaceChildren();

        const themeTitleDivElement = createElements(
            'div',
            '',
            themeContentDivElement,
            {
                class: 'theme-title',
            }
        );
        const themeNameWrapperDivElement = createElements(
            'div',
            '',
            themeTitleDivElement,
            {
                class: 'theme-name-wrapper',
            }
        );
        const themeNameDivElement = createElements(
            'div',
            '',
            themeNameWrapperDivElement,
            {
                class: 'theme-name',
            }
        );
        createElements('h2', post.title, themeNameDivElement, {})

        const commentDivElement = createElements(
            'div',
            '',
            themeContentDivElement,
            {
                class: 'comment'
            }
        );
        const headerDivElement = createElements(
            'div',
            '',
            commentDivElement,
            {
                class: 'header'
            }
        );
        createElements(
            'img',
            '',
            headerDivElement,
            {
                src: './static/profile.png',
                alt: 'avatar',
            }
        );
        const paragraphElement = createElements('p', '', headerDivElement, {});
        paragraphElement.innerHTML = `<span>${post.username}</span> posted on <time>${post.createdDate}</time>`
        createElements('p', post.content, headerDivElement, {
            class: 'post-content'
        });

        const comments = await loadComments(postId)

        for (const comment of Object.values(comments)) {
            const userCommentDivElement = createElements(
                'div',
                '',
                commentDivElement,
                { class: 'user-comment' }
            );
            const topicNameWrapper = createElements(
                'div',
                '',
                userCommentDivElement,
                { class: 'topic-name-wrapper' }
            );
            const topicNameDivElement = createElements('div', '', topicNameWrapper,
                { class: 'topic-name' });

            const paragraphElement = createElements('p', '', topicNameDivElement, {})
            paragraphElement.innerHTML = `<strong>${comment.username}</strong> commented on <time>${comment.createdDate}</time>`
            const postContentDivElement = createElements(
                'div',
                '',
                topicNameDivElement,
                { class: 'post-content' }
            );
            createElements('p', comment.content, postContentDivElement, {})

            const answerCommentDivElement = createElements(
                'div',
                '',
                themeContentDivElement,
                { class: 'answer-comment' }
            );
            const answerParagraphElement = createElements(
                'p',
                '',
                answerCommentDivElement,
                {}
            );
            answerParagraphElement.innerHTML = `<span>currentUser</span> comment:`;

            const divElementAnswer = createElements(
                'div',
                '',
                answerCommentDivElement,
                { class: 'answer' }
            );
            const formAnswerElement = createElements('form', '', divElementAnswer, {});
            formAnswerElement.innerHTML = `<textarea name="postText" id="comment" cols="30" rows="10"></textarea>`
            const formDivElement = createElements('div', '', formAnswerElement, {});
            const labelElement = createElements('div', '', formDivElement, {
                for: 'username',
            });
            labelElement.innerHTML = `Username <span class='red'>*</span>`;
            createElements('input', '', formDivElement, {
                type: 'text',
                name: 'username',
                id: 'username',
            });
            createElements('button', 'Post', formAnswerElement, {
                id: 'postButton',
            });
            const formElement = document.querySelector('form');
            formElement.setAttribute('dataset.id', postId);

            const postButtonElement = document.getElementById('postButton');

            postButtonElement.addEventListener('click', async (event,) => {
                event.preventDefault();
                const postId = formElement.getAttribute('dataset.id');

                const content = document.querySelector('textarea').value.trim();
                const username = document.querySelector('input').value.trim();

                const createDate = new Date();

                try {
                    if (!username) {
                        throw new Error('Username is required!');
                    } else if (!content) {
                        throw new Error('Content is required!');
                    }
                    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments',
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ username, content, createDate, postId })
                        });
                        if(!response.ok) {
                            throw new Error('Error');
                        };

                        fetchPost();
                        formElement.reset();
                } catch (error) {
                    alert(error.message);
                }
            })

        }
    } catch (error) {
        alert(error.message)
    }

    async function loadComments(postId) {
        try {
            const res = await fetch(
                "http://localhost:3030/jsonstore/collections/myboard/comments"
            );
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            const comments = await res.json();
            return Object.values(comments).filter(
                (comment) => comment.postId === postId
            );
        } catch (error) {
            alert(error.message);
        }
    }
}