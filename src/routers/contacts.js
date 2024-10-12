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

// Для захисту всіх маршрутів перед кожним запитом
contactsRouter.use(authenticate);

// Отримати всі контакти
contactsRouter.get('/', ctrlWrapper(getContactsController));

// Отримати контакт за ID
contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

// Видалити контакт за ID
contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactByIdController));

// Створити новий контакт
contactsRouter.post('/', upload.single('photo'), validateBody(createContactsSchema), ctrlWrapper(createContactController));

// Частково оновити контакт за ID
contactsRouter.patch('/:contactId', isValidId, upload.single('photo'), validateBody(updateContactsSchema), ctrlWrapper(patchContactController));

export default contactsRouter;
