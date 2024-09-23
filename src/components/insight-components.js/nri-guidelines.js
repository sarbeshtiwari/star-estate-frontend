import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../widgets/header'
import Footer from '../widgets/footer'
import axiosInstance from '../views/utils/axiosInstance';
import axios from 'axios';


export const sendNRIData = async (formData) => {
    try {
        const response = await axiosInstance.post(`/NRIQuery/addNRIQuery`, formData);
        return response;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

function NriGuidelines() {
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        phoneNumber: '',
        user_query: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: ''
    });

    useEffect(() => {
        // Extract UTM parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const utmParams = {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_term: params.get('utm_term') || '',
            utm_content: params.get('utm_content') || ''
        };

        setFormData(prevData => ({
            ...prevData,
            ...utmParams
        }));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendNRIData(formData);
            setSuccessMessage('Form submitted successfully!');
            setTimeout(() => {
                setSuccessMessage(''); // Clear message after some time
            }, 2000);
        } catch (error) {
            setSuccessMessage('Failed to submit the form.');
        }
    };

    const Faqs = [
        {
          faqQuestion: "Who is NRI?",
          faqAnswer: `NRI is a Non-Resident Indian is a citizen of India who stays abroad for
employment/carrying business or vocation outside India or stays abroad under
circumstances indicating an intention for an uncertain duration of stay abroad is a nonresident foreign citizens of India origin are treated at par with Non-Resident Indian
(NRI).`
        },
        {
          faqQuestion: "Can an NRI/ PIO acquire agricultural land/plantation property/ farm house in India?",
          faqAnswer: "Since general permission is not available to NRI/PIO to acquire agricultural land/plantation property/farm house in India, such proposals will require specific approval from the Reserve Bank and the proposals are considered in consultation with Government of India."
        },
        {
          faqQuestion: "What is the tax payment procedure on income from immovable Property Selling/Renting for NRI/PIO/OCI?",
          faqAnswer: "The mere acquisition of property does not attract income tax. However, any income accruing from the ownership of it, in the form of rent (if it is let out)/annual value of the house (if is not let out and it is not the only residential property owned by that person in India) and/or capital gains (short term or long term) arising on the sale of this house or part thereof is taxable in the hands of the owner. "
        },
        {
          faqQuestion: "Do NRIs/PIOs/OCIs have to file returns in India for their property rental income and Capital Gains Tax?",
          faqAnswer: "The Government of India has granted general permission to NRI/PIO/OCI to buy property in India and they do not have to pay any taxes even while acquiring the property in India. However, taxes have to be paid if they are selling this property. Rental Income earned is taxable in India, and they will have to obtain a PAN and file areturn of the income if they have rented this property. On sale of the property, the profit on sale shall be subject to capital gains, which are to be included in their total income and will be taxed in the normal bracket. However, if the property has beenheld for more than three years, then the resulting gain would be labeled as long termcapital gains subject to 20% tax and some additional levy (cess)."
        },
        {
          faqQuestion: ": How does the Double Taxation Avoidance Agreement (DTAA) work in the context of tax on income and Capital Gains tax paid in India by NRI?",
          faqAnswer: "India has DTAAs with several countries which give a favourable tax treatment in respect of certain heads of income. However, in case of sale of immovable property, the DTAA with most countries provide that the capital gains will be taxed in the country where the immovable property is located. Hence, the non-resident will be subject totax in India on the capital gains which arise on the sale of immovable property in India. Letting of immovable property in India would be taxed in India under max tax treaties in view of the fact that the property is in India."
        },
        {
            faqQuestion: " Does Capital Gains Tax (CGT) apply to NRI/PIO/OCI?",
            faqAnswer: "Yes. Long-term and short-term capital gains are taxable in the hands of non-residents."
          },
          {
            faqQuestion: "How is rate of CGT computed?",
            faqAnswer: "Type of Asset: Assets like house property, land and building, jewelry, development rights, etc."
          },
          {
            faqQuestion: "How does Double Taxation Avoidance Agreement Work in the context of CGT paid in India on the foreign tax treatment?",
            faqAnswer: "In case the non-resident pay tax on capital gains arising in India, he would normally be able to obtain a tax credit with respect to the taxes paid in India/ home country, because the income in India would also be included in the country of tax residence. The amount of tax is also on the basis of computing the tax credit that can be claimed as specified in the respective country’s DTAA and is also dependent on the laws of the home country where the taxpayer is a tax resident."
          },
          {
            faqQuestion: "Is the rental income property repatriable and what are the RBI rules?",
            faqAnswer: "The rental income, being a current account transaction, is repatriable, subject to the appropriate deduction of tax and the certification thereof by a Chartered Account in practice. Repatriation of sale proceeds is subject to certain conditions. The amount of repatriation cannot exceed the amount paid for acquisition of the immovable property in foreign exchange."
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
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source 
                        media="(min-width: 992px)" 
                        srcSet="/star-estate-react/assets/images/banner-nri.jpg" 
                    />
                    <source 
                        media="(min-width: 768px)" 
                        srcSet="/star-estate-react/assets/images/banner-nri-m.jpg" 
                    />
                    <img 
                        src="/star-estate-react/assets/images/banner-nri-m.jpg" 
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
                            <li className="breadcrumb-item active">NRI Guidelines</li>
                        </ol>
                    </div>

                </div>
            </div>

            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading">
                        <h2 className="mb-0">Exclusive NRI Benefits</h2>
                    </div>
                    <div className="row gap-row">
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/financial-idea.svg" alt="Financial Solution" /></div>
                                <p className="mb-0 text-primary">Easy Financial Solutions</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/lease.svg" alt="Easy Lease" /></div>
                                <p className="mb-0 text-primary">Easy Lease</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/handshake.svg" alt="NRI Assistance" /></div>
                                <p className="mb-0 text-primary">Dedicated NRI Assistance (onsite)</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/customer-support-stroke.svg" alt="Customer Care Assistance" /></div>
                                <p className="mb-0 text-primary">Customer Care Assistance</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/special-offer.svg" alt="Exclusive Offers" /></div>
                                <p className="mb-0 text-primary">Exclusive Offers</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/gifts-stroke.svg" alt="Special Gifts" /></div>
                                <p className="mb-0 text-primary">Special Gifts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 overview-right">
                <div className="container-lg">
                    <div className="heading">
                        <h2 className="mb-0">NRI Guidelines</h2>
                    </div>
                    {/* <h6 className="form--title">Evaluate the real worth of your immovable asset from experts.</h6> */}
                    <div className="form-wrapper mt-4">
                        <p className="mb-4">Star Estate simplifies real estate investments for NRIs in India by rendering a comprehensive set of
facts, rules and regulations at one place.


                        </p><p className='mb-4'>Email Id: info@starestate.in</p>
                        <p className='mb-4'>Phone: 98 xxx xxx xx</p><div className="form--section"></div></div>
                    {Faqs.length > 0 && (
                    <div className="container-lg">
                        <div className="heading mx-auto text-center">
                            <h2 className="mb-0">FAQs</h2>
                        </div>
                        <div className="touchFormWrapper">
                            <div className="accordion" id="myAccordion">
                                {Faqs.map((faq, index) => {
                                    const faqIndex = index + 1;
                                    const isActive = activeIndex === faqIndex; // Check if this item is active

                                    return (
                                        <div className="accordion-item" key={faqIndex}>
                                            <h2 className="accordion-header" id={`heading${faqIndex}`}>
                                                <button
                                                    className={`accordion-button ${isActive ? "" : "collapsed"}`}
                                                    type="button"
                                                    onClick={() => handleToggle(faqIndex)}
                                                    aria-expanded={isActive ? "true" : "false"}
                                                    aria-controls={`collapse${faqIndex}`}
                                                >
                                                    Q{faqIndex}: {faq.faqQuestion}
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${faqIndex}`}
                                                className={`accordion-collapse collapse ${isActive ? "show" : ""}`}
                                                aria-labelledby={`heading${faqIndex}`}
                                                data-bs-parent="#myAccordion"
                                            >
                                                <div className="accordion-body">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item px-0">
                                                            <b>A:</b> <span>{faq.faqAnswer}</span>
                                                        </li>
                                                    </ul>
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
            </div>


            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading">
                        <h2 className="mb-0">Express Your Interest</h2>
                    </div>
                    <div className="">
                        <form method="post" onSubmit={handleSubmit}>
                        <p className="status mb-0 text-warning">{successMessage}</p>
                            <div className="row g-3">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="name" className="form-label">Name<sup className="text-danger">*</sup></label>
                                    <input type="text" className="form-control" id="Name" name="Name" value={formData.Name}
                    onChange={handleChange}/>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="Email" className="form-label">Email<sup className="text-danger">*</sup></label>
                                    <input type="email" className="form-control" name="Email" id="Email" value={formData.Email}
                    onChange={handleChange}/>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Mobile<sup className="text-danger">*</sup></label>
                                    <input type="tel" className="form-control" name="phoneNumber" id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange} />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="user_query" className="form-label">Message</label>
                                    <textarea className="form-control" name="user_query" id="user_query" rows="5" value={formData.user_query}
                    onChange={handleChange}></textarea>
                                </div>
                                <div className="col-md-12 d-flex readmore mt-0 justify-content-start">
                                    <input type="hidden" name="contact_action" value="active" />
                                    <button type="submit" className="button hoverOnWhite">Submit</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default NriGuidelines