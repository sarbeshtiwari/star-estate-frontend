import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
function Career() {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axiosInstance.get(`/jobs/getJobs`);
                const filteredJobs = response.data.filter(job => job.status === true);
                setJobs(filteredJobs);
            } catch (error) {
                console.error('Failed to fetch Jobs', error);
            }
        };
        fetchJobs();
    }, []);
  return (
    <div>
        {/* <Header /> */}
        <div className="insideBanner">
        <picture>
            <source media="(max-width: 820px)" srcset="/star-estate-react/assets/images/banner-emi-calculator-m.jpg" />
            <img src="/star-estate-react/assets/images/banner-emi-calculator.jpg" className="h-100 object-cover object-position-bottom rounded" alt="Star Estate" />
        </picture>
    </div>
    <div className="w-100">
        <div className="container-lg">
            <div className="breadcrumbContainer" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item active">Careers</li>
                </ol>
            </div>
        </div>
    </div>
    <div className="w-100 padding">
        <div className="container-lg">
            <div className="heading mx-auto text-center">
                <h3 className="mb-0">Life at STAR ESTATE</h3>
            </div>
            <p>STAR ESTATE is a team of experienced and accomplished professionals committed to working with a result-oriented approach. Our team members precisely understand their roles and responsibilities towards clients, and thus the organisation is continuously rising towards excellence, client satisfaction, and goal achievements.</p>
            <div className="career-pointer-container">
                <div className="row g-3 gap-form-row">
                    <div className="col-md-4 career-pointer-box">
                        <div className="inner h-100">
                            <div className="img-fluid h-100"><img src="https://www.starestate.in/assets/images/Professional-Growth-Prospects.webp" className="h-100 object-cover" alt="Healthy Work Environment" /></div>
                            <h6>Professional Growth Prospects</h6>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row g-3 gap-form-row">
                            <div className="col-md-6 career-pointer-box">
                                <div className="inner h-100">
                                    <div className="img-fluid h-100"><img src="https://www.starestate.in/assets/images/Incentives-and-Perks.webp" className="h-100 object-cover" alt="Incentives and Perks" /></div>
                                    <h6>Incentives and Perks</h6>
                                </div>
                            </div>
                            <div className="col-md-6 career-pointer-box">
                                <div className="inner h-100">
                                    <div className="img-fluid h-100"><img src="https://www.starestate.in/assets/images/Equality-at-Workplace.webp" className="h-100 object-cover" alt="Equality At Workplace" /></div>
                                    <h6>Equality At Workplace</h6>
                                </div>
                            </div>
                            <div className="col-md-6 career-pointer-box">
                                <div className="inner h-100">
                                    <div className="img-fluid h-100"><img src="https://www.starestate.in/assets/images/Industry-Standard-Payout.webp" className="h-100 object-cover" alt="Industry Standard Payout" /></div>
                                    <h6>Industry Standard Payout</h6>
                                </div>
                            </div>
                            <div className="col-md-6 career-pointer-box">
                                <div className="inner h-100">
                                    <div className="img-fluid h-100"><img src="https://www.starestate.in/assets/images/Healthy-Work-Environment.webp" className="h-100 object-cover" alt="Professional Growth Prospects" /></div>
                                    <h6>Healthy Work Environment</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="w-100 float-left padding bg-lightgray">
        <div className="container-lg">
            <div className="heading text-center mx-auto">
                <h3>Work With Us</h3>
            </div>
            <div className="bg-gray-gradient-box p-3">
                <div className="table-responsive">
                    <table className="table table-bordered mb-0">
                        <thead>
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Position</th>
                                <th scope="col">Nos.</th>
                                <th scope="col">Location</th>
                                <th scope="col">Qualification</th>
                                <th scope="col">Min. Exp.</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {jobs.length > 0 ? (
                            jobs.map((job, index) => (
                                <tr key={job.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{job.position}</td>
                                    <td>{job.nos}</td>
                                    <td>{job.location}</td>
                                    <td>{job.qualification}</td>
                                    <td>{job.min_exp}</td>
                                    <td className="readmore mt-0">
                                        <Link to={`/careers/${job.location}/${job.slugURL}`} name="Submit" className="button">View</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No jobs available</td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    {/* <Footer /> */}
    </div>
  )
}
export default Career