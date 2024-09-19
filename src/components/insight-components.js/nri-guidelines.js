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
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-lightgray">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/financial-idea.svg" alt="Financial Solution" /></div>
                                <p className="mb-0 text-primary">Easy Financial Solutions</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-lightgray">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/lease.svg" alt="Easy Lease" /></div>
                                <p className="mb-0 text-primary">Easy Lease</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-lightgray">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/handshake.svg" alt="NRI Assistance" /></div>
                                <p className="mb-0 text-primary">Dedicated NRI Assistance (onsite)</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-lightgray">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/customer-support-stroke.svg" alt="Customer Care Assistance" /></div>
                                <p className="mb-0 text-primary">Customer Care Assistance</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-lightgray">
                                <div className="img-fluid size-md"><img src="/star-estate-react/assets/images/icons/special-offer.svg" alt="Exclusive Offers" /></div>
                                <p className="mb-0 text-primary">Exclusive Offers</p>
                            </div>
                        </div>
                        <div className="col-md-4 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-lightgray">
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
                    <div className="list-group list-group-flush faqsContainer">
                        <div className="accordion-wrapper" id="myAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        Q1: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        <i className="fa fa-plus ms-auto"></i>
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#myAccordion"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                <b>A:</b> <span>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        Q2: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        <i className="fa fa-plus ms-auto"></i>
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#myAccordion"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                <b>A:</b> <span>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                        Q3: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        <i className="fa fa-plus ms-auto"></i>
                                    </button>
                                </h2>
                                <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#myAccordion"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                <b>A:</b> <span>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFour">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour"
                                        aria-expanded="false"
                                        aria-controls="collapseFour"
                                    >
                                        Q4: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        <i className="fa fa-plus ms-auto"></i>
                                    </button>
                                </h2>
                                <div
                                    id="collapseFour"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingFour"
                                    data-bs-parent="#myAccordion"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                <b>A:</b> <span>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFive">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseFive"
                                        aria-expanded="false"
                                        aria-controls="collapseFive"
                                    >
                                        Q5: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        <i className="fa fa-plus ms-auto"></i>
                                    </button>
                                </h2>
                                <div
                                    id="collapseFive"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingFive"
                                    data-bs-parent="#myAccordion"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                <b>A:</b> <span>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingSix">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseSix"
                                        aria-expanded="false"
                                        aria-controls="collapseSix"
                                    >
                                        Q6: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        <i className="fa fa-plus ms-auto"></i>
                                    </button>
                                </h2>
                                <div
                                    id="collapseSix"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingSix"
                                    data-bs-parent="#myAccordion"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                <b>A:</b> <span>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingSeven">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseSeven"
                                        aria-expanded="false"
                                        aria-controls="collapseSeven"
                                    >
                                        Q7: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        <i className="fa fa-plus ms-auto"></i>
                                    </button>
                                </h2>
                                <div
                                    id="collapseSeven"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingSeven"
                                    data-bs-parent="#myAccordion"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                <b>A:</b> <span>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Add more accordion items here */}
                        </div>
                    </div>
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