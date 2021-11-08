async function lockedProfile() {
    const main = document.getElementById('main');
    main.innerHTML = '';

    const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const users = await response.json();

    for (let profileObj of Object.values(users)) {
        const profileDiv = await makeProfileCard(profileObj);
        profileDiv.querySelector('button').addEventListener('click', onToggle);
        main.appendChild(profileDiv);
    }

    async function onToggle(ev) {
        const profile = ev.target.parentElement;
        const isUnlocked = profile.querySelector('input[type="radio"][value="unlock"]').checked;
        const labels = Array.from(profile.querySelector('div').querySelectorAll('label'));
        const inputs = Array.from(profile.querySelector('div').querySelectorAll('input'));

        if (isUnlocked) {
            if (ev.target.textContent == 'Show more') {
                labels.forEach(l => l.style.display = 'block');

                inputs.forEach(i => i.style.display = 'block');

                ev.target.textContent = "Hide it";
            } else {
                labels.forEach(l => l.style.display = 'none');

                inputs.forEach(i => i.style.display = 'none');

                ev.target.textContent = "Show more";
            }
        }
    }
    
    async function makeProfileCard(profile) {
        const p = document.createElement('div');
        p.className = "profile";
        p.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
                        <label>Lock</label>
                        <input type="radio" name="user ${profile._id} Locked" value="lock" checked>
                        <label>Unlock</label>
                        <input type="radio" name="user ${profile._id} Locked" value="unlock">
                        <br>
                        <hr>
                        <label>Username</label>
                        <input type="text" name="user ${profile._id} Username" value="${profile.username}" disabled readonly />
                        <div class="hiddenInfo">
                            <hr>
                            <label>Email:</label>
                            <input type="email" name="user ${profile._id} Email" value="${profile.email}" disabled readonly />
                            <label>Age:</label>
                            <input type="email" name="user ${profile._id} Age" value="${profile.age}" disabled readonly />
                        </div>
                        <button>Show more</button>`;
        return p;
    }
}