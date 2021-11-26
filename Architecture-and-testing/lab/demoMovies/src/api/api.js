const host = "http://localhost:3030";

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok == false) {
            if (response.status == 403) {
                localStorage.removeItem('userData');
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (err) {
        alert(err.message);
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    }
    if (data != undefined) {
        options.headers["Content-Type"] = 'applicaition/json'
        options.body = JSON.stringify(data)
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}


export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(data) {
    return request(url, createOptions('delete', data));
}

export async function login(email, password) {
    const response = await request('/users/login', createOptions('post', {email, password}));
    const userData = {
        email: response.email,
        id: response._id,
        token: response.accessToken
    };

    localStorage.setItem('userData', JSON.stringify(userData));
}   

export async function register(email, password) {
    const response = await request('/users/register', createOptions('post', {email, password}));
    const userData = {
        email: response.email,
        id: response._id,
        token: response.accessToken
    };

    localStorage.setItem('userData', JSON.stringify(userData));
}

export async function logout() {
    await request('/users/logout', createOptions());
    localStorage.removeItem('userData');
}
