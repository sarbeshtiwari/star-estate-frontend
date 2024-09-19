import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Link, useParams } from 'react-router-dom';

// import ReactFancyBox from 'react-fancybox'
// import 'react-fancybox/lib/fancybox.css'

import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
function EventDetails() {
    const { slugURL } = useParams();
    const [eventDetails, setEventDetails] = useState([]);
    const [error, setError] = useState([]);
    useEffect(() => {
        const fetchEventDetailsData = async () => {
            try {
                const response = await axiosInstance.get(`events/getEventBySlugURL/${slugURL}`);
                const fetchedData = response.data;
                setEventDetails([fetchedData]);
            } catch (error) {
                setError('Error fetching main project data');
                console.error('Error fetching main project data:', error);
            }
        };
        fetchEventDetailsData();
    }, [slugURL]);
    
    return (
        <div>
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source media="(max-width: 820px)" srcset="/star-estate-react/assets/images/banner-emi-calculator-m.jpg" />
                    <img src="/star-estate-react/assets/images/banner-emi-calculator.jpg" className="h-100 object-cover" alt="Star Estate" />
                </picture>
            </div>
            <div className="w-100">
                <div className="container-lg">
                {eventDetails.map((events, index) => (
                    <div key={index} className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.php">Home</a></li>
                            <li className="breadcrumb-item">Media</li>
                            <li className="breadcrumb-item active"><Link to='/events'>Events</Link></li>
                            <li className="breadcrumb-item active">{events.eventName}</li>
                        </ol>
                    </div>
                       ))}
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-sm-auto text-sm-center">
                        <h3 className="mb-0">Events</h3>
                    </div>
                    <div className="row gap-row">
                        {eventDetails.map((events, index) => (
                            // Fancy Box for image modal
                            // <div key={index} className="col-lg-4 col-sm-6 award-slide">
                            //    <ReactFancyBox
                            //         thumbnail={`${axiosInstance.defaults.globalURL}${events.eventImage}`}
                            //         image={`${axiosInstance.defaults.globalURL}${events.eventImage}`}/>
                            // </div>
                            
                            <div key={index} className="col-lg-4 col-sm-6 award-slide">
                                <a href={`${axiosInstance.defaults.globalURL}${events.eventImage}`} alt={events.eventName || 'Events Image'} data-magnify="magnify" data-caption="Awards & Recognitions" className="inner p-3 d-block common-border">
                                    <img src={`${axiosInstance.defaults.globalURL}${events.eventImage}`} alt={events.eventName || 'Events Image'} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
export default EventDetails