const prompt=require('prompt-sync')({sigint:true})
// Constants for tax rates and deductions
const KRA_TAX_RATES = {
    0: { rebate: 0, upper_limit: 12298, rate: 10 },
    12299: { rebate: 1229.80, upper_limit: 23885, rate: 25 },
    23886: { rebate: 2162.80, upper_limit: 35472, rate: 30 },
    35473: { rebate: 4296.20, upper_limit: 47159, rate: 32.5 },
    47160: { rebate: 6223.20, upper_limit: Infinity, rate: 35 }
};

const NHIF_RATES = {
    0: 150,
    6000: 300,
    8000: 400,
    12000: 500,
    15000: 600,
    20000: 750,
    25000: 850,
    30000: 900,
    35000: 950,
    40000: 1000,
    45000: 1100,
    50000: 1200,
    60000: 1300,
    70000: 1400,
    80000: 1500,
    90000: 1600,
    100000: 1700
};

const NSSF_EMPLOYEE_RATE = 0.06;
const NSSF_EMPLOYER_RATE = 0.06;

// Function to calculate PAYE (tax) based on income
function calculatePaye(income) {
    for (const lowerLimit in KRA_TAX_RATES) {
        const { rebate, upper_limit, rate } = KRA_TAX_RATES[lowerLimit];
        if (income <= upper_limit) {
            const tax = (income - lowerLimit) * (rate / 100) - rebate;
            return Math.max(tax, 0);
        }
    }
}

// Function to calculate NHIF deductions based on income
function calculateNhif(income) {
    for (const lowerLimit in NHIF_RATES) {
        if (income <= lowerLimit) {
            return NHIF_RATES[lowerLimit];
        }
        else if(income>100000){
            return 1700
        }
    }
}

// Function to calculate NSSF deductions based on income
function calculateNssf(income) {
    const employeeContribution = Math.min(200, income * NSSF_EMPLOYEE_RATE);
    const employerContribution = Math.min(200, income * NSSF_EMPLOYER_RATE);
    return [employeeContribution, employerContribution];
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits = 0) {
    const grossSalary= basicSalary + benefits;
    const paye = calculatePaye(grossSalary);
    const nhif = calculateNhif(grossSalary);
    const [nssfEmployee, nssfEmployer] = calculateNssf(basicSalary);
    const netSalary = grossSalary - paye - nhif - nssfEmployee - benefits;
    
    return {
        'Gross Salary': grossSalary,
        'PAYE': paye,
        'NHIF Deductions': nhif,
        'NSSF Deductions (Employee)': nssfEmployee,
        'NSSF Deductions (Employer)': nssfEmployer,
        'Net Salary': netSalary
    };
}
const basicSalary=parseInt(prompt("Enter basic salary: "))
const benefits=parseInt(prompt("Enter benefits: "))
console.log(calculateNetSalary(basicSalary,benefits))
