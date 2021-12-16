import * as api from './api.js'


export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export function getAll() {
    return api.get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export function getById(id) {
    return api.get('/data/theaters/' + id);
}

export function getMyTheaters(userId) {
    return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export function createTheater(data) {
    return api.post('/data/theaters', data);
}

export function editTheater(id, data) {
    return api.put(`/data/theaters/${id}`, data);
}

export function deleteTheater(id) {
    return api.del(`/data/theaters/${id}`);
}

export async function addLike(theaterId) {
    return api.post('/data/likes', {theaterId});
}

export async function getLikesByTheaterId(theaterId) {
    return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeByTheaterId(theaterId, userId) {
    return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}