import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Base from '../core/Base';
import {signin, isAuthenticated, authenticate} from '../auth/helper/index';

const Signin  = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        didRedirect: false        
    });

    // TODO: needs to check it once
    const {email, password, error, loading, didRedirect} = values;
    const user = isAuthenticated();

    const handleChange = (name) => {
        return (event) => {
            setValues({...values, error: false, [name]: event.target.value});
        }
    }

    const loadingMessage = () => (
        loading && (
            <div className="alter alert-info">
                Loading...
            </div>
        )
    );

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

    const performRedirect = () => {
        // TODO: come back here for performRedirect
        if (didRedirect) {
            console.log(user);
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashboard'/>
            } else {
                return <Redirect to='/user/dashboard'/>
            }
        }

        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password})
            .then((data) => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false});
                } else {
                    authenticate(data, () => {
                        setValues({...values,
                        email: '',
                        password: '',
                        error: '',
                        loading: false,
                        didRedirect: true});
                    });
                }
            })
            .catch();
    };

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="text" onChange={handleChange('email')} value={email} className='form-control'/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" onChange={handleChange('password')} value={password} className='form-control'/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block" type='submit'>Submit</button>
                    </form>
                </div>
            </div>   
        );
    };

    return (
        <Base title='Signin page' description='A page for user to signin!'>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signin;