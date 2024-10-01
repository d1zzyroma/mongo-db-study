import express from 'express';
import { 
    getContactsController, 
    getContactsByIdController, 
    deleteContactByIdController, 
    createContactController, 
    patchContactController 
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middleware/isValidId.js';

import { validateBody } from '../middleware/validateBody.js';
import { createContactsSchema, updateContactsSchema } from '../validation/contacts.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactByIdController));

router.post('/contacts', validateBody(createContactsSchema), ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactController));

export default router;
