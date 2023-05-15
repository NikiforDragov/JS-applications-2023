import { get,post,put,del } from "./api.js";

export async function getAllProducts() {
    return get('/data/products?sortBy=_createdOn%20desc')
}

export async function createProduct(product) {
    return post('/data/products', product);
}

export async function getProductById(id) {
    return get(`/data/products/${id}`)
}

export async function deleteProduct(productId) {
    return del(`/data/products/${productId}`)
}

export async function editProduct(productId, data) {
    return put(`/data/products/${productId}`, data)
}