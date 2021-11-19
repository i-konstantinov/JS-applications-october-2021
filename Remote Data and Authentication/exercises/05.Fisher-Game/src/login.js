let userData = null;

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(localStorage.getItem('userData'));
    if (userData != null) {
        document.getElementById('guest').style.display = 'none';
        
    } else {
        document.getElementById('user').style.display = 'none';
    }
    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin);
});

async function onLogin(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type':'application-json'
            },
            body: JSON.stringify({email, password})
        });
        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        window.location = 'index.html';

    } catch (err) {
        alert(err.message);
    }
    
}