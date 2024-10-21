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
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const contactsRouter = express.Router();


contactsRouter.use(authenticate);


contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactByIdController));

contactsRouter.post('/', upload.single('photo'), validateBody(createContactsSchema), ctrlWrapper(createContactController));

contactsRouter.patch('/:contactId', isValidId, upload.single('photo'), validateBody(updateContactsSchema), ctrlWrapper(patchContactController));

export default contactsRouter;
