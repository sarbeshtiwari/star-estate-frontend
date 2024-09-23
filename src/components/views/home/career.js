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
                    <source 
                        media="(min-width: 992px)" 
                        srcSet="/star-estate-react/assets/images/career.jpg" 
                    />
                    <source 
                        media="(min-width: 768px)" 
                        srcSet="/star-estate-react/assets/images/career-m.jpg" 
                    />
                    <img 
                        src="/star-estate-react/assets/images/career-m.jpg" 
                        className="h-100 object-cover object-position-bottom rounded" 
                        alt="Star Estate" 
                    />
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
                <h3 className="mb-0">We practice holistic growth approach competitively</h3>
            </div>
            <p className='mb-0 text-center'>Step into the ecosystem of competitive ecosystem that nurture professional growth aspirations with
collaboration, and camaraderie moments. Our workplace embrace the synergy to learn, share, ideate
and build long-term and sturdy partnerships. We have a work culture at respects every voiced
perception. Join us to experience mega growth opportunities and embrace continuous growth.</p>
        </div>
    </div>
    <div className="w-100 position-relative overflow-hidden career-section1 bg-image">
    <div className='career-random-text px-1 text-center text-white container-lg'>
        <p className='mb-0 h4 fw-light'>
            <i className='fa fa-quote-left'></i> 
            Our talent pool address real estate apprehensions and resolve investors’ asymmetrical problems across India. Our experienced, expert, and considerate team answer search for exclusive and elite immovable assets across segments and budgets.
            <i className='fa fa-quote-right'></i>
        </p>
    </div>
    <img src='/star-estate-react/assets/images/Do-work-that-matters.jpg' alt='Career' />
</div>


    <div className="w-100 padding">
        <div className="container-lg">
            <div className="row gap-row justify-content-center">
                <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                    <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                        <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/financial-idea.svg" alt="Professional Growth Prospects" /></div>
                        <p className="mb-0 text-primary">Professional Growth Prospects</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                    <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                        <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/lease.svg" alt="Incentives and Perks" /></div>
                        <p className="mb-0 text-primary">Incentives and Perks</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                    <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                        <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/handshake.svg" alt="Equality At Workplace" /></div>
                        <p className="mb-0 text-primary">Equality At Workplace</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                    <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                        <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/customer-support-stroke.svg" alt="Industry Standard Payout" /></div>
                        <p className="mb-0 text-primary">Industry Standard Payout</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                    <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                        <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/special-offer.svg" alt="Healthy Work Environment" /></div>
                        <p className="mb-0 text-primary">Healthy Work Environment</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="w-100 position-relative overflow-hidden career-section2">
        <div className='career-random-text' data-position="center">
            <div className='heading mx-auto text-center ms-sm-0 text-sm-start'><h3>Lorem Ipsum on lihtsalt proovitekst</h3></div>
            <p className='mb-0'>Lorem Ipsum ei ole ainult viis sajandit säilinud, vaid on ka edasi kandunud elektroonilisse trükiladumisse, jäädes sealjuures peaaegu muutumatuks. See sai tuntuks 1960. aastatel Letraset'i lehtede väljalaskmisega.</p>
        </div>
        <img src='/star-estate-react/assets/images/career-section-img.jpg' alt='Career' />
    </div>

    <div id='job_opening_section' className="w-100 padding">
        <div className="container-lg">
            <div className="heading text-center mx-auto">
                <h3>Work With Us</h3>
            </div>
            <div className="bg-gray-gradient-box p-3 common-border">
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