
window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister);
});

async function onRegister(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    try {
        if (password != rePass) {
            throw new Error('Passwords not matching!');
        }
        const res = await fetch("http://localhost:3030/users/register", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { email, password } )
        });
        
        if (res.status != 200) {
            const error = await res.json();
            throw new Error(`Error: ${error.message}`);
        }
        const result = await res.json();

        const userData = {
            email: result.email,
            id: result._id,
            token: result.accessToken
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        window.location = 'index.html';

    } catch (err) {
        alert(err.message);
    }
    
}