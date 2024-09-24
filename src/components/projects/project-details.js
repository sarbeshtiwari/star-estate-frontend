import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './style.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axiosInstance from '../views/utils/axiosInstance';
import { useLocation } from "react-router-dom";
import {
    getProjectLocationAdvantages,
    getLocationAdvantages,
    getAllTheAmenities,
    getProjectAmenities
} from './amenities';



export const sendProjectQuery = async (formData) => {
    // console.log(formData)
    try {
        const response = await axiosInstance.post(`/userQuery/addQuery`, formData);
        return response;
    } catch (error) {
        // console.error('Error sending data:', error);
        throw error;
    }
};

function ProjectDetails() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);
    const { slugURL } = useParams();
    const modalRef = useRef(null);
    // Functions to open and close the modal

    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        // If the clicked item is already active, deactivate it by setting the activeIndex to null
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    const openDetailModal = () => {
        if (modalRef.current) {
            modalRef.current.classList.add("active");
        }
    };
    const closeDetailModal = () => {
        if (modalRef.current) {
            modalRef.current.classList.remove("active");
        }
    };
    const [show, setShow] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        phoneNumber: '',
        projectName: slugURL,
    });
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePhoneChange = (phone) => {
        setFormData(prevData => ({
            ...prevData,
            phoneNumber: phone
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChecked) {
            return; // Do not submit if checkbox is not checked
        }

        try {
            // Replace with your API call
            await sendProjectQuery(formData);
            setSuccessMessage('Form submitted successfully!');

            // Clear form data after submission
            setFormData({
                Name: '',
                Email: '',
                phoneNumber: '',
                projectName: slugURL,
            });

            setTimeout(() => {
                setSuccessMessage(''); // Clear message after some time
            }, 2000);
        } catch (error) {
            setSuccessMessage('Failed to submit the form.');
        }
    };



    const [mainData, setMainData] = useState([]);
    const [quickDetails, setQuickDetails] = useState([]);
    const [phone, setPhone] = useState('');
    const [project, setProject] = useState(null);
    const [walkthrough, setWalkthrough] = useState(null);
    const [floorPlan, setFloorPlan] = useState([]);
    const [floorData, setFloorData] = useState([]);
    const [galleryContent, setGalleryContent] = useState([]);
    const [galleryData, setGalleryData] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [amenitiesContent, setAmenitiesContent] = useState([]);
    const [locationAdvantages, setLocationAdvantages] = useState([]);
    const [similarProjects, setsimilarProjects] = useState([]);
    const [details, setDetails] = useState([]);
    const [details2, setDetails2] = useState([]);
    const [bankDetails, setBankDetails] = useState([]);
    const [Faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeSwipers = () => {
            new Swiper('.ameninity-slider', {
                slidesPerView: 1,
                spaceBetween: 10,
                centeredSlides: true,
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    280: { slidesPerView: 1 },
                    375: { slidesPerView: 2 },
                    640: { slidesPerView: 3, spaceBetween: 20 },
                    1200: { slidesPerView: 4, spaceBetween: 30 },
                    1400: { slidesPerView: 5, spaceBetween: 30 },
                    1900: { slidesPerView: 6, spaceBetween: 30 },
                }
            });
            new Swiper('.photo-slider', {
                slidesPerView: 'auto',
                spaceBetween: 10,
                loop: true,
                centeredSlides: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
            });
        };
        initializeSwipers();
    }, []);
    useEffect(() => {
        var swiper = new Swiper('.project-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                280: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
                1600: {
                    slidesPerView: 3,
                },
            }
        });
    }, []);


    useEffect(() => {
        const fetchMainProjectData = async () => {
            try {
                const response = await axiosInstance.get(`/addProjects/getProjectBySlug/${slugURL}`);
                const fetchedData = response.data;

                // Check if fetchedData is an array and has at least one item
                if (Array.isArray(fetchedData) && fetchedData.length > 0) {
                    const mainProject = fetchedData[0]; // Assuming the main project is the first item
                    setMainData([mainProject]);

                    // Fetch similar projects if necessary
                    if (mainProject.showSimilarProperties === true) {
                        fetchProjectsByLocation(mainProject.cityLocation, mainProject.projectName);
                    }
                } else {
                    throw new Error('No project data found');
                }
            } catch (error) {
                setError('Error fetching main project data');
                // console.error('Error fetching main project data:', error);
            }
        };

        fetchMainProjectData();
    }, [slugURL]);

    useEffect(() => {
        const fetchQuickDetails = async () => {
            try {
                const response = await axiosInstance.get(`/quickDetails/getQuickDetailsByProjectName/${slugURL}`);
                setQuickDetails(response.data);
            } catch (error) {
                setError('Error fetching quick details');
                // console.error('Error fetching quick details:', error);
            }
        };
        fetchQuickDetails();
    }, [slugURL]);
    useEffect(() => {
        const fetchProjectContent = async () => {
            try {
                const response = await axiosInstance.get(`projectContentSEO/getContentSEO/${slugURL}`);
                setProject(response.data);
            } catch (error) {
                setError('Error fetching project content');
                // console.error('Error fetching project content:', error);
            }
        };
        fetchProjectContent();
    }, [slugURL]);
    useEffect(() => {
        const fetchWalkthrough = async () => {
            try {
                const response = await axiosInstance.get(`projectBrochureWalkthrough/getBrochure_Walkthrough/${slugURL}`);
                setWalkthrough(response.data);
            } catch (error) {
                setError('Error fetching walkthrough');
                // console.error('Error fetching walkthrough:', error);
            }
        };
        fetchWalkthrough();
    }, [slugURL]);
    useEffect(() => {
        const fetchFloorPlan = async () => {
            try {
                const response = await axiosInstance.get(`projectFloorPlan/getFloorContent/${slugURL}`);
                setFloorPlan(response.data.data.length > 0 ? response.data.data[0] : null);
            } catch (error) {
                setError('Error fetching floor plan');
                // console.error('Error fetching floor plan:', error);
            }
        };
        fetchFloorPlan();
    }, [slugURL]);
    useEffect(() => {
        const fetchFloorData = async () => {
            try {
                const response = await axiosInstance.get(`projectFloorPlan/getFloorPlan/${slugURL}`);
                setFloorData(response.data);
            } catch (error) {
                setError('Error fetching floor data');
                // console.error('Error fetching floor data:', error);
            }
        };
        fetchFloorData();
    }, [slugURL]);
    useEffect(() => {
        const fetchGalleryContent = async () => {
            try {
                const response = await axiosInstance.get(`projectGallery/getGalleryContent/${slugURL}`);
                setGalleryContent(response.data.data.length > 0 ? response.data.data[0] : null);
            } catch (error) {
                setError('Error fetching gallery content');
                // console.error('Error fetching gallery content:', error);
            }
        };
        fetchGalleryContent();
    }, [slugURL]);
    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const response = await axiosInstance.get(`projectGallery/getProjectGallery/${slugURL}`);
                
                setGalleryData(response.data);
            } catch (error) {
                setError('Error fetching gallery data');
                // console.error('Error fetching gallery data:', error);
            }
        };
        fetchGalleryData();
    }, [slugURL]);
    const [bannerImages, setBannerImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // State for current index

    // useEffect(() => {
    //     const fetchBannerImages = async () => {
    //         try {
    //             const response = await axiosInstance.get(`projectBannerImages/get/${slugURL}`);
    //             if (Array.isArray(response.data) && response.data.length > 0) {
    //                 // Filter images whose status is true
    //                 const filteredImages = response.data.filter(image => image.status === true);
    //                 setBannerImages(filteredImages);
    //             } else {
                    // console.error('Unexpected response structure or no images found:', response.data);
    //                 setBannerImages([]);
    //             }
    //         } catch (error) {
                // console.error('Error fetching banner images:', error);
    //             setBannerImages([]);
    //         }
    //     };

    //     fetchBannerImages();
    // }, [slugURL]);

    useEffect(() => {
        const fetchBannerImages = async () => {
            try {
                const response = await axiosInstance.get(`projectBannerImages/get/${slugURL}`);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const filteredImages = response.data.filter(image => image.status === true);
                    setBannerImages(filteredImages);
                } else {
                    // console.error('Unexpected response structure or no images found:', response.data);
                    setBannerImages([]);
                }
            } catch (error) {
                // console.error('Error fetching banner images:', error);
                setBannerImages([]);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBannerImages();
    }, [slugURL]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [bannerImages]);
    // Fetch Project Amenities and All Amenities
    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const [projectAmenitiesResponse, allAmenitiesResponse] = await Promise.all([
                    getProjectAmenities(slugURL),
                    getAllTheAmenities()
                ]);
                const projectAmenities = Array.isArray(projectAmenitiesResponse.data.data) ? projectAmenitiesResponse.data.data : [];
                const projectAmenitiesContent = Array.isArray(projectAmenitiesResponse.data.data1) ? projectAmenitiesResponse.data.data1 : [];
                const activeAmenities = projectAmenities.filter(amenity => amenity.status === true);
                const allAmenities = Array.isArray(allAmenitiesResponse.data) ? allAmenitiesResponse.data : [];
                const amenitiesMap = new Map(allAmenities.map(amenity => [amenity._id, amenity]));
                const matchedAmenities = activeAmenities.map(amenity => amenitiesMap.get(amenity.amenityId)).filter(Boolean);
                setAmenities(matchedAmenities);
                setAmenitiesContent(projectAmenitiesContent);
            } catch (error) {
                setError('Error fetching project and all amenities');
                // console.error('Error fetching project and all amenities:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAmenities();
    }, [slugURL]);
    // Fetch Project Location Advantages and All Location Advantages
    useEffect(() => {
        const fetchLocationAdvantages = async () => {
            try {
                const [projectLocationResponse, allLocationResponse] = await Promise.all([
                    getProjectLocationAdvantages(slugURL),
                    getLocationAdvantages()
                ]);
                const projectLocationAdvantages = Array.isArray(projectLocationResponse.data.data) ? projectLocationResponse.data.data : [];
                const activeLocationAdvantages = projectLocationAdvantages.filter(adv => adv.status);
                const allLocationAdvantages = Array.isArray(allLocationResponse.data) ? allLocationResponse.data : [];
                const LocationAdvantagesMap = new Map(allLocationAdvantages.map(adv => [adv._id, adv]));
                const matchedLocationAdvantages = activeLocationAdvantages.map(adv => LocationAdvantagesMap.get(adv.LocationAdvantagesId)).filter(Boolean);
                setLocationAdvantages(matchedLocationAdvantages);
                setDetails(projectLocationResponse.data.data1);
                setDetails2(projectLocationResponse.data.data);
            } catch (error) {
                setError('Error fetching project and all location advantages');
                // console.error('Error fetching project and all location advantages:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLocationAdvantages();
    }, [slugURL]);
    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const response = await axiosInstance.get(`projectBanks/getprojectBanks/${slugURL}`);
                // Wrap the response data in an array
                setBankDetails([response.data]);
            } catch (error) {
                setError('Error fetching project content');
                // console.error('Error fetching project content:', error);
            }
        };
        fetchAccountDetails();
    }, [slugURL]);
    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await axiosInstance.get(`projectFaq/getFAQByProject/${slugURL}`);
                const filteredCommercialProjectsDetails = response.data.filter(award => award.status === true);
                setFaqs(filteredCommercialProjectsDetails);
                // setFaqs(response.data);
            } catch (error) {
                // console.error('Error fetching FAQs:', error);
            }
        };
        fetchFAQs();
    }, [slugURL]);
    // Fetch projects by location from the API
    const fetchProjectsByLocation = async (cityLocation, currentProjectName) => {
        try {
            const response = await axiosInstance.get(`addProjects/getProjectByLocation/${cityLocation}`);
            const filteredProjects = response.data.filter(project => project.status === true);

            // Debugging statements
            // console.log('Current Project Name:', currentProjectName);
            // console.log('Fetched Projects:', filteredProjects);

            // Exclude the current project based on its name (case-insensitive)
            const filteredSimilarProjects = filteredProjects.filter(project =>
                project.projectName.trim().toLowerCase() !== currentProjectName.trim().toLowerCase()
            );

            // console.log('Filtered Similar Projects:', filteredSimilarProjects);
            setsimilarProjects(filteredSimilarProjects);
        } catch (error) {
            // console.error('Error fetching projects:', error);
        }
    };
    


    return (
        <div>
            <header className="header">
                <div className="main-header">
                    <div className="container-lg d-flex justify-content-between position-relative align-items-center">
                        {mainData.map((data, index) => (
                            <div key={index} className="logo">
                                <Link to='/'><img src={`${axiosInstance.defaults.globalURL}${data.project_logo}`} alt='' /></Link>
                            </div>
                        ))}
                        <nav className="navi d-none d-lg-flex">
                            <div className="menu">
                                <ul className="list-inline">
                                    <li><a href="#overview">Overview</a></li>
                                    <li><a href="#amenities">Amenities</a></li>
                                    <li><a href="#floorplan">Plans &amp; Price</a></li>
                                    <li><a href="#gallery">Gallery</a></li>
                                    <li><a href="#location">Location</a></li>
                                </ul>
                            </div>
                        </nav>
                        <div className={`menuBtn d-flex d-lg-none ${menuOpen ? 'closeMenuBtn' : ''}`} onClick={toggleMenu}>
                            <span id="menuLine1"></span>
                            <span id="menuLine2"></span>
                            <span id="menuLine3"></span>
                        </div>
                        <div className="logo"><Link to='/'><img src="/star-estate-react/assets/images/logo-starestate.png" alt="Star Estate" /></Link></div>
                    </div>
                </div>
            </header>
            <div className={`menuContainer ${menuOpen ? 'open' : 'closed'}`} style={{ display: menuOpen ? 'block' : 'none' }}>
                <div className="bigMenuList">
                    <ul className="list-inline">
                        <li><a href="#overview">Overview</a></li>
                        <li><a href="#amenities">Amenities</a></li>
                        <li><a href="#floorplan">Plans & Price</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                        <li><a href="#location">Location</a></li>
                    </ul>
                </div>
            </div>
            <div id="projectBanner" className="carousel slide projectBanner" data-bs-pause="false" data-bs-ride="carousel">
                <div className="reraBox d-flex d-lg-none mb-0 px-3 pt-2">
                    {mainData.map((data, index) => (
                        <React.Fragment key={index} >
                            <div className="qr_img"><img src={`${axiosInstance.defaults.globalURL}${data.rera_qr}`} alt='' /></div>
                            <div className="rera_num">
                                <small className="mb-0"><strong className="text-primary">RERA No: </strong> {data.rera_no}<br /><a href={data.reraWebsite} target="_blank" className="small text-primary"><i className="fa fa-link"></i> {data.reraWebsite}</a></small>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className="carousel-inner h-100">
                    {loading ? (
                        <div className="carousel-item h-100 active">
                            <p>Loading images...</p>
                        </div>
                    ) : bannerImages.length > 0 ? (
                        bannerImages.map((image, index) => (
                            <div key={index} className={`carousel-item h-100 ${index === currentIndex ? 'active' : ''}`}>
                                <picture>
                                    <source media="(max-width: 520px)" srcSet={image.mobile_image_url} />
                                    <source media="(min-width: 521px) and (max-width: 1024px)" srcSet={image.tablet_image_url} />
                                    <img src={image.desktop_image_url} className="d-block w-100 h-100 object-cover" alt={image.alt_tag_desktop} />
                                </picture>
                            </div>
                        ))
                    ) : (
                        <div className="carousel-item h-100 active">
                            <p>No images available</p>
                        </div>
                    )}
                </div>
                {/* <div className="carousel-inner h-100">
                    {bannerImages.length > 0 ? (
                        bannerImages.map((image, index) => (
                            <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                                <picture>
                                    <source media="(max-width: 520px)" srcSet={image.mobile_image_url} />
                                    <source media="(min-width: 521px) and (max-width: 1024px)" srcSet={image.tablet_image_url} />
                                    <img src={image.desktop_image_url} className="d-block w-100 h-100 object-cover" alt={image.alt_tag_desktop} />
                                </picture>
                            </div>
                        ))
                    ) : (
                        <div className="carousel-item h-100 active">
                            <p>No images available</p>
                        </div>
                    )}
                </div> */}
                {mainData.length > 0 && quickDetails.length > 0 && mainData.map((data, index) => {
                    let projectType = "";
                    let unitType = "";
                    let paymentPlan = "";
                    if (data.status !== true) {
                        return null;
                    }
                    quickDetails.forEach(detail => {
                        switch (detail.heading) {
                            case "Project Type":
                                projectType = detail.data;
                                break;
                            case "Unit Type":
                                unitType = detail.data;
                                break;
                            case "Payment Plan":
                                paymentPlan = detail.data;
                                break;
                            default:
                                break;
                        }
                    });
                    return (
                        <div key={index} className="container-lg hero-textbox d-none d-lg-flex">
                            {projectType && (
                                <div className="new-launch-badge">{projectType}</div>
                            )}
                            <div className="inner">
                                <div className="heading">
                                    <h1 className="h3 mb-0">{data.projectName}</h1>
                                    <h6 className="page-location project-location pt-2">
                                        <small><i className="fa fa-map-marker-alt text-secondary"></i></small> {data.projectAddress}
                                    </h6>
                                </div>
                                <ul className="list-inline hero-pointers">
                                    <li><strong>Price:</strong> <span> {data.projectPrice === 'On Request' || data.projectPrice === 'Revealing Soon' ? `${data.projectPrice}` : <><i className="fa fa-indian-rupee-sign"></i> {data.projectPrice}*</>}</span></li>
                                    {unitType && (
                                        <li>
                                            <span>{unitType}</span>
                                        </li>
                                    )}
                                </ul>
                                <div className="readmore mt-3 ml-lg-0">
                                    <a
                                        href={`https://api.whatsapp.com/send?phone=+91&text=Hi I am interested in ${data.projectName}, Please share the details.`}
                                        target="_blank"
                                        className="button light getWhatsapp"
                                        rel="noopener noreferrer"
                                    >
                                        <span>Get details on </span><i className="fab fa-whatsapp"></i>
                                    </a>
                                </div>
                            </div>
                            {paymentPlan && (
                                <div className="payment-plan-box">
                                    <small className="d-block mb-0">Exclusive <br />Payment Plan</small>
                                    <span className="h1 d-block mb-0">{paymentPlan}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
                <div className="heroFormContainer d-none d-lg-flex shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-0">
                            <div className="col-lg-12 col-md-4 col-sm-4 col form-group"><input type="text" className="form-control" placeholder="Name*" name="Name" 
                                onChange={handleInputChange}
                                required /></div>
                            <div className="col-lg-12 col-md-4 col-sm-4 form-group"><input type="email" className="form-control" placeholder="Your email address*" name="Email"
                                onChange={handleInputChange}
                                required /></div>
                            <div className="col-lg-12 col-md-4 col-sm-4 form-group"><input type="number" className="form-control" placeholder="Your phone number*" name="phoneNumber"
                                onChange={handleInputChange}
                                required /></div>

                            <div className="col-12 form-group">
                                <div className="custom-control d-flex ml-3 custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck1"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="custom-control-label" htmlFor="customCheck1">
                                        I hereby agree for processing my personal data
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="readmore mt-0 ml-lg-0">
                            <button className="button" type="submit" disabled={!isChecked}>
                                Send Message
                            </button>
                        </div>
                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                    </form>
                </div>
            </div>
            {/* -----------Mobile view--------------- */}
            <div className="heroFormContainer shadow">
                <div className="reraBox d-none d-lg-flex">
                    {mainData.map((data, index) => (
                        <React.Fragment key={index}>
                            <div className="qr_img"><img src={`${axiosInstance.defaults.globalURL}${data.rera_qr}`} alt='' /></div>
                            <div className="rera_num">
                                <small className="mb-0"><strong className="text-primary">RERA No: </strong>  {data.rera_no}<br /><a href={data.reraWebsite} target="_blank" className="small text-primary"><i className="fa fa-link"></i> {data.reraWebsite} </a></small>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                {mainData.length > 0 && quickDetails.length > 0 && mainData.map((data, index) => {
                    let projectType = "";
                    let unitType = "";
                    let paymentPlan = "";
                    if (data.status !== true) {
                        return null;
                    }
                    quickDetails.forEach(detail => {
                        switch (detail.heading) {
                            case "Project Type":
                                projectType = detail.data;
                                break;
                            case "Unit Type":
                                unitType = detail.data;
                                break;
                            case "Payment Plan":
                                paymentPlan = detail.data;
                                break;
                            default:
                                break;
                        }
                    });
                    return (
                        <div key={index} className="hero-textbox d-block d-lg-none">
                            <div className="inner">
                                <div className="heading">
                                    <h1 className="h3 mb-0">{data.projectName}</h1>
                                    <h6 className="page-location project-location pt-2"><small><i className="fa fa-map-marker-alt text-secondary"></i></small>  {data.projectAddress}</h6>
                                </div>
                                <ul className="list-inline hero-pointers">
                                    <li><strong>Price:</strong> <span>₹{data.projectPrice}</span></li>
                                    {unitType && (
                                        <li>
                                            <span>{unitType}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            {paymentPlan && (
                                <div className="payment-plan-box justify-content-center">
                                    <small className="d-block mb-0">Exclusive <br />Payment Plan</small>
                                    <span className="h1 d-block mb-0">{paymentPlan}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
                <form onSubmit={handleSubmit}>
                    <div className="row g-2">
                        <div className="col-lg-12 col-md-4 col-sm-4 col form-group"><input type="text" className="form-control" placeholder="Name*" name="Name" value={formData.Name}
                            onChange={handleInputChange}
                            required /></div>
                        <div className="col-lg-12 col-md-4 col-sm-4 form-group"><input type="email" className="form-control" placeholder="Your email address*" name="Email" value={formData.Email}
                            onChange={handleInputChange}
                            required /></div>
                        <div className="col-lg-12 col-md-4 col-sm-4 form-group"><input type="number" className="form-control" placeholder="Your phone number*" name="phoneNumber" value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required /></div>

                        <div className="col-12 form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="custom-control-label" htmlFor="customCheck1">
                                    I hereby agree for processing my personal data
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="readmore mt-0 mx-auto ml-lg-0"><button className="button" type="submit" disabled={!isChecked}>
                        Send Message
                    </button></div>
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                </form>
            </div>
            {/* -----------Mobile view--------------- */}
            <div id="overview" className="w-100 padding pb-0 projectDetails section-overview">
                <div className="container-lg">
                    <div className="section-details text-sm-center">
                        {project && Array.isArray(project) && project.length > 0 ? (
                            project.map((item, index) => (
                                <div key={index}>
                                    <div className="heading mx-auto text-center">
                                        <h2 className="mb-0">About The Project</h2>
                                    </div>
                                    <div
                                        className="description"
                                        dangerouslySetInnerHTML={{ __html: item.briefDescription }}
                                    />
                                    <div className="readmore w-100 d-flex justify-content-center">
                                        <button
                                            type="button"
                                            id="projectOverview-btn"
                                            className="button"
                                            onClick={openDetailModal}
                                        >
                                            Read More
                                        </button>
                                        <a href="#formModal" data-bs-toggle="modal" onClick={handleShow} className="button gray">Download Brochure</a>
                                        <a href="#formModal" data-bs-toggle="modal" onClick={handleShow} className="button">Schedule Site Visit</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No project data available</p>
                        )}
                    </div>
                </div>
            </div>
            {/* walkthrough */}
            <div className="w-100 padding section-walkthrough">
                <div className="container-lg">
                    <div className="row justify-content-center">
                        <div className="col-xxl-8 col-lg-10 walkthroughBox">
                            <div className="inner padding overlayBox">
                                <div className="heading mx-auto mb-0 text-sm-center w-100 text-white position-relative">
                                    <div className="row justify-content-center">
                                        <div className="col-11">
                                            <h2 className="mb-3">Walkthrough</h2>
                                            {walkthrough && walkthrough.map((item, index) => (
                                                <p key={index} className="mb-0" dangerouslySetInnerHTML={{ __html: item.walkthrough }} />
                                            ))}
                                            <div className="readmore mx-auto mt-4">
                                                <a href="#formModal" onClick={handleShow} data-bs-toggle="modal" className="button light">View</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {galleryData.length > 0 ? (
                                    galleryData.find(data => data.displayHome) ? (
                                        <picture>
                                        <source
                                            media="(max-width: 520px)"
                                            srcSet={`${axiosInstance.defaults.globalURL}${galleryData.find(data => data.displayHome).mobileImage}`}
                                        />
                                        <img
                                            src={`${axiosInstance.defaults.globalURL}${galleryData.find(data => data.displayHome).desktopImage}`}
                                            className="position-absolute"
                                            alt=""
                                        />
                                        </picture>
                                    ) : (
                                        <img
                                        src="/star-estate-react/assets/images/lodha-bellevue/gallery/1.webp"
                                        className="position-absolute"
                                        alt="Default"
                                        />
                                    )
                                    ) : (
                                    <div>No gallery data available</div>
                                    )}


                                {/* {galleryData.map((data, index) => (
                                    data.displayHome === true ? (
                                        <picture>
                                            <source media="(max-width: 520px)" srcSet={`${axiosInstance.defaults.globalURL}${data.mobileImage}`} />
                                            <img
                                                key={index}
                                                src={`${axiosInstance.defaults.globalURL}${data.desktopImage}`}
                                                className="position-absolute"
                                                alt=""
                                            />
                                        </picture>
                                    ) : (
                                        <img
                                            key={index}
                                            src="/star-estate-react/assets/images/lodha-bellevue/gallery/1.webp"
                                            className="position-absolute"
                                            alt="Default"
                                        />
                                    )
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={modalRef} className="projectOverview-modal">
                <div className="inner">
                    <div className="projectModal-header">
                        <h6 className="mb-0">Project Details</h6>
                        {/* Using the close function to remove the "active" class */}
                        <button className="projectOverview-close" onClick={closeDetailModal}>
                            &times;
                        </button>
                    </div>
                    {project && Array.isArray(project) && project.length > 0 ? (
                        project.map((item, index) => (
                            <div key={index} className="projectOverview-details scroller">
                                <p dangerouslySetInnerHTML={{ __html: item.description }} />
                            </div>
                        ))
                    ) : (
                        <p>No project data available</p>
                    )}
                    <div className="readmore w-100 mt-0">
                        <a href="#formModal" data-bs-toggle="modal" className="button w-100">
                            I'm interested in this project
                        </a>
                    </div>
                </div>
            </div>
                {/* amenities */}
                <div
                id="amenities"
                className="w-100 padding position-relative overflow-hidden bg-image has-overlay section-amenities"
                style={{
                    backgroundImage: `url(${
                    galleryData.some(data => data.amenityImage)
                        ? `${axiosInstance.defaults.globalURL}${galleryData.find(data => data.amenityImage).desktopImage}`
                        : '/star-estate-react/assets/images/lodha-bellevue/gallery/1.webp' // Default image if no amenityImage is found
                    })`
                }}
                >
                <div className="container-lg">
                    <div className="heading mx-auto text-sm-center text-white">
                    <h2 className="mb-3">Amenities</h2>
                    <p
                        className="mb-0"
                        dangerouslySetInnerHTML={{
                        __html:
                            amenitiesContent &&
                            amenitiesContent.length > 0 &&
                            amenitiesContent[0].amenityContent
                            ? amenitiesContent[0].amenityContent
                            : ''
                        }}
                    ></p>
                    </div>

                    <div className="swiper ameninity-slider amenitiesContainer">
                    <div className="swiper-wrapper">
                        {amenities.length > 0 ? (
                        amenities.map((amenity) => (
                            <div className="swiper-slide amenBox" key={amenity._id}>
                                <div className="inner">
                                    <div className="img-fluid">
                                    <img
                                        src={`${axiosInstance.defaults.globalURL}${amenity.image}`}
                                        className="filter-white"
                                        alt={amenity.alt_tag}
                                    />
                                    </div>
                                    <p className="mb-0">{amenity.title}</p>
                                </div>
                            </div>
                        ))
                        ) : (
                        <div>No amenities available</div>
                        )}
                    </div>

                    <div className="swiper-controls">
                        <div
                        className="swiper-button-prev bg-white"
                        tabIndex="0"
                        role="button"
                        aria-label="Previous slide"
                        ></div>
                        <div className="readmore mt-0">
                        <a
                            href="#formModal"
                            onClick={handleShow}
                            data-bs-toggle="modal"
                            className="button light"
                        >
                            View All
                        </a>
                        </div>
                        <div
                        className="swiper-button-next bg-white"
                        tabIndex="0"
                        role="button"
                        aria-label="Next slide"
                        ></div>
                    </div>
                    </div>
                </div>
                </div>

            {/* Floor plan */}

            <div id="floorplan" className="w-100 padding section-floorplan">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h2 className="mb-3">Floor Plans</h2>
                        <p
                            className="mb-0"
                            dangerouslySetInnerHTML={{
                                __html: floorPlan ? floorPlan.floorPlanContent : '',
                            }}
                        ></p>

                    </div>
                    <div className="fpContainer">
                        <div className="row gap-row justify-content-center">
                            {floorData.map((floorPlan, index) => (
                                <div key={index} className="col-xl-4 col-md-4 col-sm-6 fpBox">
                                    <div className="inner">
                                        <div className="img-fluid">
                                            <img
                                                src={`${axiosInstance.defaults.globalURL}${floorPlan.image}`}
                                                alt="Floor Plan"
                                                onError={(e) => e.target.src = '/star-estate-react/assets/images/generic-floorplan.jpg'}
                                            />
                                        </div>
                                        <div className="planBase">
                                            <div className="row justify-content-center justify-content-lg-start no-gutters">
                                                <div className="col-12 fpDetails">
                                                    <div className="icon">
                                                        <img src="/star-estate-react/assets/images/icons/bed.png" alt="Beds" />
                                                    </div>
                                                    <div className="fptypes">
                                                        <small>Type</small>
                                                        <h6 className="mb-0">{floorPlan.title || 'N/A'}</h6>
                                                    </div>
                                                </div>
                                                <div className="col-12 fpDetails">
                                                    <div className="icon">
                                                        <img src="/star-estate-react/assets/images/icons/area.png" alt="Area" />
                                                    </div>
                                                    <div className="fptypes">
                                                        <small>Area</small>
                                                        <small className="font-weight-bolder d-block">{floorPlan.areaRangeSqft || 'N/A'} Sqft</small>
                                                        <small className="font-weight-bolder d-block">{floorPlan.areaRangeSqm || 'N/A'} Sqmt</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="readmore">
                                                <a href="#formModal" onClick={handleShow} data-bs-toggle="modal" className="button gray border-green w-100">Price on request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Gallery */}
            <div id="gallery" className="w-100 padding bg-dark section-gallery">
            <div className="container-lg">
                <div className="heading mx-auto text-center text-white">
                <h2 className="mb-3">Gallery</h2>
                <p className="mb-0">
                    {galleryContent ? galleryContent.projectGalleryContent : ''}
                </p>
                </div>
                <div className="swiper photo-slider">
                <div className="swiper-wrapper">
                    {galleryData.map((galleryData, index) => (
                    <div key={index} className="swiper-slide gal-slide">
                        <picture>
                        <source
                            media="(max-width: 520px)"
                            srcSet={`${axiosInstance.defaults.globalURL}${galleryData.mobileImage}`}
                        />
                        <img
                            src={`${axiosInstance.defaults.globalURL}${galleryData.desktopImage}`}
                            alt={galleryData.alt}
                        />
                        </picture>
                        <div className="caption">{galleryData.alt}</div>
                    </div>
                    ))}
                </div>
                {/* Swiper navigation */}
                <div className="swiper-button-prev fullcontrol"></div>
                <div className="swiper-button-next fullcontrol"></div>
                {/* Swiper pagination */}
                <div className="swiper-pagination"></div>
                </div>
            </div>
            </div>
            {/* location */}
            <div id="location" className="w-100 padding section-location">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h2 className="mb-3">Location</h2>
                        {details.length > 0 && (
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: details[0].locationContent,
                                }}
                            ></p>
                        )}

                    </div>
                    <div className="row gap-row flex-row-reverse">
                        <div className="col-lg-6">
                            <div className="mapBox bg-gray-gradient-box p-3 h-100">
                                <div className="inner h-100">
                                    {mainData.map((data) => (
                                        <a href="#formModal" onClick={handleShow} data-bs-toggle="modal">
                                            <img
                                                src={`${axiosInstance.defaults.globalURL}${data.locationMap}`}
                                                className="h-100 object-cover"
                                                alt="Location Map"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hm-project-icons">
                                <div className="row g-3 gap-form-row">
                                    {locationAdvantages.length > 0 && details2.length > 0 && (
                                        locationAdvantages.map((advantage, index) => {
                                            const details = details2[index];
                                            return (
                                                <div key={index} className="col-sm-6 iconBox locationIconBox">
                                                    <div className="bg-gray-gradient-box d-flex align-items-center">
                                                        <div className="img-fluid">
                                                            <img
                                                                src={`${axiosInstance.defaults.globalURL}${advantage.image}`}
                                                                alt={advantage.alt_tag}
                                                            />
                                                        </div>
                                                        {details && (
                                                            <p className="mb-1">
                                                                {details.title}
                                                                <span className="badge badge-primary ms-1">
                                                                    {details.proximity} {details.unit}
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                            <div className="addressContainer bg-gray-gradient-box border-green">
                                <div className="row g-0 gap-form-row">
                                    {mainData.map((data, index) => (
                                        <React.Fragment key={index}>
                                            <div className="col-sm-6 iconBox">
                                                <p className="mb-0"><strong className="text-primary">Address: </strong> <span>{data.projectAddress}</span></p>
                                            </div>
                                            <div className="col-sm-6 iconBox">
                                                <p className="mb-0"><strong className="text-primary">City: </strong>
                                                    <span>
                                                        {data.cityLocation.charAt(0).toUpperCase() + data.cityLocation.slice(1)}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="col-sm-6 iconBox">
                                                <p className="mb-0"><strong className="text-primary">State: </strong> <span>{data.state}</span></p>
                                            </div>
                                            <div className="col-sm-6 iconBox">
                                                <p className="mb-0"><strong className="text-primary">Country: </strong> <span>India</span></p>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="readmore"><a href="#formModal" onClick={handleShow} data-bs-toggle="modal" className="button gray"><i className="fa fa-map-marker-alt"></i> View on Map</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* get in touch */}
            <div className="w-100 bg-gray-gradient-box padding section-getInTouch mb-1">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h2 className="mb-3">Get in Touch</h2>
                        <p className="mb-0">If you would like to know more details or something specific, feel free to contact us. <br />Our site representative will give you a call back.</p>
                    </div>
                    <div className="touchFormWrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="row ">
                                <div className="col-md-4 form-group"><input type="text" className="form-control" placeholder="Name*" name="Name" value={formData.Name}
                                    onChange={handleInputChange}
                                    required /></div>
                                <div className="col-md-4 form-group">
                                    <PhoneInput
                                        country={'in'}
                                        name='phoneNumber'
                                        inputClass="form-control"
                                        buttonClass="phone-button" // Custom class for button
                                        containerClass="phone-container"
                                        value={formData.phoneNumber}
                                        onChange={handlePhoneChange}
                                    />
                                </div>
                                <div className="col-md-4 form-group">
                                    <input type="email" className="form-control" placeholder="Your email address*" name="Email" value={formData.Email}
                                        onChange={handleInputChange}
                                        required />
                                </div>
                                <div className="col-12 form-group">
                                    <div className="form-check mx-auto d-table">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="agree_bottom"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label" htmlFor="agree_bottom">I hereby agree for processing my personal data</label>
                                    </div>
                                </div>
                            </div>
                            <div className="readmore mt-0 mx-auto"><button className="button" type="submit" disabled={!isChecked}>Send Message</button></div>
                            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        </form>
                    </div>
                </div>
            </div >

            {/* FAQs */}
            <div className="w-100 padding bg-gray-gradient-box section-faq">
                {Faqs.length > 0 && (
                    <div className="container-lg">
                        <div className="heading mx-auto text-center">
                            <h2 className="mb-0">FAQs</h2>
                        </div>
                        <div className="touchFormWrapper">
                            <div className="accordion" id="myAccordion">
                                {Faqs.map((faq, index) => {
                                    const faqIndex = index + 1;
                                    const isActive = activeIndex === faqIndex; // Check if this item is active

                                    return (
                                        <div className="accordion-item" key={faqIndex}>
                                            <h2 className="accordion-header" id={`heading${faqIndex}`}>
                                                <button
                                                    className={`accordion-button ${isActive ? "" : "collapsed"}`}
                                                    type="button"
                                                    onClick={() => handleToggle(faqIndex)}
                                                    aria-expanded={isActive ? "true" : "false"}
                                                    aria-controls={`collapse${faqIndex}`}
                                                >
                                                    Q{faqIndex}: {faq.faqQuestion}
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${faqIndex}`}
                                                className={`accordion-collapse collapse ${isActive ? "show" : ""}`}
                                                aria-labelledby={`heading${faqIndex}`}
                                                data-bs-parent="#myAccordion"
                                            >
                                                <div className="accordion-body">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item px-0">
                                                            <b>A:</b> <span>{faq.faqAnswer}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Marketing Partner */}
            <div className="w-100 padding bg-lightgray section-partner">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-md-6 partnerBox">
                            <div className="heading text-center mb-0">
                                <h6 className="text-uppercase mb-3">Marketing Partner</h6>
                                <img src="/star-estate-react/assets/images/logo-starestate.png" className="partner-logo" alt="" />
                            </div>
                            <div className="partner-rera">
                                <p className="mb-0"><b>RERA No.: UPRERAAGT10202</b> <br />https://up-rera.in/Agents</p>
                            </div>
                        </div>
                        <div className="col-md-6 partnerBox">
                            {mainData.map((data, index) => (
                                <React.Fragment key={index}>
                                    <div className="heading text-center mb-0">
                                        <img src={`${axiosInstance.defaults.globalURL}${data.rera_qr}`} className="project-qr-img" alt="" />
                                    </div>
                                    <div className="partner-rera">
                                        <p className="mb-0"><b>Project RERA No.: {data.rera_no}</b> <br /></p>
                                        <p><a href={data.reraWebsite}>{data.reraWebsite}</a></p>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            {/* Similar Projects */}

            <div className="w-100 padding section-similar-projects">
                <div className="container-lg">
                    {similarProjects.length > 0 && (
                        <div className="heading mx-auto text-center">
                            <h2 className="mb-0">Similar Projects</h2>
                        </div>
                    )}
                    <div className="swiper project-slider">
                        <div className="swiper-wrapper">
                            {similarProjects.map((project, index) => (
                                <div className="swiper-slide project_box" key={index}>
                                    <Link to={`/${project.slugURL}`} className="project_box_inner">
                                        <div className="Project_box_img">
                                            <div className="reraBox position-absolute">
                                                <div className="qr_img">
                                                    <img src={`${axiosInstance.defaults.globalURL}${project.rera_qr}`} alt="" />
                                                </div>
                                                <div className="rera_num">
                                                    <small className="mb-0">
                                                        <strong className="text-primary">Projects RERA No: </strong>
                                                        {project.rera_no}
                                                        <br />
                                                        <small className="small text-primary">
                                                            <i className="fa fa-link"></i> {project.reraWebsite}
                                                        </small>
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="img-fluid">
                                                <img src={`${axiosInstance.defaults.globalURL}${project.project_thumbnail}`} alt={project.projectName} />
                                            </div>
                                        </div>
                                        <div className="project_box_details">
                                            <div className="project_developer_detail">
                                                <h4 className="mb-0 project_name">{project.projectName}</h4>
                                                <h6 className="mb-0 project_price">
                                                    {project.projectPrice === 'On Request' || project.projectPrice === 'Revealing Soon' ? `${project.projectPrice}` : <><i className="fa fa-indian-rupee-sign"></i>{project.projectPrice} onwards</>}
                                                </h6>
                                            </div>
                                            <div className="project_status_detail">
                                                <span className="project_box_location">
                                                    <i className="fa fa-map-marker-alt"></i>
                                                    {project.projectAddress}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {/* <div className="swiper-controls h-auto mr-auto">
                            <div className="swiper-button-prev" role="button" aria-label="Previous slide"></div>
                            <div className="readmore w-auto mt-0"></div>
                            <div className="swiper-button-next" role="button" aria-label="Next slide"></div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className='pt-2 account-details bg-gray-gradient-box'>
                <div className='container-lg'>
                    <div className='row '>
                        {bankDetails.map((detailBank, index) => (
                            <React.Fragment key={index}>
                                <div className='col-md-12'>
                                    <p className='text-right'>{detailBank.accountNumber}{detailBank.IFSCcode}{detailBank.CIFno}{detailBank.bankName}{detailBank.bankAddress}</p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={`modal fade ${show ? 'show' : ''}`}
                id="formModal"
                tabIndex="-1"
                role="dialog"
                data-bs-backdrop="true"
                data-bs-keyboard="true"
            >                 <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="modal-header">
                            <h6 class="modal-title text-primary">Please fill the given form.</h6>
                            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        </div>
                        <div class="modal-body">
                            <div class="form">
                                <form class="form-container" id="contact_form" method="post" onSubmit={handleSubmit}>
                                    <p class="status mb-0 text-warning"></p>
                                    <div class="form-row">
                                        <div class="col-md-12 form-group">
                                            <label for="name">Name<sup class="text-danger" >*</sup></label>
                                            <input type="text" class="form-control bg-white" id="Name" name="Name" value={formData.Name}
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                        <div class="col-md-12 form-group">
                                            <label for="email">Email<sup class="text-danger">*</sup></label>
                                            <input type="email" class="form-control bg-white" name="Email" id="Email" value={formData.Email}
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                        <div class="col-md-12 form-group">
                                            <label for="mobile">Mobile<sup class="text-danger">*</sup></label>
                                            <input type="tel" class="form-control bg-white" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                        <div class="col-md-12 text-align-center w-auto formFooter readmore mt-0">
                                            <input type="hidden" name="contact_action" value="active" />
                                            <input type="hidden" id="pagename" name="pagename" value="" />
                                            <input type="hidden" name="utm_source" value="" />
                                            <input type="hidden" name="utm_medium" value="" />
                                            <input type="hidden" name="utm_campaign" value="" />

                                            <button type="submit" class="button">Submit</button>
                                        </div>
                                        <div class="col-md-12 modal-call text-center mt-4 d-flex align-items-center justify-content-center" style={{ gap: "24px" }}>
                                            <h6 class="mb-0">Request a Call Back</h6>
                                            {mainData.map((data, index) => (
                                                <div key={index} class="readmore ml-3 mt-0"><a href="#" class="button"><i class="fa fa-phone"></i><span id="ivrmodal">{data.ivr_no}</span></a></div>
                                            ))}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-enquiryBtn d-flex d-sm-none">
                {mainData.map((data, index) => (
                    <>
                        <a className="monCall" id="mobPhone" href={`tel:${data.ivr_no}`}><strong><i className="fa fa-phone"></i> Call</strong></a>
                        <a id="mobEnquiry" href="#formModal" data-bs-toggle="modal"><strong><i className="fa fa-envelope"></i>
                            Enquire</strong></a>
                        <a className="whatsCall" href={`https://api.whatsapp.com/send?phone=${data.ivr_no}&amp;text=Hi, I am interested in ${data.projectName}, Please share the details.`} target="_blank"><strong><i className="fab fa-whatsapp"></i> WhatsApp</strong></a>
                        {/* <a className="whatsCall" href="https://api.whatsapp.com/send?phone=+91&amp;text=Hi I am interested in Lodha Bellevue, Please share the details." target="_blank"><strong><i className="fab fa-whatsapp"></i> WhatsApp</strong></a> */}
                    </>
                ))}
            </div>
            <div className="footer-bottom">
                <div className="container-lg justify-content-center">
                    <div className="copyrights">
                        <p>Copyrights © Star Estate 2024</p>
                    </div>
                </div>
            </div>
            <div className="button-top"><i className="fa fa-chevron-up"></i></div>
        </div >
    )
}
export default ProjectDetails