import express from "express";
import { getContactsByIdController, getContactsController } from "../controllers/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/contacts", getContactsController);

contactsRouter.get("/contacts/:contactId", getContactsByIdController);

export default contactsRouter;