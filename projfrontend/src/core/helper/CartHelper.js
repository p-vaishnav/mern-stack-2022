export const addItemToCart = (item, next) => {
    let cart = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.push({
            ...item
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

export const loadCartItems = () => {
    let cart = []
    if (typeof window !== 'undefined') {
        cart = JSON.parse(localStorage.getItem('cart'));
        return cart;
    }
    return cart;
};

export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window !== 'undefined') {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
        if (product._id === productId) {
            cart.splice(i, 1);
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
};

export const emptyCart = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
    }
}