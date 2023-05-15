export function initializer(links) {
    const main = document.getElementById('mainView');
    const nav = document.querySelector('nav')
    nav.addEventListener('click', onNavigateClick);

    const context = {
        showSection,
        goTo,
        updateNav,
    }
    return context

    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigateClick(event) {
        
        let target = event.target;

        if (target.tagName === 'IMG') {
            target = target.parentElement;
        }
        if (target.tagName === 'A') {
            event.preventDefault();
            const url = new URL(target.href);
            goTo(url.pathname);
        }
    }

    function goTo(name, ...params) {
        const handler = links[name];
        if (typeof handler === 'function') {
            handler(context, ...params)
        }
    }

    function updateNav() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            nav.querySelectorAll('.user').forEach(el => el.style.display = 'block');
            nav.querySelectorAll('.guest').forEach(el => el.style.display = 'none');
        } else {
            nav.querySelectorAll('.user').forEach(el => el.style.display = 'none');
            nav.querySelectorAll('.guest').forEach(el => el.style.display = 'block');
        }
    }
}