import React, { useEffect, useState } from 'react';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get(`events/getEvents`);
                const filteredEvents = response.data.filter(event => event.status === true);
                setEvents(filteredEvents);
            } catch (error) {
                console.error('Failed to fetch Events', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchEvents();
    }, []);

    return (
        <div>
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source media="(max-width: 820px)" srcSet="/star-estate-react/assets/images/banner-emi-calculator-m.jpg" />
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
                    {loading ? ( // Show loading spinner when fetching data
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <span className="ml-2">Loading...</span>
                        </div>
                    ) : (
                        <div className="row gap-row">
                            {events.map((event, index) => (
                                <div key={index} className="col-lg-4 col-sm-6 blogBox newsBox">
                                    <div className="inner common-border">
                                        <div className="img-fluid">
                                            <Link to={`/events/${event.slugURL}`} >
                                                <img src={`${axiosInstance.defaults.globalURL}${event.eventImage}`} alt={event.eventName} title={event.eventName} />
                                            </Link>
                                        </div>
                                        <div className="blog-details">
                                            <ul className="list-inline">
                                                <li><i className="fa fa-calendar-alt text-primary"></i> <span>{event.eventDate}</span></li>
                                            </ul>
                                            <Link to={`/events/${event.slugURL}`} className="h6">{event.eventName}</Link>
                                            <div className="continue-reading">
                                                <Link to={`/events/${event.slugURL}`} >Continue Readings</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Events;
