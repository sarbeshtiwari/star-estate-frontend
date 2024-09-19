import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Typed from 'typed.js';
import { fetchCategories, fetchCities, fetchProjects } from '../../../apis/home-page-api';
import './banner.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../widgets/header';
import axiosInstance from '../utils/axiosInstance';
const Banner = () => {
  useEffect(() => {
    const scrollDown = document.querySelector('.scrollDown');
    const scrollToElement = document.querySelector('.scrollto');
    const handleScroll = () => {
      window.scrollTo({
        top: scrollToElement.offsetTop,
        behavior: 'smooth',
      });
    };
    scrollDown.addEventListener('click', handleScroll);
    return () => {
      scrollDown.removeEventListener('click', handleScroll);
    };
  }, []);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    projectName: '',
    cityLocation: '',
    projectConfiguration: '',
    projectPrice: '',
    property_type: '',
  });
  useEffect(() => {
    fetchCategories().then(data => setCategories(data)).catch(console.error);
    fetchCities().then(data => setCities(data)).catch(console.error);
    // if (formData.property_type && formData.cityLocation) {
    //   fetchProjects(formData.property_type)
    //     .then(data => {
    //       const filteredProjects = data.filter(project => project.cityLocation === formData.cityLocation);
    //       console.log(filteredProjects);
    //       setProjects(filteredProjects);
    //     })
    //     .catch(console.error);
    // }
  }, [formData.property_type, formData.cityLocation]);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'property_type' && value) {
      await fetchProjects(value).then(data => setProjects(data)).catch(console.error);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsePrice = (price) => {
      if (!price) return '';
      const cleanPrice = price.replace(/[^0-9.]/g, '');
      const numericPrice = parseFloat(cleanPrice);
      if (price.toLowerCase().includes('lakh')) {
        return numericPrice * 100000;
      }
      if (price.toLowerCase().includes('cr')) {
        return numericPrice * 10000000;
      }
      return isNaN(numericPrice) ? '' : numericPrice;
    };
  
    try {
      let minPrice = '';
      let maxPrice = '';

      if (formData.projectPrice.includes('-')) {
        // Range case
        [minPrice, maxPrice] = formData.projectPrice.split('-').map(price => parsePrice(price.trim()));
  
        // Log for debugging
        console.log('Range case:', { minPrice, maxPrice });
  
        // Adjust for specific cases
        if (parseFloat(maxPrice) === 10000000) {
          maxPrice = 10000000; // Set maxPrice to 1 cr when it's exactly 1 cr
        }
      } else {
        // Single value case
        const singlePrice = parsePrice(formData.projectPrice.trim());
  
        // Log for debugging
        console.log('Single value case:', { singlePrice });

        if (singlePrice === 10000000) {
          minPrice = 0;          // Set minPrice to 0
          maxPrice = 10000000;   // Set maxPrice to 1 cr
        } else {
          minPrice = maxPrice = singlePrice; // Set both to the single value
        }
      }
  
      // Log the final minPrice and maxPrice
      console.log('Final prices:', { minPrice, maxPrice });
  
      // Create query parameters
      const queryParams = new URLSearchParams({
        projectType: formData.property_type,
        propertyLocation: formData.cityLocation,
        minPrice: minPrice,
        maxPrice: maxPrice
      }).toString();

      console.log('Query Params:', queryParams);

      // Navigate to the All Projects page with the query parameters
      navigate(`/projects?${queryParams}`);
    } catch (error) {
      console.error('Error submitting search:', error);
    }
  };



  const [index, setIndex] = useState(0);
  useEffect(() => {
    const typed = new Typed('#typed', {
      strings: ['Apartment', 'Villa', 'Mall', 'Office Space'],
      typeSpeed: 160,
      backDelay: 1500,
      backSpeed: 50,
      loop: true,
      preStringTyped: (arrayPos, self) => {
        const typedText = self.strings[arrayPos].trim();
        const items = ['Apartment', 'Villa', 'Mall', 'Office Space'];
        const foundIndex = items.indexOf(typedText);
        if (foundIndex !== -1) {
          setIndex(foundIndex);
        }
      },
    });
    return () => {
      typed.destroy();
    };
  }, []);
  const [filter, setFilter] = useState([]);
    useEffect(() => {
        const fetchFilter = async () => {
            try {
                const response = await axiosInstance.get(`addProjects/projects`);
                setFilter(response.data);
            } catch (error) {
                console.error('Failed to fetch Awards', error);
            }
        };
        fetchFilter();
    }, []);
  return (
    <div>
      {/* <Header /> */}
    <div id="banner" className="carousel slide carousel-fade banner" data-bs-pause="false" data-bs-ride="carousel">
       <Carousel indicators={false} controls={false} activeIndex={index} className='h-100'>
        <Carousel.Item>
          <picture>
            <source media="(max-width: 540px)" srcSet="/star-estate-react/assets/images/homebanner/new/banner-apartments-m.jpg" />
            <img src="/star-estate-react/assets/images/homebanner/new/banner-apartments.jpg" alt="Star Estate" className="d-block w-100 carousel-img" />
          </picture>
          <span className="typing-text-in-carousel">Apartment</span>
        </Carousel.Item>
        <Carousel.Item>
          <picture>
            <source media="(max-width: 540px)" srcSet="/star-estate-react/assets/images/homebanner/new/banner-villa-m.jpg" />
            <img src="/star-estate-react/assets/images/homebanner/new/banner-villa.jpg" alt="Star Estate" className="d-block w-100 carousel-img" />
          </picture>
          <span className="typing-text-in-carousel">Villa</span>
        </Carousel.Item>
        <Carousel.Item>
          <picture>
            <source media="(max-width: 540px)" srcSet="/star-estate-react/assets/images/homebanner/new/banner-mall-m.jpg" />
            <img src="/star-estate-react/assets/images/homebanner/new/banner-mall.jpg" alt="Star Estate" className="d-block w-100 carousel-img" />
          </picture>
          <span className="typing-text-in-carousel">Mall</span>
        </Carousel.Item>
        <Carousel.Item>
          <picture>
            <source media="(max-width: 540px)" srcSet="/star-estate-react/assets/images/homebanner/new/banner-office-m.jpg" />
            <img src="/star-estate-react/assets/images/homebanner/new/banner-office.jpg" alt="Star Estate" className="d-block w-100 carousel-img" />
          </picture>
          <span className="typing-text-in-carousel">Office Space</span>
        </Carousel.Item>
      </Carousel>
      <div className="banner-overlay">
        <div className="bannerContainer">
          <div className="container-lg">
            <div className="search-filter">
              <span className="h4">
                You deserve the best  <span id="typed" >Apartment</span><span className="typed-cursor" aria-hidden="true"></span>
              </span>
              <div className="filter-form">
                <form id="categoryfilter" encType="multipart/form-data" onSubmit={handleSubmit}>
                  <div className="row gx-2 gap-form-row">
                    <div className="col-md-10">
                      <div className="inner">
                        <div className="row g-0">
                          <div className="col mb-0 form-group">
                            <select
                              name="property_type"
                              id="property_type"
                              className="form-control bg-white my-0"
                              value={formData.property_type}
                              onChange={handleChange}
                            >
                              <option value="">Property Type</option>
                              {categories
                                .filter(category => category.status)
                                .map(filteredCategory => (
                                  <option key={filteredCategory._id} value={filteredCategory.slugURL}>
                                    {filteredCategory.category}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="col mb-0 form-group">
                            <select
                              name="cityLocation"
                              id="cityLocation"
                              className="form-control bg-white my-0"
                              value={formData.cityLocation}
                              onChange={handleChange}
                            >
                              <option value="">Project Location</option>
                              {cities.map(city => (
                                <option key={city._id} value={city.slugURL}>
                                  {city.location}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col mb-0 form-group">
                            <select
                              name="projectPrice"
                              id="projectPrice"
                              className="form-control bg-white my-0"
                              value={formData.projectPrice}
                              onChange={handleChange}
                            >
                              <option value="">Budget</option>
                              <option value="10000000">UpTo 1 Cr.</option>
                              <option value="10000000-30000000">1 - 3 Cr.</option>
                              <option value="30000000-50000000">3 - 5 Cr.</option>
                              <option value="50000000">Above 5 Cr.</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className='readmore w-auto mt-0 h-100'>
                        <input type="hidden" name="projectfltr" value="active" />
                        <button className="button w-100 h-100" type="submit">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="filter-property-type d-none d-md-flex">
                  <Link to="/projects/new-launch">New Launches</Link>
                  <Link to='/projects/commercial'>Commercial Properties</Link>
                  <Link to='/projects/residential'>Residential Properties</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scrollDown d-none d-md-block">Scroll<br /><i className="fa fa-chevron-down"></i></div>
    </div>
    </div>
  );
};
export default Banner;
