import React from 'react';
import Menu from './Menu';
import Footer from './Footer';
const Base = ({
    title='My Title',
    description='My Description',
    className='bg-dark text-white p-4',
    children
}) => {

    return (
        <div>
            <Menu/>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Base;