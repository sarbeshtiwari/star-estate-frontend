import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function BlogDetails() {
    const { slugURL } = useParams();
    const [blogDetails, setBlogDetails] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [error, setError] = useState('');
    const [loadingBlog, setLoadingBlog] = useState(true);
    const [loadingRecent, setLoadingRecent] = useState(true);
    const footerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const fetchBlogDetailsData = async () => {
            try {
                const response = await axiosInstance.get(`/blogs/getBlogBySlugURL/${slugURL}`);
                const fetchedData = response.data;
                setBlogDetails([fetchedData]);
            } catch (error) {
                setError('Error fetching blog data');
                console.error('Error fetching blog data:', error);
            } finally {
                setLoadingBlog(false);
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
                    .filter(blog => blog.slugURL !== slugURL && blog.status !== false)
                    .slice(0, 5);
                setRecentBlogs(recentBlogsFiltered);
            } catch (error) {
                setError('Error fetching recent blogs');
                console.error('Error fetching recent blogs:', error);
            } finally {
                setLoadingRecent(false);
            }
        };
        fetchRecentBlogs();
    }, [slugURL]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsSticky(!entry.isIntersecting);
        }, { threshold: 1.0 });

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    return (
        <div>
            <div className="emptyBox"></div>
            <div className="w-100">
                <div className="container-lg">
                    {loadingBlog ? (
                        <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <span className="ml-2">Loading...</span>
                    </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : (
                        blogDetails.map((blogs, index) => (
                            <div key={index} className="breadcrumbContainer" aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                    <li className="breadcrumb-item">Media</li>
                                    <li className="breadcrumb-item">{blogs.blogsCategory === 'blog' ? <Link to='/blogs'>Blogs</Link> : <Link to='/blogs'>News</Link>}</li>
                                    <li className="breadcrumb-item active">{blogs.blogsName}</li>
                                </ol>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="row gap-row">
                        {loadingBlog ? (
                           <div className="d-flex justify-content-center align-items-center">
                           <div className="spinner-border text-primary" role="status">
                               <span className="sr-only">Loading...</span>
                           </div>
                           <span className="ml-2">Loading...</span>
                       </div>
                        ) : blogDetails.map((blogs, index) => (
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
                                            <p dangerouslySetInnerHTML={{ __html: blogs.content }} />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-xl-4 col-lg-5 position-relative pageAside"
                                    style={{
                                        position: isSticky ? 'sticky' : 'relative',
                                        top: isSticky ? '20px' : 'auto',
                                        transition: 'top 0.3s',
                                        height: 'fit-content',
                                    }}
                                >
                                    {loadingRecent ? (
                                        <div className="d-flex justify-content-center align-items-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <span className="ml-2">Loading...</span>
                                    </div>
                                    ) : recentBlogs.length > 0 && (
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
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <footer ref={footerRef}>
                {/* Footer content goes here */}
            </footer>
        </div>
    );
}

export default BlogDetails;
