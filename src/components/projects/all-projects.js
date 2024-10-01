import React, { useEffect, useState } from 'react';
import axiosInstance from '../views/utils/axiosInstance';
import { Link, useLocation } from 'react-router-dom';

function AllProjects() {
    const [allProjects, setAllProjects] = useState([]);
    const [errors, setError] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const location = useLocation();

    useEffect(() => {
        const fetchFilteredProjects = async () => {
            setLoading(true); // Set loading to true before fetching data

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
                return isNaN(numericPrice) ? '' : numericPrice.toString();
            };

            const queryParams = new URLSearchParams(location.search);
            const params = {
                projectType: queryParams.get('projectType') || '',
                propertyLocation: queryParams.get('propertyLocation') || '',
                minPrice: queryParams.get('minPrice') || '',
                maxPrice: queryParams.get('maxPrice') || '',
            };

            const minPrice = parsePrice(params.minPrice);
            const maxPrice = parsePrice(params.maxPrice);

            try {
                const response = await axiosInstance.get('/addProjects/projects', {
                    params: {
                        ...params,
                        minPrice: minPrice,
                        maxPrice: maxPrice
                    }
                });
                // console.log(response.data);
                if (response.data.success) {
                    const filteredProjects = response.data.projects.filter(project => project.status === true);
                    if (filteredProjects.length > 0) {
                        setAllProjects(filteredProjects);
                    } else {
                        setError('No active projects found');
                    }
                } else {
                    setError('No projects found');
                }
            } catch (error) {
                setError('Error fetching projects');
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchFilteredProjects();
    }, [location.search]);

    return (
        <div>
            <div className="insideBanner">
                <picture>
                    <source media="(max-width: 520px)" srcSet="assets/images/banner-commercial-m.jpg" />
                    <img src="assets/images/banner-commercial.jpg" className="h-100 object-cover object-position-bottom" alt="Star Estate" />
                </picture>
            </div>
            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Projects</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-auto">
                        <h3 className="mb-0">Projects</h3>
                    </div>
                    <div className="row gap-row">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <span className="ml-2">Loading...</span>
                            </div>
                        ) : allProjects.length > 0 ? (
                            allProjects.map((project) => (
                                <div className="col-lg-4 col-sm-6 project_box" key={project._id}>
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
                                                    {project.projectPrice === 'On Request' || project.projectPrice === 'Revealing Soon' ? `${project.projectPrice}` : <><i className="fa fa-indian-rupee-sign"></i>{project.projectPrice}*</>}
                                                </h6>
                                            </div>
                                            <div className="project_status_detail">
                                                <span className="project_box_location">
                                                    <i className="fa fa-map-marker-alt"></i> {project.projectAddress}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>{'No projects available'}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllProjects;
