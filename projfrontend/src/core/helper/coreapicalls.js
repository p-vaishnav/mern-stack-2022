import { API } from "../../backend";

export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err));
}