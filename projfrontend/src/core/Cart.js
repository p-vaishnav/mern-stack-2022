import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Base from './Base';
import Card from './Card';

import {loadCartItems} from './helper/CartHelper';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(() => loadCartItems());
    }, []);

    useEffect(() => {
        setProducts(loadCartItems());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is used to laod all products</h2>
                {
                    products && products.map((product, index) => (
                        <Card key={index} product={product} addToCart={false} removeFromCart={true}  reload={reload} setReload={setReload}/>
                    ))
                }
            </div>
        )
    };

    const loadCart = () => {
        let sum = 0;
        products.map((product) => {
            sum = sum + product.price;
        })
        return (
            <div>
                <h2>This section is for checkout cart</h2>
                <div className="text-center"><button className="btn btn-success btn-lg">Total Product ${sum}</button></div>
            </div>
        );
    }
    return (
        <Base title='Cart Page' description='Checkout Component'>
            <h1 className='text-white'>Home component!</h1>
            <div className="row">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCart()}</div>
            </div>
        </Base>
    );
};

export default Cart;