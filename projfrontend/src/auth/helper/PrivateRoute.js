import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

// this is just a destructuring syntax
/*
let x = {name: 'Vaishnav', age: 22}
{name: Name, age: Age} = x;
console.log(Name, Age);
*/
const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => isAuthenticated() ? (<Component {...props}/>) : (<Redirect to={{pathname: '/signin', state: {from: props.location}}} />)}
        />
    )
};

export default PrivateRoute;