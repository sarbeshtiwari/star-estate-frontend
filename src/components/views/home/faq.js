import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css';

function Faq() {

    const Faqs = [
        {
            faqQuestion: "What Services Does Star Estate Provide?",
            faqAnswer: "Star Estate Provides A Wide Range Of Real Estate Services, Including Property Buying, Selling, And Renting. We Also Offer Property Management Services, Real Estate Investment Consultation, And Assistance With Property Valuation And Appraisals."
        },
        {
            faqQuestion: "How Can I Contact Star Estate?",
            faqAnswer: "You Can Contact Star Estate By Phone At 70884 70884 Or Via Email At info@starestate.in. We Also Have A Contact Form On Our Website, Where You Can Leave Your Details And Message, And Our Team Will Get Back To You Promptly."
        },
        {
            faqQuestion: "Where Is Star Estate Located?",
            faqAnswer: "Star Estate Has Multiple Office Locations To Serve Our Clients Better. You Can Find Us At Riana Towers, 4th Floor, Plot No: 111-112, Sector 136, Noida - 201304. We Have A Team Of Experienced Real Estate Agents And Consultants Ready To Assist You With Your Property Needs."
        },
        {
            faqQuestion: "Does Star Estate Handle Both Residential And Commercial Properties?",
            faqAnswer: "Yes, Star Estate Deals With Both Residential And Commercial Properties. Whether You're Looking To Buy A Home, Or Invest In A Commercial Property, We Have The Expertise To Assist You."
        },
        {
            faqQuestion: "Can Star Estate Help Me Sell My Property?",
            faqAnswer: `Yes`
        },
        {
            faqQuestion: "Can Star Estate Assist Me In Buying A Residential Property?",
            faqAnswer: "Absolutely! Star Estate can assist you in buying a residential property. Our experienced agents will guide you through the entire buying process, help you find suitable properties, arrange viewings, and negotiate the best deal on your behalf."
        },
        {
            faqQuestion: "Does Star Estate Handle Commercial Property Transactions?",
            faqAnswer: "Yes, Star Estate handles commercial property transactions as well. Whether you're interested in purchasing an office space, a retail property, or other commercial real estate, our team can provide professional guidance and support throughout the process."
        },
        {
            faqQuestion: "Can Star Estate Assist With Property Financing?",
            faqAnswer: "Yes, Star Estate Has Partnerships With Various Financial Institutions And Can Help You With Property Financing Options. We Can Provide Guidance On Mortgage Loans, Interest Rates, And Assist In Connecting You With Reliable Lenders Who Can Offer Competitive Financing Terms."
        },
        {
            faqQuestion: "Does Star Estate Offer Property Management Services?",
            faqAnswer: "Yes"
        },
        {
            faqQuestion: "How Can I Stay Updated On New Property Listings?",
            faqAnswer: "You Can Stay Updated On New Property Listings By Visiting Our Website Regularly. We Regularly Update Our Listings With New Properties Available For Sale. You Can Also Follow Our Social Media Channels To Receive Notifications About The Latest Property Offerings."
        },
        {
            faqQuestion: "Is Star Estate Licensed And Regulated?",
            faqAnswer: "Yes, Star Estate Is A Licensed And Regulated Real Estate Company. We Comply With All Local Real Estate Regulations And Operate With Integrity And Professionalism. Our Team Members Are Qualified And Experienced In Their Respective Fields, Ensuring You Receive Reliable And Trustworthy Service."
        },
        {
            faqQuestion: "Can I Trust Star Estate With My Property Needs?",
            faqAnswer: "Absolutely! Star Estate Has A Proven Track Record Of Satisfied Clients And Successful Real Estate Transactions. We Prioritize Customer Satisfaction And Aim To Exceed Your Expectations. Our Team Is Dedicated To Providing Personalized Service, Expert Advice, And Guiding You Through Every Step Of Your Real Estate Journey."
        },


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
            <div className="emptyBox"></div>
            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">FAQ</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="w-100 padding bg-gray-gradient-box section-faq">
                    {Faqs.length > 0 && (
                        <div className="container-lg">
                            <div className="heading mx-auto text-center">
                                <h2 className="mb-0">Frequently Asked Questions</h2>
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

                    )}  <div className="heading mx-auto text-center"><p className='mb-0'>If You Have Any Other Questions Or Need Further Assistance, Please Don't Hesitate To Reach Out To Us.</p></div></div>
                    
            </div>
        </div>
    )
}
export default Faq