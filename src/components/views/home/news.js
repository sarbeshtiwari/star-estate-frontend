import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';

function News() {
    const [news, setNews] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchNewsAndBlogs = async () => {
            try {
                // Fetch news data
                const responseNews = await axiosInstance.get(`news/getNews`);
                const filteredNews = responseNews.data.filter(news => news.status === true);
                setNews(filteredNews);

                // Fetch blog data
                const responseBlogs = await axiosInstance.get(`/blogs/getBlog`);
                const filteredBlogs = responseBlogs.data.filter(blog => blog.status === true && blog.blogsCategory === 'news');
                setBlogs(filteredBlogs);
            } catch (error) {
                console.error('Failed to fetch news and blogs', error);
            }
        };

        fetchNewsAndBlogs();
    }, []);

    return (
        <div>
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source 
                        media="(min-width: 992px)" 
                        srcSet="/star-estate-react/assets/images/news.jpg" 
                    />
                    <source 
                        media="(min-width: 768px)" 
                        srcSet="/star-estate-react/assets/images/news-m.jpg" 
                    />
                    <img 
                        src="/star-estate-react/assets/images/news-m.jpg" 
                        className="h-100 object-cover object-position-bottom rounded" 
                        alt="Star Estate" 
                    />
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
                        {news.map((item, index) => (
                            <div key={index} className="col-lg-4 col-sm-6 blogBox newsBox">
                                <div className="inner common-border">
                                    <div className="img-fluid">
                                        <Link to={`/news/${item.slugURL}`}>
                                            <img src={`${axiosInstance.defaults.globalURL}${item.newsThumb}`} alt={item.imageTitle} title={item.heading} />
                                        </Link>
                                    </div>
                                    <div className="blog-details">
                                        <ul className="list-inline">
                                            <li><i className="fa fa-calendar-alt text-primary"></i> <span>{item.newsDate}</span></li>
                                            <li><i className="fa fa-tag text-primary"></i> <span>{item.paperName}</span></li>
                                        </ul>
                                        <a className="h6" href="#">{item.heading}</a>
                                        <div className="continue-reading"><Link to={`/news/${item.slugURL}`}>Continue Readings</Link></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Render Blogs */}
                    <div className="heading mx-sm-auto text-sm-center mt-5">
                        
                    </div>
                    <div className="row gap-row">
                        {blogs.map((item, index) => (
                            <div key={index} className="col-lg-4 col-sm-6 blogBox newsBox">
                                <div className="inner common-border">
                                    <div className="img-fluid">
                                        <Link to={`/blogs/${item.slugURL}`}>
                                            <img src={`${axiosInstance.defaults.globalURL}${item.blogsImage}`} alt={item.blogsName} title={item.blogsName} />
                                        </Link>
                                    </div>
                                    <div className="blog-details">
                                        <ul className="list-inline">
                                            <li><i className="fa fa-calendar-alt text-primary"></i> <span>{item.blogsDate}</span></li>
                                            <li><i className="fa fa-tag text-primary"></i> <span>{item.blogsBy}</span></li>
                                        </ul>
                                        <a className="h6" href="#">{item.heading}</a>
                                        <div className="continue-reading"><Link to={`/blog/${item.slugURL}`}>Continue Readings</Link></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default News;
