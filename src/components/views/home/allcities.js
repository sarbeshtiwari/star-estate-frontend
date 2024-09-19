import React, { useEffect, useState } from 'react'
import Header from '../../widgets/header'
import Footer from '../../widgets/footer'
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
function AllCities() {
    const [city, setCity] = useState([]);
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axiosInstance.get(`city/getCityWithImage`);
                const filteredCity = response.data.filter(city => city.status === true);
                setCity(filteredCity);
            } catch (error) {
                console.error('Failed to fetch Awards', error);
            }
        };
        fetchCities();
    }, []);
    return (
        <div>
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source media="(max-width: 820px)" srcset="/star-estate-react/assets/images/banner-commercial-m.jpg" />
                    <img src="/star-estate-react/assets/images/banner-commercial.jpg" className="h-100 object-cover" alt="Star Estate" />
                </picture>
            </div>
            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Cities</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h3 className="mb-0">Cities</h3>
                    </div>
                    <div className="row g-2 gap-form-row">
                        {city.map((cities, index) => (
                            <div key={index} className="col-lg-3 col-md-4 col-sm-6 project_box cityBox py-0">
                                <div className="project_box_inner p-0">
                                    <Link to={`/city/${cities.slugURL}`}>
                                        <div className="Project_box_img">
                                            <div className="img-fluid"><img src={cities.image} alt={cities.location || 'City Image'} /></div>
                                        </div>
                                    </Link>
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
export default AllCities