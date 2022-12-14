import React, {useState, useEffect} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import {getProduct, createProduct, getCategories, updateProduct} from './helper/adminapicall';
import {isAuthenticated} from '../auth/helper/index';

const UpdateProduct = ({match}) => {

    const user = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        price: '',
        description: '',
        stock: '',
        photo: '',
        categories: [],
        category: '',
        loading: false,
        error: '',
        createdProduct: '',
        getARedirect: false,
        formData: ''
    });
    
    const {name, price, description, stock, photo, categories, category, loading, error, createdProduct, getARedirect, formData} = values;

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: '', loading: true});
        updateProduct(match.params.productId, user._id, user.token, formData)
        .then((data) => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                setValues({
                    name: '',
                    price: '',
                    description: '',
                    stock: '',
                    photo: '',
                    loading: false,
                    error: '',
                    createdProduct: data.name,
                    // TODO: needs to be worked on it
                    getARedirect: '',
                    formData: '',
                });
            }
        })
        .catch()
    };

    const handleChange = (name) => {
        return (e) => {
            setValues({...values, createdProduct: '', error: false})
            const value = name === 'photo' ? e.target.files[0] : e.target.value;
            formData.set(name, value);
            setValues({...values, [name]: value});
            // check what all fields are over here
            console.log(formData);
        }
    };

    const preloadData = (productId) => {
        getProduct(productId)
        .then((data) => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                preloadCategories();
                setValues({
                    ...values,
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData()
                });
                
                console.log('CATEGORIES', categories);
            }
        });
    };

    const preloadCategories = () => {
        getCategories()
        .then((data) => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    categories: data,
                    formData: new FormData()
                });
            }
        })
    };

    useEffect(() => {
        preloadData(match.params.productId);
    }, []);

    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{display: createdProduct ? '' : 'none'}}>
            <h4>{createdProduct} product updated.</h4>
        </div>
    );

    const errorMessage = () => (
        <div className="alert alert-danger mt-3" style={{display: error ? '' : 'none'}}>
            <h4>Error while creating product</h4>
        </div>
    );
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((category, index) => <option key={index} value={category._id}>{category.name}</option> )}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-2 rounded">
            Update Product
          </button>
        </form>
    );
    // Show loading message and success message
    return (
        <Base title='Update a product here' description='Welcome to the product updation section' className='container bg-info p-4'>
            <Link className="btn btn-md bg-dark text-white" to='/admin/dashboard'>Admin Dashboard</Link>
            <div className="row bg-dark text-white rounded mt-2">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateProduct;