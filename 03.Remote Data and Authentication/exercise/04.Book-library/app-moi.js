    const loadBooksBtn = document.querySelector('#loadBooks');
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const tbodyElm = document.querySelector('tbody');
    const formElm = document.querySelector('form');

    loadBooksBtn.addEventListener('click', loadBooks);
    formElm.addEventListener('submit', buttonsDelegation)

    tbodyElm.innerHTML = '';

    async function loadBooks() {
        try {
            const response = await fetch(url);
            if (response.status !== 200) {
                throw new Error('Problem loading data');
            }

            const data = await response.json();

            const entries = Object.entries(data);

            tbodyElm.innerHTML = '';

            for (const [key, { author, title }] of entries) {
                const tr = document.createElement('tr');
                const titleTd = document.createElement('td');
                titleTd.textContent = title;
                const authorTd = document.createElement('td');
                authorTd.textContent = author;

                tr.appendChild(authorTd);
                tr.appendChild(titleTd);

                const newElm = document.createElement('td');

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.setAttribute('id', key)
                editBtn.addEventListener('click', editBook);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.setAttribute('id', key)
                deleteBtn.addEventListener('click', removeElm)

                newElm.appendChild(editBtn);
                newElm.appendChild(deleteBtn);

                tr.appendChild(newElm);
                tbodyElm.appendChild(tr);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async function createBook(e) {
        e.preventDefault();

        const dataForm = new FormData(formElm);
        const infoData = [...dataForm.values()];

        const author = infoData[0];
        const title = infoData[1];

        if (author === '' || title === '') {
            throw new Error('All fields must be fulfilled');
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ author, title }),
            })
            if (response.ok === false) {
                throw new Error('Cannot make new record');
            }

            loadBooks()
            formElm.reset()
        } catch (error) {
            alert(error.message);
        }

    }

    async function removeElm(e) {
        e.preventDefault()
        const bookId = e.target.id;
        const removeUrl = `${url}/${bookId}`;

        try {
            const response = await fetch(removeUrl, {
                method: 'delete',
            })
            if (!response.ok) throw new Error();

            e.target.parentNode.parentNode.remove();
        } catch (error) {
            console.log(error);
        }
    }

    function editBook(e) {
        e.preventDefault();
        const parentNode = e.currentTarget.parentNode.parentNode;
        const title = parentNode.getElementsByTagName('td')[0].textContent;
        const author = parentNode.getElementsByTagName('td')[1].textContent

        document.querySelector('input[name="author"]').value = author;
        document.querySelector('input[name="title"]').value = title;
        document.querySelector('h3').textContent = 'Edit FORM'


        const buttons = [...document.getElementsByTagName('button')];
        buttons.forEach(btn => {
            if (btn.textContent === 'Submit') {
                localStorage.setItem('bookData', e.currentTarget.id);
                btn.textContent = 'Save'
            }
        })
    }
        function buttonsDelegation(e) {
            e.preventDefault();
            const currentBtn = e.currentTarget.getElementsByTagName('button')[0];
            if (currentBtn.textContent === 'Submit') {
                createBook(e)
            } else if (currentBtn.textContent === 'Save') {
                updateElm(e)
            }
        }

        async function updateElm(e) {
            e.preventDefault();
            const id = localStorage.getItem('bookData');
            localStorage.removeItem('bookData');

            const formData = new FormData(e.target);
            const author = formData.get('author');
            const title = formData.get('title');

            e.target.getElementsByTagName('button')[0].textContent = 'Submit';
            e.target.getElementsByTagName('h3')[0].textContent = 'FORM';

            if (!author || !title) throw new Error();

            try {
                const response = await fetch(`${url}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ author, title }),
                })

                if (!response.ok) {
                    throw new Error()
                }

                loadBooks();
                e.target.reset()

            } catch (error) {
                console.log(error);
            }
        }
    