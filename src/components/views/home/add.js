import React, { useEffect } from 'react';

const LandingWrapper = ({ handleAccept }) => {
    // Preload images
    useEffect(() => {
        const images = [
            '/star-estate-react/assets/images/lp-img-hd.webp',
            '/star-estate-react/assets/images/lp-img-tab.webp',
            '/star-estate-react/assets/images/lp-img.webp',
            '/star-estate-react/assets/images/lp-img-mb.webp',
        ];

        images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);

    return (
        <React.Fragment>
            <main className="landing-wrapper">
                <section className="container-lg lp-desc-box load-animate-2">
                    <header className="heading">
                        <h3 className="font-weight-bolder mb-0">Disclaimer</h3>
                    </header>
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
                        <p>
                            In no event, the Company will be liable to any party for any direct, indirect, special or other consequential damages for any use of this website, or any other hyperlinked website, including without limitation, any lost profits, business interruption, loss of programs or other data on your information handling system or otherwise, even if we are expressly advised of the possibility of such damages.
                        </p>
                    </div>
                    <div className="readmore mt-3">
                        <button
                            className="button go-home-btn"
                            onClick={handleAccept}
                            aria-label="Accept Disclaimer and Enter"
                        >
                            Accept & Enter
                        </button>
                    </div>
                </section>
                <picture>
                    <source media="(min-width: 575px)" srcSet="/star-estate-react/assets/images/lp-img-hd.webp" />
                    <source media="(min-width: 992px)" srcSet="/star-estate-react/assets/images/lp-img-tab.webp" />
                    <source media="(min-width: 1400px)" srcSet="/star-estate-react/assets/images/lp-img.webp" />
                    <img
                        src="/star-estate-react/assets/images/lp-img-mb.webp"
                        className="h-100 object-cover"
                        fetchpriority="high"
                        loading="lazy"
                        alt="Disclaimer Star Estate"
                    />
                </picture>
                {/* <footer className="lp-footer text-center">
                    <b className="font-weight-bolder">Star Estate</b>
                    <span>Life beyond square feets</span>
                </footer> */}
            </main>
        </React.Fragment>
    );
};

export default LandingWrapper;
