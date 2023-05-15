function solve() {
    const infoElement = document.querySelector('div#info span.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let nextStopId = 'depot'
    let stopName;

    async function depart() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`);

            if (!response.ok) {
                const error = new Error();
                error.status = response.status;
                error.statusText = response.statusText;
                throw error
            }
            const data = await response.json();
            stopName = data.name;
            nextStopId = data.next;

            infoElement.textContent = `Next stop ${stopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (error) {
            infoElement.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();