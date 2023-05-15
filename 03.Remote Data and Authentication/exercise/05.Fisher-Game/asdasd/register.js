const registerForm = document.querySelector('form');
document.getElementById('user').style.display = 'none';

registerForm.addEventListener('submit', onUserRegister);

const url = 'http://localhost:3030/users/register';
async function onUserRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const {email,password,rePass} = Object.fromEntries(formData);

    try {
        if([...formData.values()].some(el => el === '')) {
            throw new Error('Input is not correct');
        } else if( password != rePass) {
            throw new Error('Password don\'t match');
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
                rePass,
            })
        })

        if(!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json()
        const user = {
            email: data.email,
            id: data._id,
            token:data.accessToken,
        };
        localStorage.setItem('userData', JSON.stringify(user));
        window.location = './index.html'
    } catch(error) {
        document.querySelector('form').reset();
        alert(error.message);
    }
}