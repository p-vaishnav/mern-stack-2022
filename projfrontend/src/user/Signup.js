import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Base from '../core/Base';
import {signup} from '../auth/helper/index';

const Signup  = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, error, success} = values;

    /*
    // hitesh did it this way
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    }
    */

    const handleChange = (name) => {
        return (event) => {
            setValues({...values, error: false, [name]: event.target.value});
        }
    }

    const onSubmit = (event) => {   
        event.preventDefault();
        setValues({...values, error: false, success: false});
        signup({name, email, password})
            .then((data) => {
                if (data.error) {
                    setValues({...values, error: data.error});
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
            .catch(() => console.log('Error at the time of signup'));
    };

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" value={name} onChange={handleChange('name')} className='form-control'/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="text" value={email} onChange={handleChange('email')} className='form-control'/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" value={password} onChange={handleChange('password')} className='form-control'/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block" type='submit'>Submit</button>
                    </form>
                </div>
            </div>   
        );
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                        style={{display: success ? '' : 'none'}}
                >
                    New account created successfully, Please click on this <Link to='/signin'>link</Link> to signin
                    </div>
                </div>
            </div>
        )
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                        style={{display: error ? '' : 'none'}}
                    >
                    {error}
                    </div>
                </div>
            </div>
        )
    };

    return (
        <Base title='Signup page' description='A page for user to signup!'>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className='text-white text-center'>{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signup;