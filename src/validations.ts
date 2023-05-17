import { z } from "zod";

import type { CalculateMortgageParams } from "./interfaces";
import { CustomError, ErrorInfo } from "./error";

const numeric = z
  .string()
  .superRefine((val, ctx) => {
    // If the value cannot be parsed, we throw an error.
    if (isNaN(Number(val))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid value",
      });
    }
  })
  .transform((v) => Number(v));

const calculateMortgageSchema = z
  .object({
    propertyPrice: numeric,
    downPayment: numeric,
    annualInterestRate: numeric,
    amortizationPeriod: numeric,
    paymentScheduled: z.enum(["monthly", "bi-weekly", "accelerate-bi-weekly"]),
  })
  .superRefine((val, ctx) => {
    // If the down payment is lower than 5%, then we throw an error.
    const downPaymentPercentage = +(
      (val.downPayment / val.propertyPrice) *
      100
    ).toFixed(2);
    if (downPaymentPercentage < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Down payment too little",
      });
    }
  });

export const calculateMortgage = (mortgageParams: CalculateMortgageParams) => {
  try {
    return calculateMortgageSchema.parse(mortgageParams);
  } catch (error) {
    const additionalInfo = (error as z.ZodError).issues[0].message;
    throw CustomError.handle(ErrorInfo.INVALID_INPUT, additionalInfo);
  }
};
