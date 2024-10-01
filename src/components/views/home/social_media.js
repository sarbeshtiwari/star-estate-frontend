import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';

const SocialMediaFeed = () => {
    const [activeFeed, setActiveFeed] = useState('instagram');
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.dataset.useServiceCore = "";
        script.defer = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const handleToggle = (target) => {
        setActiveFeed(target);
        document.querySelectorAll('.toggleBtn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.toggleBtn[data-bs-target="${target}"]`).classList.add('active');
    };
    useEffect(() => {
        var social = new Swiper(".social-slider", {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                280: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1600: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            }
        });
    }, []);
    return (
        <>
            <div className="w-100 padding overflow-hidden hm-newsContainer">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h3>Social Media Feed</h3>
                    </div>
                    <div className="toggleHead">
                        <button
                            className="toggleBtn active"
                            data-bs-target="instagram"
                            style={{ '--clr': 'var(--instagram)' }}
                            onClick={() => handleToggle('instagram')}
                        >
                            <i className="fab fa-instagram"></i> Instagram
                        </button>
                        <button
                            className="toggleBtn"
                            data-bs-target="youtube"
                            style={{ '--clr': 'var(--youtube)' }}
                            onClick={() => handleToggle('youtube')}
                        >
                            <i className="fab fa-youtube"></i> YouTube
                        </button>
                    </div>
                    <div className="social-container">
                        {activeFeed === 'instagram' && (
                            <div className="elfsight-app-1001f272-d148-4800-8299-64da2a0c4604" data-elfsight-app-lazy></div>
                        )}
                        {activeFeed === 'youtube' && (
                            <div class="elfsight-app-b834893d-3357-41b2-b4d9-dfe4b95e37c3" data-elfsight-app-lazy></div>
                            // <div className="elfsight-app-fab7fe60-7d92-4ccd-9211-4ef7e8daa1dc" data-elfsight-app-lazy></div>
                            // <script src="https://static.elfsight.com/platform/platform.js" async></script>
                            // <div class="elfsight-app-b834893d-3357-41b2-b4d9-dfe4b95e37c3" data-elfsight-app-lazy></div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default SocialMediaFeed;