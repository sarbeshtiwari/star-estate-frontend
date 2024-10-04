import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../views/utils/axiosInstance';
// import logo from '../../assets/images/logo-starestate.png';
import SearchModal from './searchmodal';

export const fetchCities = async () => {
    try {
        const response = await axiosInstance.get(`/city/getCities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const [cities, setCities] = useState([]);
    useEffect(() => {
        const getCities = async () => {
            try {
                const data = await fetchCities();
                const sortedData = data.filter(city => city.status === true).sort((a, b) => a.location.trim().localeCompare(b.location.trim()));
                setCities(sortedData);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        getCities();
    }, []);

    useEffect(() => {
        const hasDropChildElements = document.querySelectorAll('.hasDropChild');
        const handleClick = function () {
            const dropdowns = document.querySelectorAll('.hasDropChild .dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
            const dropdown = this.querySelector('.dropdown');
            if (dropdown.style.display === 'none') {
                dropdown.style.display = 'block';
            } else {
                dropdown.style.display = 'none';
            }
        };
        hasDropChildElements.forEach(element => {
            element.addEventListener('click', handleClick);
        });
        return () => {
            hasDropChildElements.forEach(element => {
                element.removeEventListener('click', handleClick);
            });
        };
    }, []);

    const [developers, setDevelopers] = useState([]);
    const [errors, setErrorMessage] = useState([]);
    useEffect(() => {
        const fetchDeveloperDetails = async () => {
            try {
                const response = await axiosInstance.get(`/developers/getDeveloper`);
                const sortedData = response.data.filter(developer => developer.status === true).sort((a, b) => a.developerName.trim().localeCompare(b.developerName.trim()));
                setDevelopers(sortedData);
            } catch (error) {
                setErrorMessage(null);
                setDevelopers([]);
            }
        };
        fetchDeveloperDetails();
    }, []);

    // const { slugURL } = useParams();
    // const [cityDetails, setCityDetails] = useState(null);
    // useEffect(() => {
    //     const fetchCityDetails = async () => {
    //         try {
    //             const response = await axiosInstance.get(`/city/getCityBySlugURL/${slugURL}`);
    //             setCityDetails(response.data);
    //         } catch (error) {
    //             setCityDetails(null);
    //             setErrorMessage(null);
    //         }
    //     };
    //     fetchCityDetails();
    // }, [slugURL]);

    // const [builderDetails, setBuilderDetails] = useState(null);
    // useEffect(() => {
    //     const fetchBuilderDetails = async () => {
    //         try {
    //             const response = await axiosInstance.get(`addProjects/getProjectByDeveloper/${slugURL}`);
    //             setBuilderDetails(response.data);
    //         } catch (error) {
    //             setBuilderDetails(null);
    //             setErrorMessage(null);
    //         }
    //     };
    //     fetchBuilderDetails();
    // }, [slugURL]);

    // State for Search Modal
    const [showSearchModal, setShowSearchModal] = useState(false);
    const handleShowSearchModal = () => setShowSearchModal(true);
    const handleCloseSearchModal = () => setShowSearchModal(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const openModal = () => setIsModalOpen(true);
    // const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <header className="header">
                <div className="main-header">
                    <div className="container-lg d-flex justify-content-between position-relative">
                        <nav className="navi">
                            <div className="logo">
                                <Link to='/'>
                                    <img src='/star-estate-react/assets/images/logo-starestate.png' alt="Star Estate" />
                                </Link>
                            </div>
                            <div className="menu d-none d-lg-block">
                                <ul className="list-inline">
                                    <li className="haschild">
                                        <Link to="#">
                                            City <i className="fa fa-caret-down"></i>
                                        </Link>
                                        <div className="dropdown dropdown-lg scroller">
                                            <div className="dropdown-title">City</div>
                                            <ul className="list-inline">
                                                {cities.map((city) => (
                                                    <li key={city._id}>
                                                        <Link to={`/city/${city.slugURL}`}>{city.location}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="haschild">
                                        <Link to="#">
                                            Builder <i className="fa fa-caret-down"></i>
                                        </Link>
                                        <div className="dropdown dropdown-lg scroller">
                                            <div className="dropdown-title">Builder</div>
                                            <ul className="list-inline">
                                                {developers.map((developer, index) => (
                                                    <li key={index}>
                                                        <Link to={`/builder/${developer.slugURL}`}>{developer.developerName}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="haschild">
                                        <Link to='/projects'>
                                            Projects <i className="fa fa-caret-down"></i>
                                        </Link>
                                        <div className="dropdown dropdown-lg">
                                            <div className="dropdown-title">Projects</div>
                                            <ul className="list-inline">
                                                {/* <li><Link to="/projects/luxury">Luxury</Link></li> */}
                                                <li><Link to='/projects/residential'>Residential</Link></li>
                                                <li><Link to='/projects/commercial'>Commercial</Link></li>
                                                <li><Link to="/projects/new-launch">New Launches</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className="searchContainer">
                            <Link to='/channel-partner-registration' className="searchBtn" title="Register as a Channel Partner">
                                <span className="d-none d-lg-inline">Register as a Channel Partner</span>
                                <i className="fa fa-user"></i>
                            </Link>


                            <button className="searchBtn" title="Search Property" onClick={handleShowSearchModal}>
                                <span className="d-none d-lg-inline">Search Property</span>
                                <i className="fa fa-search"></i>
                            </button>
                            <SearchModal
                                show={showSearchModal}
                                handleClose={handleCloseSearchModal}
                                cities={cities}
                            />
                            <div className={`menuBtn ${menuOpen ? 'closeMenuBtn' : ''}`} onClick={toggleMenu}>
                                <span id="menuLine1"></span>
                                <span id="menuLine2"></span>
                                <span id="menuLine3"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div
                className={`menuContainer ${menuOpen ? 'open' : 'closed'}`}
                style={{ display: menuOpen ? 'block' : 'none' }}
            >
                <div className="bigMenuList">
                    <ul className="list-inline">
                        <li><Link to='/' onClick={closeMenu}>Home</Link></li>
                        <li><Link to='/about-us' onClick={closeMenu}>About Us</Link></li>
                        <li className="hasDropChild d-block d-sm-none">
                            <Link to="#">
                                City <i className="fa fa-caret-down"></i>
                            </Link>
                            <div className="dropdown">
                                <ul className="list-inline">
                                    {cities.map((city) => (
                                        <li key={city._id}>
                                            <Link to={`/city/${city.slugURL}`} onClick={closeMenu}>{city.location}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        <li className="hasDropChild d-block d-sm-none">
                            <a href="#">Builder <i className="fa fa-caret-down"></i></a>
                            <div className="dropdown">
                                <ul className="list-inline">
                                    {developers.map((developer, index) => (
                                        <li key={index}>
                                            <Link to={`/builder/${developer.slugURL}`} onClick={closeMenu}>{developer.developerName}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        {/* # with # */}
                        <li className="hasDropChild d-block d-sm-none">
                            <a href="#">Projects <i className="fa fa-caret-down"></i></a>
                            <div className="dropdown">
                                <ul className="list-inline">
                                    <li><Link to="/projects/luxury" onClick={closeMenu}>Luxury</Link></li>
                                    <li><Link to='/projects/residential' onClick={closeMenu}>Residential</Link></li>
                                    <li><Link to='/projects/commercial' onClick={closeMenu}>Commercial</Link></li>
                                    <li><Link to="/projects/new-launch" onClick={closeMenu}>New Launches</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li className="hasDropChild"><a href="#">Media <i className="fa fa-caret-down"></i></a>
                            <div className="dropdown">
                                <ul className="list-inline">
                                    <li><Link to='/awards' onClick={closeMenu}>Awards</Link></li>
                                    <li><Link to='/news' onClick={closeMenu}>News</Link></li>
                                    <li><Link to='/blogs' onClick={closeMenu}>Blogs</Link></li>
                                    <li><Link to='/events' onClick={closeMenu}>Events</Link></li>
                                    <li><Link to='/advertisements' onClick={closeMenu}>Advertisements</Link></li>
                                </ul>
                            </div>
                        </li>
                        {/* <li><Link to='/clients-speak' onClick={closeMenu}>Client's Speak</Link></li> */}
                        <li><Link to='/careers' onClick={closeMenu}>Careers</Link></li>
                        <li><Link to='/contact-us' onClick={closeMenu}>Contact us</Link></li>
                    </ul>
                </div>
                <div className="socialIcons stroke">
                    <ul className="list-inline">
                        <li style={{ '--i': 1 }}>
                            <a
                                href="https://www.facebook.com/starestate.in"
                                target="_blank"
                                rel="noreferrer"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Facebook"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                        </li>
                        <li style={{ '--i': 2 }}>
                            <a
                                href="https://www.instagram.com/starestate_official/"
                                target="_blank"
                                rel="noreferrer"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Instagram"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>
                        <li style={{ '--i': 3 }}>
                            <a
                                href="https://www.linkedin.com/company/star-estate"
                                target="_blank"
                                rel="noreferrer"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="LinkedIn"
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </li>
                        <li style={{ '--i': 4 }}>
                            <a
                                href="https://twitter.com/starestate2"
                                target="_blank"
                                rel="noreferrer"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Twitter"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>
                        <li style={{ '--i': 5 }}>
                            <a
                                href="https://www.youtube.com/channel/UCwfDf7Ut8jrkjiBeRnbZUPw"
                                target="_blank"
                                rel="noreferrer"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="YouTube"
                            >
                                <i className="fab fa-youtube"></i>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
};

export default Header;
