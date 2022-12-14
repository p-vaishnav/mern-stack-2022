import { API } from "../../backend";

// category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => { 
        return response.json(); 
    })
    .catch(err => console.log(err));
};

// updation of category
export const updateCategory = (categoryId, userId, token, name) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(name)
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
};

// deletion of category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        console.log(err);
    });
}


// get all categories to show in dropdown while filling the form
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}

// product calls
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err));
};