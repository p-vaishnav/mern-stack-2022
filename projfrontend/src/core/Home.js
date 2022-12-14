import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Base from './Base';
import Card from './Card';

import {getProducts} from './helper/coreapicalls';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
  
    const preloadData = () => {
        getProducts()
        .then(data => {
            if (!data || data.error) {
               setError(!data ? 'Error' : data.error); 
            } else {
                setProducts(data);
                setError(false);
            }
        });
    };

    useEffect(() => {
        preloadData();
    }, []);

    return (
        <Base title='Home Page' description='One place for all the t-shirts available'>
            <h1 className='text-white'>Home component!</h1>
            <div className="row">
                {products && products.map((product, index) => (
                    <div className="col-4 mb-2" key={index}>
                        <Card product={product}/>
                    </div>
                ))}
            </div>
        </Base>
    );
};

export default Home;