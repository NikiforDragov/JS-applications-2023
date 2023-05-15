const host = 'http://localhost:3030';

async function requester(method, url, data) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const options = {
        method,
        headers: {},
    };
    if (data) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    };
    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        const res = await fetch(`${host}${url}`, options);
        if (!res.ok) {
            if (res.status === 403) {
                sessionStorage.removeItem('user');
            }
            const err = await res.json();
            throw new Error(err.message)
        }
        return res.status === 204 ? res : res.json()
    } catch (error) {
        alert(error.message);
        throw error
    }
}

const get = requester.bind(null, 'get');
const post = requester.bind(null, 'post');
const put = requester.bind(null, 'put');
const del = requester.bind(null, 'delete');

export { get, post, put, del };