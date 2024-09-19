import React, { useEffect, useState } from 'react'
import Header from '../../widgets/header'
import Footer from '../../widgets/footer'
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
function Events() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get(`events/getEvents`);
                const filteredEvents = response.data.filter(events => events.status === true);
                setEvents(filteredEvents);
            } catch (error) {
                console.error('Failed to fetch Awards', error);
            }
        };
        fetchEvents();
    }, []);
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
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item">Media</li>
                            <li className="breadcrumb-item active">Events</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-sm-auto text-sm-center">
                        <h3 className="mb-0">Events</h3>
                    </div>
                    <div className="row gap-row">
                        {events.map((events, index) => (
                            <div key={index} className="col-lg-4 col-sm-6 blogBox newsBox">
                                <div className="inner common-border">
                                    <div className="img-fluid">
                                        <Link to={`/events/${events.slugURL}`} ><img src={`${axiosInstance.defaults.globalURL}${events.eventImage}`} alt={events.eventName} title={events.eventName} /></Link>
                                    </div>
                                    <div className="blog-details">
                                        <ul className="list-inline">
                                            <li><i className="fa fa-calendar-alt text-primary"></i> <span>{events.eventDate}</span></li>
                                            {/* <li><i className="fa fa-tag text-primary"></i> <span>{events.eventName}</span></li> */}
                                        </ul>
                                        <Link to={`/events/${events.slugURL}`} className="h6">{events.eventName}</Link>
                                        <div className="continue-reading"><Link to={`/events/${events.slugURL}`} >Continue Readings</Link></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
export default Events