import type { CalculateMortgageParams } from "./interfaces";

const getPremiumPercentage = (percentage = 0) => {
  if (percentage === 0) return 0.0;
  if (percentage <= 65) return 0.6;
  if (percentage <= 75) return 1.7;
  if (percentage <= 80) return 2.4;
  if (percentage <= 85) return 2.8;
  if (percentage <= 90) return 3.1;
  return 4.0;
};

const getCMHCInsurance = (downPaymentPercentage = 0, mortgageAmount = 0) => {
  if (downPaymentPercentage === 0) {
    return 0;
  }

  if (downPaymentPercentage < 20) {
    const downPaymentPercentageLoan = 100 - downPaymentPercentage;
    const premiumPercentage = getPremiumPercentage(downPaymentPercentageLoan);
    return mortgageAmount * (premiumPercentage / 100);
  }

  return 0;
};

const getMonthlyPaymentInfo = (principal = 0, rate = 0, loanTerm = 0) => {
  // monthly interest rate
  const r = rate / 100 / 12;

  // number of payments months
  const n = loanTerm * 12;

  // monthly payment
  const m = +((principal * r * (1 + r) ** n) / ((1 + r) ** n - 1)).toFixed(2);

  // totals $
  const totalOfPayments = +(m * n).toFixed(2);
  const totalOfInterests = +(totalOfPayments - principal).toFixed(2);

  return {
    interestRate: r,
    months: n,
    monthlyPayment: m,
    totalOfPayments,
    totalOfInterests,
  };
};

const getMinimumDownPayment = (propertyPrice = 0) => {
  let percentage = 0,
    value = 0;

  if (propertyPrice <= 500000) {
    percentage = 5;
    value = (5 / 100) * propertyPrice;
  } else if (propertyPrice <= 999999) {
    // 5% as minimum down payment of the first 500,000
    const first500000 = (5 / 100) * 500000;
    // and 10% of the remaining amount.
    const remainingPortion = (10 / 100) * (propertyPrice - 500000);
    percentage = 10;
    value = first500000 + remainingPortion;
  } else {
    percentage = 20;
    value = (20 / 100) * propertyPrice;
  }

  return { percentage, value };
};

export const calculateMortgage = (params: CalculateMortgageParams) => {
  const minimumDownPayment = getMinimumDownPayment(params.propertyPrice);

  const downPaymentPercentage =
    (params.downPayment / params.propertyPrice) * 100;

  const mortgageAmount = params.propertyPrice - params.downPayment;

  const cmhc = { insurance: 0, mortgageAmount: 0, payment: {} };
  cmhc.insurance = getCMHCInsurance(downPaymentPercentage, mortgageAmount);
  cmhc.mortgageAmount = mortgageAmount + cmhc.insurance;
  cmhc.payment = getMonthlyPaymentInfo(
    cmhc.mortgageAmount,
    params.annualInterestRate,
    params.amortizationPeriod
  );

  const payment = getMonthlyPaymentInfo(
    mortgageAmount,
    params.annualInterestRate,
    params.amortizationPeriod
  );

  return {
    params,
    minimumDownPayment,
    mortgageAmount,
    payment,
    cmhc,
  };
};
