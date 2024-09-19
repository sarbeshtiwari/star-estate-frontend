import React, { useEffect, useState } from 'react';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

function Advertisement() {
    const [activeType, setActiveType] = useState('print');
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const toggleWrappers = document.querySelectorAll('.toggleWrapper');
        toggleWrappers.forEach(wrapper => {
            wrapper.style.display = 'none';
        });
        const activeWrapper = document.getElementById(`toggleWrapper-${activeType}`);
        if (activeWrapper) {
            activeWrapper.style.display = 'block';
        }
    }, [activeType]);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axiosInstance.get(`advertisement/getAdvertisements`);
                const filteredAds = response.data.filter(ads => ads.status === true);
                setAds(filteredAds);
            } catch (error) {
                console.error('Failed to fetch advertisements', error);
            }
        };

        fetchAds();
    }, []);

    const handleToggleClick = (type) => {
        setActiveType(type);
    };

    const renderAds = (type) => {
        return ads
            .filter(ad => ad.advertisementType === type)
            .map((ad) => {
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
                            <a
                                href={`${axiosInstance.defaults.globalURL}${ad.advertisementImage}`}
                                data-magnify="magnify"
                                data-group={type}
                                data-caption={`${ad.advertisementType} Ad`}
                                className="inner d-block common-border"
                            >
                                <div className="img-fluid">
                                    <img
                                        src={`${axiosInstance.defaults.globalURL}${ad.advertisementImage}`}
                                        alt={`${ad.advertisementType} Ad`}
                                        title={`${ad.advertisementType} Ad`}
                                    />
                                </div>
                                <div className="blog-details">
                                    <ul className="list-inline">
                                        <li>
                                            <i className="fa fa-calendar-alt"></i>{' '}
                                            <span>{ad.advertisementDate}</span>
                                        </li>
                                        <li>
                                            <i className="fa fa-tag"></i> <span>{ad.advertisementLocation}</span>
                                        </li>
                                    </ul>
                                    <h6 className="h6">{ad.advertisementTitle || 'Luxury Property Show 2023'}</h6>
                                    <div className="continue-reading">Click to View</div>
                                </div>
                            </a>
                        </div>
                    );
                }
            });
    };

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
        }
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

                    <div className="ads-container toggleWrapper show" id="toggleWrapper-print">
                        <div className="row gap-row">{renderAds('print')}</div>
                    </div>

                    <div className="ads-container toggleWrapper" id="toggleWrapper-outdoor">
                        <div className="row gap-row">{renderAds('outdoor')}</div>
                    </div>

                    <div className="ads-container toggleWrapper" id="toggleWrapper-radio">
                        <div className="row gap-row">{renderAds('radio')}</div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}

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
                            <iframe id="radioVideo"  width="100%" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Advertisement;
