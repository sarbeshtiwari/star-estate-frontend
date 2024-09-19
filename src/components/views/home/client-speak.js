import React, { useEffect, useState } from 'react'
import Header from '../../widgets/header'
import Footer from '../../widgets/footer'
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

function ClientsSpeak() {
    const [testi, setTesti] = useState([]);
    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axiosInstance.get(`clientSpeak/getClientWords`);
                const filteredTest = response.data.filter(test => test.status === true);
                setTesti(filteredTest);
            } catch (error) {
                console.error('Failed to fetch Awards', error);
            }
        };
        fetchTest();
    }, []);
  return (
    <div>
        {/* <Header /> */}
        <div class="insideBanner">
        <picture>
            <source media="(max-width: 820px)" srcset="/star-estate-react/assets/images/banner-emi-calculator-m.jpg" />
            <img src="/star-estate-react/assets/images/banner-emi-calculator.jpg" class="h-100 object-cover" alt="Star Estate" />
        </picture>
    </div>
    <div class="w-100">
        <div class="container-lg">
            <div class="breadcrumbContainer" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li class="breadcrumb-item active">Client's Speak</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="w-100 padding">
        <div class="container-lg">
            <div class="heading mx-sm-auto text-sm-center">
                <h3 class="mb-0">Client's Speak</h3>
            </div>
            <div class="testim-slider">
                <div class="row g-4 ">
                    {testi.map((tests, index) => (
                    <div class="col-lg-6 testimBox">
                        <div class="inner common-border">
                            <i><img src="/star-estate-react/assets/images/icons/double-quote.png" alt="" /></i>

                            <div key={index} class="testim-text">
                                <p>{tests.clientWords}</p>
                                <h6 class="testim-name">{tests.clientName} <small>{tests.clientSubHeading}</small></h6>
                            </div>

                        </div>
                    </div>
                 ))}
                </div>
            </div>
        </div>
    </div>
        {/* <Footer /> */}
    </div>
  )
}

export default ClientsSpeak