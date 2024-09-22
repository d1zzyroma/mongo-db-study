import createHttpError from "http-errors";
import { contactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const contacts = await contactsCollection.find();
    return contacts;
};

export const getContactsById = async (contactId) => {
    const contact = await contactsCollection.findById(contactId);
    return contact;
};

export const deleteContactById = async (id) => {
    await contactsCollection.findByIdAndDelete(id);
};

export const createContact = async (payload) => {
    return await contactsCollection.create(payload);
};

export const updateContact = async(id, payload) => {
    const contact =  await contactsCollection.findByIdAndUpdate(id, payload);

    if(!contact){
        throw createHttpError(404, `Contact with id - ${id} not Found`);
    }

    return contact;
};