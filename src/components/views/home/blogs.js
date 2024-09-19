import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
function Blogs() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await axiosInstance.get(`/blogs/getBlog`);
                const filteredBlogs = response.data.filter(blog => blog.status === true);
                // const filteredBlogsByDate = filteredBlogs.filter(blog => blog.blogsDate.sort());
                setBlogs(filteredBlogs);
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
                <div className="row g-4 gap-row">
                    {blogs.map((blog, index) => (
                    <div className="col-lg-4 col-sm-6 blogBox">
                        <div  key={index} className="inner common-border">
                            <div className="img-fluid">
                                <Link to={`/blogs/${blog.slugURL}`}><img src={`${axiosInstance.defaults.globalURL}${blog.blogsImage}`} alt={blog.blogsName || 'Blog Image'} /></Link>
                            </div>
                            <div className="blog-details">
                                <ul className="list-inline">
                                    <li><i className="fa fa-calendar-alt text-primary"></i> <span>{blog.blogsDate}</span></li>
                                    <li><i className="fa fa-tag text-primary"></i> <span>{blog.blogsBy}</span></li>
                                </ul>
                                <Link to={`/blogs/${blog.slugURL}`} className="h6">{blog.blogsName}</Link>
                                {/* <p dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
                                <div className="continue-reading"><Link to={`/blogs/${blog.slugURL}`}>Continue Readings</Link></div>
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
export default Blogs