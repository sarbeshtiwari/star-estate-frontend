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
                                <div className="heading mx-auto">
                                    <h3 className="mb-0">Star Estate was founded in 2012 as the fastest-growing Real Estate enterprise.</h3>
                                </div>
                                <p><b><em>Dreams don't turn into reality by chance it takes determination and courage to pursue them.</em></b></p>
                                <p>To realize dreams, it is important to accelerate the pedal of competence. Even after
completing 12 successful years in the business of unlocking prosperity, we dream and dream
it big. To appraise aspirational dreams in the real estate realm, we a team of assertive
professionals confers tailored solutions to investors under the leadership of Mr. Vijay Jain,
Founder and Managing Director, Star Estate.</p>
                                <p className="mb-0">We work with the synergy to meet the pursuit of structural excellence in the property market
across India. With experience and expertise in our armory, we shoot to attain goals. We don’t
just exhibit concrete structures, but we unveil exclusive architectural masterpieces close to
whims and fancies.
</p>
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
            <div className="w-100 padding bg-image overflow-hidden" style={{backgroundImage: "url(assets/images/card-bg.jpg)" }}>
                <div className="container-lg">
                    <div className="overview-box text-justify">
                        <div className="inner">
                            <div className="heading mx-auto">
                                <h3 className="mb-0">STAR ESTATE is the No. 1 property portal offering you the services in the real estate industry.</h3>
                            </div>
                            <p>Our in-house think tank streamlines promising practices to ascend performance in the
competitive market to maintain the benchmark work standard. With real estate giants and
investors counting on us, we are elated to be a catalyst of refined real estate investment
experience provider across India.</p>
                            <p className="mb-0">With exceptional talent as the backbone, we become more ambitious and delimit boundaries
to ascertain benchmarks in the Indian property market.
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
                                <p className="mb-0 text-justify">For us, the sky is not the limit and global expansion is the next milestone we are working to
achieve in the future. From taking off in India to flying into international property markets
across continents is an aspiration and we are confident of nurturing it seamlessly.
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
                            <div className="director-quote">My parameter of success is rendering dreams to investors in a pragmatic way possible.</div>
                            <div className="director-title">
                                <h6>Mr. Vijay Jain<br />
                                    <small>Founder and Managing Director, Star Estate</small></h6>
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
            {/* <Footer /> */}
        </div>
    )
}
export default AboutUs