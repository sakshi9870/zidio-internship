// src/components/ErrorPage.js
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="app">
            <h3>
                There was some error. Please go back to 
                <Link to='/'>homepage</Link>
            </h3>
        </div>
    );
}

export default ErrorPage;
