import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
const InsightsTools = () => {
    return (
        <div>
        <div className="w-100 padding scrollto">
        <div className="container-lg">
            <div className="heading mx-auto text-center">
                <h3>Insights &amp; Tools</h3>
            </div>
            <div className="hm-project-card-wrapper">
                <div className="row g-3">
                    <div className="col-lg-3 col-sm-6 project-card">
                        <div className="inner px-0 pt-0">
                            <img src="/star-estate-react/assets/images/img-emi.webp" alt="EMI Calculator" />
                            <div className="card-footer viewmore"><Link to='/emi-calculator'>Explore Now</Link></div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 project-card">
                        <div className="inner px-0 pt-0">
                            <img src="/star-estate-react/assets/images/img-evaluation-report.webp" alt="Evaluation Report" />
                            <div className="card-footer viewmore"><Link to='/property-valuation'>Explore Now</Link></div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 project-card">
                        <div className="inner px-0 pt-0">
                            <img src="/star-estate-react/assets/images/img-nri.webp" alt="NRI Guidelines" />
                            <div className="card-footer viewmore"><Link to='/nri-guidelines'>Explore Now</Link></div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 project-card">
                        <div className="inner px-0 pt-0">
                            <img src="/star-estate-react/assets/images/img-realty-check.webp" alt="Reality Check" />
                            <div className="card-footer viewmore"><Link to='/reality-check-before-buying'>Explore Now</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
};
export default InsightsTools;
