import React, {useState, useEffect} from 'react';
import ImageHelper from './helper/ImageHelper';
import {Link, Redirect} from 'react-router-dom'
import {addItemToCart, removeItemFromCart} from './helper/CartHelper';

const Card = ({
    product,
    addToCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = f => f 
}) => {

  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name : 'A photo from pexels';
    const cardDescription = product ? product.description : 'this photo looks great';
    const cardPrice = product ? product.price : 'DEFAULT PRICE';

    const _addToCart = () => {
      addItemToCart(product, () => setRedirect(true));
    };

    const getARedirect = () => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const showAddCart = () => (
        addToCart && (
            <button
                  onClick={_addToCart}
                  className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                  Add to Cart
            </button>
        )
    )

    const showRemoveCart = () => (
        removeFromCart && (
            <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(() => !reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
                Remove from cart
            </button>
        )
    )

    return (
        <div className="card text-white bg-dark border border-info ">
          <div className="card-header lead">{cardTitle}</div>
          <div className="card-body text-center">
            {getARedirect()}
            <ImageHelper product={product}/>
            <p className="lead bg-success font-weight-normal text-wrap">
              {cardDescription}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
            <div className="row">
              <div className="col-12">
                {showAddCart()}
              </div>
              <div className="col-12">
                {showRemoveCart()}
              </div>
            </div>
          </div>
        </div>
      );
};

export default Card;