function loadCommits() {
    const username = document.getElementById('username').value;
    const repoName =  document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${username}/${repoName}/commits`;
    const commitsUl = document.getElementById('commits')

    fetch(url)
    .then(response => {
        if (response.ok == false) {
            throw new Error(response.status, response.statusText);
        }
        return response.json();
    })
    .then(handleResponse)
    .catch(handleError);

    function handleResponse(data) {
        for (let obj of data) {
            
            commitsUl.innerHTML += `<li>${obj.commit.author.name}: ${obj.commit.message}</li>`;
        }
    }

    function handleError(error) {
        commitsUl.innerHTML = `<li>${error.status} (Not Found)</li>`;
    }
}
