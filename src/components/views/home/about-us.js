import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './App.css';
import axiosInstance from '../utils/axiosInstance';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
function AboutUs() {
    useEffect(() => {
        var swiper3 = new Swiper(".awards-slider", {
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
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source 
                        media="(min-width: 992px)" 
                        srcSet="/star-estate-react/assets/images/about-us.jpg" 
                    />
                    <source 
                        media="(min-width: 768px)" 
                        srcSet="/star-estate-react/assets/images/about-us-m.jpg" 
                    />
                    <img 
                        src="/star-estate-react/assets/images/about-us-m.jpg" 
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
                                <div className="heading mx-auto">
                                    <h3 className="mb-0">Star Estate was founded in 2012 as the fastest-growing Real Estate enterprise.</h3>
                                </div>
                                <p><b>Today, we have come a long way with a history of successful results and unparalleled management — as well as offering a wide range of consulting services in residential, commercial and retail verticals and more.</b></p>
                                <p>That "more" represents one of the best customer service, customer experience, and our company culture. We want to inspire the world by demonstrating that it is possible to provide long-term and sustainable benefits to consumers, entrepreneurs, suppliers, shareholders, and the community all at the same time.</p>
                                <p className="mb-0">Star Estate is associated with more than 100 world's top-class real estate developers who have a legacy of making outstanding real estate properties with no drawbacks and a record of on-time possession within the committed time. With innovation and the use of updated research analysis and the latest technologies like Artificial Intelligence (AI) &amp; Virtual Reality (VR), Star Estate is set to make the new benchmark in Indian Real Estate history by making property consultation more transparent and advanced. We also use machine learning to ease the process of personalization, focus on the preferences in selecting properties for customers, and save them money and time.</p>
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
                                <img src="/star-estate-react/assets/images/card-bg.jpg" className="h-100 object-cover stats-bg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 padding bg-image overflow-hidden" style={{backgroundImage: "url(/star-estate-react/assets/images/card-bg.jpg)" }}>
                <div className="container-lg">
                    <div className="overview-box text-justify">
                        <div className="inner">
                            <div className="heading mx-auto">
                                <h3 className="mb-0">STAR ESTATE is the No. 1 property portal offering you the services in the real estate industry.</h3>
                            </div>
                            <p>Star Estate has been one of the most reliable &amp; trusted real estate consultation firms for over a decade, providing the best-in-class real estate and property-related solutions for its highly esteemed clients and customers through its extensive market research and scientific data analysis. Star Estate delivers the maximum level of hassle-free property investment solutions for home buyers and real estate management with long-term strategic planning for developers, which is exceptionally well acclaimed and recognized by its users and reviewers. We aim to give our customers a comprehensive and flawless experience in buying or investing in residential and commercial properties. We take care of almost every aspect of property-related concerns, from searching for new homes, finding suitable locations, and competitive pricing to after-sales services.</p>
                            <p className="mb-0">We hope that people won't even realize the hassle of real estate in the future. Instead, they'll know Star Estate as a company that just happens to deliver complete real estate solutions.</p>
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
                                <p className="mb-0 text-justify">Star Estate looks forward to a new India where we provide the luxury of comfortable housing at utmost affordability and ensure customer satisfaction as much as can be. We aim to eradicate the problems of poor infrastructure and estate and to bring about a revolution to how the new India lives.</p>
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
                        <div className="img-fluid"><img src="/star-estate-react/assets/images/Mr-Vijay-Jain-MD-Star-Estate.jpg" alt="Direct Vijay Jain" /></div>
                        <div className="director-content">
                            <div className="director-quote">We make sure to serve every client with transparency, reliability, and a proven commitment.</div>
                            <div className="director-title">
                                <h6>Vijay Jain<br />
                                    <small>Managing Director</small></h6>
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
                                <div className="imgBox"><img src="/star-estate-react/assets/images/star/s.png" alt="" /></div>
                                <div className="whyUsText">
                                    <h5 className="fw-bolder text-texture">Sincerity</h5>
                                    <p className="mb-0">We stay true to our words. Star Estate never steps back from the commitment. Our professional work approach and the precision to evaluate and meet client expectations draw our proven commitment since inception.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 whyUsBox">
                            <div className="inner h-100">
                                <div className="imgBox"><img src="/star-estate-react/assets/images/star/t.png" alt="" /></div>
                                <div className="whyUsText">
                                    <h5 className="fw-bolder text-texture">Transparency</h5>
                                    <p className="mb-0">Listening is the key to success, and our team patiently listens to the client's requirements and expectations. With it, we begin the procedure of listing, searching, and shortlisting properties for clients.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 whyUsBox">
                            <div className="inner h-100">
                                <div className="imgBox"><img src="/star-estate-react/assets/images/star/a.png" alt="" /></div>
                                <div className="whyUsText">
                                    <h5 className="fw-bolder text-texture">Assurance</h5>
                                    <p className="mb-0">Star Estate assures investors about closing the right deal. The company addresses property investment purposes in the wake to meet client satisfaction. The organisation exhibits relevant properties for investors with assurance of post-sale.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 whyUsBox">
                            <div className="inner h-100">
                                <div className="imgBox"><img src="/star-estate-react/assets/images/star/r.png" alt="" /></div>
                                <div className="whyUsText">
                                    <h5 className="fw-bolder text-texture">Reliability</h5>
                                    <p className="mb-0">With the transparent work approach, we have won the trust of clients' across segments. Thus, clienteles refer us to friends and family as they know Star Estate is a reliable name in the Indian real estate market.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
export default AboutUs