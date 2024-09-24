import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import Header from '../../widgets/header'
import Footer from '../../widgets/footer'
function ContactUs() {
    const [formData, setFormData] = useState({
        cname: '',
        cemail: '',
        cmobile: '',
        cmessage: ''
    });

    const handleChange = (e) => {
        // Update form state based on input changes
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the data object
        const data = {
            Name: formData.cname,
            Email: formData.cemail,
            phoneNumber: formData.cmobile,
            user_query: formData.cmessage,
            utm_source: 'your_utm_source',  // Optional, you can update this
            utm_medium: 'your_utm_medium',  // Optional
            utm_campaign: 'your_utm_campaign',  // Optional
            utm_term: 'your_utm_term',  // Optional
            utm_content: 'your_utm_content'  // Optional
        };

        try {
            const response = await fetch('https://ecis.in/apis/star-estate-API/contactUS/addContactUS', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    title: 'Success!',
                    text: 'Contact form submitted successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                console.log('Success:', result);
                // Reset form fields
                setFormData({
                    cname: '',
                    cemail: '',
                    cmobile: '',
                    cmessage: ''
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to submit the contact form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while submitting the contact form.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    return (
        <div>
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source 
                        media="(min-width: 992px)" 
                        srcSet="assets/images/contact-us.jpg" 
                    />
                    <source 
                        media="(min-width: 768px)" 
                        srcSet="assets/images/contact-us-m.jpg" 
                    />
                    <img 
                        src="assets/images/contact-us-m.jpg" 
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
                            <li className="breadcrumb-item active">Contact Us</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h3 className="mb-0">Contact Us</h3>
                    </div>
                    <div className="contactContainer bg-gray-gradient-box p-3">
                        <div className="row">
                            <div className="col-md-6 addressBox">
                                <div className="inner">
                                    <div className="address">
                                        <h5>Noida (Head Office)</h5>
                                        <ul className="list-inline">
                                            <li><i className="fa fa-map-marker-alt"></i><span>Riana Aurum 4th floor, plot no. 111, Sector 136 Noida, U.P. 201304</span></li>
                                            <li><i className="fa fa-phone"></i><a href="tel:7088470884"><span>+91 70884 70884</span></a></li>
                                            <li><i className="fa fa-envelope"></i><a href="mailto:info@starestate.in"><span>info@starestate.in</span></a></li>
                                            <li><strong>UP RERA:  </strong>UPRERAAGT10202</li>
                                            <li><strong>URL: </strong><a href="https://www.up-rera.in/" target="_blank">https://www.up-rera.in</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 address-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14024.9315316108!2d77.4057747!3d28.5026403!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce92e7888ad39%3A0x5fbddf859a1a6d25!2sStar%20Estate!5e0!3m2!1sen!2sin!4v1679917400487!5m2!1sen!2sin" width="100%" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="contactContainer bg-gray-gradient-box p-3">
                        <div className="row flex-row-reverse">
                            <div className="col-md-6 addressBox">
                                <div className="inner">
                                    <div className="address">
                                        <h5>Gurugram Office</h5>
                                        <ul className="list-inline">
                                            <li><i className="fa fa-map-marker-alt"></i><span>4th Floor, Suncity Success Tower, 430-432, Golf-Course Extn. Road, The Close South, Sector 50, Gurugram, Haryana - 122102</span></li>
                                            <li><i className="fa fa-envelope"></i><a href="mailto:info@starestate.in"><span>info@starestate.in</span></a></li>
                                            <li><strong>Haryana RERA:  </strong>RC/HARERA/GGM/1654/1249/2022/22</li>
                                            <li><strong>URL: </strong><a href="https://haryanarera.gov.in/" target="_blank">https://haryanarera.gov.in</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 address-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1754.6865948034872!2d77.07031442779356!3d28.40799411876178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d22692a4e3faf%3A0xeb5a2617558c5e55!2sSuncity%20Success%20Tower!5e0!3m2!1sen!2sus!4v1649841518406!5m2!1sen!2sus" width="100%" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="contactContainer bg-gray-gradient-box p-3">
                        <div className="row">
                            <div className="col-md-6 addressBox">
                                <div className="inner">
                                    <div className="address">
                                        <h5>Agra Office</h5>
                                        <ul className="list-inline">
                                            <li><i className="fa fa-map-marker-alt"></i><span>1st Floor, Shanti City Centre, Bhagirathi Devimarg, Khandari, Agra, UP - 282002</span></li>
                                            <li><i className="fa fa-envelope"></i><a href="mailto:info@starestate.in"><span>info@starestate.in</span></a></li>
                                            <li><strong>UP RERA:  </strong>UPRERAAGT10202</li>
                                            <li><strong>URL: </strong><a href="https://www.up-rera.in/" target="_blank">https://www.up-rera.in</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 address-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.386671121726!2d77.99405508315371!3d27.207007267304995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747767d7bda131%3A0x4049fac5aaafb1ad!2sShanti%20City%20Center!5e0!3m2!1sen!2sus!4v1649841734601!5m2!1sen!2sus" width="100%" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="contactContainer bg-gray-gradient-box p-3">
                        <div className="row flex-row-reverse">
                            <div className="col-md-6 addressBox">
                                <div className="inner">
                                    <div className="address">
                                        <h5>Bangalore office</h5>
                                        <ul className="list-inline">
                                            <li><i className="fa fa-map-marker-alt"></i><span>3rd Floor, Building No, 451, 17th Cross Rd, above Cafe Coffee Day, Sector 4, HSR Layout, Bengaluru, Karnataka 560102</span></li>
                                            <li><i className="fa fa-envelope"></i><a href="mailto:info@starestate.in"><span>info@starestate.in</span></a></li>
                                            <li><strong>Karnataka RERA: </strong> PRM/KA/RERA/1251/310/AG/221122/003270	</li>
                                            <li><strong>URL: </strong><a href="https://rera.karnataka.gov.in/" target="_blank">https://rera.karnataka.gov.in</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 address-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3888.922803746275!2d77.640839!3d12.912683!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15d20d05e88f%3A0x9bf70cb5762ace29!2sStar%20Estate!5e0!3m2!1sen!2sin!4v1679918223720!5m2!1sen!2sin" width="100%" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="contactContainer bg-gray-gradient-box p-3">
                        <div className="row">
                            <div className="col-md-6 addressBox">
                                <div className="inner">
                                    <div className="address">
                                        <h5>Pune office </h5>
                                        <ul className="list-inline">
                                            <li><i className="fa fa-map-marker-alt"></i><span>Baner Biz Bay <br />Opposite Baner Croma, Upside CSB Bank 407, Star Estate, Baner, Pune West 411045</span></li>
                                            <li><i className="fa fa-envelope"></i><a href="mailto:info@starestate.in"><span>info@starestate.in</span></a></li>
                                            <li><strong>MAHA RERA: </strong>A51800037593</li>
                                            <li><strong>URL: </strong><a href="https://maharera.mahaonline.gov.in/" target="_blank">https://maharera.mahaonline.gov.in</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 address-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3782.220147882494!2d73.7664722!3d18.564111099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDMzJzUwLjgiTiA3M8KwNDUnNTkuMyJF!5e0!3m2!1sen!2sin!4v1679917674049!5m2!1sen!2sin" width="100%" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 float-left padding bg-lightgray">
                <div className="container-lg">
                    <div className="anotherForm">
                        <div className="inner bg-gray-gradient-box p-3 h-100">
                            <div className="heading mx-auto text-center">
                                <h3>Any Query</h3>
                                <p className="mb-0">Star Estate love to hear from you, feel free to ask your query below.</p>
                            </div>
                            <form onSubmit={handleSubmit} className="carforms" encType="multipart/form-data">
                                <span className="fixstatus text-danger"></span>
                                <div className="row justify-content-center">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="cname"
                                                id="cname"
                                                className="form-control bg-white"
                                                placeholder="Name*"
                                                value={formData.cname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="cemail"
                                                id="cemail"
                                                className="form-control bg-white"
                                                placeholder="Email*"
                                                value={formData.cemail}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="cmobile"
                                                id="cmobile"
                                                className="form-control bg-white"
                                                placeholder="Mobile*"
                                                value={formData.cmobile}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <textarea
                                            name="cmessage"
                                            id="cmessage"
                                            className="form-control bg-white h-100"
                                            placeholder="Message"
                                            value={formData.cmessage}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col-sm-4 readmore">
                                        <button type="submit" className="button mx-auto w-100">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
export default ContactUs