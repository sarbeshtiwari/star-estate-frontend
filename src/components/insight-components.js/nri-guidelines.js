import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../widgets/header'
import Footer from '../widgets/footer'
import axiosInstance from '../views/utils/axiosInstance';
import axios from 'axios';


export const sendNRIData = async (formData) => {
    try {
        const response = await axiosInstance.post(`/NRIQuery/addNRIQuery`, formData);
        return response;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

function NriGuidelines() {
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        phoneNumber: '',
        user_query: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: ''
    });

    useEffect(() => {
        // Extract UTM parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const utmParams = {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_term: params.get('utm_term') || '',
            utm_content: params.get('utm_content') || ''
        };

        setFormData(prevData => ({
            ...prevData,
            ...utmParams
        }));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendNRIData(formData);
            setSuccessMessage('Form submitted successfully!');
            setTimeout(() => {
                setSuccessMessage(''); // Clear message after some time
            }, 2000);
        } catch (error) {
            setSuccessMessage('Failed to submit the form.');
        }
    };

    const Faqs = [
        {
            faqQuestion: "Who is NRI?",
            faqAnswer: `NRI is a Non-Resident Indian is a citizen of India who stays abroad for
                        employment/carrying business or vocation outside India or stays abroad under
                        circumstances indicating an intention for an uncertain duration of stay abroad is a nonresident foreign citizens of India origin are treated at par with Non-Resident Indian
                        (NRI).`
        },
        {
            faqQuestion: "Who is PIO?",
            faqAnswer: `Person of Indian Origin (PIO) (not being a citizen of Pakistan, Bangladesh, Sri Lanka,
                        Afghanistan, China, Iran, Nepal, or Bhutan), who:
                        <ul class='list'>
                            <li>At any time, held an Indian passport, or</li>
                            <li>Whose father or grandfather was a citizen of India by virtue of the Constitution of India or the Citizenship Act, 1955 (57 of 1955).</li>
                        </ul>`
        },
        {
            faqQuestion: "Who is OCI?",
            faqAnswer: ` <ol class='list'>
                            <li>
                                Any person of full age and capacity:
                                <ul class='list'>
                                    <li>Who is a citizen of another country, but was a citizen of India at the time of, or at any time after, the commencement of the constitution, or</li>
                                    <li>Who is a citizen of another country, but was eligible to become a citizen of India at the time of the commencement of the constitution, or</li>
                                    <li>Who is a citizen of another country, but belongs to a territory that became part of India after the 15th August 1947, or</li>
                                    <li>Who is a child of such a citizen</li>
                                </ul>
                            </li>
                            <li>A person, who is a minor child of a person mentioned in clause (1)</li>
                            <li>Provided that no person, who is or had been a citizen of Pakistan or Bangladesh, shall be eligible for registration as an Overseas Citizen of India
                            </li>
                        </ol>`
        },
        {
            faqQuestion: "What are the documents NRI/PIO/OCI require for property purchase in India?",
            faqAnswer: `Here is the list of required documents:
                        <ul class='list'>
                            <li>PAN Card (Permanent Account Number)</li>
                            <li>PIO or OCI Card (For PIO/OCI citizens)</li>
                            <li>Passport (In case of NRI)</li>
                            <li>Passport Size Photographs</li>
                            <li>Address Proof</li>
                        </ul>`
        },
        {
            faqQuestion: "Who can purchase immovable property in India?",
            faqAnswer: `Under the general permission granted by RBI, the following categories can freely purchase immovable property in India:
                        <ol class='list'>
                            <li>on-Resident Indian (NRI) - who is a citizen of India residing outside India</li>
                            <li>Person of Indian Origin (PIO) - who is an individual (not being a citizen of Pakistan, Bangladesh, Sri Lanka, Afghanistan, China, Iran, Nepal, or Bhutan), who
                                <ul class='list'>
                                    <li>At any time, held an Indian Passport, or</li>
                                    <li>Whose father or grandfather was a citizen of India by virtue of the Constitution of India or the Citizenship Act, 1955 (57 of 1955).</li>
                                </ul>
                            </li>
                        </ol>
                        The general permission, however, covers only the purchase of residential and commercial property and not for the purchase of agricultural land/plantation property/farmhouse in India. OCIs can purchase immovable property in India except agricultural land/plantation property/farmhouse.`
        },
        {
            faqQuestion: "Can an NRI/ PIO acquire agricultural land/plantation property/ farm house in India?",
            faqAnswer: "Since general permission is not available to NRI/PIO to acquire agricultural land/plantation property/farm house in India, such proposals will require specific approval from the Reserve Bank and the proposals are considered in consultation with Government of India."
        },
        {
            faqQuestion: "What is the tax payment procedure on income from immovable Property Selling/Renting for NRI/PIO/OCI?",
            faqAnswer: "The mere acquisition of property does not attract income tax. However, any income accruing from the ownership of it, in the form of rent (if it is let out)/annual value of the house (if is not let out and it is not the only residential property owned by that person in India) and/or capital gains (short term or long term) arising on the sale of this house or part thereof is taxable in the hands of the owner. "
        },
        {
            faqQuestion: "Do NRIs/PIOs/OCIs have to file returns in India for their property rental income and Capital Gains Tax?",
            faqAnswer: "The Government of India has granted general permission to NRI/PIO/OCI to buy property in India and they do not have to pay any taxes even while acquiring the property in India. However, taxes have to be paid if they are selling this property. Rental Income earned is taxable in India, and they will have to obtain a PAN and file areturn of the income if they have rented this property. On sale of the property, the profit on sale shall be subject to capital gains, which are to be included in their total income and will be taxed in the normal bracket. However, if the property has beenheld for more than three years, then the resulting gain would be labeled as long termcapital gains subject to 20% tax and some additional levy (cess)."
        },
        {
            faqQuestion: "How does the Double Taxation Avoidance Agreement (DTAA) work in the context of tax on income and Capital Gains tax paid in India by NRI?",
            faqAnswer: "India has DTAAs with several countries which give a favourable tax treatment in respect of certain heads of income. However, in case of sale of immovable property, the DTAA with most countries provide that the capital gains will be taxed in the country where the immovable property is located. Hence, the non-resident will be subject totax in India on the capital gains which arise on the sale of immovable property in India. Letting of immovable property in India would be taxed in India under max tax treaties in view of the fact that the property is in India."
        },
        {
            faqQuestion: "Does Capital Gains Tax (CGT) apply to NRI/PIO/OCI?",
            faqAnswer: "Yes. Long-term and short-term capital gains are taxable in the hands of non-residents."
        },
        {
            faqQuestion: "How is rate of CGT computed?",
            faqAnswer: "Type of Asset: Assets like house property, land and building, jewelry, development rights, etc."
        },
        {
            faqQuestion: "Rate of Tax Deduction at Source (TDS):",
            faqAnswer: `<strong>Long-Term:</strong> 20.6%<br>
                        <strong>Short Term:</strong> 30.9%<br>
                        <strong>Exemption available (only for long term capital gains):</strong>
                        <ul class='list'>
                            <li>
                                The long term capital gain arising on the sale of a residential house can be invested in buying/constructing another residential house within the prescribed time. The exemption is restricted to the amount of capital gains or the amount invested in the new residential house, whichever is lower.
                            </li>
                            <li>
                                If the amount of capital gains is invested in bonds of the National Highways Authority of India (NHAI) or Rural Electrification Corporation, then the entire capital gains is exempted, or the proportionate gain is exempted.
                            </li>
                            <li>
                                As per the financial budget 2007-08, a cap of INR 50 lakh has been imposed on the investment that can be made in capital tax-saving bonds.
                            </li>
                        </ul>`
        },
        {
            faqQuestion: "How does Double Taxation Avoidance Agreement Work in the context of CGT paid in India on the foreign tax treatment?",
            faqAnswer: "In case the non-resident pay tax on capital gains arising in India, he would normally be able to obtain a tax credit with respect to the taxes paid in India/ home country, because the income in India would also be included in the country of tax residence. The amount of tax is also on the basis of computing the tax credit that can be claimed as specified in the respective country’s DTAA and is also dependent on the laws of the home country where the taxpayer is a tax resident."
        },
        {
            faqQuestion: "What are the rules governing the repatriation of the proceeds of sale of immovable properties by NRI/PIO as prescribed by the Reserve Bank of India?",
            faqAnswer: `<ol class='list'>
                            <li>
                                If the property was acquired out of foreign exchange sources i.e. remitted through normal banking channels/by debit to NRE/FCNR (B) account, the amount to be repatriated should not exceed the amount paid for the property.
                                <ul class='list'>
                                    <li>In foreign exchange received through normal banking channels, or</li>
                                    <li>By debit to NRE account (foreign currency equivalent, as on the date of payment) or debit to FCNR (B) account.</li>
                                </ul>
                                Repatriation of sale proceeds of residential property purchased by NRIs/PIOs out of foreign exchange is restricted to not more than two such properties. Capital gains, if any, may be credited to the NRO account from where the NRIs/PIOs may repatriate an amount up to USD One million per financial year, as discussed below:
                            </li>
                            <li>
                                If the property was acquired out of Rupee sources, NRIs/PIOs may remit an amount of up to USD One million per financial year, out of the balances held in the NRO account (inclusive of sale proceeds of assets acquired by way of inheritance or settlement), for all bonafide purposes to the satisfaction of the Authorized Dealer bank and subject to tax compliance. The NRI/PIO may use this facility to remit capital gains, where the acquisition of the subject property was made by funds sourced by remittance through normal banking channels/by debit to NRE/FCNR (B) account.
                            </li>
                        </ol>`
        },
        {
            faqQuestion: "Is the rental income property repatriable and what are the RBI rules?",
            faqAnswer: "The rental income, being a current account transaction, is repatriable, subject to the appropriate deduction of tax and the certification thereof by a Chartered Account in practice. Repatriation of sale proceeds is subject to certain conditions. The amount of repatriation cannot exceed the amount paid for acquisition of the immovable property in foreign exchange."
        },
        {
            faqQuestion: "Are NRI/PIO/OCI eligible for Housing loans to buy property from Indian bank?",
            faqAnswer: `An authorized dealer of a housing finance institution in India approved by the National Housing Bank may provide housing loan to a non-resident Indian or person of Indian origin residing outside India for acquisition of a residential accommodation in India, subject to the following conditions:
                    <ol class='list'>
                        <li>
                            The quantum of loans, margin money, and the period of repayment shall be at par with those applicable to housing finance provided to a person residing in India.
                        </li>
                        <li>
                            The loan amount shall not be credited to Non-Resident External (NRE)/Foreign Currency Non-Resident (FCNR)/Non-Resident Non-Repatriable (NRNR) account of the borrower.
                        </li>
                        <li>
                            The loan shall be fully secured by an equitable mortgage by deposit of title deed on the property to be acquired, and if necessary, also be a lien on the borrower’s other assets in India.
                        </li>
                        <li>
                            The instalment of loan, interest, and other charges, if any, shall be paid by the borrower by remittances from outside India through normal banking channels or out of funds in his Non-Resident External (NRE), Foreign Currency Non-Resident (FCNR), Non-Resident Non-Repatriable (NRNR), Non-Resident Ordinary (NRO), or Non-Resident Special Rupee (NRSR) account in India, or out of rental income derived from renting out the property acquired by utilization of the loan or by any relative of the borrower in India by crediting the borrower’s loan amount through the bank account of such relative (the word ‘relative’ means relative as defined in Section 6 of the Companies Act, 1956).
                        </li>
                        <li>The rate of interest on the loan shall conform to the directives issued by the Reserve Bank of India, or by, as the case may be, the National Housing Bank.
                        </li>
                    </ol>`
        },
        {
            faqQuestion: "Who should file Income Tax return?",
            faqAnswer: `If you are an NRI/PIO/OCI you would have to file your income tax returns if you fulfill either of these conditions:
                        <ul class='list'>
                            <li>Your taxable income in India during the year was above the basic exemption limit of INR 1.6 lakh, or</li>
                            <li>You have earned short-term or long-term capital gains from the sale of any investment or asset, even if the gains are less than the basic exemption limit.</li>
                        </ul>
                        <strong>Note:</strong> The enhanced exemption limit for senior citizens and women is applicable only to Residents and not to Non-Residents.`
        },
        {
            faqQuestion: "Are there any exceptions in Income Tax Rule?",
            faqAnswer: `Yes, there are two exceptions:
                        <ul class='list'>
                            <li>If your taxable income consisted only of investment income (interest) and/or capital gains income and if tax has been deducted at source from such income, you do not have to file your income tax return.</li>
                            <li>If you earned long-term capital gains from the sale of equity shares or equity mutual funds, you do not have to pay any tax and therefore you do not have to include that in your tax return.</li>
                        </ul>
                        <strong>Tip:</strong> You may also file a tax return if you have to claim a refund. This may happen where the tax deducted at source is more than the actual tax liability. Suppose your taxable income for the year was below INR 1.6 lakh but the bank deducted tax at source on your interest amount, and you claim a refund by filing your tax return. Another instance is when you have a capital loss that can be set-off against capital gains. Tax may have been deducted at source on the capital gains, but you can set off (or carry forward) capital loss against the gain and lower your actual tax liability.`
        },
        {
            faqQuestion: "What are the documents required for homeloan?",
            faqAnswer: `<strong>The documents required for salaried employees are:</strong>
                        <ul class='list'>
                            <li>Copy of employment contract</li>
                            <li>Latest salary slip</li>
                            <li>Latest work permit</li>
                            <li>Bank statement for 4 months or NRE/NRO account 6 months statement</li>
                            <li>Passport/visa copy</li>
                            <li>Utility bill for address proof</li>
                            <li>PIO/OCI card</li>
                            <li>Power of Attorney (if applicable, in respective bank's format)</li>
                            <li>Customer credit check report</li>
                            <li>Property agreement duly registered or other related documents</li>
                            <li>Income tax returns for the last 2 years</li>
                        </ul>

                        <strong>The documents required for self-employed individuals are:</strong>
                        <ul class='list'>
                            <li>Balance sheets and P&L account of the company for the last 3 years</li>
                            <li>Bank account statements for the last 6 months for both company and individual</li>
                            <li>Income tax returns (3 years)</li>
                            <li>Passport/visa copy</li>
                            <li>Utility bill for address proof</li>
                            <li>PIO/OCI card</li>
                            <li>Power of Attorney (if applicable, in respective bank's format)</li>
                            <li>Credit check report</li>
                            <li>Property agreement or other related documents</li>
                        </ul>`
            },

    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        // If the clicked item is already active, deactivate it by setting the activeIndex to null
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <div>
            {/* <Header /> */}
            <div className="insideBanner">
                <picture>
                    <source
                        media="(min-width: 992px)"
                        srcSet="assets/images/banner-nri.jpg"
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet="assets/images/banner-nri-m.jpg"
                    />
                    <img
                        src="assets/images/banner-nri-m.jpg"
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
                            <li className="breadcrumb-item active">NRI Guidelines</li>
                        </ol>
                    </div>

                </div>
            </div>

            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h2 className="mb-0">Exclusive NRI Benefits</h2>
                    </div>
                    <div className="row gap-row">
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="assets/images/icons/financial-idea.svg" alt="Financial Solution" /></div>
                                <p className="mb-0 text-primary">Easy Financial Solutions</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="assets/images/icons/lease.svg" alt="Easy Lease" /></div>
                                <p className="mb-0 text-primary">Easy Lease</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="assets/images/icons/handshake.svg" alt="NRI Assistance" /></div>
                                <p className="mb-0 text-primary">Dedicated NRI Assistance (onsite)</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="assets/images/icons/customer-support-stroke.svg" alt="Customer Care Assistance" /></div>
                                <p className="mb-0 text-primary">Customer Care Assistance</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="assets/images/icons/special-offer.svg" alt="Exclusive Offers" /></div>
                                <p className="mb-0 text-primary">Exclusive Offers</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 iconBox nri-iconBox">
                            <div className="d-flex flex-column align-items-center bg-gray-gradient-box">
                                <div className="img-fluid size-md"><img src="assets/images/icons/gifts-stroke.svg" alt="Special Gifts" /></div>
                                <p className="mb-0 text-primary">Special Gifts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 padding bg-light">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h2 className="mb-0">NRI Guidelines</h2>
                    </div>
                    <div className="text-center">
                        <p className="mb-4">Star Estate simplifies real estate investments for NRIs in India by rendering a comprehensive set of facts, rules and regulations at one place.</p>
                        <ul className='list-inline'>
                            <li className='list-inline-item'>
                                <a href='mailto:info@starestate.in' className='bg-gray-gradient-box d-flex align-items-center py-2 px-3'>
                                    <i className='fa fa-envelope text-primary me-2'></i>
                                    <span>info@starestate.in</span>
                                </a>
                            </li>
                            <li className='list-inline-item'>
                                <a href='tel:07088470884' className='bg-gray-gradient-box d-flex align-items-center py-2 px-3'>
                                    <i className='fa fa-phone text-primary me-2'></i>
                                    <span>+91 70884 70884</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h2 className="mb-0">Express Your Interest</h2>
                    </div>
                    <div className="">
                        <form method="post" onSubmit={handleSubmit}>
                            <p className="status mb-0 text-warning">{successMessage}</p>
                            <div className="row gx-3 justify-content-center">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="name" className="form-label">Name<sup className="text-danger">*</sup></label>
                                    <input type="text" className="form-control" id="Name" name="Name" value={formData.Name}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="Email" className="form-label">Email<sup className="text-danger">*</sup></label>
                                    <input type="email" className="form-control" name="Email" id="Email" value={formData.Email}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Mobile<sup className="text-danger">*</sup></label>
                                    <input type="tel" className="form-control" name="phoneNumber" id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-12 mb-0">
                                    <label htmlFor="user_query" className="form-label">Message</label>
                                    <textarea className="form-control" name="user_query" id="user_query" rows="5" value={formData.user_query}
                                        onChange={handleChange}></textarea>
                                </div>
                                <div className="col-md-4 readmore">
                                    <input type="hidden" name="contact_action" value="active" />
                                    <button type="submit" className="button">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>                
            </div>

            <div className="w-100 padding bg-gray-gradient-box section-faq">
            {Faqs.length > 0 && (
                <div className="container-lg">
                    <div className="heading mx-auto text-center">
                        <h2 className="mb-0">FAQs</h2>
                    </div>
                    <div className="">
                        <div className="accordion-wrapper" id="myAccordion">
                            {Faqs.map((faq, index) => {
                                const faqIndex = index + 1;
                                const isActive = activeIndex === faqIndex;

                                return (
                                    <div className="accordion-item" key={faqIndex}>
                                        <div className="accordion-header" id={`heading${faqIndex}`}>
                                            <button
                                                className={`accordion-button ${isActive ? "" : "collapsed"}`}
                                                type="button"
                                                onClick={() => handleToggle(faqIndex)}
                                                aria-expanded={isActive ? "true" : "false"}
                                                aria-controls={`collapse${faqIndex}`}
                                            >
                                                <span className='text-primary'>Q{faqIndex}:</span> <div dangerouslySetInnerHTML={{ __html: faq.faqQuestion }} />
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                        <div
                                            id={`collapse${faqIndex}`}
                                            className={`accordion-collapse collapse ${isActive ? "show" : ""}`}
                                            aria-labelledby={`heading${faqIndex}`}
                                            data-bs-parent="#myAccordion"
                                        >
                                            <div className="accordion-body">
                                                <div className='card-body'>
                                                    <div dangerouslySetInnerHTML={{ __html: faq.faqAnswer }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}</div>

            {/* <Footer /> */}
        </div>
    )
}

export default NriGuidelines