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
  return (
    <div>
       {/* <Header /> */}
    <div className="insideBanner">

            <picture>
                <img src="/star-estate-react/assets/images/banner-emi-calculator1.jpg" className="h-100 object-cover object-position-bottom rounded" alt="Star Estate" />
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
    {/* <Footer /> */}
</div>
  )
}

export default EmiCalculator