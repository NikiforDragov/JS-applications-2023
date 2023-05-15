const url = 'http://localhost:3030/jsonstore/collections/students';

const table = document.querySelector('#results tbody')
const form = document.querySelector('form');

window.addEventListener('load', loadStudents);
form.addEventListener('submit', addStudent);

async function loadStudents() {
    try {
        const response = await fetch(url);

        if (response.status !== 200) {
            throw new Error('Error');
        }

        const data = await response.json();

        Object.values(data).forEach((record) => {
            const studentData = createElement('tr',
                createElement('td', record.firstName),
                createElement('td', record.lastName),
                createElement('td', record.facultyNumber),
                createElement('td', record.grade)
            )
            table.appendChild(studentData);
        });
    } catch (error) {
        alert(error.message);
    }

}

async function addStudent(e) {
    e.preventDefault();

    const dataForm = new FormData(form);
    const infoArray = [...dataForm.values()];

    const gradeNumber = infoArray[3].trim();

    table.replaceChildren();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                firstName: infoArray[0],
                lastName: infoArray[1],
                facultyNumber: infoArray[2],
                grade: gradeNumber,
            })
        })
        if (response.ok === false) {
            throw new Error('Cannot make new record');
        }
        loadStudents();
    } catch (error) {
        alert(error.message);
    }
}

function createElement(type, ...data) {
    const ele = document.createElement(type);

    data.forEach((data) => {
        if (typeof data === 'number' || typeof data === 'string') {
            data = document.createTextNode(data);
        }
        ele.appendChild(data);
    })

    return ele;
}