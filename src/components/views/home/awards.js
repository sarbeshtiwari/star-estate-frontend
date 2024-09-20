// import React, { useEffect, useState } from 'react'
// import axiosInstance from '../utils/axiosInstance';
// import Header from '../../widgets/header';
// import Footer from '../../widgets/footer';
// import { Link } from 'react-router-dom';

// function Awards() {
//     const [awards, setAwards] = useState([]);

//     useEffect(() => {
//         const fetchAwards = async () => {
//             try {
//                 const response = await axiosInstance.get(`/award/getAwards`);
//                 const filteredAwards = response.data.filter(award => award.status === true);
//                 setAwards(filteredAwards);
//             } catch (error) {
//                 console.error('Failed to fetch Awards', error);
//             }
//         };

//         fetchAwards();
//     }, []);
//   return (
//     <div>
//         {/* <Header /> */}
//           <div className="insideBanner">
//         <picture>
//             <source media="(max-width: 820px)" srcset="/star-estate-react/assets/images/banner-emi-calculator-m.jpg" />
//             <img src="/star-estate-react/assets/images/banner-emi-calculator.jpg" className="h-100 object-cover" alt="Star Estate" />
//         </picture>
//     </div>

//     <div className="w-100">
//         <div className="container-lg">
//             <div className="breadcrumbContainer" aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
//                     <li className="breadcrumb-item">Media</li>
//                     <li className="breadcrumb-item active">Awards & Recognitions</li>
//                 </ol>
//             </div>
//         </div>
//     </div>

//     <div className="w-100 padding">
//         <div className="container-lg">
//             <div className="heading mx-sm-auto text-sm-center">
//                 <h3 className="mb-0">Awards & Recognitions</h3>
//             </div>
//             <div className="row gap-row">
//             {awards.map((award, index) => (
//                 <div  key={index} className="col-lg-4 col-sm-6 award-slide">
//                     <a href={`${axiosInstance.defaults.globalURL}${award.awardImage}`} alt={award.awardName || 'Award Image'} data-magnify="magnify" data-caption="Awards & Recognitions" className="inner p-3 d-block common-border">
//                         <img src={`${axiosInstance.defaults.globalURL}${award.awardImage}`} alt={award.awardName || 'Award Image'} />
//                     </a>
//                 </div>
//             ))}
//             </div>
//         </div>
//     </div>
//     {/* <Footer /> */}
//     </div>
//   )
// }

// export default Awards


import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import 'react-image-lightbox/style.css'; // Import CSS for lightbox
import Lightbox from 'react-image-lightbox';

function Awards() {
    const [awards, setAwards] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await axiosInstance.get(`/award/getAwards`);
                const filteredAwards = response.data.filter(award => award.status === true);
                setAwards(filteredAwards);
            } catch (error) {
                console.error('Failed to fetch Awards', error);
            }
        };

        fetchAwards();
    }, []);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

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
                            <li className="breadcrumb-item active">Awards & Recognitions</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-sm-auto text-sm-center">
                        <h3 className="mb-0">Awards & Recognitions</h3>
                    </div>
                    <div className="row gap-row">
                        {awards.map((award, index) => (
                            <div key={index} className="col-lg-4 col-sm-6 award-slide">
                                <img
                                    src={`${axiosInstance.defaults.globalURL}${award.awardImage}`}
                                    alt={award.awardName || 'Award Image'}
                                    onClick={() => openLightbox(index)}
                                    style={{ cursor: 'pointer', width: '100%', height: 'auto' }} // Set image dimensions
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isOpen && (
                <Lightbox
                    mainSrc={`${axiosInstance.defaults.globalURL}${awards[currentIndex].awardImage}`}
                    nextSrc={`${axiosInstance.defaults.globalURL}${awards[(currentIndex + 1) % awards.length].awardImage}`}
                    prevSrc={`${axiosInstance.defaults.globalURL}${awards[(currentIndex + awards.length - 1) % awards.length].awardImage}`}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() =>
                        setCurrentIndex((currentIndex + awards.length - 1) % awards.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentIndex((currentIndex + 1) % awards.length)
                    }
                    reactModalStyle={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)' // Light black overlay
                        }
                    }}
                    imageTitle={awards[currentIndex].awardName}
                    imageCaption={`Image ${currentIndex + 1} of ${awards.length}`}
                    style={{ width: '70%', height: 'auto' }} // Adjust size if needed
                />
            )}

            {/* <Footer /> */}
        </div>
    );
}

export default Awards;


