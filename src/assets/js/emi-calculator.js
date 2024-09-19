const loanAmountInput = document.querySelector(".loan_amount");
const interestRateInput = document.querySelector(".interest_rate");
const loanTenureInput = document.querySelector(".loan_tenure");

const loanEMIValue = document.querySelector("#monthly_emi .value");
const principalValue = document.querySelector("#principal_amount .value");
const totalInterestValue = document.querySelector("#interest_amount .value");
const totalAmountValue = document.querySelector("#total_amount .value");

const calculateBtn = document.querySelector("#calculate-btn");

// Convert input values into floats
let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;

let myChart;

// Validation for numbers only
const checkValues = () => {
    let loanAmountValue = loanAmountInput.value;
    let interestRateValue = interestRateInput.value;
    let loanTenureValue = loanTenureInput.value;

    let regexNumber = /^[0-9]+$/; // Regex only for numbers

    if(!loanAmountValue.match(regexNumber)){
        loanAmountInput.value = 10000;
    }

    if(!loanTenureValue.match(regexNumber)){
        loanTenureInput.value = 60;
    }

    let regexDecimalnumber = /^(\d*\.)?\d+$/; //Regex for numbers with decimal values

    if(!interestRateValue.match(regexDecimalnumber)){
        interestRateInput.value = 7.5;
    }
};
// Validation for numbers only

// Pie Chart
/* const displayChart = (totalInterestPayableValue) => {
    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Total Interest', 'Principal Loan Amount'],
            datasets: [{
                data: [totalInterestPayableValue, loanAmount],
                backgroundColor: ["#dc3545","#010844"],
                borderWidth: 0
            }]
        }
    });
};

const updateChart = (totalInterestPayableValue) => {
    myChart.data.datasets[0].data[0] = totalInterestPayableValue;
    myChart.data.datasets[0].data[1] = loanAmount;
    myChart.update();
} */
// Pie Chart

// Convert number in Indian Number Format
const changeIntoIndianNumber = (numberValue) => {
    return Intl.NumberFormat('en-IN').format(numberValue);
};
// Convert number in Indian Number Format


const calculateEMI = () => {
    checkValues();
    refreshInputValues();

    let emi = loanAmount * interest * (Math.pow(1 + interest, loanTenure)) / (Math.pow(1 + interest, loanTenure) - 1);

    return emi;
};

const updateData = (emi) => {
    loanEMIValue.innerHTML = changeIntoIndianNumber(Math.round(emi));

    // principalValue.innerHTML = loanAmount;
    principalValue.innerHTML = changeIntoIndianNumber(loanAmount);

    let totalAmount = Math.round(loanTenure * emi);
    totalAmountValue.innerHTML = changeIntoIndianNumber(totalAmount);

    let totalInterestPayable = Math.round(totalAmount - loanAmount);
    totalInterestValue.innerHTML = changeIntoIndianNumber(totalInterestPayable);

    /* if(myChart){
        updateChart(totalInterestPayable);
    } else{
        displayChart(totalInterestPayable);
    }; */
};

const refreshInputValues = () => {
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    loanTenure = parseFloat(loanTenureInput.value);
    interest = interestRate / 12 / 100;
};

const init = () => {
    let emi = calculateEMI();
    updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);

// Key press events
const triggerOnKeyDown = (pressedFields, pressedButton) => {
    pressedFields.onkeydown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            pressedButton.click();
          }
    };
};

triggerOnKeyDown(loanAmountInput, calculateBtn);
triggerOnKeyDown(loanTenureInput, calculateBtn);
triggerOnKeyDown(interestRateInput, calculateBtn);
// Key press events