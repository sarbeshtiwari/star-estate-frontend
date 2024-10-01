import React, { useEffect, useState } from 'react'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

function Career() {
    var swiper = new Swiper(".crDreamer-slider", {
        slidesPerView: "auto",
        loop: true,
        speed: 1000,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                origin: "left center",
                translate: ["-5%", 0, -200],
                rotate: [0, 100, 0],
            },
            next: {
                origin: "right center",
                translate: ["5%", 0, -200],
                rotate: [0, -100, 0],
            },
        },
    });
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
            <div className="insideBanner">
                <picture>
                    <source
                        media="(min-width: 992px)"
                        srcSet="assets/images/career.jpg"
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet="assets/images/career-m.jpg"
                    />
                    <img
                        src="assets/images/career-m.jpg"
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
                    <p className='text-center'>Step into the ecosystem of the competitive ecosystem that nurtures professional growth aspirations with collaboration, and camaraderie moments. Our workplace embraces the synergy to learn, share, ideate, and build long-term and sturdy partnerships. We have a work culture at respects every voiced perception. Join us to experience mega-growth opportunities and embrace continuous growth.</p>
                    <p className='mb-0 text-center'>Our talent pool addresses real estate apprehensions and resolves investors’ asymmetrical problems across India. Our experienced, expert, and considerate team answers the searches for exclusive and elite immovable assets across segments and budgets.</p>
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
                <img src='assets/images/Do-work-that-matters.jpg' alt='Career' />
            </div>


            {/* <div className="w-100 padding">
                <div className="container-lg">
                    <div className="row gap-row justify-content-center">
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                                <div className="img-fluid size-md"><img src="assets/images/icons/financial-idea.svg" alt="Professional Growth Prospects" /></div>
                                <p className="mb-0 text-primary">Professional Growth Prospects</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                                <div className="img-fluid size-md"><img src="assets/images/icons/lease.svg" alt="Incentives and Perks" /></div>
                                <p className="mb-0 text-primary">Incentives and Perks</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                                <div className="img-fluid size-md"><img src="assets/images/icons/handshake.svg" alt="Equality At Workplace" /></div>
                                <p className="mb-0 text-primary">Equality At Workplace</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                                <div className="img-fluid size-md"><img src="assets/images/icons/customer-support-stroke.svg" alt="Industry Standard Payout" /></div>
                                <p className="mb-0 text-primary">Industry Standard Payout</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box text-center h-100">
                                <div className="img-fluid size-md"><img src="assets/images/icons/special-offer.svg" alt="Healthy Work Environment" /></div>
                                <p className="mb-0 text-primary">Healthy Work Environment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="w-100 padding">
                <div className="container-lg">
                    {[
                    {
                        imgSrc: "assets/images/professional-growth-aspects.jpg",
                        title: "Professional Growth Aspects",
                        description: "Being a part of Star Estate is an opportunity to work with real estate giant and embrace experience to propel exceptional levels in the career while conquering laurels that reflect your determination and result-oriented work approach.",
                    },
                    {
                        imgSrc: "assets/images/equality-at-work-place.jpg",
                        title: "Equality At Work Place",
                        description: "We believe in rendering equal growth opportunities for professionals to weave a stable and successful career. With equal opportunity to excel in the professional realm, Star Estate is a platform for professionals to nurture dreams and climb the ladder of success.",
                    },
                    {
                        imgSrc: "assets/images/incentives-n-perks.jpg",
                        title: "Incentives & Perks",
                        description: "We count on success along with the result-oriented work efforts and applaud stellar performances with tokens of appreciation. At Star Estate, sincere efforts to attain goals are always recognized and appreciation is rendered to boost the confidence of our real estate professionals.",
                    },
                    {
                        imgSrc: "assets/images/healthy-work-environment.jpg",
                        title: "Healthy Work Environment",
                        description: "We believe in an ideal work-life balance in life thus celebrations are a part of our work culture. At Star Estate work and celebration runs parallel to bring team members together to weave a bond of trust and cherish joyful moments to unburden professionals.",
                    },
                    {
                        imgSrc: "assets/images/industry-standard-payouts.jpg",
                        title: "Industry Standard Payouts",
                        description: "Star Estate values work and is happy to render the best remuneration for distinguished portfolios considering the payout standards of the real estate market. Our healthy work frame is an opportunity to elevate in our career by attaining a much-deserved payout.",
                    },
                    {
                        imgSrc: "assets/images/cognitive-diversity.jpg",
                        title: "Cognitive Diversity",
                        description: "Star Estate is a network of professionals with distinguished work experience across India. Our distinct workforce with unique ideas, concepts, and work strategies elevate the business to attain the target and reap massive success.",
                    },
                    ].map((item, index) => (
                    <div className={`row gx-0 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`} key={index}>
                        <div className="col-md-6 imgBox">
                        <img src={item.imgSrc} className="h-100 object-cover" alt={item.title} />
                        </div>
                        <div className="col-md-6 serviceBox careersbox">
                        <div className="inner h-100 bg-light d-flex align-items-center">
                            <article>
                            <div className="heading mb-4">
                                <h4 className="mb-0 text-primary">{item.title}</h4>
                            </div>
                            <p className="text-left">{item.description}</p>
                            </article>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div> */}

            <div className="w-100 padding career-services-wrapper">
                <div className="container-lg">
                    <div className="career-services-parent">
                        <div className="career-serviceBox common-border crBox1" style={{ '--clr': '#ecf6ff' }}>
                            <div className='row g-0 h-100'>
                                <div className='col-lg-6 crServImg'>
                                    <img src='assets/images/professional-growth-aspects.jpg' className='h-100 object-cover' alt='' />
                                </div>
                                <div className='col-lg-6 crServText'>
                                    <div className='inner bg-gray-gradient-box'>
                                        <div className='heading mb-2'><h5 className='mb-0 text-texture'>Professional Growth Aspects</h5></div>
                                        <article>
                                            <p>Being a part of Star Estate is an opportunity to work with real estate giant and embrace experience to propel exceptional levels in the career while conquering laurels that reflect your determination and result-oriented work approach.</p>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="career-serviceBox common-border crBox2" style={{ '--clr': '#ecffee' }}>
                            <div className='row g-0 h-100'>
                                <div className='col-md-12 crServImg'>
                                    <img src='assets/images/equality-at-work-place.jpg' className='h-100 object-cover' alt='' />
                                </div>
                                <div className='col-md-12 crServText'>
                                    <div className='inner bg-gray-gradient-box'>
                                        <div className='heading mb-2'><h5 className='mb-0 text-texture'>Equality At Work Place</h5></div>
                                        <article>
                                            <p>We count on success along with the result-oriented work efforts and applaud stellar performances with tokens of appreciation. At Star Estate, sincere efforts to attain goals are always recognized and appreciation is rendered to boost the confidence of our real estate professionals.</p>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="career-serviceBox common-border crBox3" style={{ '--clr': '#ddd2f9' }}>
                            <div className='row g-0 h-100'>
                                <div className='col-md-12 crServImg'>
                                    <img src='assets/images/incentives-n-perks.jpg' className='h-100 object-cover' alt='' />
                                </div>
                                <div className='col-md-12 crServText'>
                                    <div className='inner bg-gray-gradient-box'>
                                        <div className='heading mb-2'><h5 className='mb-0 text-texture'>Incentives & Perks</h5></div>
                                        <article>
                                            <p>We count on success along with the result-oriented work efforts and applaud stellar performances with tokens of appreciation. At Star Estate, sincere efforts to attain goals are always recognized and appreciation is rendered to boost the confidence of our real estate professionals.</p>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="career-serviceBox common-border crBox4" style={{ '--clr': '#fffbec' }}>
                            <div className='row g-0 h-100'>
                                <div className='col-md-12 crServImg'>
                                    <img src='assets/images/healthy-work-environment.jpg' className='h-100 object-cover' alt='' />
                                </div>
                                <div className='col-md-12 crServText'>
                                    <div className='inner bg-gray-gradient-box'>
                                        <div className='heading mb-2'><h5 className='mb-0 text-texture'>Healthy Work Environment</h5></div>
                                        <article>
                                            <p>We believe in an ideal work-life balance in life thus celebrations are a part of our work culture. At Star Estate work and celebration runs parallel to bring team members together to weave a bond of trust and cherish joyful moments to unburden professionals.</p>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="career-serviceBox common-border crBox5" style={{ '--clr': '#ecf6ff' }}>
                            <div className='row g-0 h-100'>
                                <div className='col-lg-6 crServImg'>
                                    <img src='assets/images/industry-standard-payouts.jpg' className='h-100 object-cover' alt='' />
                                </div>
                                <div className='col-lg-6 crServText'>
                                    <div className='inner bg-gray-gradient-box'>
                                        <div className='heading mb-2'><h5 className='mb-0 text-texture'>Industry Standard Payouts</h5></div>
                                        <article>
                                            <p>Star Estate values work and is happy to render the best remuneration for distinguished portfolios considering the payout standards of the real estate market. Our healthy work frame is an opportunity to elevate in our career by attaining a much-deserved payout.</p>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="career-serviceBox common-border crBox6" style={{ '--clr': '#ecf6ff' }}>
                            <div className='row g-0 h-100'>
                                <div className='col-md-12 crServImg'>
                                    <img src='assets/images/cognitive-diversity.jpg' className='h-100 object-cover' alt='' />
                                </div>
                                <div className='col-md-12 crServText'>
                                    <div className='inner bg-gray-gradient-box'>
                                        <div className='heading mb-2'><h5 className='mb-0 text-texture'>Cognitive Diversity</h5></div>
                                        <article>
                                            <p>Star Estate is a network of professionals with distinguished work experience across India. Our distinct workforce with unique ideas, concepts, and work strategies elevates the business to attain the target and reap massive success.</p>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-100 position-relative overflow-hidden padding career-section2 bg-image" style={{ backgroundImage: "url(assets/images/career-section-img.jpg)" }}>
                <div className="container-lg">
                    <div className='crDreamerWrapper bg-white shadow'>
                        <div className="heading">
                            <h3 className="mb-0 text-texture">Star Estate Welcome Dreamers To</h3>
                        </div>
                        <div className='swiper crDreamer-slider'>
                            <div className='swiper-wrapper'>
                                <div className='swiper-slide crDreamer-slide'>
                                    <div className='inner  bg-gray-gradient-box'>
                                        <div className='heading-container'>
                                            <div className='heading mb-0 mx-auto d-flex justify-content-center'>
                                                <img src='assets/images/lEARN.png' className='img-fluid' />
                                                <h4 className='mb-0 text-primary'>Learn</h4>
                                            </div>
                                        </div>
                                        <p className="mb-0">Learning is a never ending process leading to knowledge wisdom that amplifies growth in the professional sphere. If you are ready to embrace trainings, and accept new responsibilities to earn an edge over others competitively, then share your resume with us.</p>
                                    </div>
                                </div>
                                <div className='swiper-slide crDreamer-slide'>
                                    <div className='inner  bg-gray-gradient-box'>
                                        <div className='heading-container'>
                                            <div className='heading mb-0 mx-auto d-flex justify-content-center'>
                                                <img src='assets/images/lead.png' className='img-fluid' />
                                                <h4 className='mb-0 text-primary'>Lead</h4>
                                            </div>
                                        </div>
                                        <p className="mb-0">Be the leader and not the ladder to success. Join us if you have the expertise to lead from the front along with nurturing young minds. At Star Estate, we value quality work and compassion to elevate our family at work as we shine bright when our team strike work-life right.</p>
                                    </div>
                                </div>
                                <div className='swiper-slide crDreamer-slide'>
                                    <div className='inner  bg-gray-gradient-box'>
                                        <div className='heading-container'>
                                            <div className='heading mb-0 mx-auto d-flex justify-content-center'>
                                                <img src='assets/images/inspire.png' className='img-fluid' />
                                                <h4 className='mb-0 text-primary'>Inspire</h4>
                                            </div>
                                        </div>
                                        <p className="mb-0">Join us if you are not just another professional in the business. Get on board with us, accept challenges, emerge victories in the competitive workplace and let your success story be an inspiration for other.</p>
                                    </div>
                                </div>
                                <div className='swiper-slide crDreamer-slide'>
                                    <div className='inner  bg-gray-gradient-box'>
                                        <div className='heading-container'>
                                            <div className='heading mb-0 mx-auto d-flex justify-content-center'>
                                                <img src='assets/images/aspire.png' className='img-fluid' />
                                                <h4 className='mb-0 text-primary'>Aspire</h4>
                                            </div>
                                        </div>
                                        <p className="mb-0">Pause! If this word isn’t part of your dictionary then join us and propel yourself to garner newer higher of success in the business. Star Estate respect efforts and your commitment to work will be the key to nurture aspirations of stepping new milestones professionally.</p>
                                    </div>
                                </div>
                                <div className='swiper-slide crDreamer-slide'>
                                    <div className='inner  bg-gray-gradient-box'>
                                        <div className='heading-container'>
                                            <div className='heading mb-0 mx-auto d-flex justify-content-center'>
                                                <img src='assets/images/CELEBRATE.png' className='img-fluid' />
                                                <h4 className='mb-0 text-primary'>Celebrate</h4>
                                            </div>
                                        </div>
                                        <p className="mb-0">Work and celebration are two reflections of Star Estate. We appreciate determination to accomplish goals and we applaud joyousness to bond as a family. At our workplace, professionals dazzle in holistic rituals, comfort, and testaments.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='swiper-controls'>
                                <div className='swiper-button-prev'></div>
                                <div className='swiper-button-next'></div>
                            </div>
                        </div>
                    </div>
                </div>
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
        </div>
    )
}
export default Career