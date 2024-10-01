import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css';

function PrivacyPolicy() {
    return (
        <div>
            <div className="emptyBox"></div>

            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Privacy Policy</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg padding">
                    <div className="row gap-row">
                        <div className="col-lg-12 vmBox">
                            <div className="inner pl-lg-4">
                                <div className="heading mx-auto"><h3 className='mb-0'>Privacy Policy</h3></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrivacyPolicy