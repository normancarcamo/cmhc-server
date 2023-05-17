import * as validator from "./validations";
import * as service from "./service";

import type { CalculateMortgageParams } from "./interfaces";

export const ping = () => ({ message: "pong" });

export const calculateMortgage = (mortgageParams: CalculateMortgageParams) => {
  const params = validator.calculateMortgage(mortgageParams);
  const result = service.calculateMortgage(params);
  return result;
};
