import { clearUserData, setUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        
        if (response.ok == false) {
            if (response.status == 403) {
                sessionStorage.removeItem('userData');
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        
        } 
        try {
            return await response.json();
        } catch (err) {
            return response;
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}



function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = JSON.parse(sessionStorage.getItem('userData'));
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

export async function put(url , data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}



export async function login(email, password) {
    const result = await post('/users/login', {email, password});

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken,
        username: result.username,
        gender: result.gender
    }

    setUserData(userData);

    return result;
}

export async function register(username, email, password, gender) {
    const result = await post('/users/register', {username, email, password, gender});

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken,
        username: result.username,
        gender: result.gender
    }

    setUserData(userData);
    return result;
}


export async function logout() {
     
    await get('/users/logout');
    
    clearUserData();
    
}
