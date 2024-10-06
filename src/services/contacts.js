import createHttpError from "http-errors";
import { contactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from "../constants/index.js";

export const getAllContacts = async (userId, page, perPage, sortOrder = SORT_ORDER.ASC, sortBy = '_id') => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = contactsCollection
        .find({ userId })  
        .sort({ [sortBy]: sortOrder === SORT_ORDER.ASC ? 1 : -1 });

    const contactsCount = await contactsQuery.clone().countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};




export const getContactsById = async (contactId, userId) => {
    const contact = await contactsCollection.findOne({ _id: contactId, userId });  
    return contact;
};


export const deleteContactById = async (contactId, userId) => {
    const deletedContact = await contactsCollection.findOneAndDelete({ _id: contactId, userId });  
    
    if (!deletedContact) {
        throw createHttpError(404, `Contact with id - ${contactId} not Found`);
    }
    
    return deletedContact;
};


export const createContact = async (payload) => {
    return await contactsCollection.create(payload);
};


export const updateContact = async (contactId, userId, payload) => {
    const contact = await contactsCollection.findOneAndUpdate({ _id: contactId, userId }, payload, { new: true });  
    if (!contact) {
        throw createHttpError(404, `Contact with id - ${contactId} not Found`);
    }

    return contact;
};
