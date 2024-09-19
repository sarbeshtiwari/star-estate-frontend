import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
function News() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axiosInstance.get(`news/getNews`);
                const filteredNews = response.data.filter(news => news.status === true);
                setNews(filteredNews);
            } catch (error) {
                console.error('Failed to fetch news', error);
            }
        };
        fetchNews();
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
                            <li className="breadcrumb-item active">News</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-sm-auto text-sm-center">
                        <h3 className="mb-0">News</h3>
                    </div>
                    <div className="row gap-row">
                        {news.map((news, index) => (
                            <div key={index} className="col-lg-4 col-sm-6 blogBox newsBox">
                                <div className="inner common-border">
                                    <div className="img-fluid">
                                        <Link to={`/news/${news.slugURL}`} ><img src={`${axiosInstance.defaults.globalURL}${news.newsThumb}`} alt={news.imageTitle} title={news.heading} /></Link>
                                    </div>
                                    <div className="blog-details">
                                        <ul className="list-inline">
                                            <li><i className="fa fa-calendar-alt text-primary"></i> <span>{news.newsDate}</span></li>
                                            <li><i className="fa fa-tag text-primary"></i> <span>{news.paperName}</span></li>
                                        </ul>
                                        <a className="h6" href="#">{news.heading}</a>
                                        <div className="continue-reading"><Link to={`/news/${news.slugURL}`} >Continue Readings</Link></div>
                                    </div>
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
export default News