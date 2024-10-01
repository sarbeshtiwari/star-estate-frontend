import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../views/utils/axiosInstance';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchCategories, fetchCities, fetchProjects, fetchProjectsByConfig } from '../../apis/home-page-api';

function CommercialProjects() {
    const [projectName, setprojectName] = useState('');
    const [commercialProjects, setCommercialProjects] = useState([]);
    const [commercialDetails, setCommercialDetails] = useState([]);
    const [cityProjects, setCityProjects] = useState([]);
    const [cityProjectsDetail, setCityProjectsDetail] = useState([]);
    const [configurationDetails, setConfigurationDetails] = useState([]);
    const [location, setLocation] = useState();
    const [breadcrumbName, setBreadcrumbName] = useState('');
    const { id } = useParams();
    const { slugURL } = useParams();
    useEffect(() => {

        const fetchCommercialDetails = async () => {
            try {
                const response = await axiosInstance.get(`/categories/getCategoryDetails/${id}`);
                const filteredCommercialProjectsDetails = response.data.filter(award => award.status === true);
                setCommercialDetails(filteredCommercialProjectsDetails ? filteredCommercialProjectsDetails : ' ');
            } catch (error) {
                console.error('Failed to fetch CommercialProjectsDetails', error);
            }
        };
        const fetchCommercialProjects = async () => {
            try {
                const response = await axiosInstance.get(`/addProjects/getProjectByType/${id}`);
                const filteredCommercialProjects = response.data.filter(award => award.status === true);
                if (filteredCommercialProjects.length > 0) {
                    const projectName = filteredCommercialProjects[0].property_type;
                    setprojectName(capitalizeFirstLetter(projectName));
                    setBreadcrumbName(capitalizeFirstLetter(projectName));
                    setFormData(prevState => ({
                        ...prevState,
                        property_type: id === 'commercial' ? 'commercial' : 'residential'
                    }));
                }
                setCommercialProjects(filteredCommercialProjects);
                return response.data;
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    // Handle 404 specifically if needed
                    console.error('No commercial projects found:', err);
                    setCommercialProjects([]);
                } else {
                    console.error('Unexpected error:', err);
                }
                setCommercialProjects([]);
            }
        };
        const fetchCityProjects = async () => {
            try {
                const response = await axiosInstance.get(`city/getCityBySlugURL/${slugURL}`);
                if (response.data && response.data.data) {
                    setLocation(response.data.location || '');
                    setBreadcrumbName(response.data.location || '');
                    setCityProjects(response.data.data);
                    // console.log('City Projects content:', response.data.data);
                } else {
                    setCityProjects([]);
                    setLocation('');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setCityProjects([]);
                setLocation('');
            }
        };
        const fetchCityProjectsDetail = async () => {
            try {
                const response = await axiosInstance.get(`addProjects/getProjectByLocation/${slugURL}`);

                const filteredCityDetailProjects = response.data.filter(award => award.status === true);
                setCityProjectsDetail(filteredCityDetailProjects);
                return response.data;
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    // Handle 404 specifically if needed
                    console.error('No city projects found:', err);
                    setCityProjectsDetail([]);
                } else {
                    console.error('Unexpected error:', err);
                }
                setCityProjectsDetail([]);
            }
        };

        const fetchNewProjects = async () => {
            try {
                const response = await axiosInstance.get(`/addProjects/getNewProject`);
                console.log(response.data);
                const filteredCommercialProjects = response.data.filter(award => award.status === true);
                if (filteredCommercialProjects.length > 0) {
                    const projectName = filteredCommercialProjects[0].property_type;
                    setprojectName(capitalizeFirstLetter(projectName));
                    setBreadcrumbName('New Launch');
                    setFormData(prevState => ({
                        ...prevState,
                        property_type: 'New Launch'
                    }));
                }
                setCommercialDetails('');
                setCommercialProjects(filteredCommercialProjects);
                return response.data;
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    // Handle 404 specifically if needed
                    console.error('No projects found:', err);
                    setCommercialProjects([]);
                } else {
                    console.error('Unexpected error:', err);
                }
                setCommercialProjects([]);
            }
        };

        const fetchLuxuryProjects = async () => {
            try {
                const response = await axiosInstance.get(`/addProjects/getLuxuryProject`);
                console.log(response.data);
                const filteredCommercialProjects = response.data.filter(award => award.status === true);
                if (filteredCommercialProjects.length > 0) {
                    const projectName = filteredCommercialProjects[0].property_type;
                    setprojectName(capitalizeFirstLetter(projectName));
                    setBreadcrumbName('Luxury');
                    setFormData(prevState => ({
                        ...prevState,
                        property_type: 'Luxury'
                    }));
                }
                setCommercialDetails('');
                setCommercialProjects(filteredCommercialProjects);
                return response.data;
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    // Handle 404 specifically if needed
                    console.error('No projects found:', err);
                    setCommercialProjects([]);
                } else {
                    console.error('Unexpected error:', err);
                }
                setCommercialProjects([]);
            }
        };

        if (id === 'commercial' || id === 'residential') {
            fetchCommercialDetails();
            fetchCommercialProjects();
        }
        if (id === 'new-launch') {
            fetchNewProjects();
        }
        if (id === 'luxury') {
            fetchLuxuryProjects();
        }
        if (slugURL) {
            fetchCityProjects();
            fetchCityProjectsDetail();
        }
        const fetch = async (id) => {
            const response = await fetchProjectsByConfig(id);
            setBreadcrumbName(id)
            setConfigurationDetails(response.cityData ? response.cityData : ' ')
            setCommercialProjects(response.projects ? response.projects : ' ')

        }
        if (id !== 'commercial' && id !== 'residential' && id !== 'luxury' && id !== 'new-launch' && id !== undefined) {
            fetch(id)
        }
    }, [id, slugURL]);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const [showMore, setShowMore] = useState(false);
    const toggleReadMore = () => {
        setShowMore(!showMore);
    };

    const modalRef = useRef(null);

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


    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        projectName: '',
        cityLocation: '',
        projectConfiguration: '',
        projectPrice: '',
        propertyType: id === 'commercial' ? 'commercial' : 'residential'
    });
    useEffect(() => {
        fetchCategories().then(data => setCategories(data)).catch(console.error);
        fetchCities().then(data => setCities(data)).catch(console.error);
    }, [formData.propertyType, formData.cityLocation]);
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === 'propertyType' && value) {
            await fetchProjects(value).then(data => setProjects(data)).catch(console.error);
        }
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsePrice = (price) => {
            if (!price) return '';
            const cleanPrice = price.replace(/[^0-9.]/g, '');
            const numericPrice = parseFloat(cleanPrice);
            if (price.toLowerCase().includes('lakh')) {
                return numericPrice * 100000;
            }
            if (price.toLowerCase().includes('cr')) {
                return numericPrice * 10000000;
            }
            return isNaN(numericPrice) ? '' : numericPrice;
        };

        try {
            let minPrice = '';
            let maxPrice = '';

            if (formData.projectPrice.includes('-')) {
                // Range case
                [minPrice, maxPrice] = formData.projectPrice.split('-').map(price => parsePrice(price.trim()));

                // Log for debugging
                console.log('Range case:', { minPrice, maxPrice });

                // Adjust for specific cases
                if (parseFloat(maxPrice) === 10000000) {
                    maxPrice = 10000000; // Set maxPrice to 1 cr when it's exactly 1 cr
                }
            } else {
                // Single value case
                const singlePrice = parsePrice(formData.projectPrice.trim());

                // Log for debugging
                console.log('Single value case:', { singlePrice });

                if (singlePrice === 10000000) {
                    minPrice = 0;          // Set minPrice to 0
                    maxPrice = 10000000;   // Set maxPrice to 1 cr
                } else {
                    minPrice = maxPrice = singlePrice; // Set both to the single value
                }
            }

            // Log the final minPrice and maxPrice
            console.log('Final prices:', { minPrice, maxPrice });
            let propertyType = '';

            if (id === 'commercial' || id === 'residential') {
                propertyType = id;
            } else if (slugURL) {
                propertyType = slugURL; // Use city slug if id is not present
            }
            // Create query parameters
            const queryParams = new URLSearchParams({
                propertyType: propertyType || undefined, // Ensure undefined is not included in query parameters
                propertyLocation: formData.cityLocation,
                minPrice: minPrice || undefined, // Ensure undefined is not included in query parameters
                maxPrice: maxPrice || undefined  // Ensure undefined is not included in query parameters
            }).toString();


            console.log('Query Params:', queryParams);

            // Navigate to the All Projects page with the query parameters
            navigate(`/projects?${queryParams}`);
        } catch (error) {
            console.error('Error submitting search:', error);
        }
    };

    return (
        <div>
            <div className="insideBanner">
                <picture>
                    <source media="(max-width: 540px)" srcSet="/star-estate-react/assets/images/homebanner/new/banner-office-m.jpg" />
                    <img src="/star-estate-react/assets/images/banner-commercial.jpg" className="h-100 object-cover object-position-bottom" alt="Star Estate" />
                </picture>
                <div className="bannerContainer">
                    <div className="container-lg">
                        <div className="search-filter">
                            <div className="filter-form">
                                <form id="categoryfilter" encType="multipart/form-data" onSubmit={handleSubmit}>
                                    <div className="row gx-2 gap-form-row">
                                        <div className="col-md-10">
                                            <div className="inner">
                                                <div className="row g-0">
                                                    <div className="col mb-0 form-group">
                                                        <select
                                                            name="cityLocation"
                                                            id="cityLocation"
                                                            className="form-control bg-white my-0"
                                                            value={formData.cityLocation}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Project Location</option>
                                                            {cities.map(city => (
                                                                <option key={city._id} value={city.slugURL}>
                                                                    {city.location}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col mb-0 form-group">
                                                        <select
                                                            name="projectPrice"
                                                            id="projectPrice"
                                                            className="form-control bg-white my-0"
                                                            value={formData.projectPrice}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Budget</option>
                                                            <option value="10000000">UpTo 1 Cr.</option>
                                                            <option value="10000000-30000000">1 - 3 Cr.</option>
                                                            <option value="30000000-50000000">3 - 5 Cr.</option>
                                                            <option value="50000000">Above 5 Cr.</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2 readmore w-auto mt-0">
                                            <input type="hidden" name="projectfltr" value="active" />
                                            <button className="button w-100 h-100" type="submit">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <picture>
                    <img src="/star-estate-react/assets/images/banner-commercial.jpg" className="h-100 object-cover object-position-bottom" alt="Star Estate" />
                </picture> */}
            </div>
            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item">
                                <Link to={id === 'commercial' || id === 'residential' || id === 'new-launch' || id === 'luxury' || (id !== 'commercial' && id !== 'residential' && id !== 'luxury' && id !== 'new-launch') ? '/projects' : `/city`}>
                                    {id === 'commercial' || id === 'residential' || id === 'new-launch' || id === 'luxury' || (id !== 'commercial' && id !== 'residential' && id !== 'luxury' && id !== 'new-launch') ? 'Projects' : 'City'}
                                </Link>
                            </li>
                            <li className="breadcrumb-item active">{breadcrumbName}</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-auto">
                        <h3 className="mb-3 text-center">
                            {slugURL ? `Projects in ${location}` : ''}
                        </h3>
                    </div>

                    {slugURL ? (
                        cityProjects.length > 0 && (
                            <React.Fragment>
                                {cityProjects.some(cityProject => cityProject.location_type === "common") && (
                                    <React.Fragment>
                                        <div className="text-container" style={{ position: 'relative' }}>
                                            {cityProjects
                                                .filter(cityProject => cityProject.location_type === "common")
                                                .map((cityProject) => (
                                                    <div key={cityProject._id} className="text-center">
                                                        {/* {cityProject.ctcontent.length > 700 ? ( */}
                                                        <React.Fragment>
                                                            <article
                                                                dangerouslySetInnerHTML={{
                                                                    __html: showMore
                                                                        ? cityProject.briefContent
                                                                        : cityProject.briefContent
                                                                }}
                                                            ></article>
                                                            <button onClick={openDetailModal} className="project-readmore-button">
                                                                {showMore ? 'Read less' : 'Read more'}
                                                            </button>
                                                        </React.Fragment>
                                                        {/* ) : (
                                                <span dangerouslySetInnerHTML={{ __html: cityProject.ctcontent }} />
                                            )} */}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </React.Fragment>
                                )}

                                {/* Modal for City Details */}
                                <div ref={modalRef} className="projectOverview-modal">
                                    <div className="inner">
                                        <div className="projectModal-header">
                                            <h6 className="mb-0">City Details</h6>
                                            <button className="projectOverview-close" onClick={closeDetailModal}>
                                                &times;
                                            </button>
                                        </div>
                                        {cityProjects.length > 0 ? (
                                            cityProjects
                                                .filter(cityProject => cityProject.location_type === "common")
                                                .map((item, index) => (
                                                    <div key={index} className="projectOverview-details scroller">
                                                        <p dangerouslySetInnerHTML={{ __html: item.ctcontent }} />
                                                    </div>
                                                ))
                                        ) : (
                                            <p>No data available</p>
                                        )}
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    ) : (
                        id !== 'commercial' && id !== 'residential' && id !== 'luxury' && id !== 'new-launch' && configurationDetails.length > 0 ? (
                            <>
                                {configurationDetails.map((details) => {
                                    const displayContent = details.briefContent;

                                    return (
                                        <p key={details._id} className="text-center">
                                            <span>
                                                {/* {displayContent.length > 400 ? ( */}
                                                <React.Fragment>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: showMore
                                                                ? displayContent
                                                                : displayContent
                                                        }}
                                                    />
                                                    <button onClick={openDetailModal} className="project-readmore-button">
                                                        {showMore ? 'Read less' : 'Read more'}
                                                    </button>
                                                </React.Fragment>
                                                {/* ) : (
                                        <span dangerouslySetInnerHTML={{ __html: displayContent }} />
                                    )} */}
                                            </span>
                                        </p>
                                    );
                                })}

                                {/* Modal for Configuration Details */}
                                <div ref={modalRef} className="projectOverview-modal">
                                    <div className="inner">
                                        <div className="projectModal-header">
                                            <h6 className="mb-0">City Details</h6>
                                            <button className="projectOverview-close" onClick={closeDetailModal}>
                                                &times;
                                            </button>
                                        </div>
                                        {configurationDetails.length > 0 ? (
                                            configurationDetails.map((item, index) => (
                                                <div key={index} className="projectOverview-details scroller">
                                                    <p dangerouslySetInnerHTML={{ __html: item.ctcontent }} />
                                                </div>
                                            ))
                                        ) : (
                                            <p>No data available</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            commercialProjects.length > 0 && (
                                <React.Fragment>
                                    <h3 className="mb-3 text-center">
                                        {id === 'new-launch' ? 'New Launch' :
                                            id === 'luxury' ? 'Luxury' :
                                                id !== 'commercial' && id !== 'residential' && id !== 'luxury' && id !== 'new-launch' ? 'Projects' :
                                                    commercialProjects[0].property_type === 'residential' ? 'Residential' : 'Commercial'}
                                    </h3>

                                    {commercialDetails.length > 0 ? (
                                        commercialDetails.map((projectDetails) => {
                                            let displayContent;
                                            if (id === 'new-launch') {
                                                displayContent = 'Here you will find the residential properties that are newly launched...';
                                            } else if (id === 'luxury') {
                                                displayContent = 'Luxury content here...';
                                            } else {
                                                displayContent = projectDetails.briefContent;
                                            }

                                            return (
                                                <p key={projectDetails._id} className="text-center">
                                                    <span>
                                                        {/* {displayContent.length > 400 ? ( */}
                                                        <React.Fragment>
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: showMore
                                                                        ? displayContent
                                                                        : displayContent
                                                                }}
                                                            />
                                                            <button onClick={openDetailModal} className="project-readmore-button">
                                                                {showMore ? 'Read less' : 'Read more'}
                                                            </button>
                                                        </React.Fragment>
                                                        {/* ) : (
                                                <span dangerouslySetInnerHTML={{ __html: displayContent }} />
                                            )} */}
                                                    </span>
                                                </p>
                                            );
                                        })
                                    ) : (
                                        <div></div>
                                    )}

                                    {/* Modal for Commercial Details */}
                                    <div ref={modalRef} className="projectOverview-modal">
                                        <div className="inner">
                                            <div className="projectModal-header">
                                                <h6 className="mb-0">Details</h6>
                                                <button className="projectOverview-close" onClick={closeDetailModal}>
                                                    &times;
                                                </button>
                                            </div>
                                            {commercialDetails.length > 0 ? (
                                                commercialDetails.map((item, index) => (
                                                    <div key={index} className="projectOverview-details scroller">
                                                        <p dangerouslySetInnerHTML={{ __html: item.content }} />
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No data available</p>
                                            )}
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        )
                    )}

                    <div className="row gap-row">
                        {(id && commercialProjects.length) > 0 ? (
                            commercialProjects.map(project => (
                                <div key={project._id} className="col-lg-4 col-sm-6 project_box">
                                    <Link to={`/${project.slugURL}`} className="project_box_inner">
                                        <div className="Project_box_img">
                                            <div className="reraBox position-absolute">
                                                <div className="qr_img"><img src={`${axiosInstance.defaults.globalURL}${project.rera_qr}`} alt="QR Code" /></div>
                                                <div className="rera_num">
                                                    <small className="mb-0"><strong className="text-primary">Projects RERA No: </strong>{project.rera_no}<br />
                                                        <small className="small text-primary"><i className="fa fa-link"></i> {project.reraWebsite}</small></small>
                                                </div>
                                            </div>
                                            <div className="img-fluid"><img src={`${axiosInstance.defaults.globalURL}${project.project_thumbnail}`} alt={project.name} /></div>
                                        </div>
                                        <div className="project_box_details">
                                            <div className="project_developer_detail">
                                                <Link to={`/${project.slugURL}`} className="project_name">
                                                    <h4 className="mb-0 project_name">{project.projectName}</h4>
                                                </Link>
                                                <h6 className="mb-0 project_price">
                                                    {project.projectPrice === 'On Request' || project.projectPrice === 'Revealing Soon'
                                                        ? `${project.projectPrice}`
                                                        : <><i className="fa fa-indian-rupee-sign"></i>{project.projectPrice}*</>}
                                                </h6>
                                            </div>
                                            <div className="project_status_detail">
                                                <span className="project_box_location"><i className="fa fa-map-marker-alt"></i>{project.projectAddress}</span>
                                                <span className="project_box_status"><i className="fa-brands fa-font-awesome"></i> {Array.isArray(project.project_status)
                                                    ? project.project_status.join(', ')
                                                    : project.project_status}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            slugURL && cityProjectsDetail.length > 0 ? (
                                cityProjectsDetail.map(project => (
                                    <div key={project._id} className="col-lg-4 col-sm-6 project_box">
                                        <Link to={`/${project.slugURL}`} className="project_box_inner">
                                            <div className="Project_box_img">
                                                <div className="reraBox position-absolute">
                                                    <div className="qr_img"><img src={`${axiosInstance.defaults.globalURL}${project.rera_qr}`} alt="QR Code" /></div>
                                                    <div className="rera_num">
                                                        <small className="mb-0"><strong className="text-primary">Projects RERA No: </strong>{project.rera_no}<br />
                                                            <small className="small text-primary"><i className="fa fa-link"></i> {project.reraWebsite}</small></small>
                                                    </div>
                                                </div>
                                                <div className="img-fluid"><img src={`${axiosInstance.defaults.globalURL}${project.project_thumbnail}`} alt={project.name} /></div>
                                            </div>
                                            <div className="project_box_details">
                                                <div className="project_developer_detail">
                                                    <Link to={`/${project.slugURL}`} className="project_name">
                                                        <h4 className="mb-0 project_name">{project.projectName}</h4>
                                                    </Link>
                                                    <h6 className="mb-0 project_price">
                                                        {project.projectPrice === 'On Request' || project.projectPrice === 'Revealing Soon'
                                                            ? `${project.projectPrice}`
                                                            : <><i className="fa fa-indian-rupee-sign"></i>{project.projectPrice}*</>}
                                                    </h6>
                                                </div>
                                                <div className="project_status_detail">
                                                    <span className="project_box_location"><i className="fa fa-map-marker-alt"></i>{project.projectAddress}</span>
                                                    <span className="project_box_status"><i className="fa-brands fa-font-awesome"></i> {Array.isArray(project.project_status)
                                                        ? project.project_status.join(', ')
                                                        : project.project_status}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No data available</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CommercialProjects