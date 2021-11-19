function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', displayContacts);
    document.getElementById('btnCreate').addEventListener('click', createContact);

    const phonebookUl = document.getElementById('phonebook');

    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    const url = "http://localhost:3030/jsonstore/phonebook";

    async function displayContacts(ev) {
        phonebookUl.innerHTML = '<li>Loading...</li>';

        const contacts = await getContacts(url);

        for (let c of contacts) {
            const liElement = document.createElement('li');
            liElement.textContent = `${c.person}: ${c.phone}`;
            liElement.key = c._id;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', deleteContact);

            liElement.appendChild(deleteBtn);

            phonebookUl.appendChild(liElement);
        }
        
        phonebookUl.children[0].remove();
    }

    async function getContacts(link) {
        const res = await fetch(link);
        const result = await res.json();
        return Object.values(result);
    }

    async function createContact(ev) {
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person: person.value,
                phone: phone.value
            })
        }
        try {
            const res = await fetch(url, options);
            if (res.status != 200 || res.ok == false) {
                const error = res.json();
                throw new Error(error.message);
            }
            person.value = '';
            phone.value = '';
            alert('Contant created');

        } catch (err) {
            alert(err.message);
        }
    }

    async function deleteContact(ev) {
        const deleteUrl = url + `/${ev.target.parentElement.key}`;

        try {
            const res = await fetch(deleteUrl, {
                method: 'delete'
            })
            if (res.status != 200) {
                const error = await res.json();
                throw new Error(error.message);
            }
            displayContacts();

        } catch (err) {
            alert(err.message);
        }
    }
}

attachEvents();
