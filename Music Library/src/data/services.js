import { get, post, put, del } from "./api.js";

export async function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function createAlbum(data) {
    return post('/data/albums', data);
}

export async function albumById(id) {
    return get(`/data/albums/${id}`)
}

export async function updateAlbum(id, data) {
    return put(`/data/albums/${id}`, data);
}

export async function deleteAlbum(id) {
    return del(`/data/albums/${id}`)
}
