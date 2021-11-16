window.addEventListener('load', async () => {
    const form = document.querySelector('form');
    form = document.addEventListener('submit', onRegister);
});

async function onRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const url = 'http://localhost:3030/users/register';

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('rePass').trim();

    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application.json'
            }, 
            body: JSON.stringify( { email, password, rePass } )
        });
        if (res.status != 200) {
            const error = await res.json();
            throw new Error(`Error: ${error.message}`);
        }

        const data = await res.json();
        const token = data.accessToken;

        localStorage.setItem('token', token);

        window.location = '/index.html';

    } catch (err) {
        alert(err.message);
    }
}