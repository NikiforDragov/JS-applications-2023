async function lockedProfile() {
    const mainElement = document.getElementById('main')

    try {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        if (!response.ok) throw new Error();
        const data = await response.json();
        mainElement.innerHTML = ''

        let i = 0;
        Object.values(data).forEach(el => {
            i++;
            const profileElement = document.createElement('div');
            profileElement.className = 'profile';
            mainElement.appendChild(profileElement);

            profileElement.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${i}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${i}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${i}Username" value="${el['username']}" disabled readonly />
            <div id="user${i}HiddenFields">
                <hr>
                <label>Email:</label>
                <input type="email" name="user${i}Email" value="${el['email']}" disabled readonly />
                <label>Age:</label>
                <input type="email" name="user${i}Age" value="${el['age']}" disabled readonly />
            </div>
    
            <button>Show more</button>`

            document.getElementById(`user${i}HiddenFields`).style.display = 'none';
        })

        const buttons = [...document.getElementsByTagName('button')];
        buttons.forEach(btn => btn.addEventListener('click', showHide));

        function showHide(event) {
            const button = event.target;
            const profile = button.parentNode;
            const moreInfo = profile.getElementsByTagName('div')[0];
            const lockStatus = profile.querySelector('input[type="radio"]:checked').value;

            if (lockStatus === 'unlock') {
                if (button.textContent === 'Show more') {
                    moreInfo.style.display = 'block';
                    button.textContent = 'Hide it';
                } else if (button.textContent === 'Hide it') {
                    moreInfo.style.display = 'none';
                    button.textContent = 'Show more';
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}