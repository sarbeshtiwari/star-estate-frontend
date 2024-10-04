import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './App.css';
import axiosInstance from '../utils/axiosInstance';

// Function to preload images
const preloadImages = (imageUrls) => {
    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
};


function AboutUs() {
    useEffect(() => {
        // Preload images
        const imageUrls = [
            'assets/images/about-us.jpg',
            'assets/images/about-us-m.jpg',
            'assets/images/card-bg.jpg',
            'assets/images/Mr-Vijay-Jain-MD-Star-Estate.jpg',
            'assets/images/star/s.png',
            'assets/images/star/t.png',
            'assets/images/star/a.png',
            'assets/images/star/r.png'
           
        ];
        preloadImages(imageUrls);

        // Initialize Swiper after images are preloaded
        const swiper = new Swiper(".awards-slider", {
            slidesPerView: "auto",
            centeredSlides: true,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            effect: "coverflow",
            grabCursor: true,
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        // Cleanup on component unmount
        return () => {
            swiper.destroy();
        };
    }, []);
    const [awards, setAwards] = useState([]);
    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await axiosInstance.get(`/award/getAwards`);
                const filteredAwards = response.data.filter(award => award.status === true);
                setAwards(filteredAwards);
            } catch (error) {
                console.error('Failed to fetch Awards', error);
            }
        };
        fetchAwards();
    }, []);
    return (
        <div>
            <div className="insideBanner">
                <picture>
                    <source
                        media="(min-width: 992px)"
                        srcSet="assets/images/about-us.jpg"
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet="assets/images/about-us-m.jpg"
                    />
                    <img
                        src="assets/images/about-us-m.jpg"
                        className="h-100 object-cover object-position-bottom rounded"
                        alt="Star Estate"
                    />
                </picture>
            </div>

            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">About Us</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="row gy-4">
                        <div className="col-xl-8 overview-box text-justify">
                            <div className="inner">
                                <div className="">
                                    <h3 className="">Dreams don't turn into reality by chance it takes determination and courage to pursue them.</h3>
                                </div>
                                <p>When an artist creates a masterpiece, a writer pens a novel, an actor takes center stage, and a sculptor
                                    chisels a statue, a sublime story unfolds with time and admiration. Similarly, in the realm of Mr. Vijay
                                    Jain, we embarked on a journey in 2012 to curate India's most exceptional real estate investments.</p>
                                <p className='mb-0'>We understand the aspirations of the new-age royals, thus, we assist them with handpicked bouquets
                                    of premium properties to accomplish a regal lifestyle. For us, contented clients are the biggest
                                    testaments as we sense accomplishment in unlocking the right real estate asset via the client-centric
                                    work approach.</p>
                                {/* <p>To realize dreams, it is important to accelerate the pedal of competence. Even after completing 12 successful years in the business of unlocking prosperity, we dream and dream it big. To appraise aspirational dreams in the real estate realm, we a team of assertive professionals confers tailored solutions to investors under the leadership of Mr. Vijay Jain, Founder and Managing Director, Star Estate.</p>
                                <p className="mb-0">We work with the synergy to meet the pursuit of structural excellence in the property market across India. With experience and expertise in our armory, we shoot to attain goals. We don’t just exhibit concrete structures, but we unveil exclusive architectural masterpieces close to whims and fancies.</p> */}
                            </div>
                        </div>
                        <div className="col-xl-4 overview-stats">
                            <div className="inner position-relative overflow-hidden h-100">
                                <div className="row gap-row">
                                    <div className="col-xl-12 overview-logo">
                                        <span className="h6 fw-bolder text-uppercase">Every result tells a unique story.</span>
                                    </div>
                                    <div className="col-xl-12 col-lg-3 col-sm-6 statBox">
                                        <div className="stats-in">
                                            <span className="h2 text-texture"><span className="counter">12</span><small>+</small></span>
                                            <p>Years of Experience</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-3 col-sm-6 statBox">
                                        <div className="stats-in">
                                            <span className="h2 text-texture"><span className="counter">40000</span><small>+</small></span>
                                            <p>Units Booked</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-3 col-sm-6 statBox">
                                        <div className="stats-in">
                                            <span className="h2 text-texture"><span className="counter">100000</span><small>+</small></span>
                                            <p>Happy Faces</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-3 col-sm-6 statBox">
                                        <div className="stats-in">
                                            <span className="h2 text-texture"><span className="counter">100</span><small>mln+</small></span>
                                            <p>Area Sold (Sq.ft)</p>
                                        </div>
                                    </div>
                                </div>
                                <img src="assets/images/card-bg.jpg" className="h-100 object-cover stats-bg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 padding bg-image overflow-hidden" style={{ backgroundImage: "url(assets/images/card-bg.jpg)" }}>
                <div className="container-lg">
                    <div className="overview-box text-justify">
                        <div className="inner">
                            {/* <div className="heading mx-auto">
                                <h3 className="mb-0"></h3>
                            </div> */}
                            <p>Our in-house group of experts streamlines promising practices to ascend performance in the
                                competitive market to maintain the benchmark work standard. With real estate giants and investors
                                counting on us, we are elated to be a catalyst of refined real estate investment experience provider
                                across India.</p>
                            <p className="mb-0">With passionate real estate professionals from top B-schools as the backbone, we are becoming more
                                ambitious and are zestful to push boundaries leaving no stone unturned to establish a benchmark in
                                the Indian property market.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg padding">
                    <div className="row gap-row">
                        <div className="col-lg-12 vmBox">
                            <div className="inner pl-lg-4">
                                <div className="heading mx-auto"><h3 className='mb-0'>Vision</h3></div>
                                <p className="mb-0 text-justify">For us, the sky is not the limit. Our next milestone is global expansion, which we are working to achieve
                                    in the coming years. From our Indian roots to global property market expansion across continents, we
                                    confidently envision a seamless growth journey.

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 padding position-relative bg-lightgray overflow-hidden">
                <div className="container-lg">
                    <div className="heading mx-auto"><h3 className="mb-0">From Director's Desk</h3></div>
                    <div className="director-msg bg-gray-gradient-box p-3">
                        <i className="fa fa-quote-left"></i>
                        <i className="fa fa-quote-right"></i>
                        <div className="img-fluid"><img src="assets/images/Mr-Vijay-Jain-MD-Star-Estate.jpg" alt="Direct Vijay Jain" /></div>
                        <div className="director-content">
                            <p className="mb-0 text-justify">Mr. Vijay Jain is a visionary leader with the fortitude to make the real estate experience fantastic for
                                every investor. His intuitive understanding of evolving demands in the property market attributable
                                to diverse reasons is the secret to fulfilling promises.

                            </p>
                            <p className='mb-0 text justify'>He is the pillar of strength, inspiration, and a guiding light for the entire organisation which has a
                                mammoth presence across India. Our go-getter approach paves the way to win against all the odds to
                                overcome opportunities and set a benchmark of success in the market.
                            </p>
                            <p className="mb-0 text-justify">Mr. Vijay Jain's empathetic leadership inspires achievers and serves as a guiding light for our team.
                                We are thankful to our stakeholders, employees, and clients for believing in us and being a part of our
                                growth story.

                            </p>
                            <p className='mb-0 text justify'>Over the decade-long journey, we won many accolades that propel us to be more determined and
                                disciplined to delivering real estate services while adhering to our uncompromising values.
                            </p>
                            {/* <div className="director-quote">Mr. Vijay Jain is a visionary leader with the fortitude to make the real estate experience fantastic for
                                                                every investor. His intuitive understanding of evolving demands in the property market attributable
                                                                    to diverse reasons is the secret to fulfilling promises. </div> */}
                            <div className="director-title">
                                <h6>Mr. Vijay Jain<br />
                                    <small>Managing Director, Star Estate</small></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 padding position-relative overflow-hidden bg-dark awards-section">
                <div className="container-lg">
                    <div className="heading mx-auto">
                        <h3 className="text-white">Awards</h3>
                    </div>
                    <div className="swiper awards-slider">
                        <div className="swiper-wrapper">
                            {awards.map((award, index) => (
                                <div key={index} className="swiper-slide award-slide">
                                    <img src={`${axiosInstance.defaults.globalURL}${award.awardImage}`} alt={award.awardName || 'Award Image'} />
                                </div>
                            ))}
                        </div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>
                </div>
            </div>
            <div className="w-100 padding position-relative overflow-hidden">
                <div className="container-lg">
                    <div className="heading mx-auto"><h3 className="mb-0">Our Pillars of Strength</h3></div>
                    <div className="row gap-row">
                        <div className="col-xl-3 col-sm-6 whyUsBox">
                            <div className="inner h-100">
                                <div className="imgBox"><img src="assets/images/star/s.png" alt="" /></div>
                                <div className="whyUsText">
                                    <h5 className="fw-bolder text-texture">Sincerity</h5>
                                    <p className="mb-0">We stay true to our words. Star Estate never steps back from the commitment.
                                        Our professional work approach and the precision to evaluate and meet client expectations
                                        draw our proven commitment since inception.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 whyUsBox">
                            <div className="inner h-100">
                                <div className="imgBox"><img src="assets/images/star/t.png" alt="" /></div>
                                <div className="whyUsText">
                                    <h5 className="fw-bolder text-texture">Transparency</h5>
                                    <p className="mb-0">– Listening is the key to success and our team patiently listens to the client's
                                        requirements and expectations. With it, we begin the procedure of listing, searching, and
                                        shortlisting properties for clients. The process includes picking up budget-friendly inventory
                                        and describing the project embellished with features that make the dream living experience
                                        a fairy-tale. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 whyUsBox">
                            <div className="inner h-100">
                                <div className="imgBox"><img src="assets/images/star/a.png" alt="" /></div>
                                <div className="whyUsText">
                                    <h5 className="fw-bolder text-texture">Assurance</h5>
                                    <p className="mb-0">Star Estate assures investors about closing the right deal. The company addresses
                                        property investment purposes in the wake to meet client satisfaction. The organisation
                                        exhibits relevant properties for investors with assurance of post-sale assistance.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 whyUsBox">
                            <div className="inner h-100">
                                <div className="imgBox"><img src="assets/images/star/r.png" alt="" /></div>
                                <div className="whyUsText">
                                    <h5 className="fw-bolder text-texture">Reliability</h5>
                                    <p className="mb-0">With the transparent work approach, we have won the trust of clients across
                                        segments. Thus, clienteles refer us to friends and family as Star Estate is a reliable name in
                                        the Indian real estate market.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutUs