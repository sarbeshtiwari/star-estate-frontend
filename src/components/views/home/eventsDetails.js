import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link, useParams } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import CSS for lightbox

function EventDetails() {
    const { slugURL } = useParams();
    const [eventDetails, setEventDetails] = useState([]);
    const [eventImages, setEventImages] = useState([]);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchEventDetailsData = async () => {
            try {
                const response = await axiosInstance.get(`events/getEventBySlugURL/${slugURL}`);
                const response1 = await axiosInstance.get(`images/getEventImages/${slugURL}`);
                const fetchedData = response.data;
                const showImages = response1.data.images;

                setEventImages(showImages);
                setEventDetails([fetchedData]);
            } catch (error) {
                setError('Error fetching main project data');
                console.error('Error fetching main project data:', error);
            }
        };
        fetchEventDetailsData();
    }, [slugURL]);

    // Function to handle image click and show lightbox
    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    return (
        <div>
            <div className="insideBanner">
                <picture>
                    <source
                        media="(min-width: 992px)"
                        srcSet="/star-estate-react/assets/images/events.jpg"
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet="/star-estate-react/assets/images/events-m.jpg"
                    />
                    <img
                        src="/star-estate-react/assets/images/events-m.jpg"
                        className="h-100 object-cover object-position-bottom rounded"
                        alt="Star Estate"
                    />
                </picture>
            </div>
            <div className="w-100">
                <div className="container-lg">
                    {eventDetails.map((events, index) => (
                        <div key={index} className="breadcrumbContainer" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item">Media</li>
                                <li className="breadcrumb-item active"><Link to="/events">Events</Link></li>
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
                    <div className="row">
                        {eventImages.map((event, index) => (
                            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                <div className="image-container" onClick={() => handleImageClick(index)} style={{ cursor: 'pointer' }}>
                                    <img
                                        src={`${axiosInstance.defaults.globalURL}${event.imagePath}`}
                                        alt={event.eventId || 'Event Image'}
                                        className="img-fluid"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isOpen && (
                <Lightbox
                    mainSrc={`${axiosInstance.defaults.globalURL}${eventImages[currentIndex].imagePath}`}
                    nextSrc={`${axiosInstance.defaults.globalURL}${eventImages[(currentIndex + 1) % eventImages.length].imagePath}`}
                    prevSrc={`${axiosInstance.defaults.globalURL}${eventImages[(currentIndex + eventImages.length - 1) % eventImages.length].imagePath}`}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentIndex((currentIndex + eventImages.length - 1) % eventImages.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentIndex((currentIndex + 1) % eventImages.length)
                    }
                    reactModalStyle={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)' // Light black overlay
                        }
                    }}
                    imageTitle={eventImages[currentIndex].eventName}
                    imageCaption={`Image ${currentIndex + 1} of ${eventImages.length}`}
                />
            )}
        </div>
    );
}

export default EventDetails;
