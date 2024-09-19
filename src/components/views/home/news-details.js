import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Link, useParams } from 'react-router-dom';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
function NewsDetails() {
    const { slugURL } = useParams();
    const [newsDetails, setNewsDetails] = useState([]);
    const [recentNews, setRecentNews] = useState([]);
    const [error, setError] = useState([]);
    useEffect(() => {
        const fetchNewsDetailsData = async () => {
            try {
                const response = await axiosInstance.get(`news/getNewsByslugURL/${slugURL}`);
                const fetchedData = response.data;
                setNewsDetails([fetchedData]);
            } catch (error) {
                setError('Error fetching main project data');
                console.error('Error fetching main project data:', error);
            }
        };
        fetchNewsDetailsData();
    }, [slugURL]);
    useEffect(() => {
        const fetchRecentNews = async () => {
            try {
                const response = await axiosInstance.get('/news/getNews');
                const fetchedNews = response.data;
                const recentNewsFiltered = fetchedNews
                    .filter(news => news.slugURL !== slugURL)
                    .slice(0, 5);
                // console.log(recentBlogsFiltered)
                setRecentNews(recentNewsFiltered);
            } catch (error) {
                setError('Error fetching recent blogs');
                console.error('Error fetching recent blogs:', error);
            }
        };
        fetchRecentNews();
    }, [slugURL]);
    return (
        <div>
            {/* <Header /> */}
            <div className="emptyBox"></div>
            <div className="w-100">
                <div className="container-lg">
                    {newsDetails.map((news, index) => (
                        <div key={index} className="breadcrumbContainer" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item">Media</li>
                                <li className="breadcrumb-item"><Link to='/news'>News</Link></li>
                                <li className="breadcrumb-item active">{news.heading}</li>
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="row gap-row">
                        {newsDetails.map((news, index) => (
                            <React.Fragment key={index}>
                                <div className="col-xl-8 col-lg-7 blogTextContainer">
                                    <div className="inner pr-lg-3">
                                        <div className="heading">
                                            <h1 className="h2 mb-0">{news.heading}</h1>
                                        </div>
                                        <div className="courtesy">
                                            <span className="posted_on">Posted on: <strong>{new Date(news.newsDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</strong></span>
                                            <span>Courtesy: <strong>{news.paperName}</strong></span>
                                        </div>
                                        <div className="blogTextarea w-100">
                                            <div className="img-fluid">
                                                <img src={`${axiosInstance.defaults.globalURL}${news.newsImage}`} alt={news.heading || 'Blog Image'} />
                                                <em>{news.heading}</em>
                                            </div>
                                            <p dangerouslySetInnerHTML={{ __html: news.content }} /> </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-5 position-relative pageAside">
                                    <div className="aside-inner" style={{ top: "60px" }}>
                                        <aside className="topRatedProjectShowcase common-border mt-0">
                                            <div className="heading ml-0">
                                                <h6 className="mb-0 text-primary">Recent Posts</h6>
                                            </div>
                                            <div className="topRatedProjectsContainer">
                                                {recentNews.map((recentNews, idx) => (
                                                    <div key={idx} className="topRatedProjectBox">
                                                        <div className="inner">
                                                            <div className="img-fluid">
                                                                <img src={`${axiosInstance.defaults.globalURL}${recentNews.newsImage}`} alt={recentNews.heading || 'Blog Image'} />
                                                            </div>
                                                            <div className="boxDetails">
                                                                <Link to={`/news/${recentNews.slugURL}`}>
                                                                    {recentNews.heading}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
export default NewsDetails