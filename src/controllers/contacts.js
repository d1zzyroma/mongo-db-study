
import { getAllContacts, getContactsById } from "../services/contacts.js";

export const getContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts
        });
    } catch (error) {
        next(error);
    }
};

export const getContactsByIdController = async (req, res, next ) => {
    try {
        const { contactId } = req.params;

        const contact = await getContactsById(contactId);

        if (!contact) {
            next(new Error("Contact not found"));
            return;
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};



