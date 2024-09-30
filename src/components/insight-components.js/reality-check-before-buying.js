import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../widgets/header'
import Footer from '../widgets/footer'

function RealityCheck() {

    const Faqs = [
        {
            faqQuestion: "What is the importance of the RERA-registration number?",
            faqAnswer: "RERA registration number eliminates fraudulence and makes the property a validated immovable asset for investment."
        },
        {
            faqQuestion: "What is the procedure to verify a developer’s reputation?",
            faqAnswer: "Firstly check for the developer’s RERA registration number and explore projects developed by them."
        },
        {
            faqQuestion: "What is the document checklist I must verify before making a real estate investment? ",
            faqAnswer: "The document checklist must have the sale deed, land title, RERA-registration number, and occupancy certificate."
        },
        {
            faqQuestion: "Does location affect property value? ",
            faqAnswer: "Yes, location plays a pivotal role in ascertaining property value and the infrastructure development in the nearby areas also impacts property prices. "
        },
        {
            faqQuestion: "How important it is to make a site visit before investing in real estate? ",
            faqAnswer: `It is important to visit the project site to witness the development work along with analysing
facilities to check if the project meets your expectations.`
        }, {
            faqQuestion: "What is the financial aspect to consider before making a real estate investment? ",
            faqAnswer: `If you wish to make a real estate investment check for loan eligibility, credit score, and loan
tenure.`}


    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        // If the clicked item is already active, deactivate it by setting the activeIndex to null
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };


    return (
        <div>
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source
                        media="(min-width: 992px)"
                        srcSet="assets/images/banner-rcbbp.jpg"
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet="assets/images/banner-rcbbp-m.jpg"
                    />
                    <img
                        src="assets/images/banner-rcbbp-m.jpg"
                        className="h-100 object-cover object-position-bottom rounded" alt="Star Estate"
                    />
                </picture>
            </div>


            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Realty Check</li>
                        </ol>
                    </div>

                </div>
            </div>



            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading">
                        <h2 className="mb-0 ">Realty Check</h2>
                    </div>
                    <h6 className="form--title">Realty Check - A Must Read Before Investing in Real Estate</h6>
                    <p className="mb-4">Realty Check is an insight into the real estate market with reputed developers and RERA registered projects. Via the process, investors inch closer to properties that hold the potential
                        for high returns on investments. For a seamless and profitable real estate experience here are
                        the key features to explore:

                    </p>
                    {/* <p className='mb-4'><ol className="list mb-0"><li><strong>Approvals and Certifications:</strong> Check the Government and RERA-notified certificates
                        for properties to validate their legal compliance.</li>
                        <li><strong>Builder’s Reputation:</strong> Check for the developer’s credibility, registration status, and
                            other pivotal information necessary for expressing interest in their projects.</li>
                        <li><strong>Location and Infrastructure:</strong> For investment location matters and robust
                            infrastructure with seamless connectivity to schools, offices, and party places
                            increases property prices. Also, properties with easy connectivity to hospitals,
                            marketplaces, and other prominent locales experience apprise in their prices.</li>
                        <li><strong>Legal Compliance:</strong> Each project listed on our website is RERA-compliant and ushers a
                            fair investment in the real estate market.</li>
                        <li><strong>Financial Aspects:</strong> Assess the financial feasibility by exploring special payment plans,
                            early bird offers, and other special offers.</li>
                        <li><strong>Physical Verification:</strong>  Plan a site visit to check the current work status and validate
                            factors like construction quality, amenities, security, and other qualitative parameters.</li></ol></p> */}
                    <div className="form--section"></div>
                    <div className="row gap-row">
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-light">
                                <div className="img-fluid size-md"><img src="assets/images/icons/seal-certificate-stroke.svg" alt="Approvals and Certifications" /></div>
                                <p className="mb-0 text-primary">Approvals and Certifications</p>
                                <p className='mb-4 text-center '>Check the Government and RERA-notified certificates
                                for properties to validate their legal compliance.</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-light">
                                <div className="img-fluid size-md"><img src="assets/images/icons/reputation-stroke.svg" alt="Builder’s Reputation" /></div>
                                <p className="mb-0 text-primary">Builder's Reputation</p>
                                <p className='mb-4 text-center'>Check for the developer's credibility, registration status, and
                                other pivotal information necessary for expressing interest in their projects.</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-light">
                                <div className="img-fluid size-md"><img src="assets/images/icons/map-stroke.svg" alt="Location and Infrastructure" /></div>
                                <p className="mb-0 text-primary">Location and Infrastructure</p>
                                <p className='mb-4 text-center'>For investment location matters and robust
                            infrastructure with seamless connectivity to schools, offices, and party places
                            increases property prices.</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-light">
                                <div className="img-fluid size-md"><img src="assets/images/icons/legal-document.svg" alt="Legal Compliance" /></div>
                                <p className="mb-0 text-primary">Legal Compliance</p>
                                <p className='mb-4 text-center'>Each project listed on our website is RERA-compliant and ushers a
                                fair investment in the real estate market.</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-light">
                                <div className="img-fluid size-md"><img src="assets/images/icons/financial-aspect.svg" alt="Financial Aspects" /></div>
                                <p className="mb-0 text-primary">Financial Aspects</p>
                                <p className='mb-4 text-center'>Assess the financial feasibility by exploring special payment plans,
                                early bird offers, and other special offers.</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-light">
                                <div className="img-fluid size-md"><img src="assets/images/icons/physical-verification.svg" alt="Physical Verification" /></div>
                                <p className="mb-0 text-primary">Physical Verification</p>
                                <p className='mb-4 text-center'>Plan a site visit to check the current work status and validate
                                factors like construction quality, amenities, security, and other qualitative parameters.</p>
                            </div>
                        </div>
                    </div>
                    <div className='pt-4'></div>
                </div>

            </div>
            
            <div className="w-100 padding bg-gray-gradient-box section-faq">
                {Faqs.length > 0 && (
                    <div className="container-lg">
                        <div className="heading mx-auto text-center">
                            <h2 className="mb-0">FAQs</h2>
                        </div>
                        <div className="">
                            <div className="accordion-wrapper" id="myAccordion">
                                {Faqs.map((faq, index) => {
                                    const faqIndex = index + 1;
                                    const isActive = activeIndex === faqIndex; // Check if this item is active

                                    return (
                                        <div className="accordion-item" key={faqIndex}>
                                            <div className="accordion-header" id={`heading${faqIndex}`}>
                                                <button
                                                    className={`accordion-button ${isActive ? "" : "collapsed"}`}
                                                    type="button"
                                                    onClick={() => handleToggle(faqIndex)}
                                                    aria-expanded={isActive ? "true" : "false"}
                                                    aria-controls={`collapse${faqIndex}`}
                                                >
                                                    <span className='text-primary'>Q{faqIndex}:</span> <div dangerouslySetInnerHTML={{ __html: faq.faqQuestion }} />
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </div>
                                            <div
                                                id={`collapse${faqIndex}`}
                                                className={`accordion-collapse collapse ${isActive ? "show" : ""}`}
                                                aria-labelledby={`heading${faqIndex}`}
                                                data-bs-parent="#myAccordion"
                                            >
                                                <div className="accordion-body">
                                                    <div className="card-body">
                                                        <div>{faq.faqAnswer}</div>
                                                    </div>
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
            {/* <Footer /> */}
        </div>
    )
}

export default RealityCheck