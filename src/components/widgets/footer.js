import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../views/utils/axiosInstance';
export const fetchCities = async () => {
    try {
        const response = await axiosInstance.get(`/city/getCities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};
const Footer = () => {
    const [showButton, setShowButton] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        }
        if (window.scrollY > 100) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        const getCities = async () => {
            try {
                const data = await fetchCities();
                setCities(data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        getCities();
    }, []);
    return (
        <footer className="footer-area overflow-hidden float-left w-100">
            <div className="container-lg">
                {/* <div className="padding border-bottom foot-links">
                    <div className="inner">
                        <div className="row gap-row">
                            <div className="col-md-12 col-sm-12 foot-menu">
                                <div className="insideBox">
                                    <h6>Cities</h6>
                                    <ul className="list-inline footer-cities d-flex flex-wrap">
                                        {cities.map((city) => (
                                            <li key={city.id}>
                                                <Link to={`/city/${city.slugURL}`}>{city.location}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="padding foot-links">
                    <div className="inner">
                        <div className="row gap-row">
                            <div className="col foot-menu">
                                <div className="insideBox">
                                    <h6>Projects</h6>
                                    <ul className="list-inline">
                                        {/* <li><Link to="/projects/luxury">Luxury</Link></li> */}
                                        
                                        <li><Link to='/projects/commercial'>Commercial</Link></li>
                                        <li><Link to="/projects/new-launch">New Launches</Link></li>
                                        <li><Link to='/projects/residential'>Residential</Link></li>
                                       
                                    </ul>
                                </div>
                            </div>
                            <div className="col foot-menu">
                                <div className="insideBox">
                                    <h6>Company</h6>
                                    <ul className="list-inline">
                                        <li><Link to='/about-us'>About Star Estate</Link></li>
                                        {/* <li><Link to='/about-us'>Mission &amp; Vision</Link></li>
                                        <li><Link to='/about-us'>Who We Are</Link></li> */}
                                        <li><Link to='/clients-speak'>Client's Speak</Link></li>
                                        <li><Link to='/faq'>FAQs</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col foot-menu">
                                <div className="insideBox">
                                    <h6>Media</h6>
                                    <ul className="list-inline">
                                        <li><Link to='/advertisements'>Advertisements</Link></li>
                                        <li><Link to='/awards'>Awards</Link></li>
                                        <li><Link to ='/blogs'>Blogs</Link></li>
                                        <li><Link to='/events'>Events</Link></li>
                                        <li><Link to='/news'>News</Link></li>
                                        
                                        
                                        
                                    </ul>
                                </div>
                            </div>
                            <div className="col foot-menu">
                                <div className="insideBox">
                                    <h6>Explore</h6>
                                    <ul className="list-inline">
                                        <li><Link to='/buyer-guide/'>Buyer Guide</Link></li>
                                        <li><Link to='/careers'>Careers</Link></li>
                                        <li><Link to='/contact-us'>Contact Us</Link></li>
                                        
                                        <li><Link to='/desclaimer'>Disclaimer</Link></li>
                                        <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
                                        <li><Link to='/sitemap'>Sitemap</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col foot-menu socialBox">
                                <div className="insideBox">
                                    <h6>Get Social</h6>
                                    <ul className="list-inline socialIcons solid">
                                        <li className="list-inline-item"><a href="https://www.facebook.com/starestate.in" target="_blank" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                                        <li className="list-inline-item"><a href="https://www.instagram.com/starestate_official/" target="_blank" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Instagram"><i className="fab fa-instagram"></i></a></li>
                                        <li className="list-inline-item"><a href="https://www.linkedin.com/company/star-estate" target="_blank" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="LinkedIn"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li className="list-inline-item"><a href="https://twitter.com/starestate2" target="_blank" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Twitter"><i className="fab fa-twitter"></i></a></li>
                                        <li className="list-inline-item"><a href="https://www.youtube.com/channel/UCwfDf7Ut8jrkjiBeRnbZUPw" target="_blank" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="YouTube"><i className="fab fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container-lg">
                    <div className="footer-logo">
                        <a href="https://www.starestate.in/"><img src="https://www.starestate.in/assets/images/logo-starestate.png" alt="Star Estate" /></a>
                        <div className="partner-rera">
                            <p className="mb-0"><b>RERA No.: UPRERAAGT10202</b> <br />https://up-rera.in/Agents</p>
                        </div>
                    </div>
                    <div className="copyrights">
                        <p>© Star Estate 2024</p>
                        <p>Designed &amp; Developed by: <img src="https://www.starestate.in/assets/images/ecis.png" /></p>
                    </div>
                </div>
            </div>
            <div
                className="button-top"
                style={{
                    opacity: isScrolled ? (showButton ? 1 : 0) : 0,
                    pointerEvents: showButton ? 'auto' : 'none',
                    transition: 'opacity 0.5s ease',
                }}
                onClick={scrollToTop}
            >
                <i className="fa fa-chevron-up" style={{ color: 'white' }}></i>
            </div>
        </footer>
    );
}
export default Footer;
