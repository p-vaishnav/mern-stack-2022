import React, {useState} from 'react';
import Base from '../core/Base';
import {isAuthenticated} from '../auth/helper/index';
import {Link, withRouter} from 'react-router-dom';
import {createCategory} from './helper/adminapicall';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const user = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setSuccess('');
        setName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);

        createCategory(user._id, user.token, {name})
        .then((data) => {
            if (data.error) {
                setError(true);
                setSuccess(false);
            } else {
                setError(false);
                setSuccess(true);
                setName('');
            }
        });
    }

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input
                type='text' className='form-control my-3'
                autoFocus required
                placeholder='For Ex. Summer'
                value={name}
                onChange={handleChange}
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>
    );
    
    const goBack = () => (
        <div className="mt-3 mb-3">
            <Link to='/admin/dashboard' className="btn btn-success btn-sm">
                Admin Home
            </Link>
        </div>
    );

    const successMessage = () => (success && <h4 className='bg-success text-white p-2 mt-2'>Category created successfully</h4>);
    const errorMesage = () => (error && <h4 className='bg-danger text-white p-2 mt-2'>Category not created</h4>);
    return ( 
        <Base
        title='Create a new category'
        description='Add a new Category for T-shirts'
        className='container bg-info p-4'
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMesage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default AddCategory;