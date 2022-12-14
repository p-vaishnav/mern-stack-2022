import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import AdminRoute from './auth/helper/AdminRoute';
import PrivateRoute from './auth/helper/PrivateRoute';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategories from './admin/UpdateCategories';
import Cart from './core/Cart';


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/signin' component={Signin}/>
                <Route exact path='/cart' component={Cart}/>
                <AdminRoute exact path='/admin/dashboard' component={AdminDashBoard}/>
                <PrivateRoute exact path='/user/dashboard' component={UserDashBoard}/>
                <AdminRoute exact path='/admin/create/category' component={AddCategory}/>
                <AdminRoute exact path='/admin/categories' component={ManageCategories}/>
                <AdminRoute exact path='/admin/create/product' component={AddProduct}/>
                <AdminRoute exact path='/admin/products' component={ManageProducts}/>
                <AdminRoute exact path='/admin/product/update/:productId' component={UpdateProduct}/>
                <AdminRoute exact path='/admin/category/update/:categoryId' component={UpdateCategories}/>
            </Switch>
        </Router>
    );
};

export default Routes;