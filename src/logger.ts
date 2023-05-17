import pino from "pino";

export const logger = pino({
  name: "mortgage-calculator-api",
  enabled: true,
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
