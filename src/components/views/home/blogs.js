import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axiosInstance.get('/blogs/getBlog');
                const filteredBlogs = response.data.filter(blog => blog.status === true && blog.blogsCategory === 'blog');
                setBlogs(filteredBlogs);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch blogs');
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div>
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source 
                        media="(min-width: 992px)" 
                        srcSet="assets/images/blog.jpg" 
                    />
                    <source 
                        media="(min-width: 768px)" 
                        srcSet="assets/images/blog-m.jpg" 
                    />
                    <img 
                        src="assets/images/blog-m.jpg" 
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
                            <li className="breadcrumb-item active">Blogs</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-sm-auto text-sm-center">
                        <h3 className="mb-0">Blogs</h3>
                    </div>
                    {loading ? (
                         <div className="d-flex justify-content-center align-items-center">
                         <div className="spinner-border text-primary" role="status">
                             <span className="sr-only">Loading blogs...</span>
                         </div>
                         <span className="ml-2">Loading blogs...</span>
                     </div>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="row g-4 gap-row">
                            {blogs.map((blog, index) => (
                                <div key={index} className="col-lg-4 col-sm-6 blogBox">
                                    <div className="inner common-border">
                                        <div className="img-fluid">
                                            <Link to={`/blogs/${blog.slugURL}`}>
                                                <img src={`${axiosInstance.defaults.globalURL}${blog.blogsImage}`} alt={blog.blogsName || 'Blog Image'} />
                                            </Link>
                                        </div>
                                        <div className="blog-details">
                                            <ul className="list-inline">
                                                <li><i className="fa fa-calendar-alt text-primary"></i> <span>{new Date(blog.blogsDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</span></li>
                                                <li><i className="fa fa-tag text-primary"></i> <span>{blog.blogsBy}</span></li>
                                            </ul>
                                            <Link to={`/blogs/${blog.slugURL}`} className="h6">{blog.blogsName}</Link>
                                            <div className="continue-reading"><Link to={`/blogs/${blog.slugURL}`}>Continue Reading</Link></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Blogs;
