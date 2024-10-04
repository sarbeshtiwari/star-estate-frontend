import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css';

function PrivacyPolicy() {
    return (
        <div>
            <div className="emptyBox"></div>

            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Privacy Policy</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg padding">
                    <div className="row gap-row">
                        <div className="col-lg-12 vmBox">
                            <div className="inner pl-lg-4">
                                <div className="heading mx-auto">
                                    <h3 className='mb-0'>Privacy Policy</h3>
                                </div>
                                <p>Thank you for visiting www.starestate.com</p>

                                <p>The aforesaid website is the only official website of Star Estate Limited (“Company”). The user(s) are cautioned and advised not to rely upon any information stated on any other websites which may appear to be similar to the Company’s official website and/or contain Company’s logo/brand name or information about the Company or its projects.</p>

                                <p>This website may contain other proprietary notices and copyright information, the terms of which must be observed and followed.</p>

                                <p>Information may be changed or updated without notice. The Company may also make improvements and/or changes in the products and/or the programs described in this information at any time without notice.</p>

                                <p>By accessing this website, the viewer/user confirms that the information including brochures and marketing collaterals on this website are solely for informational purposes only and the viewer/user has not relied on this information for making any booking/purchase in any project of the Company. Nothing on this website constitutes advertising, marketing, booking, selling or an offer for sale, or invitation to purchase a unit in any project in any manner by the Company.</p>

                                <p>The present content on the website(s), regarding the project and in respect of the apartments, plot or building, and project layout, area, amenities, services, terms of sale and other relevant terms, are based on the approved and sanctioned plans subject to any modification and change in consonance with relevant laws or as directed by the authorities. The visuals, pictures, images/renderings/maps of the project at the development/construction stage, are purely indicative, informative, and representational in nature and only an architect's impression, unless specifically claimed to be actual photographs.</p>

                                <p>The particulars on the website mention details of the projects/developments undertaken by the Company including depicting banners/posters of the project. The contents are being modified in terms of the stipulations/recommendations under the RERA Act and rules made thereunder and accordingly may not be fully in line thereof as of date. You are therefore requested to directly verify all details and aspects of any proposed booking/acquisition of units/premises, directly with our authorised sales team/ Company prior to concluding any decision for buying any unit(s) in any of the said projects.</p>

                                <p>The website and all its contents are provided on "as is" and on "as available" basis. No information given under this website creates a warranty or expand the scope of any warranty that cannot be disclaimed under applicable law. Your use of the website is solely at your own risk. This website is for guidance only. It does not constitute part of an offer or contract. The design & specifications are subject to change without prior notice. The computer generated images are the artist's impression and are an indicative of the actual designs.</p>

                                <p>The Company expressly disclaims all liability in respect to actions taken or not taken based on any or all the contents of this website. The Company will in no circumstance be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from the use of data, arising out of or in connection with the use of this website.</p>

                                <p>Some links within the website may lead to other websites, including those operated and maintained by third parties. The Company includes these links solely as a convenience to you, and the presence of such a link does not imply a responsibility for the linked site or an endorsement of the linked site, its operator, its contents or under RERA.</p>

                                <p>The Company makes no representations whatsoever about any other website which you may access through this one. When you access a non-Company realty website, even one that may contain the Company-logo, please understand that it is independent from the Company, and that the Company has no control over the content on that website. In addition, a link to a non-Company Web site does not mean that the Company endorses or accepts any responsibility for the content, or the use, of such website. It is up to you to take precautions to ensure that whatever you select for your use is free of such items as viruses, worms, Trojan horses and other items of a destructive nature.</p>

                                <p>By using or accessing the website, the user agrees, acknowledges, and accepts all the terms and conditions of the disclaimer without any qualification or limitation.</p>

                                <p>Queries/feedback/etc. are not monitored on the website, therefore shall not be construed as read or registered with Company or the owner of the website. The Company will not be accepting any bookings or allotments based on the images, material, stock photography, projections, details, and descriptions that are currently available and/or displayed on the website.</p>
                                <p>In no event, the Company will be liable to any party for any direct, indirect, special or other consequential damages for any use of this website, or any other hyperlinked website, including without limitation, any lost profits, business interruption, loss of programs or other data on your information handling system or otherwise, even if we are expressly advised of the possibility of such damages.</p>

                                <p>The foregoing are subject to the prevailing laws of India and the courts in India shall have the exclusive jurisdiction on any dispute that may arise out of the use of this site.</p>

                                <p>We thank you for your patience and understanding.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrivacyPolicy