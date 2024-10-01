import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../views/utils/axiosInstance';
import { Link, useParams } from 'react-router-dom';

function Builder() {
    const { slugURL } = useParams();
    const [builderName, setBuilderName] = useState('');
    const [cityProjects, setCityProjects] = useState([]);
    const [cityProjectsDetail, setCityProjectsDetail] = useState({});
    const [location, setLocation] = useState('');
    const [loadingProjects, setLoadingProjects] = useState(true); // Loading state for projects
    const [loadingDetails, setLoadingDetails] = useState(true); // Loading state for builder details

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

    const fetchBuilderProjects = async () => {
        try {
            setLoadingProjects(true); // Start loading
            const response = await axiosInstance.get(`addProjects/getProjectByDeveloper/${slugURL}`);
            console.log(response.data);
            if (response.data) {
                setCityProjects(response.data);
                setLocation(response.data.projectBy || '');
            } else {
                setCityProjects([]);
                setLocation('');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setCityProjects([]);
            setLocation('');
        } finally {
            setLoadingProjects(false); // Stop loading
        }
    };

    const fetchBuilderProjectsDetail = async () => {
        try {
            setLoadingDetails(true); // Start loading
            const response = await axiosInstance.get(`developers/getDeveloperBySlugURL/${slugURL}`);
            if (response.data) {
                setCityProjectsDetail(response.data);
                setBuilderName(response.data.developerName || '');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        } finally {
            setLoadingDetails(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchBuilderProjects();
        fetchBuilderProjectsDetail();
    }, [slugURL]);

    const [showMore, setShowMore] = useState(false);

    const toggleReadMore = () => {
        setShowMore(!showMore);
    };

    const briefContent = cityProjectsDetail?.briefContent || '';
    const description = cityProjectsDetail?.description || '';

    return (
        <div>
            <div className="insideBanner">
                <picture>
                    <source media="(max-width: 820px)" srcSet="/star-estate-react/assets/images/banner-commercial-m.jpg" />
                    <img src="/star-estate-react/assets/images/banner-commercial.jpg" className="h-100 object-cover" alt="Star Estate" />
                </picture>
                <div className="bannerContainer" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}>
                    <div className="container-lg">
                        <div className="stats-in">
                            <span className="h2 text-texture" style={{ color: '#00000' }}><span className="counter">{cityProjectsDetail.developerName}</span></span>

                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item"><a href="#">Builder</a></li>
                            <li className="breadcrumb-item active">{cityProjectsDetail.developerName || 'Developer'}</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-auto">
                        <h3 className="mb-3 text-center">{cityProjectsDetail.developerName || 'Developer'}</h3>

                        {/* Builder Details Loading */}
                        {loadingDetails ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <span className="ml-2">Loading...</span>
                            </div>
                        ) : (
                            <div key={cityProjectsDetail._id} className="text-center">
                                <article
                                    dangerouslySetInnerHTML={{
                                        __html: showMore ? description : briefContent
                                    }}
                                ></article>
                                {description ? <button onClick={openDetailModal} className="project-readmore-button">
                                    {showMore ? 'Read less' : 'Read more'}
                                </button> : ''}
                                {/* <button onClick={openDetailModal} className="project-readmore-button">
                                    {showMore ? 'Read less' : 'Read more'}
                                </button> */}
                                <div ref={modalRef} className="projectOverview-modal">
                                    <div className="inner">
                                        <div className="projectModal-header">
                                            <h6 className="mb-0">Builder Details</h6>
                                            <button className="projectOverview-close" onClick={closeDetailModal}>
                                                &times;
                                            </button>
                                        </div>
                                        <div className="projectOverview-details scroller">
                                            <p dangerouslySetInnerHTML={{ __html: description }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Projects Section */}
                    <div className="row gap-row">
                        {loadingProjects ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <span className="ml-2">Loading...</span>
                            </div>
                        ) : cityProjects.length > 0 ? (
                            cityProjects.map((project) => (
                                <div key={project._id} className="col-lg-4 col-sm-6 project_box">
                                    <Link to={`/${project.slugURL}`} className="project_box_inner">
                                        <div className="Project_box_img">
                                            <div className="reraBox position-absolute">
                                                <div className="qr_img">
                                                    <img src={`${axiosInstance.defaults.globalURL}${project.rera_qr}`} alt={project.projectName} />
                                                </div>
                                                <div className="rera_num">
                                                    <small className="mb-0">
                                                        <strong className="text-primary">Projects RERA No:</strong> {project.rera_no || 'N/A'}
                                                        <br />
                                                        <small className="small text-primary">
                                                            <i className="fa fa-link"></i> {project.reraWebsite || 'www.up-rera.in/projects'}
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
                                                <h4 className="mb-0 project_name">{project.projectName || 'Project Name'}</h4>
                                                <h6 className="mb-0 project_price">
                                                    {project.projectPrice === 'On Request' || project.projectPrice === 'Revealing Soon'
                                                        ? `${project.projectPrice}`
                                                        : <><i className="fa fa-indian-rupee-sign"></i>{project.projectPrice}*</>}
                                                </h6>
                                            </div>
                                            <div className="project_status_detail">
                                                <span className="project_box_location">
                                                    <i className="fa fa-map-marker-alt"></i> {project.projectAddress || 'Location not available'}
                                                </span>
                                                <span className="project_box_status">
                                                    <i className="fa-brands fa-font-awesome"></i> {Array.isArray(project.project_status)
                                                        ? project.project_status.join(', ')
                                                        : project.project_status}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No projects available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Builder;
