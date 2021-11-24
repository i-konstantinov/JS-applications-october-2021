// Initialization
// - find relevant section

import { showView, e } from "./dom.js";
import { showEdit } from "./edit.js";
import { showHome } from "./home.js";

// - find and detach section from DOM
const section = document.getElementById('movie-details');

section.remove();

const loggedUser = JSON.parse(localStorage.getItem('userData'));

// Display logic
export function showDetails(movieID) {
    getMovieDetails(movieID);
    showView(section);
}

async function getMovieDetails(movieId) {
    section.innerHTML = '<h2>Loading details...</h2>';

    const requests = [
        fetch('http://localhost:3030/data/movies/' + movieId),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`)
    ]

    if (loggedUser && loggedUser != null) {
        requests.push(fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${loggedUser.id}%22`))
    }

    const [movieRes, likesRes, hasLikedRes] = await Promise.all(requests);

    const [movie, likes, hasLiked] = await Promise.all([
        movieRes.json(),
        likesRes.json(),
        hasLikedRes && hasLikedRes.json()
    ]);
    // console.log(loggedUser.id, likes, hasLiked[0]._ownerId)
    section.replaceChildren(createDetailsView(movie, likes, hasLiked));
}



function createDetailsView(currentMovie, likesCount, likeArr) {
    const controls = e('div', { className: 'col-md-4 text-center' },
        e('h3', { className: 'my-3' }, "Movie Description"),
        e('p', {}, currentMovie.description)
    );

    if (loggedUser && loggedUser != null) {
        if (currentMovie._ownerId == loggedUser.id) {
            const editBtn = e('a', { className: "btn btn-danger", href: '#', onClick: () => showEdit(currentMovie._id) }, "Edit");
            const deleteBtn = e('a', { className: "btn btn-warning", href: '#', onClick: () => onDelete(currentMovie._id) }, "Delete");
            [editBtn, deleteBtn].forEach(e => controls.appendChild(e));

        } else {
            if (likeArr.length > 0 && likeArr[0]._ownerId == loggedUser.id) {
                controls.appendChild(e('a', { className: "btn btn-primary", href: '#', onClick: onUnlike }, 'Unlike'));
            } else {
                controls.appendChild(e('a', { className: "btn btn-primary", href: '#', onClick: onLike  }, 'Like'));
            }
        }
    }
    controls.appendChild(e('span', { className: 'enrolled-span', id: "likesCount" }, `Liked ${likesCount}`));
    

    async function onLike() {
        await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "X-Authorization": loggedUser.token
            },
            body: JSON.stringify({movieId: currentMovie._id})
        })
        showDetails(currentMovie._id);
    }


    async function onUnlike() {
        const likeId = likeArr[0]._id;
        await fetch('http://localhost:3030/data/likes/' + likeId, {
            method: 'delete',
            headers: {
                "X-Authorization": loggedUser.token
            }
        });
        showDetails(currentMovie._id);
    }


    const element = e('div', { className: "container" },
        e('div', { className: "row bg-light text-dark" },
            e('h1', {}, `Movie title: ${currentMovie.title}`),
            e('div', { className: "col-md-8" },
                e('img', { className: "img-thumbnail", src: currentMovie.img, alt: "Movie" })
            ),
            controls
        )
    );
    return element;
}


async function onDelete(id) {
    await fetch('http://localhost:3030/data/movies/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': loggedUser.token
        }
    })
    showHome();
}



/*
<h1>Movie title: Black Widow</h1>

<div class="col-md-8">
    <img class="img-thumbnail" src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"
        alt="Movie">
</div>
<div class="col-md-4 text-center">
    <h3 class="my-3 ">Movie Description</h3>
    <p>Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous
        conspiracy
        with ties to her past arises. Comes on the screens 2020.</p>
    <a class="btn btn-danger" href="#">Delete</a>
    <a class="btn btn-warning" href="#">Edit</a>
    <a class="btn btn-primary" href="#">Like</a>
    <span class="enrolled-span">Liked 1</span>
</div>
*/

/*
_createdOn: 1614935055353

_id: "1240549d-f0e0-497e-ab99-eb8f703713d7"

_ownerId: "847ec027-f659-4086-8032-5173e2f9c93a"

description: "Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Comes on the screens 2020."

img: "https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"

title: "Black Widow"
*/