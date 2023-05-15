async function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const busesListElement = document.getElementById('buses')
    busesListElement.innerHTML = ''

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`);

        if (!response.ok) {
            let error = new Error();
            error.status = response.status;
            error.statusText = response.statusText;
            throw error
        }

        const data = await response.json();
        document.getElementById('stopName').textContent = data.name
        Object.entries(data.buses).forEach(([busId, time]) => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesListElement.appendChild(liElement);
        })
    } catch (error) {
        document.getElementById('stopName').textContent = 'Error'
    }
}