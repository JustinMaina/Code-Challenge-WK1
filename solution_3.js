// Constants for tax rates and deductions
const KRA_TAX_RATES = {
    0: { rebate: 0, upper_limit: 12298, rate: 10 },
    12299: { rebate: 1229.80, upper_limit: 23885, rate: 15 },
    23886: { rebate: 2162.80, upper_limit: 35472, rate: 20 },
    35473: { rebate: 4296.20, upper_limit: 47159, rate: 25 },
    47160: { rebate: 6223.20, upper_limit: Infinity, rate: 30 }
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
    35000: 1000,
    40000: 1100,
    45000: 1200,
    50000: 1300,
    60000: 1400,
    70000: 1500,
    80000: 1600,
    90000: 1700,
    100000: 1800
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
    const totalIncome = basicSalary + benefits;
    const paye = calculatePaye(totalIncome);
    const nhif = calculateNhif(totalIncome);
    const [nssfEmployee, nssfEmployer] = calculateNssf(basicSalary);
    const grossSalary = totalIncome - paye - nhif - nssfEmployee;
    const netSalary = grossSalary - nssfEmployer;
    return {
        'Gross Salary': grossSalary,
        'PAYE': paye,
        'NHIF Deductions': nhif,
        'NSSF Deductions (Employee)': nssfEmployee,
        'NSSF Deductions (Employer)': nssfEmployer,
        'Net Salary': netSalary
    };
}

