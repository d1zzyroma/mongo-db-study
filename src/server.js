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

    app.get("/contacts", async (req, res) => {
        try {
            const contacts = await getAllContacts();

            res.status(200).json({
                status: 200,
                message: "Successfully found contacts!",
                data: contacts
            });
        } catch (error) {
            res.status(500).json({
                message: "Error fetching contacts",
                error: error.message
            });
        }
    });

    app.get("/contacts/:contactId", async (req, res) => {
        try {
            const { contactId } = req.params;

            const contact = await getContactsById(contactId);

            if (!contact) {
                res.status(404).json({
                    message: "Contact not found"
                });
                return;
            }

            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data: contact,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error fetching contact",
                error: error.message
            });
        }
    });

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
