function attachEvents() {
    const nameInput = document.querySelector('input[name="author"]');
    const messageInput = document.querySelector('input[name="content"]');
    const textArea = document.getElementById('messages');


    const sendBtn = document.getElementById('submit');
    const resetBtn = document.getElementById('refresh');

    const url = 'http://localhost:3030/jsonstore/messenger';

    sendBtn.addEventListener('click', sendMsg);
    function sendMsg() {
        if (nameInput.value === '' || messageInput.value === '') {
            throw new Error();
        }

        const author = nameInput.value;
        const content = messageInput.value;

        const msgData = { author, content };

        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(msgData),
        })

        // resetMessages();
    }

    resetBtn.addEventListener('click', resetMessages);
    async function resetMessages() {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const error = new Error();
                error.status = response.status;
                error.statusText = response.statusText;
                throw error
            }

            const data = await response.json()

            const messages = [];

            Object.values(data).forEach(msg => {
                messages.push(`${msg.author}: ${msg.content}`);
            })

            textArea.textContent = messages.join('\n')
            textArea.disabled = false;

        } catch (error) {
            console.log(error);
        }
    }
}

attachEvents();