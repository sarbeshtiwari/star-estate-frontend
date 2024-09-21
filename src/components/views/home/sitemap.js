import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../widgets/header";
import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import Footer from "../../widgets/footer";

export const fetchCities = async () => {
    try {
        const response = await axiosInstance.get(`/city/getCities`);
        const filteredCity = response.data.filter(city => city.status === true);
        return filteredCity;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};

export const fetchDevelopers = async () => {
    try {
        const response = await axiosInstance.get(`/developers/getDeveloper`);
        const filteredDeveloper = response.data.filter(developer => developer.status === true);
        return filteredDeveloper;
    } catch (error) {
        console.error('Error fetching developers:', error);
        throw error;
    }
};

export const fetchSubCity = async () => {
    try {
        const response = await axiosInstance.get(`/`)
    } catch {}
}

export default function SiteMap() {
    const [cities, setCities] = useState([]);
    const [developers, setDevelopers] = useState([]);

    const navigate = useNavigate()

    // Fetch cities and developers data
    useEffect(() => {
        const getCities = async () => {
            try {
                const data = await fetchCities();
                const sortedData = data.sort((a, b) => a.location.trim().localeCompare(b.location.trim()));
                setCities(sortedData);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        getCities();
    }, []);

    useEffect(() => {
        const getDevelopers = async () => {
            try {
                const data = await fetchDevelopers();
                const sortedData = data.sort((a, b) => a.developerName.trim().localeCompare(b.developerName.trim()));
                setDevelopers(sortedData);
            } catch (error) {
                console.error('Error fetching developers:', error);
            }
        };
        getDevelopers();
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


    const propertyTypes = [
        { type: "2BHK", labels: ["2 BHK Projects", "2 BHK Flats", "2 BHK Property", "2 BHK Apartments"] },
        { type: "3BHK", labels: ["3 BHK Projects", "3 BHK Flats", "3 BHK Property", "3 BHK Apartments"] },
        { type: "4BHK", labels: ["4 BHK Projects", "4 BHK Flats", "4 BHK Property", "4 BHK Apartments"] },
        { type: "5BHK", labels: ["5 BHK Projects", "5 BHK Flats", "5 BHK Property", "5 BHK Apartments"] },
      ];

      const handleLinkClick = (type, label, city) => {
        // Create a slug from the type, label, and city
        const slug = `${label.toLowerCase().replace(/\s+/g, '-')}-in-${city.toLowerCase().replace(/\s+/g, '-')}`;
        // Navigate to the constructed URL
        navigate(`/projects/${slug}`);
      };

    return (
        <>
            <div>
                {/* <Header /> */}
                <div className="emptyBox"></div>
                <div className="w-100">
                    <div className="container-lg">
                        <div className="breadcrumbContainer" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active">Sitemap</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="w-100 padding">
                    <div className="container-lg">
                        <div className="heading mx-sm-auto text-sm-center">
                            <h1 className="h3 mb-0">Sitemap</h1>
                        </div>
                        <div className="readmore mt-0 mb-4 w-100">
                            <Link to="/" className="button w-100">Home</Link>
                        </div>
                        <div class="sitemapContainer">
                            <div className="row">
                                <div className="col-lg-4 col-sm-6 sitemapBox">
                                    <ul className="list">
                                        <li><Link to="/about-us">About Us</Link></li>
                                        <li><Link to="/clients-speak">Client's Speak</Link></li>
                                        <li><Link to="/careers">Careers</Link></li>
                                        <li><Link to="/contact-us">Contact Us</Link></li>
                                    </ul>
                                </div>
                                <div className="col-lg-4 col-sm-6 sitemapBox">
                                    <ul className="list">
                                        <li><Link to="/faq">FAQs</Link></li>
                                        <li><Link to="/buyer-guide">Buyer Guide</Link></li>
                                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                        {/* <li><Link to="/sitemap">Sitemap</Link></li> */}
                                    </ul>
                                </div>
                                <div className="col-lg-4 col-sm-6 sitemapBox">
                                    <ul className="list">
                                        <li><b>Media</b></li>
                                        <ul className="list">
                                            <li><Link to="/awards">Awards</Link></li>
                                            <li><Link to="/news">News</Link></li>
                                            <li><Link to="/events">Events</Link></li>
                                            <li><Link to="/blogs">Blogs</Link></li>
                                            <li><Link to="/advertisements">Advertisements</Link></li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Cities Section */}
                        <div className="sitemapContainer">
                            <div className="heading">
                                <h6 className="mb-0 text-primary">Our Cities</h6>
                            </div>
                            <div className="sitemapBox">
                                <div className="readmore d-flex mt-0 flex-wrap w-100">
                                    {cities.length > 0 ? (
                                        cities.map((city) => (
                                            <Link key={city._id} to={`/city/${city.slugURL}`} className="button gray">
                                                {city.location}
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <span className="ml-2">Loading...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Developers Section */}
                        <div className="sitemapContainer">
                            <div className="heading">
                                <h6 className="mb-0 text-primary">Our Builders</h6>
                            </div>
                            <div className="sitemapBox">
                                <div className="readmore d-flex mt-0 flex-wrap w-100">
                                    {developers.length > 0 ? (
                                        developers.map((developer) => (
                                            <Link key={developer._id} to={`/builder/${developer.slugURL}`} className="button gray">
                                                {developer.developerName}
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <span className="ml-2">Loading...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="sitemapContainer">
                            <div className="heading">
                                <h6 className="mb-0 text-primary">Our Projects</h6>
                            </div>
                            <div className="sitemapBox">
                                <ul className="list d-flex">
                                    <li><Link to="/projects/luxury">Luxury</Link></li>
                                    <li><Link to="/projects/residential">Residential</Link></li>
                                    <li><Link to="/projects/commercial">Commercial</Link></li>
                                    <li><Link to="/projects/new-launch">New Launches</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* Studio Apartments */}
                        <div className="sitemapContainer">
                            <div className="heading">
                                <h6 className="mb-0 text-primary">Studio Apartments</h6>
                            </div>
                            <div className="sitemapBox position-relative">
                                <ul className="list d-flex">
                                    {cities.map((city) => (
                                        <li key={city._id}>
                                            <a href="#">{city.location} <i className="fa fa-chevron-down"></i></a>
                                        
                                            <div className="sublinks">
                                                <ul className="list d-flex scroller">
                                                    <li><a href="#">Studio Apartments in {city.location}</a></li>
                                                
                                                </ul>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Property by city */}
                        <div className="sitemapContainer">
                            {cities.map((city) => (
                                <div key={city._id} className="mb-4">
                                <div className="row">
                                    <div className="col-12">
                                    <div className="heading">
                                        <h3>{city.location}</h3>
                                    </div>
                                    </div>
                                </div>

                                {propertyTypes.map((property) => (
                                    <div className="row sitemapBox" key={property.type}>
                                        <div className="col-12">
                                            <div className="heading">
                                            <h6 className="mb-0 text-primary">{property.type}</h6>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="readmore d-flex mt-0 flex-wrap w-100">
                                                {property.labels.map((label, index) => (
                                                    <button
                                                        key={index}
                                                        className="button gray me-2 mb-2"
                                                        onClick={() => handleLinkClick(property.type, label, city.location)}
                                                        style={{ cursor: 'pointer' }} // Optional: to indicate it's clickable
                                                    >
                                                        {label} in {city.location}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
}
