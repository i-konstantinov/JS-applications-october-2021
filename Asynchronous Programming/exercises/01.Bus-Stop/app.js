//МОЕТО РЕШЕНИЕ
function getInfo() {
    const stopId = document.getElementById('stopId');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`;
    const stopName = document.getElementById('stopName');
    const busesUl = document.getElementById('buses');

    fetch(url)
        .then(response => {
            if (response.ok == false) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(dataHandler)
        .catch(error => stopName.textContent = error.message);

    function dataHandler(data) {
        stopId.value = '';
        stopName.textContent = data.name;
        for (let bus in data.buses) {
            busesUl.innerHTML += `<li>Bus ${bus} arrives in ${data.buses[bus]} minutes</li>`;
        }
    }
}

// // РЕШЕНИЕ В КЛАС
// async function getInfo() {
//     const stopId = document.getElementById('stopId');
//     const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`;
//     const stopName = document.getElementById('stopName');
//     const busesUl = document.getElementById('buses');
//     busesUl.innerHTML = '';

//     try {
//         stopName.textContent = 'Loading...'

//         const response = await fetch(url);
//         if (response.status != 200) {
//             throw new Error('Error');
//         }
//         const data = await response.json();

//         stopId.value = '';
//         stopName.textContent = data.name;

//         for (let [number, time] of Object.entries(data.buses)) {
//             busesUl.innerHTML += `<li>Bus ${number} arrives in ${time} minutes</li>`;
//         }
//     } catch (error) {
//         stopName.textContent = error.message;
//     }
// }