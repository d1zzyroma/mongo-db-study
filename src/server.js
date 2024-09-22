import express from "express";
import cors from "cors";
import pino from "pino-http";

import contactsRouter from "./routers/contacts.js";

const setupServer = () => {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    app.use(logger);
    app.use(cors());

    app.use(contactsRouter);

    app.use('*', (req, res, next) => {
        res.status(404).json({
          message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err.message,
        });
      });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

export default setupServer;