export interface CalculateMortgageParams {
  propertyPrice: number;
  downPayment: number;
  annualInterestRate: number;
  amortizationPeriod: number;
  paymentScheduled: "monthly" | "bi-weekly" | "accelerate-bi-weekly";
}
