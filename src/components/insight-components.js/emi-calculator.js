import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../widgets/header';
import Footer from '../widgets/footer';

function EmiCalculator() {
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [interestRate, setInterestRate] = useState(8.45);
    const [loanTenure, setLoanTenure] = useState(240);
    const [emi, setEmi] = useState('');
    const [totalInterest, setTotalInterest] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    // Helper functions
    const changeIntoIndianNumber = (numberValue) => {
        return Intl.NumberFormat('en-IN').format(numberValue);
    };

    const calculateEMI = () => {
        const interest = interestRate / 12 / 100;
        const emi = loanAmount * interest * (Math.pow(1 + interest, loanTenure)) / (Math.pow(1 + interest, loanTenure) - 1);
        return emi;
    };

    const updateData = () => {
        if (loanAmount && interestRate && loanTenure) {
            const emiValue = calculateEMI();
            const totalAmount = Math.round(loanTenure * emiValue);
            const totalInterestPayable = Math.round(totalAmount - loanAmount);

            setEmi(changeIntoIndianNumber(Math.round(emiValue)));
            setTotalAmount(changeIntoIndianNumber(totalAmount));
            setTotalInterest(changeIntoIndianNumber(totalInterestPayable));
        }
    };


    useEffect(() => {
        updateData();
    }, [loanAmount, interestRate, loanTenure]);

    const handleLoanAmountChange = (e) => {
        setLoanAmount(e.target.value);
    };

    const handleInterestRateChange = (e) => {
        setInterestRate(e.target.value);
    };

    const handleLoanTenureChange = (e) => {
        setLoanTenure(e.target.value);
    };

    const handleCalculateClick = () => {
        updateData();
    };


    const Faqs = [
        {
            faqQuestion: "What is EMI?",
            faqAnswer: "EMI is an equated monthly instalment of a fixed monetary value for every month with the inclusion of principal and interest amount."
        },
        {
            faqQuestion: "What if I miss Home loan EMI submission?",
            faqAnswer: "Firstly you must keep a sufficient account balance to avoid EMI bounce which has adverse effects on the credit score. Also, the loan borrower has to pay extra charges or late fees for not submitting the EMI on time."
        },
        {
            faqQuestion: "Does prepayment of Homeloan affect the EMI value?",
            faqAnswer: "Certainly yes, paying a lump sum or short but regular payments alongside the EMI, lowers the actual EMI value and helps in faster repayment of the loan amount."
        },
        {
            faqQuestion: "Does change in rate of interest affect homeloan EMI?",
            faqAnswer: "It depends on the type of interest rate mentioned in your loan agreement. There are two types of interest rates, one is fixed and the other is floating. For better assistance on the effect of changing interest rates, get in touch with your banker."
        },
        {
            faqQuestion: "How to calculate EMI?",
            faqAnswer: `The EMI calculation depends on the total loan amount, rate of interest, and the loan duration. EMI = [P x R x (1 + R) ^ N] / [(1+R) ^ N – 1]
                        Here:
                        P = Principal Loan Amount
                        R = Rate of Interest
                        N = Loan Tenure in Months`
        }


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
                        srcSet="assets/images/banner-emi-calculator.jpg"
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet="assets/images/banner-emi-calculator-m.jpg"
                    />
                    <img
                        src="assets/images/banner-emi-calculator-m.jpg"
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
                            <li className="breadcrumb-item active">EMI Calculator</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading">
                        <h2 className="mb-0">EMI Calculator</h2>
                    </div>
                    <h6 className="form--title">What is EMI Calculator?</h6>
                    <p className="mb-4">An EMI Calculator is an online tool to get an approximate picture of required monetary funds
                        to buy an immovable asset. It reflects the EMI value by evaluating total loan amount, rate of
                        interest, and loan tenure. It helps investors to understand the needed financial capacity to
                        make real estate investments.

                    </p>
                    <p className='mb-4'>An EMI Calculator is an ideal widget for financial planning as it renders clarity to weave a
                        peaceful future.</p>
                    <div className="form--section"></div>
                    <h6 className="form--title">What is EMI? </h6>
                    <p className="mb-4">An EMI is an equated monthly instalment a buyer is required to pay every month against the
                        purchase of an immovable asset. It is the total payable amount accumulating principal and
                        interest amount.


                    </p>
                    <div className="form--section"></div>
                    <h6 className="form--title">How to Use EMI Calculator?</h6>

                    <p className="mb-4">An EMI Calculator is easy as it shows the accurate value of the EMI to be paid by adding value
                        to the required fields. The formula for calculating the equated monthly instalment is:</p>
                    <p className='mb-4'>EMI = [P x R x (1 + R) ^ N] / [(1+R) ^ N – 1]
                    </p>
                    <p className='mb-4'>Here;

                    </p>
                    <p className='mb-4'>P = Principal Loan Amount
                    </p>
                    <p className='mb-4'>R = Rate of Interest
                    </p>
                    <p className='mb-4'>N = Loan Tenure in Months
                    </p>

                    <div className="form--section"></div>

                    <h6 className="form--title">Benefits of EMI Calculator</h6>

                    <p className='mb-4'><ul className="list mb-0"><li>An EMI Calculator is a time-saving option to find the exact loan repayment value every month. Going by the pen and paper, or the manual way of calculations is time-consuming. Whereas, an EMI Calculator fetches values in the fields to formulate a solution and reflects the EMI value.</li>
                        <li>An EMI Calculator is easy to use as investors can check for EMI payment value while on the go. Thus, a dedicated place or time is not a requirement to assess the repayment value against a property purchase.</li>
                        <li>The variable input option lets the investor select the loan amount, tenure, and rate of interest as per his/her preference.</li></ul></p>

                    <div className="form--section"></div>
                    <div className="row gap-form-row align-items-end">
                        <div className="col-md-3 form-group mb-0">
                            <label>Loan Amount</label>
                            <input type="text" className="form-control mb-0 loan_amount" value={loanAmount} onChange={handleLoanAmountChange} />
                        </div>
                        <div className="col-md-3 form-group mb-0">
                            <label>Tenure (Monthly)</label>
                            <input type="text" className="form-control mb-0 loan_tenure" value={loanTenure} onChange={handleLoanTenureChange} />
                        </div>
                        <div className="col-md-3 form-group mb-0">
                            <label>Interest Rate (% P.A.)</label>
                            <input type="text" className="form-control mb-0 interest_rate" value={interestRate} onChange={handleInterestRateChange} />
                        </div>
                        <div className="col-md-3 emiFieldContainer">
                            <div className="readmore mt-0">
                                <button type="button" id="calculate-btn" className="button" onClick={handleCalculateClick}>Calculate</button>
                            </div>
                        </div>
                    </div>
                    <div className="row gap-row padding">
                        <div className="col-md-3 emiFieldContainer">
                            <div className="inner">
                                <div className="form-group">
                                    <label>Monthly EMI</label>
                                    <div className="result text-primary" id="monthly_emi">
                                        <i className="fa-solid fa-indian-rupee-sign"></i> <span className="value h1 mb-0 font-weight-bold">{emi}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 emiFieldContainer">
                            <div className="inner">
                                <div className="form-group">
                                    <label>Principal Amount</label>
                                    <div className="result" id="principal_amount">
                                        <i className="fa-solid fa-indian-rupee-sign"></i> <span className="value h4 mb-0 font-weight-bold">{changeIntoIndianNumber(loanAmount)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 emiFieldContainer">
                            <div className="inner">
                                <div className="form-group">
                                    <label>Interest Amount</label>
                                    <div className="result" id="interest_amount">
                                        <i className="fa-solid fa-indian-rupee-sign"></i> <span className="value h4 mb-0 font-weight-bold">{totalInterest}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 emiFieldContainer">
                            <div className="inner">
                                <div className="form-group mb-0">
                                    <label>Total Amount Payable</label>
                                    <div className="result" id="total_amount">
                                        <i className="fa-solid fa-indian-rupee-sign"></i> <span className="value h4 mb-0 font-weight-bold">{totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                    const isActive = activeIndex === faqIndex; // Check if this item is active

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
                                                    <div className="card-body">
                                                        <div>{faq.faqAnswer}</div>
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

export default EmiCalculator