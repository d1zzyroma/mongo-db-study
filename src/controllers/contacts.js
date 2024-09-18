
import { getAllContacts, getContactsById } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
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
};

export const getContactsByIdController = async (req, res ) => {
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
};



