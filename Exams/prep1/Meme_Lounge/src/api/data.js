import * as api from './api.js'


export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const endpoints = {
   create: "/data/memes",
   all: "/data/memes?sortBy=_createdOn%20desc",
   byId: "/data/memes/",
   user: (id) => `/data/memes?where=_ownerId%3D%22${id}%22&amp;sortBy=_createdOn%20desc`,
   edit: "/data/memes/",
   delete: "/data/memes/"
}

export function createMeme(data) {
    return api.post(endpoints.create, data);
}

export function getAllMemes() {
    return api.get(endpoints.all)
}

export function getMemeById(id) {
    return api.get(endpoints.byId + id)
}

export function getUserMemes(id) {
    return api.get(endpoints.user(id))
}

export function editMeme(id, data) {
    return api.put(endpoints.edit + id, data)
}

export function deleteMeme(id) {
    return api.del(endpoints.delete + id)
}
