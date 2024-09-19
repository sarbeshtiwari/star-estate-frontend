import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../widgets/header';
import Footer from '../widgets/footer';
import axiosInstance from '../views/utils/axiosInstance';

export const sendvaluationReport = async (formData) => {
    try {
        const response = await axiosInstance.post(`/propertyEvaluation/addEvaluationReport`, formData);
        return response;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};



function PropertyEvaluationReport() {
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        propertyType: 'residential',
        buildingType: 'apartment',
        unitType: 'bhk1',
        area: '',
        propertyAge: '',
        floorNo: '',
        totalFloors: '',
        coveredParkings: '0',
        facing: '',
        unitNo: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
       
        e.preventDefault();
        try {
            await sendvaluationReport(formData);
              // Clear form data after a successful submission
       
            setSuccessMessage('Form submitted successfully!');
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                propertyType: 'residential',
                buildingType: 'apartment',
                unitType: 'bhk1',
                area: '',
                propertyAge: '',
                floorNo: '',
                totalFloors: '',
                coveredParkings: '0',
                facing: '',
                unitNo: '',
                message: '',
            });
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
                        srcSet="/star-estate-react/assets/images/banner-per.jpg" 
                    />
                    <source 
                        media="(min-width: 768px)" 
                        srcSet="/star-estate-react/assets/images/banner-per-m.jpg" 
                    />
                    <img 
                        src="/star-estate-react/assets/images/banner-per-m.jpg" 
                        className="img-fluid h-100 object-cover object-position-bottom rounded" 
                        alt="Star Estate" 
                    />
                </picture>
            </div>
            

            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Property Valuation</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className="w-100 py-4">
                <div className="container-lg">
                    <div className="heading">
                        <h2 className="mb-0">Property Valuation</h2>
                    </div>
                    <div className="form-wrapper mt-4">
                        <p className="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, ad. Iure eum explicabo delectus officiis voluptatem hic, mollitia laudantium tempora cum quae? Vero maxime nostrum iste quia recusandae quos totam!</p>
                        <div className="form-box">
                            <form onSubmit={handleSubmit}>
                                <div className="form--section">
                                <p className="status mb-0 text-warning">{successMessage}</p>
                                    <h6 className="form--title">Fill your personal details</h6>
                                    <div className="row g-3">
                                        <div className="col-sm-8">
                                            <div className="row g-3">
                                                <div className="col-sm-4 form-group mb-0">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-0">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-0">
                                                    <label htmlFor="phoneNumber">Phone Number</label>
                                                    <input
                                                        type="number"
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        className="form-control"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form--section">
                                    <h6 className="form--title">Please select the property type</h6>
                                    <div className="row g-3">
                                        <div className="col-sm-5">
                                            <div className="d-flex bg-light rounded p-2">
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="residential"
                                                        name="propertyType"
                                                        value="residential"
                                                        className="form-check-input"
                                                        checked={formData.propertyType === 'residential'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="residential">Residential</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="commercial"
                                                        name="propertyType"
                                                        value="commercial"
                                                        className="form-check-input"
                                                        checked={formData.propertyType === 'commercial'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="commercial">Commercial</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="custom-control-flexbox bg-darkgreen text-white rounded p-2">
                                                <div className="custom-control custom-radio form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="apartment"
                                                        name="buildingType"
                                                        value="apartment"
                                                        className="form-check-input"
                                                        checked={formData.buildingType === 'apartment'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="apartment">Apartment</label>
                                                </div>
                                                <div className="custom-control custom-radio form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="builderfloor"
                                                        name="buildingType"
                                                        value="builderfloor"
                                                        className="form-check-input"
                                                        checked={formData.buildingType === 'builderfloor'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="builderfloor">Builder Floor</label>
                                                </div>
                                                <div className="custom-control custom-radio form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="independentfloor"
                                                        name="buildingType"
                                                        value="independentfloor"
                                                        className="form-check-input"
                                                        checked={formData.buildingType === 'independentfloor'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="independentfloor">Independent Floor</label>
                                                </div>
                                                <div className="custom-control custom-radio form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="villa"
                                                        name="buildingType"
                                                        value="villa"
                                                        className="form-check-input"
                                                        checked={formData.buildingType === 'villa'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="villa">Villa</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form--section">
                                    <h6 className="form--title">Please select the unit type and configuration</h6>
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <label htmlFor="bhk">BHK</label>
                                            <div className="d-flex">
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="bhk1"
                                                        name="unitType"
                                                        value="bhk1"
                                                        className="form-check-input"
                                                        checked={formData.unitType === 'bhk1'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="bhk1">1 BHK</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="bhk2"
                                                        name="unitType"
                                                        value="bhk2"
                                                        className="form-check-input"
                                                        checked={formData.unitType === 'bhk2'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="bhk2">2 BHK</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="bhk3"
                                                        name="unitType"
                                                        value="bhk3"
                                                        className="form-check-input"
                                                        checked={formData.unitType === 'bhk3'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="bhk3">3 BHK</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="bhk4"
                                                        name="unitType"
                                                        value="bhk4"
                                                        className="form-check-input"
                                                        checked={formData.unitType === 'bhk4'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="bhk4">4 BHK</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="bhk5"
                                                        name="unitType"
                                                        value="bhk5"
                                                        className="form-check-input"
                                                        checked={formData.unitType === 'bhk5'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="bhk5">5+ BHK</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="area">Area</label>
                                            <input
                                                type="text"
                                                id="area"
                                                name="area"
                                                className="form-control"
                                                placeholder="Super Built-up Area (Sq. Ft.)"
                                                value={formData.area}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form--section">
                                    <h6 className="form--title">Additional details</h6>
                                    <div className="row g-3">
                                        <div className="col-sm-8">
                                            <div className="row g-3">
                                                <div className="col-sm-4 form-group mb-0">
                                                    <label htmlFor="propertyAge">Property age (optional)</label>
                                                    <input
                                                        type="number"
                                                        id="propertyAge"
                                                        name="propertyAge"
                                                        className="form-control"
                                                        placeholder="in year"
                                                        value={formData.propertyAge}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-0">
                                                    <label htmlFor="floorNo">Floor no. (optional)</label>
                                                    <input
                                                        type="number"
                                                        id="floorNo"
                                                        name="floorNo"
                                                        className="form-control"
                                                        value={formData.floorNo}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-0">
                                                    <label htmlFor="totalFloors">Total floors in building (optional)</label>
                                                    <input
                                                        type="number"
                                                        id="totalFloors"
                                                        name="totalFloors"
                                                        className="form-control"
                                                        value={formData.totalFloors}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-0">
                                                    <label htmlFor="coveredParkings">No. of covered parking (optional)</label>
                                                    <select
                                                        id="coveredParkings"
                                                        name="coveredParkings"
                                                        className="form-select bg-light"
                                                        value={formData.coveredParkings}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-4 form-group mb-0">
                                                    <label htmlFor="facing">Facing (optional)</label>
                                                    <input
                                                        type="text"
                                                        id="facing"
                                                        name="facing"
                                                        className="form-control"
                                                        value={formData.facing}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-0">
                                                    <label htmlFor="unitNo">Unit no. (optional)</label>
                                                    <input
                                                        type="text"
                                                        id="unitNo"
                                                        name="unitNo"
                                                        className="form-control"
                                                        value={formData.unitNo}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 form-group">
                                            <label htmlFor="message">Write message (optional)</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                className="form-control"
                                                rows="5"
                                                value={formData.message}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-section">
                                    <div className="readmore mt-3">
                                        <button className="button" type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="modal fade" id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-warning">
                            <h5 className="modal-title" id="formModalLabel">Please fill the given form.</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-container">
                                <form id="contact_form" method="post" onSubmit="return Enquiry();">
                                    <p className="status mb-0 text-warning"></p>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name<sup className="text-danger">*</sup></label>
                                        <input type="text" name="name" id="name" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email<sup className="text-danger">*</sup></label>
                                        <input type="email" name="email" id="email" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phoneNumber" className="form-label">phoneNumber</label>
                                        <input type="text" name="phoneNumber" id="phoneNumber" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Message<sup className="text-danger">*</sup></label>
                                        <textarea name="message" id="message" className="form-control"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <Footer /> */}
        </div>
    )
}

export default PropertyEvaluationReport;
