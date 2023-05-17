import app from "./app";
import { logger } from "./logger";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`Server is listening on port ${PORT}.`));

process
  .on("SIGTERM", () => {
    logger.info(`Process ${process.pid} received a SIGTERM signal`);
    logger.info("Closing connections");
  })
  .on("SIGINT", (signal) => {
    logger.info(
      `Process ${process.pid} has been interrupted with signal:`,
      signal
    );
  })
  .on("unhandledRejection", (reason, p) => {
    logger.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    logger.error(err, "Uncaught Exception thrown");
  });
