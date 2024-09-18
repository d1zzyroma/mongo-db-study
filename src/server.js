import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getAllContacts, getContactsById } from "./services/contacts.js";

const setupServer = () => {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    app.use(logger);
    app.use(cors());

    

    app.use((req, res) => {
        res.status(404).json({
            message: "Not Found"
        });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

export default setupServer;