import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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
    const Faqs = [
        {
            faqQuestion: "What is a property valuation?",
            faqAnswer: "A property valuation is the assessment of the property's age, floor plan, amenities, connectivity, and law and order in the area."
        },
        {
            faqQuestion: "For which states/Cities is this property valuation available?",
            faqAnswer: "This property valuation is available for Tier I and Tier II cities in India."
        },
        {
            faqQuestion: "On what types of Properties is valuation available?",
            faqAnswer: "Here, property valuation is available for residential and commercial properties."
        },
        {
            faqQuestion: "What is the timeframe for receiving Property Valuation?",
            faqAnswer: "It takes 1-2 business days to complete the property valuation process."
        },
        {
            faqQuestion: "Is Property Valuation on Star Estate Chargeable?",
            faqAnswer: "No. The property valuation process on Star Estate is free of cost."
        }

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

    useEffect(() => {
        // Update buildingType based on propertyType whenever it changes
        if (formData.propertyType === 'commercial') {
            setFormData(prev => ({
                ...prev,
                buildingType: 'retail-shop', // Default for commercial
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                buildingType: 'apartment', // Default for residential
            }));
        }
    }, [formData.propertyType]); // Depend on propertyType

    useEffect(() => {
        // Update buildingType based on propertyType whenever it changes
        if (formData.propertyType === 'commercial') {
            setFormData(prev => ({
                ...prev,
                unitType: ' ', // Default for commercial
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                unitType: '1bhk', // Default for residential
            }));
        }
    }, [formData.propertyType]); // Depend on propertyType

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
            <div className="insideBanner">
                <picture>
                    <source
                        media="(min-width: 992px)"
                        srcSet="assets/images/banner-per.jpg"
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet="assets/images/banner-per-m.jpg"
                    />
                    <img
                        src="assets/images/banner-per-m.jpg"
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
                    <h6 className="form--title">Evaluate the real worth of your immovable asset from experts.</h6>
                    <div className="form-wrapper mt-4">
                        <p className="mb-4">A property valuation report is a documentation of a property’s monetary value which is estimated by
                            considering parameters like location, layout, build-up area, configuration, property age, covered
                            parking, and frontage.

                        </p><p className='mb-4'>Property valuation is a method to determine the actual worth of a concrete structure according to the
                            real estate market. It highlights the pros and cons of an immovable asset concluding a value that is
                            fair for buyer and seller.</p><div className="form--section"></div>
                        <h6 className='form--title'>How to receive Property Valuation Report on Star Estate?</h6>
                        <p className='mb-4'><ul className="list mb-0"><li><strong>Step 1 -</strong> Share your details in the fields below</li>
                            <li><strong>Step 2 -</strong>  Choose the Property type you wish for valuation</li>
                            <li><strong>Step 3 -</strong>  Choose the configuration the area for the property valuation procedure</li>
                            <li><strong>Step 4 -</strong>  Share more details to receive an accurate property valuation report</li></ul></p>
                        <div className="form--section"></div>
                        <h6 className="form--title">Features of Property Valuation Procedure</h6>

                        <p className='mb-4'>There are three key features of the property valuation procedure that yield the accurate value of an
                            immovable asset.

                            <ul className="list mb-0"><li><strong>Property Details -</strong>It includes information about a property, including connectivity, amenities,
                                floor plan, and year of construction. </li>
                                <li><strong>Market Analysis -</strong>  The availability of open areas, parking spaces, and other spheres plays a
                                    pivotal role in determining property value.</li>
                                <li><strong>Property Age -</strong>  It is an important factor that outlines the worth of an immovable asset. A
                                    property age defines whether the construction demands renovation or is in a good condition.</li>
                            </ul>
                        </p>
                        <div className="form--section"></div>

                        <h6 className="form--title">Key Perspective of Property Valuation</h6>
                        <p className='mb-4'>The ideal perspectives of property valuation include:

                            <ul className="list mb-0"><li><strong>Resale Value -</strong>It assesses the present and upcoming infrastructure development in the
                                locality and nearby areas as it evaluates the demand for respective configurations at present. </li>
                                <li><strong>Income Value -</strong>  It assesses the estimated rental value of the property reflected in annual
                                    passive income. </li>
                                <li><strong>Cost Value -</strong>  It calculate the definite property price after eliminating the depreciation value.</li>
                            </ul>
                        </p>
                        <div className="form--section"></div>

                        <h6 className="form--title">Benefits of Property Valuation with Star Estate</h6>
                        <p className='mb-4'>
                            <ul className="list mb-0"><li>Star Estate renders online property valuation procedures to simplify the understanding of
                                actual property value. </li>
                                <li>The turnaround time for online property valuation is less than physical site visits. </li>
                                <li>The biggest benefit of property valuation with Star Estate is cost-efficient service for
                                    investors</li>
                            </ul>
                        </p>
                        <div className="form--section"></div>

                        <h6 className="form--title">Factors Affecting Property Valuation</h6>
                        <p className='mb-4'>
                            Along with location, connectivity, law and order, the current economic situation affects property
                            valuation. Also, inflation, changes in interest rates, and the cost of construction material are the
                            factors that affect property valuation.
                        </p>
                        <div className="form--section"></div>

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

                                        {formData.propertyType === 'commercial' ? (
                                            <div className="col-sm-7">
                                                {/* <h6 className="form--title">Select Commercial Options</h6> */}
                                                <div className="col-sm-12">
                                                    <div className="custom-control-flexbox bg-darkgreen text-white rounded p-2">
                                                        <div className="custom-control custom-radio form-check form-check-inline">
                                                            <input
                                                                type="radio"
                                                                id="retail-shop"
                                                                name="buildingType"
                                                                value="retail-shop"
                                                                className="form-check-input"
                                                                onChange={handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="retail-shop">Retail Shop</label>
                                                        </div>
                                                        <div className="custom-control custom-radio form-check form-check-inline">
                                                            <input
                                                                type="radio"
                                                                id="office-space"
                                                                name="buildingType"
                                                                value="office-space"
                                                                className="form-check-input"
                                                                onChange={handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="office-space">Office Space</label>
                                                        </div>
                                                        <div className="custom-control custom-radio form-check form-check-inline">
                                                            <input
                                                                type="radio"
                                                                id="society-shop"
                                                                name="buildingType"
                                                                value="society-shop"
                                                                className="form-check-input"
                                                                onChange={handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="society-shop">Society Shop</label>
                                                        </div>
                                                        <div className="custom-control custom-radio form-check form-check-inline">
                                                            <input
                                                                type="radio"
                                                                id="food-court"
                                                                name="buildingType"
                                                                value="food-court"
                                                                className="form-check-input"
                                                                onChange={handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="food-court">Food Court</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (<div className="col-sm-7">
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
                                        </div>)}


                                    </div>
                                </div>
                                {formData.propertyType === 'residential' ? (<div className="form--section">
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
                                </div>) : (
                                    <div className="form--section">
                                        <div className="row g-3">
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
                                        </div></div>)}

                                {/* <div className="form--section">
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
                                </div> */}
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
                                            <label htmlFor="message">Location Details</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                className="form-control"
                                                rows="5"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
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
                    <div className="form--section"></div>
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
        </div>
    )
}

export default PropertyEvaluationReport;
