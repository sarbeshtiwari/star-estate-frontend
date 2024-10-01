import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './App.css';
import PropTypes from 'prop-types';
import axiosInstance from '../views/utils/axiosInstance';

export const sendChannelData = async (formData) => {
  try {
      const response = await axiosInstance.post(`/channelPartner/addChannelPartner`, formData);
      return response;
  } catch (error) {
      console.error('Error sending data:', error);
      throw error;
  }
};

const CPRegistration = () => {
  const [formData, setFormData] = useState({
    broker_name: '',
    email: '',
    phoneNumber: '',
    company_name: '',
    registration_no: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  // useEffect(() => {
  //   const body = document.body;
  //   if (showModal) {
  //     body.classList.add('blur-background');
  //     // Reset form data when modal opens
  //     setFormData({
  //       broker_name: '',
  //       email: '',
  //       phoneNumber: '',
  //       company_name: '',
  //       registration_no: '',
  //     });
  //   } else {
  //     body.classList.remove('blur-background');
  //   }
  // }, [showModal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async  (e) =>{
    e.preventDefault();
    await sendChannelData(formData)
    setSuccessMessage('Form submitted successfully!');
    setFormData({
      broker_name: '',
      email: '',
      phoneNumber: '',
      company_name: '',
      registration_no: '',
    });
      setTimeout(() => {
        setSuccessMessage(''); // Clear message after some time
        // closeModal(); // Close the modal after showing the message
      }, 2000);
  };

  // const modalStyle = {
  //   display: showModal ? 'block' : 'none',
  //   paddingRight: showModal ? '18px' : '0'
  // };

  // const contentStyle = {
  //   backgroundImage: 'url(..assets/images/card-bg.jpg)', // Replace with your image path
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   color: 'black', // Text color updated to black
  //   padding: '20px', // Added padding to ensure content doesn't touch the edges
  // };

  // const titleStyle = {
  //   textAlign: 'left', // Aligns the title to the left
  //   margin: 0 // Optional: Adjusts margin to fit design
  // };

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
                      <li className="breadcrumb-item active">Register As Channel Partner</li>
                  </ol>
              </div>
          </div>
      </div>
      <div className="w-100 padding">
          <div className="container-lg">
            <div className="heading mx-auto">
                <h3 className="mb-0">Register As Channel Partner</h3>
            </div>
            <div className='p-4 bg-gray-gradient-box'>
                  <form className="form-container" onSubmit={handleSubmit}>                
                    <span className="status mb-0 text-warning">{successMessage}</span>
                    <div className="row gy-4 gx-3">
                      <div className="col-sm-4">
                        <label htmlFor="broker_name">
                          Name<sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control bg-white"
                          id="broker_name"
                          name="broker_name"
                          value={formData.broker_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="email">
                          Email<sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="email"
                          className="form-control bg-white"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="phoneNumber">
                          Mobile<sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="tel"
                          className="form-control bg-white"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                          pattern="\d{10}"
                          title="Phone number must be exactly 10 digits"
                        />
                        <div className="invalid-feedback">
                          Phone number must be exactly 10 digits.
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="company_name">
                          Company Name<sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control bg-white"
                          name="company_name"
                          id="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="registration_no">
                          Registration Number<sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control bg-white"
                          name="registration_no"
                          id="registration_no"
                          value={formData.registration_no}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-sm-1 readmore mt-3">
                        <input type="hidden" name="CP_action" value="active" />
                        <button type="submit" className="button">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
            </div>
          </div>
      </div>
    </div>
  );
};

// CPRegistration.propTypes = {
//   showModal: PropTypes.bool.isRequired,
//   closeModal: PropTypes.func.isRequired,
//   title: PropTypes.string
// };

// CPRegistration.defaultProps = {
//   title: 'Fill the form to register as a Channel Partner'
// };

export default CPRegistration;
