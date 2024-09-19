import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
export const fetchCities = async () => {
  try {
    const response = await axiosInstance.get(`city/getCityWithImage`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};
const CitywiseContainer = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loadCities = async () => {
      try {
        const fetchedCities = await fetchCities();
        const displayedCities = fetchedCities.slice(0, 7).map(city => ({
          src: city.image,
          alt: city.location,
          slugURL: city.slugURL
        }));
        displayedCities.push({
          src: '/star-estate-react/assets/images/cities/new/other-cities.jpg',
          alt: 'Other Cities'
        });
        setCities(displayedCities);
      } catch (err) {
        setError('Error fetching cities.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCities();
  }, []);
  const handleCityClick = (city) => {
    if (city.alt === 'Other Cities') {
      navigate('/city');
    } else {
      navigate(`/city/${city.slugURL}`);
    }
  };
  return (
    <div className="w-100 padding position-relative overflow-hidden hm-citywiseContainer animate-section2">
      <div className="container-lg">
        <div className="heading mx-auto text-center">
          <h3 className="mb-0">
            Find your dream property in the city you're searching in
          </h3>
        </div>
        <div className="all-cities">
          <div className="inner text-center">
            <div className="row g-3">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 col-sm-6 project_box cityBox py-0"
                  onClick={() => handleCityClick(city)} // Add click handler
                >
                  <div className="project_box_inner p-0">
                    <div className="Project_box_img">
                      <div className="img-fluid">
                        <img src={city.src} alt={city.alt} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CitywiseContainer;
