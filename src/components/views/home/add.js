import React from 'react';

const LandingWrapper = ({ handleAccept }) => {
    return (
        <div className="landing-wrapper">
            <div className="container-lg lp-desc-box load-animate-2">
                <div className="heading">
                    <span className="h3 font-weight-bolder mb-0">Disclaimer</span>
                </div>
                <div className="scroller">
                    <p>
                        By accessing this website, the viewer/user confirms that the information including brochures and marketing collaterals on this website are solely for informational purposes only and the viewer/user has not relied on this information for making any booking/purchase in any project of the Company.
                    </p>
                    <p>
                        The contents are being modified in terms of the stipulations/recommendations under the RERA Act and rules made thereunder and accordingly may not be fully in line thereof as of date. No information given under this website creates a warranty or expand the scope of any warranty that cannot be disclaimed under applicable law. Your use of the website is solely at your own risk. This website is for guidance only. It does not constitute part of an offer or contract.
                    </p>
                    <p>
                        The Company expressly disclaims all liability in respect to actions taken or not taken based on any or all the contents of this website. The Company will in no circumstance be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from the use of data, arising out of or in connection with the use of this website.
                    </p>
                    <p className="mb-0">
                        In no event, the Company will be liable to any party for any direct, indirect, special or other consequential damages for any use of this website, or any other hyperlinked website, including without limitation, any lost profits, business interruption, loss of programs or other data on your information handling system or otherwise, even if we are expressly advised of the possibility of such damages.
                    </p>
                </div>
                <div className="readmore mt-3">
                    <button role="button" className="button go-home-btn" onClick={handleAccept}>
                        Accept & Enter
                    </button>
                </div>
            </div>
            <picture>
                <source media="(max-width: 520px)" srcSet="/star-estate-react/assets/images/lp-img.jpg" />
                <img src="/star-estate-react/assets/images/lp-img.jpg" className="h-100 object-cover" alt="" />
            </picture>
            <div className="lp-footer">
                <b className="font-weight-bolder">Star Estate</b>
                <span>Life beyond square feets</span>
            </div>
        </div>
    );
};

export default LandingWrapper;