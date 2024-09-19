import React, { useState, useEffect } from 'react';
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

const CPRegistrationModal = ({ showModal, closeModal, title }) => {
  const [formData, setFormData] = useState({
    broker_name: '',
    email: '',
    phoneNumber: '',
    company_name: '',
    registration_no: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const body = document.body;
    if (showModal) {
      body.classList.add('blur-background');
      // Reset form data when modal opens
      setFormData({
        broker_name: '',
        email: '',
        phoneNumber: '',
        company_name: '',
        registration_no: '',
      });
    } else {
      body.classList.remove('blur-background');
    }
  }, [showModal]);

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
      setTimeout(() => {
        setSuccessMessage(''); // Clear message after some time
        closeModal(); // Close the modal after showing the message
      }, 2000);
  };

  const modalStyle = {
    display: showModal ? 'block' : 'none',
    paddingRight: showModal ? '18px' : '0'
  };

  const contentStyle = {
    backgroundImage: 'url(../star-estate-react/assets/images/card-bg.jpg)', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'black', // Text color updated to black
    padding: '20px', // Added padding to ensure content doesn't touch the edges
  };

  const titleStyle = {
    textAlign: 'left', // Aligns the title to the left
    margin: 0 // Optional: Adjusts margin to fit design
  };

  return (
    <div
      className={`modal fade ${showModal ? 'show' : ''}`}
      style={modalStyle}
      role="dialog"
      aria-modal={showModal}
      
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={contentStyle}>
          <button type="button" className="close" onClick={closeModal} aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <div className="modal-header">
            <h8 className="modal-title" style={titleStyle}>{title}</h8>
          </div>
          <div className="modal-body">
            <form className="form-container" onSubmit={handleSubmit}>
             
              <p className="status mb-0 text-warning">{successMessage}</p>
              <div className="form-row">
                <div className="col-md-12 form-group">
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
                <div className="col-md-12 form-group">
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
                <div className="col-md-12 form-group">
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

                <div className="col-md-12 form-group">
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
                <div className="col-md-12 form-group">
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
                <div className="col-md-12 formFooter readmore mt-3">
                  <input type="hidden" name="CP_action" value="active" />
                  <button type="submit" className="button btn btn-primary">
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

CPRegistrationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string
};

CPRegistrationModal.defaultProps = {
  title: 'Fill the form to register as a Channel Partner'
};

export default CPRegistrationModal;
