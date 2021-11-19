//  initialization
const tbody = document.querySelector('tbody');

document.getElementById('loadBooks').addEventListener('click', loadBooks);

const createForm = document.getElementById('createForm');
createForm.addEventListener('submit', onCreate);

const editForm = document.getElementById('editForm');
editForm.addEventListener('submit', onSave);

tbody.addEventListener('click', onTableClick);

loadBooks();


//  load all books
async function loadBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td data-id=${id}>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </td>`;
    return row;
}

//  handle create form
//  create book
async function onCreate(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const author = formData.get('author').trim();
    const title = formData.get('title').trim();
    const result = await createBook({author, title});
    // tbody.appendChild(createRow(result._id, result));
    ev.target.reset();
    loadBooks();
}

async function createBook(book) {
    const result = await request("http://localhost:3030/jsonstore/collections/books", {
        method: 'post',
        body: JSON.stringify(book)
    });

    return result;
}


//  handle the edit/delete event
function onTableClick(ev) {
    if (ev.target.className == 'delete') {
        onDelete(ev.target);
    } else if (ev.target.className == 'edit') {
        onEdit(ev.target);
    }
}


//  load book for editting
async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;
    editForm.querySelector('[name="id"]').value = id;
}

async function loadBookById(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    return book;
}

//  handle edit form
//  update book
async function onSave(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const author = formData.get('author').trim();
    const title = formData.get('title').trim();
    const bookId = formData.get('id');
    
    await updateBook(bookId, {author, title});
    ev.target.reset(); 

    createForm.style.display = 'block';
    editForm.style.display = 'none';

    loadBooks();
}

async function updateBook(id, book) {
    const result = await request("http://localhost:3030/jsonstore/collections/books/" + id, {
        method: 'put',
        body: JSON.stringify(book)
    });

    return result;
}

//  handle delete button
//  delete book
async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}

async function deleteBook(id) {
    const result = await request("http://localhost:3030/jsonstore/collections/books/" + id, {
        method: 'delete'
    });

    return result;
}


//  abstract func used for each request
async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const response = await fetch(url, options);
    if (response.ok == false) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();

    return data;
}