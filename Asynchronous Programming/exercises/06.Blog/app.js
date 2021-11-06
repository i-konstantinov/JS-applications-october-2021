function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function displayPost(ev) {
    let selectedPostId = document.getElementById('posts').value;

    const [post, comments] = await Promise.all([getPostById(selectedPostId), getCommentsByPostId(selectedPostId)]);
    
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-body').textContent = post.body;
    
    const commentsUl = document.getElementById('post-comments');
    commentsUl.innerHTML = '';

    for (let c of comments) {
        commentsUl.innerHTML += `<li>${c.text}</li>`;
    }
}

async function getAllPosts(ev) {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const response = await fetch(url);

    const data = await response.json();
    
    const posts = document.getElementById('posts');
    posts.innerHTML = '';
    
    for (let [id, obj] of Object.entries(data)) {
        posts.innerHTML += `<option value="${id}">${obj.title}</option>`;
    }
}

async function getPostById(postId) {
    const url = `http://localhost:3030/jsonstore/blog/posts/${postId}`;

    const response = await fetch(url);

    return await response.json();
}

async function getCommentsByPostId(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/comments';

    const response = await fetch(url);
    const data = await response.json();
    const commentsById = Object.values(data).filter(comment => comment.postId == postId);
    return commentsById;
}