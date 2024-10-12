

import { createContact, deleteContactById, getAllContacts, getContactsById, updateContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { env } from "../utils/env.js";


export const getContactsController = async (req, res, next) => {
    try {
        const { page, perPage } = parsePaginationParams(req.query);
        const { sortBy, sortOrder } = parseSortParams(req.query);
        const { _id: userId } = req.user;  
        
        const contacts = await getAllContacts(userId, page, perPage, sortOrder, sortBy);

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    } catch (err) {
        next(err);
    }
};


export const getContactsByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { _id: userId } = req.user;  
        const contact = await getContactsById(contactId, userId);  

        if (!contact) {
            throw createHttpError(404, `Contact with id - ${contactId} not Found`);
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (err) {
        if (err.message.includes("Cast to ObjectId failed")) {
            err.status = 404;
        }
        next(err);
    }
};

export const deleteContactByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { _id: userId } = req.user;  

        const contact = await deleteContactById(contactId, userId);  

        if (!contact) {
            throw createHttpError(404, `Contact with id - ${contactId} not Found`);
        }

        res.status(204).send();
    } catch (err) {
        if (err.message.includes("Cast to ObjectId failed")) {
            err.status = 404;
        }
        next(err);
    }
};


export const createContactController = async (req, res) => {
    const { _id: userId } = req.user;  
    const payload = { ...req.body, userId };  

    const newContact = await createContact(payload);

    res.status(201).json({
        status:201,
        message: "Successfully created a contact!",
        data: newContact,
    }
    );
};


export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { body } = req;
    const { _id: userId } = req.user;  
    const photo = req.file;

    try {
        
        const existingContact = await getContactsById(contactId, userId);
        if (!existingContact) {
            return next(createHttpError(404, "Contact not found or you do not have permission to update this contact"));
        }

        
        const updatedContact = await updateContact(contactId, userId, body);

        if (photo) {
            let photoUrl;
            if (env('ENABLE_CLOUDINARY') === 'true') {
                photoUrl = await saveFileToCloudinary(photo);  
            } else {
                photoUrl = await saveFileToUploadDir(photo);  
            }
            updatedContact.photo = photoUrl;
        }

        res.status(200).json({
            status: 200,
            message: "Successfully patched a contact!",
            data: updatedContact,
        });

    } catch (error) {
        next(createHttpError(500, "Failed to patch the contact", { cause: error }));
    }
};





