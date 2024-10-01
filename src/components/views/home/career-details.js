import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function CareerDetails() {
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState(null); // Start with null instead of empty array
    const [errors, setError] = useState([]);
    const [formData, setFormData] = useState({
        crname: '',
        cremail: '',
        crmobile: '',
        job_type: '',
        resume: null,
        location: '', // Add location to the formData state
        category: '', // Add category to the formData state
    });

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axiosInstance.get(`/jobs/getJobBySlugURL/${id}`);
                console.log(response.data);
                setJobDetails(response.data);
                // Update formData with the job location and position (category)
                setFormData(prevData => ({
                    ...prevData,
                    location: response.data.location || '', // Set default location
                    category: response.data.position || '', // Set default category
                }));
            } catch (error) {
                setError('Error fetching job details');
                console.error('Error fetching job details:', error);
            }
        };
        fetchJobDetails();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'resume') {
            // Set resume only if it's a PDF
            if (e.target.files[0] && e.target.files[0].type === 'application/pdf') {
                setFormData({ ...formData, [e.target.name]: e.target.files[0] });
            } else {
                setErrorMessage('Only PDF files are allowed');
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { crname, cremail, crmobile, job_type, resume, location, category } = formData;

        if (!crname || !cremail || !crmobile || !job_type || !resume) {
            Swal.fire({
                title: 'Error!',
                text: 'All fields are required',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const data = new FormData();
        data.append('Name', crname);
        data.append('Email', cremail);
        data.append('phoneNumber', crmobile);
        data.append('job_type', job_type);
        data.append('resume', resume);
        data.append('category', category); // Include category in the data
        data.append('location', location); // Include location in the data

        try {
            const response = await axiosInstance.post(
                'careerQuery/addCareer',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            Swal.fire({
                title: 'Success!',
                text: 'Form submitted successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error submitting form', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error submitting the form',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    return (
        <div>
            <div className="insideBanner">
                <picture>
                    <source media="(max-width: 820px)" srcSet="/star-estate-react/assets/images/banner-emi-calculator-m.jpg" />
                    <img src="/star-estate-react/assets/images/banner-emi-calculator.jpg" className="h-100 object-cover" alt="Star Estate" />
                </picture>
            </div>
            <div className="w-100">
                <div className="container-lg">
                    {jobDetails ? (
                        <div className="breadcrumbContainer" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item"><Link to='/careers'>Careers</Link></li>
                                <li className="breadcrumb-item active">{jobDetails.position}</li>
                            </ol>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    {jobDetails ? (
                        <>
                            <div className="heading mx-auto text-center">
                                <h3 className="mb-0">{jobDetails.position || 'Job Title'}</h3>
                            </div>
                            <article className="career-details">
                                <ul
                                    dangerouslySetInnerHTML={{
                                        __html: jobDetails.description || '', // Dynamically set the inner HTML
                                    }}
                                />
                            </article>
                        </>
                    ) : (
                        <p>Loading job details...</p>
                    )}
                </div>
            </div>
            <div className="w-100 float-left padding bg-lightgray">
                <div className="container-lg">
                    <div className="row gap-row">
                        <div className="col-lg-4 career-img"><img src="https://ecis.in/star-estate-react/images/careers-th.jpg" className="h-100 object-cover" alt="" /></div>
                        <div className="col-lg-8 anotherForm">
                            <div className="inner bg-gray-gradient-box p-3 h-100">
                                <div className="heading">
                                    <h3>Upload Resume</h3>
                                </div>
                                <form onSubmit={handleSubmit} className="carforms" encType="multipart/form-data">
                                    <span className="fixstatus text-danger">{errorMessage}</span>
                                    <div className="row">
                                        <div className="col-sm-6 form-group">
                                            <input
                                                type="text"
                                                name="crname"
                                                id="crname"
                                                className="form-control bg-white"
                                                placeholder="Name*"
                                                value={formData.crname}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <input
                                                type="email"
                                                name="cremail"
                                                id="cremail"
                                                className="form-control bg-white"
                                                placeholder="Email*"
                                                value={formData.cremail}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <input
                                                type="text"
                                                name="crmobile"
                                                id="crmobile"
                                                className="form-control bg-white"
                                                placeholder="Mobile*"
                                                value={formData.crmobile}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <select
                                                name="job_type"
                                                id="job_type"
                                                className="form-control bg-white"
                                                value={formData.job_type}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Job Type</option>
                                                <option value="Full Time">Full Time</option>
                                                <option value="Part Time">Part Time</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-12 form-group">
                                            <label htmlFor="resume">Upload Resume (PDF Only)</label>
                                            <input
                                                type="file"
                                                name="resume"
                                                id="resume"
                                                className="form-control bg-white"
                                                onChange={handleChange}
                                                accept=".pdf"
                                            />
                                        </div>
                                        <div className="col-sm-4 readmore mt-0">
                                            <button type="submit" className="button">Submit</button>
                                        </div>
                                        <div className="col-sm-12">
                                            <p className="mb-0 mt-5"><small>Didn’t find your job role! Email your resume to <a className="text-green text-decoration-underline" href="mailto:hr@starestate.in">hr@starestate.in</a>. We are always in search of talented professionals to join our team.</small></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CareerDetails;
