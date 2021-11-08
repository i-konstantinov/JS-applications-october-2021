async function solution() {
    const resp = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const articles = await resp.json();

    const main = document.getElementById('main');

    const loading = document.createElement('h3');
    loading.textContent = 'Loading...';
    main.appendChild(loading);
    
    for (let article of Object.values(articles)) {
        const articleContent = await getContent(article._id);
        const accordion = document.createElement('div');
        accordion.className = 'accordion';
        accordion.innerHTML = `<div class="head">
                                    <span>${article.title}</span>
                                    <button class="button" id=${article._id}>More</button>
                                </div>
                                <div class="extra">
                                    <p>${articleContent}</p>
                                </div>`;
        accordion.querySelector('div [class="extra"]').style.display = 'none';
        accordion.querySelector('button').addEventListener('click', onToggle);
        main.appendChild(accordion);
    }
    loading.remove();
}
solution();

async function getContent(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
    const data = await response.json();
    return data.content;
}

async function onToggle(ev) {
    const content = ev.target.parentElement.parentElement.querySelector('div [class="extra"]');
    if (content.style.display == 'none') {
        content.style.display = 'block';
        ev.target.textContent = 'LESS';
    } else {
        content.style.display = 'none';
        ev.target.textContent = 'MORE';
    }
}