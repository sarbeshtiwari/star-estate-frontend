import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import { Link } from 'react-router-dom';

function Awards() {
    const [awards, setAwards] = useState([]);

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
                <div  key={index} className="col-lg-4 col-sm-6 award-slide">
                    <a href={`${axiosInstance.defaults.globalURL}${award.awardImage}`} alt={award.awardName || 'Award Image'} data-magnify="magnify" data-caption="Awards & Recognitions" className="inner p-3 d-block common-border">
                        <img src={`${axiosInstance.defaults.globalURL}${award.awardImage}`} alt={award.awardName || 'Award Image'} />
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

export default Awards