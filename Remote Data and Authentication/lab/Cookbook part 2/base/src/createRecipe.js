window.addEventListener('load', async () => {
    const token = localStorage.getItem('token');
    if (token == null) {
        window.location = '/login.html'
    }
    const form = document.querySelector('form');
    form.addEventListener('submit', onCreate);
});

async function onCreate(ev) {
    const url = 'http://localhost:3030/data/recipes';
    ev.preventDefault();
    
    const form = ev.target;
    const formData = new FormData(form);
    
    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');
    
    const recipe = {
        name, img, ingredients, steps
    };

    const token = localStorage.getItem('token');
    if (token == null) {
        window.location = '/login.html';
        return;
    };

    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(recipe)
        })
        console.log(res)
        if (res.ok == false) {
            console.log('v ifa na traq')
            const error = await res.json();
            throw new Error(`Error: ${error.message}`);
        }
        
        const data = await res.json();
        console.log(data)
        console.log('ima data')
        window.location = '/index.html'

    } catch (err) {
        alert(err.message);
    }
}