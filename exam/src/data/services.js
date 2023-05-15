import { get, post, put, del } from "./api.js";

export async function getAllFruits() {
    return get('/data/fruits?sortBy=_createdOn%20desc');
}

export async function createFruit(data) {
    return post('/data/fruits', data);
}

export async function updateFruit(id, data) {
    return put(`/data/fruits/${id}`, data)
}

export async function getById(id) {
    return get(`/data/fruits/${id}`);
}

export async function deleteFruit(id) {
    return del(`/data/fruits/${id}`);
}

export async function searchFruit(query) {
    return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`)
}