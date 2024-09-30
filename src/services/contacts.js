import createHttpError from "http-errors";
import { contactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from "../constants/index.js";

export const getAllContacts = async (page, perPage, sortOrder = SORT_ORDER.ASC, sortBy = '_id') => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = contactsCollection.find().sort({ [sortBy]: sortOrder === SORT_ORDER.ASC ? 1 : -1 });

    const contactsCount = await contactsQuery.clone().countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};



export const getContactsById = async (contactId) => {
    const contact = await contactsCollection.findById(contactId);
    return contact;
};

export const deleteContactById = async (id) => {
    const deletedContact = await contactsCollection.findByIdAndDelete(id);
    
    if (!deletedContact) {
        throw createHttpError(404, `Contact with id - ${id} not Found`);
    }
    
    return deletedContact;
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