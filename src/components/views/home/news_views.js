import React from 'react'
import { Link } from 'react-router-dom'
function NewsViews() {
    return (
        <div>
            <div className="w-100 padding bg-lightgreen">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h3>News &amp; Views</h3>
                    </div>
                    <div className="hm-project-card-wrapper">
                        <div className="row g-3 gap-form-row">
                            <div className="col-lg-3 col-sm-6 news-card">
                                <Link to='/awards' className="inner">
                                    <h5 className="card-title">Awards</h5>
                                    <div className="img-fluid">
                                        <img src="/star-estate-react/assets/images/awards-th.jpg" alt="" />
                                    </div>
                                    <div className="arrow"><i className="fa fa-arrow-right"></i></div>
                                </Link>
                            </div>
                            <div className="col-lg-3 col-sm-6 news-card">
                                <Link to='/news' className="inner">
                                    <h5 className="card-title">News</h5>
                                    <div className="img-fluid">
                                        <img src="/star-estate-react/assets/images/news-th.jpg" alt="" />
                                    </div>
                                    <div className="arrow"><i className="fa fa-arrow-right"></i></div>
                                </Link>
                            </div>
                            <div className="col-lg-3 col-sm-6 news-card">
                                <Link to='/events' className="inner">
                                    <h5 className="card-title">Events</h5>
                                    <div className="img-fluid">
                                        <img src="/star-estate-react/assets/images/events-th.jpg" alt="" />
                                    </div>
                                    <div className="arrow"><i className="fa fa-arrow-right"></i></div>
                                </Link>
                            </div>
                            <div className="col-lg-3 col-sm-6 news-card">
                                <Link to='/blogs' className="inner">
                                    <h5 className="card-title">Blogs</h5>
                                    <div className="img-fluid">
                                        <img src="/star-estate-react/assets/images/blogs-th.jpg" alt="" />
                                    </div>
                                    <div className="arrow"><i className="fa fa-arrow-right"></i></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewsViews