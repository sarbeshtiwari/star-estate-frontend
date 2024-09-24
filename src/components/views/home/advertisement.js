import React, { useEffect, useState } from 'react';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import CSS for lightbox

function Advertisement() {
    const [activeType, setActiveType] = useState('print');
    const [ads, setAds] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true); // Add loading state

    // Fetch Ads based on status
    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('advertisement/getAdvertisements');
                const filteredAds = response.data.filter(ad => ad.status === true);
                setAds(filteredAds);
            } catch (error) {
                console.error('Failed to fetch advertisements', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    // Set the active ad type (Print, Outdoor, Radio)
    const handleToggleClick = (type) => {
        setActiveType(type);
    };

    // Open lightbox with the selected image
    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    // Render ads based on their type (print, outdoor, radio)
    const renderAds = (type) => {
        const filteredAds = ads.filter(ad => ad.advertisementType === type);

        if (filteredAds.length === 0) {
            return <div className="col-12 text-center">No ads available for {type}</div>;
        }

        return filteredAds.map((ad, index) => {
            if (type === 'radio') {
                return (
                    <div className="col-lg-4 col-sm-6 blogBox newsBox" key={ad._id}>
                        <a
                            href="#radioModal"
                            className="inner d-block common-border"
                            data-bs-toggle="modal"
                            data-title={ad.advertisementTitle || 'Radio Ad'}
                            data-src={ad.videoURL}
                        >
                            <div className="img-fluid">
                                <img
                                    src={`${axiosInstance.defaults.globalURL}${ad.advertisementImage}`}
                                    alt="Radio Ad"
                                    title="Radio Ad"
                                />
                            </div>
                            <div className="blog-details">
                                <ul className="list-inline">
                                    <li>
                                        <i className="fa fa-tag"></i> <span>{ad.advertisementLocation || 'Red FM'}</span>
                                    </li>
                                </ul>
                                <h6 className="h6">{ad.advertisementTitle || 'Luxury Property Show 2023'}</h6>
                                <div className="continue-reading">Click to View</div>
                            </div>
                        </a>
                    </div>
                );
            } else {
                return (
                    <div className="col-lg-4 col-sm-6 blogBox newsBox" key={ad._id}>
                        <div
                            onClick={() => handleImageClick(index)}
                            className="inner d-block common-border"
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="img-fluid">
                                <img
                                    src={`${axiosInstance.defaults.globalURL}${ad.advertisementImage}`}
                                    alt={`${ad.advertisementType} Ad`}
                                    title={`${ad.advertisementType} Ad`}
                                />
                            </div>
                            <div className="blog-details">
                                {ad.advertisementType === 'outdoor' ? '' : (
                                    <>
                                        <ul className="list-inline">
                                            <li>
                                                <i className="fa fa-calendar-alt"></i>{' '}
                                                <span>{ad.advertisementDate}</span>
                                            </li>
                                        </ul>
                                        <h6 className="h6">{ad.advertisementTitle || 'Luxury Property Show 2023'}</h6>
                                    </>
                                )}
                                <div className="continue-reading">Click to View</div>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

    // Modal setup for radio ads
    useEffect(() => {
        const radioModal = document.getElementById('radioModal');
        if (radioModal) {
            radioModal.addEventListener('show.bs.modal', function (event) {
                const button = event.relatedTarget;
                const title = button.getAttribute('data-title');
                const src = button.getAttribute('data-src');

                const modalTitle = radioModal.querySelector('.modal-title');
                const radioVideo = radioModal.querySelector('#radioVideo');

                modalTitle.textContent = title;
                radioVideo.src = src;
            });

            // Clear video source when modal is closed
            radioModal.addEventListener('hidden.bs.modal', function () {
                const radioVideo = radioModal.querySelector('#radioVideo');
                radioVideo.src = '';
            });
        }
    }, []);

    return (
        <div>
         
            <div className="insideBanner">
                <picture>
                    <source 
                        media="(min-width: 992px)" 
                        srcSet="assets/images/advertisements.jpg" 
                    />
                    <source 
                        media="(min-width: 768px)" 
                        srcSet="assets/images/advertisements-m.jpg" 
                    />
                    <img 
                        src="assets/images/advertisements-m.jpg" 
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
                            <li className="breadcrumb-item">Media</li>
                            <li className="breadcrumb-item active">Advertisements</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-sm-auto text-sm-center">
                        <h3 className="mb-0">Advertisements</h3>
                    </div>

                    {/* Toggle Buttons */}
                    <div className="toggleHead">
                        <button
                            className={`toggleBtn adsToggleBtn ${activeType === 'print' ? 'active' : ''}`}
                            onClick={() => handleToggleClick('print')}
                            style={{ '--clr': 'var(--primary-color)' }}
                        >
                            Print
                        </button>
                        <button
                            className={`toggleBtn adsToggleBtn ${activeType === 'outdoor' ? 'active' : ''}`}
                            onClick={() => handleToggleClick('outdoor')}
                            style={{ '--clr': 'var(--primary-color)' }}
                        >
                            Outdoor
                        </button>
                        <button
                            className={`toggleBtn adsToggleBtn ${activeType === 'radio' ? 'active' : ''}`}
                            onClick={() => handleToggleClick('radio')}
                            style={{ '--clr': 'var(--primary-color)' }}
                        >
                            Radio
                        </button>
                    </div>

                    {/* Loading Spinner */}
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <span className="ml-2">Loading...</span>
                        </div>
                    ) : (
                        <>
                            {/* Print Ads */}
                            <div className="ads-container toggleWrapper show" style={{ display: activeType === 'print' ? 'block' : 'none' }}>
                                <div className="row gap-row">{renderAds('print')}</div>
                            </div>

                            {/* Outdoor Ads */}
                            <div className="ads-container toggleWrapper" style={{ display: activeType === 'outdoor' ? 'block' : 'none' }}>
                                <div className="row gap-row">{renderAds('outdoor')}</div>
                            </div>

                            {/* Radio Ads */}
                            <div className="ads-container toggleWrapper" style={{ display: activeType === 'radio' ? 'block' : 'none' }}>
                                <div className="row gap-row">{renderAds('radio')}</div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Modal for radio ads */}
            <div className="modal fade" id="radioModal" tabIndex="-1" aria-labelledby="radioModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-white" id="radioModalLabel">Radio Ad</h5>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="ratio ratio-16x9">
                                <iframe id="radioVideo" src="" title="Radio Ad"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Lightbox */}
            {isOpen && (
                <Lightbox
                    mainSrc={`${axiosInstance.defaults.globalURL}${ads[currentIndex].advertisementImage}`}
                    nextSrc={`${axiosInstance.defaults.globalURL}${ads[(currentIndex + 1) % ads.length].advertisementImage}`}
                    prevSrc={`${axiosInstance.defaults.globalURL}${ads[(currentIndex + ads.length - 1) % ads.length].advertisementImage}`}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentIndex((currentIndex + ads.length - 1) % ads.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentIndex((currentIndex + 1) % ads.length)
                    }
                />
            )}

       
        </div>
    );
}

export default Advertisement;
