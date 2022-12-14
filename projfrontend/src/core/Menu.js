import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated, signout} from '../auth/helper/index';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#2ecc72'};
    } else {
        return {color: '#FFFFFF'};
    }
}

const Menu = ({
    history
}) => {
    return (
        <div className='navbar-expand'>
            <ul className="navbar-nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" style={currentTab(history, '/')} to='/' >Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={currentTab(history, '/cart')} to='/cart' >Cart</Link>
                </li>
                {
                    isAuthenticated() &&
                    isAuthenticated().role === 0 &&
                    (<li className="nav-item">
                        <Link className="nav-link"  style={currentTab(history, '/user/dashboard')} to='/user/dashboard' >U.Dashboard</Link>
                    </li>)
                }
                {   isAuthenticated() &&
                    isAuthenticated().role === 1 &&
                    (<li className="nav-item">
                        <Link className="nav-link" style={currentTab(history, '/admin/dashboard')} to='/admin/dashboard' >A.Dashboard</Link>
                    </li>)
                }
                {!isAuthenticated() && (<li className="nav-item">
                    <Link className="nav-link" style={currentTab(history, '/signin')} to='/signin' >Sign In</Link>
                </li>)
                }
                {!isAuthenticated() && (<li className="nav-item">
                    <Link className="nav-link" style={currentTab(history, '/signup')} to='/signup' >Sign Up</Link>
                </li>)
                }
                {isAuthenticated() &&
                    (<li className="nav-item">
                        <span className="nav-link text-warning"
                            style={{cursor: 'pointer'}}
                            onClick={() => {
                                signout(() => {
                                    history.push('/')
                                })
                            }}
                        >
                            Signout
                        </span>
                    </li>)
                }
            </ul>
        </div>
    )
};

export default withRouter(Menu);