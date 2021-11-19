function attachEvents() {
    document.getElementById('refresh').addEventListener('click', displayMessages);
    document.getElementById('submit').addEventListener('click', postMessage);

    const url = "http://localhost:3030/jsonstore/messenger";

    async function displayMessages(ev) {
        const content = document.getElementById('messages');
        content.textContent = 'Loading...';
        content.textContent = await loadMessages(url);
    }

    async function loadMessages(link) {
        let result = '';
        try {
            const response = await fetch(link);
            if (response.status != 200 || response.ok == false) {
                const error = await response.json();
                throw new Error(error.message);
            }
            const messages = await response.json();
            Object.values(messages).forEach(m => result += `${m.author}: ${m.content}\n`);
            return result;

        } catch (err) {
            return err.message;
        }
    }

    async function postMessage(ev) {
        const author = document.querySelector('input[name="author"][type="text"]');
        const content = document.querySelector('input[name="content"][type="text"]');

        await addMessageToContent(url, author.value, content.value);
        author.value = '';
        content.value = '';
        alert('Message sent!')
    }

    async function addMessageToContent(link, name, text) {
        const options = {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ author: name, content: text })
        }
        try {
            const response = await fetch(link, options);
            if (response.status != 200) {
                const error = await response.json();
                throw new Error(error.message);
            }

        } catch (err) {
            alert(err.message);
        }
    }
}

attachEvents();