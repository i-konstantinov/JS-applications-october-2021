let userData = null;

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(localStorage.getItem('userData'));

    if (userData != null) {
        document.querySelector('.email span').textContent = userData.email;
        
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
        
        document.getElementById('logout').addEventListener('click', onLogout);

        document.getElementById('catches').addEventListener('click', onTabClick);
    } else {
        document.getElementById('user').style.display = 'none';
    }

    document.querySelector('.load').addEventListener('click', loadData);

    document.getElementById('addForm').addEventListener('submit', onCreateSubmit);
});
// loadData();

async function loadData(ev) {
    const res = await fetch("http://localhost:3030/data/catches");
    const data = await res.json();

    document.getElementById('catches').replaceChildren(...data.map(createPreview));
}

function createPreview(item) {
    const isOwner = (userData && item._ownerId == userData.id);
    
    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML = `<label>Angler</label>
                        <input type="text" class="angler" value="${item.angler}" ${!isOwner ? "disabled" : ''}>
                        <label>Weight</label>
                        <input type="text" class="weight" value="${item.weight}" ${!isOwner ? "disabled" : ''}>
                        <label>Species</label>
                        <input type="text" class="species" value="${item.species}" ${!isOwner ? "disabled" : ''}>
                        <label>Location</label>
                        <input type="text" class="location" value="${item.location}" ${!isOwner ? "disabled" : ''}>
                        <label>Bait</label>
                        <input type="text" class="bait" value="${item.bait}" ${!isOwner ? "disabled" : ''}>
                        <label>Capture Time</label>
                        <input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? "disabled" : ''}>
                        <button class="update" data-id="${item._id}" ${!isOwner ? "disabled" : ''}>Update</button>
                        <button class="delete" data-id="${item._id}" ${!isOwner ? "disabled" : ''}>Delete</button>`;
    return element;
}

async function onCreateSubmit(event) {
    event.preventDefault();
    if (!userData) {
        window.location = 'login.html';
        return;
    }

    const formData = new FormData(event.target);

    const angler = formData.get('angler');
    const weight = formData.get('weight');
    const species = formData.get('species');
    const location = formData.get('location');
    const bait = formData.get('bait');
    const captureTime = formData.get('captureTime');

    const newCatch = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    };

    try {
        if (Object.values(newCatch).some(x => x == '')) {
            throw new Error('All fields are required!');
        }

        const response = await fetch("http://localhost:3030/data/catches", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization" : userData.token
            },
            body: JSON.stringify(newCatch)
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        event.target.reset();
        loadData();
        
    } catch (err) {
        alert(err.message);
    }
}

async function onTabClick(ev) {
    if (ev.target.className == 'update'){ 
        const itemId = ev.target.getAttribute('data-id');
        const catchDiv = ev.target.parentElement;
        
        const angler = catchDiv.querySelector('.angler').value;
        const weight = catchDiv.querySelector('.weight').value;
        const species = catchDiv.querySelector('.species').value;
        const location = catchDiv.querySelector('.location').value;
        const bait = catchDiv.querySelector('.bait').value;
        const captureTime = catchDiv.querySelector('.captureTime').value;

        const data = {
            angler, weight, species, location, bait, captureTime
        }
        await updateCatch(data, itemId);

    } else if (ev.target.className == 'delete') {
        const itemId = ev.target.getAttribute('data-id');
        await fetch("http://localhost:3030/data/catches/" + itemId, {
            method: 'delete',
            headers: {
                'X-Authorization': userData.token
            }
        });
        loadData();
    }
}

async function updateCatch(body, item_id) {
    try {
        const response = await fetch("http://localhost:3030/data/catches/" + item_id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(body)
    });
    if (response.ok == false) {
        const error = await response.json();
        throw new Error(error.message);
    }
    alert('Entry updated!')
    loadData();

    } catch (err) {
        alert(err.message);
    }
}

async function onLogout(ev) {
    try {
        const res = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': userData.token
        }
    });
    if (res.status != 204) {
        const error = await res.json();
        throw new Error(error.message);
    }
    localStorage.removeItem('userData');
    window.location.reload();

    } catch (err) {
        alert(err.message);
    }
}