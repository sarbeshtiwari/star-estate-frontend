import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
function BlogDetails() {
    const { slugURL } = useParams();
    const [blogDetails, setBlogDetails] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [error, setError] = useState([]);
    useEffect(() => {
        const fetchBlogDetailsData = async () => {
            try {
                const response = await axiosInstance.get(`/blogs/getBlogBySlugURL/${slugURL}`);
                const fetchedData = response.data;
                setBlogDetails([fetchedData]);
            } catch (error) {
                setError('Error fetching main project data');
                console.error('Error fetching main project data:', error);
            }
        };
        fetchBlogDetailsData();
    }, [slugURL]);
    useEffect(() => {
        const fetchRecentBlogs = async () => {
            try {
                const response = await axiosInstance.get('/blogs/getBlog');
                const fetchedBlogs = response.data;
                const recentBlogsFiltered = fetchedBlogs
                    .filter(blog => blog.slugURL !== slugURL)
                    .slice(0, 5);
                // console.log(recentBlogsFiltered)
                setRecentBlogs(recentBlogsFiltered);
            } catch (error) {
                setError('Error fetching recent blogs');
                console.error('Error fetching recent blogs:', error);
            }
        };
        fetchRecentBlogs();
    }, [slugURL]);
    return (
        <div>
            {/* <Header /> */}
            <div className="emptyBox"></div>
            <div className="w-100">
                <div className="container-lg">
                    {blogDetails.map((blogs, index) => (
                        <div key={index} className="breadcrumbContainer" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item">Media</li>
                                <li className="breadcrumb-item"><Link to='/blogs'>Blogs</Link></li>
                                <li className="breadcrumb-item active">{blogs.blogsName}</li>
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="row gap-row">
                        {blogDetails.map((blogs, index) => (
                            <React.Fragment key={index}>
                                <div className="col-xl-8 col-lg-7 blogTextContainer">
                                    <div className="inner pr-lg-3">
                                        <div className="heading">
                                            <h1 className="h2 mb-0">{blogs.blogsName}</h1>
                                        </div>
                                        <div className="courtesy">
                                            <span className="posted_on">Posted on: <strong>{new Date(blogs.blogsDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</strong></span>
                                            <span>Courtesy: <strong>{blogs.blogsBy}</strong></span>
                                        </div>
                                        <div className="blogTextarea w-100">
                                            <div className="img-fluid">
                                                <img src={`${axiosInstance.defaults.globalURL}${blogs.blogsImage}`} alt={blogs.blogsName || 'Blog Image'} />
                                                <em>{blogs.blogsName}</em>
                                            </div>
                                            <p dangerouslySetInnerHTML={{ __html: blogs.content }} /> </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-5 position-relative pageAside">
                                    <div className="aside-inner" style={{ top: "60px" }}>
                                        <aside className="topRatedProjectShowcase common-border mt-0">
                                            <div className="heading ml-0">
                                                <h6 className="mb-0 text-primary">Recent Posts</h6>
                                            </div>
                                            <div className="topRatedProjectsContainer">
                                                {recentBlogs.map((recentBlog, idx) => (
                                                    <div key={idx} className="topRatedProjectBox">
                                                        <div className="inner">
                                                            <div className="img-fluid">
                                                                <img src={`${axiosInstance.defaults.globalURL}${recentBlog.blogsImage}`} alt={recentBlog.blogsName || 'Blog Image'} />
                                                            </div>
                                                            <div className="boxDetails">
                                                                <Link to={`/blogs/${recentBlog.slugURL}`}>
                                                                    {recentBlog.blogsName}
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
export default BlogDetails