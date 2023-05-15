const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', userLogin);
document.getElementById('user').style.display = 'none';

async function userLogin(e) {
    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
            })
        });

        if(!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken,
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        window.location = ('./index.html');
    } catch (error) {
        document.querySelector('form').reset();
        alert(error.message);
    }
}