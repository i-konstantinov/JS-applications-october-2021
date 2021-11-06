function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const infoBox = document.querySelector('#info span');
    
    let stop = {
        next: 'depot',
        name: ''
    }
    
    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        
        try {
            departBtn.disabled = true;

            const response = await fetch(url);  
            if (response.status != 200 || response.ok == false) {
                throw new Error('Error');
            }
            stop = await response.json();

            infoBox.textContent = `Next stop ${stop.name}`;
            arriveBtn.disabled = false;

        } catch (error) {
            infoBox.textContent = error.message;
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        arriveBtn.disabled = true;
        infoBox.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();