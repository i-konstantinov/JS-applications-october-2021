import * as api from './api.js'


export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export function getAll() {
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export function getById(id) {
    return api.get('/data/albums/' + id);
}

export function createAlbum(data) {
    return api.post('/data/albums', data);
}

export function editAlbum(id, data) {
    return api.put('/data/albums/' + id, data);
}

export function searchAlbums(query) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}

export function deleteAlbum(id) {
    return api.del("/data/albums/" + id);
}