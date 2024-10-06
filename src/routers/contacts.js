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
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { authenticate } from '../middleware/authenticate.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
  );

contactsRouter.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactByIdController));

contactsRouter.post('/contacts', validateBody(createContactsSchema), ctrlWrapper(createContactController));

contactsRouter.patch('/contacts/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactController));

export default contactsRouter;
