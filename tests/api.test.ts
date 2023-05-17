import supertest from "supertest";

import app from "../src/app";
import { ErrorInfo } from "../src/error";

describe("API testing", () => {
  describe("/api/v1/ping", () => {
    it("should return 'pong'", async () => {
      // When:
      const res = await supertest(app).get("/api/v1/ping");

      // Then:
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual("pong");
    });
  });
  describe("/api/v1/calculate-mortgage", () => {
    const getFakeDataFactory = () => ({
      propertyPrice: "300000",
      downPayment: "30000",
      annualInterestRate: "10",
      amortizationPeriod: "25",
      paymentScheduled: "monthly",
    });
    it("should return monthly payment when valid data is sent", async () => {
      // Given:
      const data = getFakeDataFactory();

      // When:
      const res = await supertest(app)
        .post("/api/v1/calculate-mortgage")
        .send(data);

      // then:
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("payment");
      expect(res.body.payment.monthlyPayment).toBeDefined();
    });
    it("should return error when invalid data is sent", async () => {
      // Given:
      const data = getFakeDataFactory();
      data.downPayment = "$#%$%%";

      // When:
      const result = await supertest(app)
        .post("/api/v1/calculate-mortgage")
        .send(data);

      // Then:
      expect(result.body).toMatchObject(ErrorInfo.INVALID_INPUT);
    });
    it("should return error when down payment is too little", async () => {
      // Given:
      const data = getFakeDataFactory();
      data.downPayment = "1000";

      // When:
      const result = await supertest(app)
        .post("/api/v1/calculate-mortgage")
        .send(data);

      // Then:
      expect(result.body).toMatchObject(ErrorInfo.INVALID_INPUT);
    });
  });
});
