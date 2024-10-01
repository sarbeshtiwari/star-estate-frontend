import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function NewScreen() {
    return (
        <div>
            <div className="emptyBox"></div>
            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Disclaimer</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg padding">
                    <div className="row gap-row">
                        <div className="col-lg-12 vmBox">
                            <div className="inner pl-lg-4">
                                <div className="heading mx-auto">
                                    <h3 className='mb-0'>Disclaimer</h3>
                                </div>
                                <p>By accessing this website, the viewer/user confirms that the information including brochures and marketing collaterals on this website are solely for informational purposes only and the viewer/user has not relied on this information for making any booking/purchase in any project of the Company.</p>

                                <p>The contents are being modified in terms of the stipulations/recommendations under the RERA Act and rules made thereunder and accordingly may not be fully in line thereof as of date. No information given under this website creates a warranty or expand the scope of any warranty that cannot be disclaimed under applicable law. Your use of the website is solely at your own risk. This website is for guidance only. It does not constitute part of an offer or contract.</p>

                                <p>The Company expressly disclaims all liability in respect to actions taken or not taken based on any or all the contents of this website. The Company will in no circumstance be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from the use of data, arising out of or in connection with the use of this website.</p>

                                <p>In no event, the Company will be liable to any party for any direct, indirect, special or other consequential damages for any use of this website, or any other hyperlinked website, including without limitation, any lost profits, business interruption, loss of programs or other data on your information handling system or otherwise, even if we are expressly advised of the possibility of such damages.</p>
                                {/* Add disclaimer content here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

