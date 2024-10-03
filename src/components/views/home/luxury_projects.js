import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import axiosInstance from '../utils/axiosInstance';
import './App.css'; // Assuming you have a separate CSS file for styles

const ProjectsCarousel = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setError] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState({ city: '', state: '' });
    

    // Fetch all the properties
    useEffect(() => {
        handleLocationClick();
    }, []);

    // Block scrolling when modal is open
    // useEffect(() => {
    //     if (isLocationModalOpen) {
    //         document.body.style.overflow = 'hidden'; // Block scrolling
    //         document.body.classList.add('blur-background'); // Add blur class
    //     } else {
    //         document.body.style.overflow = 'auto'; // Reset scrolling
    //         document.body.classList.remove('blur-background'); // Remove blur class
    //     }
    // }, [isLocationModalOpen]);

    // Fetch data by location
    useEffect(() => {
        const fetchDataByLocationHandler = async (location) => {
            const fallbackCities = ['noida', 'delhi', 'gurugram', 'ghaziabad'];

            try {
                // console.log('Trying by location:', location);
                const lowerCaseLocation = location.toLowerCase();

                const data = await axiosInstance.get(`addProjects/getProjectByLocation/${lowerCaseLocation}`);
                const filteredProjects = data.data.filter(project => project.status === true);

                if (filteredProjects.length > 0) {
                    setAllProjects(filteredProjects);
                } else {
                    // console.log('No projects found for the selected city, fetching fallback cities.');
                    const allProjectsData = await Promise.all(fallbackCities.map(async (city) => {
                        const response = await axiosInstance.get(`addProjects/getProjectByLocation/${city}`);
                        return response.data.filter(project => project.status === true);
                    }));

                    const allFilteredProjects = allProjectsData.flat();
                    setAllProjects(allFilteredProjects);
                }
            } catch (error) {
                // console.error('Error fetching data by location:', error);
            }

        };

        if (!address.city || !address.state) {
            fetchAllProjects();
        } else {
            fetchDataByLocationHandler(selectedLocation);
        }
    }, [selectedLocation, address]);

    const fetchAllProjects = async () => {
        try {
            // console.log('Fetching all projects');
            const response = await axiosInstance.get(`/addProjects/getProject`);
            const filteredProjects = response.data.filter(project => project.status === true);
            setAllProjects(filteredProjects);
            setLoading(false);
            
        } catch (error) {
            setError('Error fetching project details');
            // console.error('Error fetching project details:', error);
            setLoading(false);
            
        }
    };

    function handleLocationClick() {
        if (navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            // console.log("Geolocation not supported");
            fetchAllProjects();
            setLoading(false);
           
        }
       
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        fetchAddressFromCoordinates(latitude, longitude);
    }

    function error() {
        // console.log("Unable to retrieve your location");
        fetchAllProjects();
        setLoading(false);
    }

    async function fetchAddressFromCoordinates(latitude, longitude) {
        const apiKey = '77c01c128afa44fa855372aa07ee8b5d'; // OpenCage API key
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
        try {
            const response = await fetch(geocodeUrl);
            const data = await response.json();
            if (data.results.length > 0) {
                const components = data.results[0].components;
                const city = components.city || components.town || components.village || '';
                const state = components.state || '';
                setAddress({ city, state });
                setSelectedLocation(city);
                // console.log(`City: ${city}, State: ${state}`);
            } else {
                // console.log('No results found');
                setAddress({ city: '', state: '' });
            }
            setLoading(false);
        } 
        catch (error) {
            // console.error('Error fetching address:', error);
            setAllProjects([]);
            setLoading(false);
        }
    }


    return (
        <div>
            
            <div className="w-100 position-relative overflow-hidden padding bg-lightgray hm-overviewContainer animate-section1">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h3>Featured Projects</h3>
                    </div>

                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading projects...</span>
                            </div>
                            <span className="ml-2">Loading projects...</span>
                        </div>
                    ) : (
                        <Swiper
                            className=".project-slider"
                            slidesPerView={1}
                            spaceBetween={0}
                            // loop={allProjects.length > 1}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                              }}
                            breakpoints={{
                                280: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                1200: { slidesPerView: 3 },
                                1600: { slidesPerView: 3 },
                            }}
                        >
                            {allProjects.length > 0 ? (
                                allProjects.concat(allProjects).slice(0, 10).map((project) => (
                                    <SwiperSlide key={project._id} className="project_box">
                                        <Link to={`/${project.slugURL}`} className="project_box_inner">
                                            <div className="Project_box_img">
                                                <div className="reraBox position-absolute">
                                                    <div className="qr_img">
                                                        <img src={`${axiosInstance.defaults.globalURL}${project.rera_qr}`} alt={project.projectName} />
                                                    </div>
                                                    <div className="rera_num">
                                                        <small className="mb-0">
                                                            <strong className="text-primary">Projects RERA No: </strong>
                                                            {project.rera_no}
                                                            <br />
                                                            {project.reraWebsite && (
                                                                <small className="small text-primary">
                                                                    <i className="fa fa-link"></i> {project.reraWebsite}
                                                                </small>
                                                            )}
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
                                                        {project.projectPrice === 'On Request' || project.projectPrice === 'Revealing Soon' 
                                                        ? `${project.projectPrice}` 
                                                        : <><i className="fa fa-indian-rupee-sign"></i>{project.projectPrice}*</>}
                                                    </h6>
                                                </div>
                                                <div className="project_status_detail">
                                                    <span className="project_box_location"><i className="fa fa-map-marker-alt"></i>{project.projectAddress}</span>
                                                    <span className="project_box_status">
                                                        <i className="fa-brands fa-font-awesome"></i>
                                                        {Array.isArray(project.project_status) 
                                                            ? project.project_status.join(', ') 
                                                            : project.project_status}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <p>No projects available.</p>
                            )}
                        </Swiper>
                    )}
                     <div className="swiper-controls h-auto mr-auto">
                       <div className="swiper-button-prev" role="button" aria-label="Previous slide"></div>
                       <div className="readmore w-auto mt-0"><Link to='/projects' className="button reverse">View All</Link></div>
                         <div className="swiper-button-next" role="button" aria-label="Next slide"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsCarousel;








































// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/bundle';
// import axiosInstance from '../utils/axiosInstance';

// const ProjectsCarousel = () => {
//     const [allProjects, setAllProjects] = useState([]);
//     const [loading, setLoading] = useState(true); // Loading state
//     const [errors, setError] = useState('');

//     useEffect(() => {
//         const fetchAllProjects = async () => {
//             try {
//                 const response = await axiosInstance.get(`/addProjects/getProject`);
//                 const filteredNews = response.data.filter(project => project.status === true);
//                 setAllProjects(filteredNews);
//                 setLoading(false); // Set loading to false after data is fetched
//             } catch (error) {
//                 setError('Error fetching project details');
//                 console.error('Error fetching project details:', error);
//                 setLoading(false); // Also set loading to false on error
//             }
//         };
//         fetchAllProjects();
//     }, []);
    

//     return (
//         <div>
//             <div className="w-100 position-relative overflow-hidden padding bg-lightgray hm-overviewContainer animate-section1">
//                 <div className="container-lg">
//                     <div className="heading mx-auto text-center">
//                         <h3>Featured Projects</h3>
//                     </div>

//                     {loading ? ( // Show spinner while loading
//                         <div className="d-flex justify-content-center align-items-center">
//                             <div className="spinner-border text-primary" role="status">
//                                 <span className="sr-only">Loading projects...</span>
//                             </div>
//                             <span className="ml-2">Loading projects...</span>
//                         </div>
//                     ) : (
//                         <Swiper
//                             className="project-slider"
//                             slidesPerView={1}
//                             spaceBetween={0}
//                             loop={true}
//                             navigation={{
//                                 nextEl: '.swiper-button-next',
//                                 prevEl: '.swiper-button-prev',
//                             }}
//                             breakpoints={{
//                                 280: { slidesPerView: 1 },
//                                 640: { slidesPerView: 2 },
//                                 1200: { slidesPerView: 3 },
//                                 1600: { slidesPerView: 3 },
//                             }}
//                         >
//                             {allProjects.length > 0 ? (
//                                 allProjects.slice(0, 10).map((project) => (
//                                     <SwiperSlide key={project.id} className="project_box">
//                                         <Link to={`/${project.slugURL}`} className="project_box_inner">
//                                             <div className="Project_box_img">
//                                                 <div className="reraBox position-absolute">
//                                                     <div className="qr_img">
//                                                         <img src={`${axiosInstance.defaults.globalURL}${project.rera_qr}`} alt={project.projectName} />
//                                                     </div>
//                                                     <div className="rera_num">
//                                                         <small className="mb-0">
//                                                             <strong className="text-primary">Projects RERA No: </strong>
//                                                             {project.rera_no}
//                                                             <br />
//                                                             {project.reraWebsite && (
//                                                                 <small className="small text-primary">
//                                                                     <i className="fa fa-link"></i> {project.reraWebsite}
//                                                                 </small>
//                                                             )}
//                                                         </small>
//                                                     </div>
//                                                 </div>
//                                                 <div className="img-fluid">
//                                                     <img src={`${axiosInstance.defaults.globalURL}${project.project_thumbnail}`} alt={project.projectName} />
//                                                 </div>
//                                             </div>
//                                             <div className="project_box_details">
//                                                 <div className="project_developer_detail">
//                                                     <h4 className="mb-0 project_name">{project.projectName}</h4>
//                                                     <h6 className="mb-0 project_price">
//                                                         {project.projectPrice === 'On Request' || project.projectPrice === 'Revealing Soon' 
//                                                         ? `${project.projectPrice}` 
//                                                         : <><i className="fa fa-indian-rupee-sign"></i>{project.projectPrice}*</>}
//                                                     </h6>
//                                                 </div>
//                                                 <div className="project_status_detail">
//                                                     <span className="project_box_location"><i className="fa fa-map-marker-alt"></i>{project.projectAddress}</span>
//                                                     <span className="project_box_status"><i className="fa-brands fa-font-awesome"></i>{project.project_status}</span>
//                                                 </div>
//                                             </div>
//                                         </Link>
//                                     </SwiperSlide>
//                                 ))
//                             ) : (
//                                 <p>No projects available.</p>
//                             )}
//                         </Swiper>
//                     )}

//                     <div className="swiper-controls h-auto mr-auto">
//                         <div className="swiper-button-prev" role="button" aria-label="Previous slide"></div>
//                         <div className="readmore w-auto mt-0"><Link to='/projects' className="button reverse">View All</Link></div>
//                         <div className="swiper-button-next" role="button" aria-label="Next slide"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjectsCarousel;
