function attachEvents() {
    const personInput = document.getElementById('person')
    const phoneNumberInput = document.getElementById('phone')

    const phoneBookListElm = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const url = 'http://localhost:3030/jsonstore/phonebook';

    loadBtn.addEventListener('click', loadPhoneNumbers);
    async function loadPhoneNumbers() {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const error = new Error();
                error.status = response.status;
                error.statusText = response.statusText;
                throw error
            }

            const data = await response.json();

            phoneBookListElm.innerHTML = '';

            Object.values(data).forEach(msg => {
                const liElement = document.createElement('li');
                liElement.textContent = `${msg.person}: ${msg.phone}`;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.setAttribute('id', msg._id);
                deleteBtn.addEventListener('click', deleteMsg);
                liElement.appendChild(deleteBtn);
                phoneBookListElm.appendChild(liElement);
            })
        } catch (error) {
            console.log(error);
        }
    }

    createBtn.addEventListener('click', createContact)
    function createContact() {
        if (personInput.value === '' || phoneNumberInput.value === '') {
            throw new Error();
        }

        const data = {
            person: personInput.value,
            phone: phoneNumberInput.value
        }

        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data),
        })

        personInput.value = '';
        phoneNumberInput.value = '';

        loadPhoneNumbers()
    }

    async function deleteMsg(e) {
        const target = e.target;

        await fetch(url + `/${target.id}`, {
            method: 'DELETE',
        })

        const phoneElement = target.parentNode;
        phoneElement.remove()
    }
}

attachEvents();