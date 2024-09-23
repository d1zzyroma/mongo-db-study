
import { createContact, deleteContactById, getAllContacts, getContactsById, updateContact } from "../services/contacts.js";
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {

    try{
        const contacts = await getAllContacts();
        res.status(200).json({
          status: 200,
          message: "Successfully found contacts!",
          data: contacts,
        });
    }catch(err){
        next(err);
    }

};

export const getContactsByIdController = async (req, res, next) => {
    try{
        const { contactId } = req.params;
        const contact = await getContactsById(contactId);
      
        if (!contact) {
            throw createHttpError(404, `Contact with id - ${contactId} not Found`);
        }
      
        res.status(200).json({
          status: 200,
          message: `Successfully found contact with id ${contactId}!`,
          data: contact,
        });
    }catch(err){
        if(err.message.includes("Cast to ObjectId failed")){
            err.status = 404;
        }
        next(err);
    }

};

export const deleteContactByIdController = async (req, res, next) => {
    try{
        const { contactId } = req.params;

        await deleteContactById(contactId);
        res.status(204).send();

    }catch(err){
        if(err.message.includes("Cast to ObjectId failed")){
            err.status = 404;
        }
        next(err);
    }
};

export const createContactController = async(req, res) => {
    
    const contacts = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created contact!",
        data: contacts,
      });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const { body } = req;

    const contacts = await updateContact( contactId, body);
    
    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: contacts,
    });
};