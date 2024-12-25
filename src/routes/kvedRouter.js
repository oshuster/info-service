import express from 'express';
import { checkQueryParam } from '../middlewares/checkQueryParams.js';
import { logRequest } from '../config/logConfig.js';
import { addUuidMiddleware } from '../middlewares/addUuidMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { checkJsonFile } from '../middlewares/checkJsonFile.js';
import { uploadKvedController } from '../controllers/kvedControllers/uploadKvedController.js';
import { searchKvedController } from '../controllers/kvedControllers/searchKvedController.js';
import { validateRequest } from '../middlewares/validateProfession.js';
import { createKvedController } from '../controllers/kvedControllers/createKvedController.js';
import { validateHtmlMiddleware } from '../middlewares/validateHtmlMiddleware.js';
import { sanitizeHtmlMiddleware } from '../middlewares/sanitizeHtmlMiddleware.js';
import { createKvedSchema } from '../schemas/kved/createKvedSchema.js';
import { editKvedSchema } from '../schemas/kved/editKvedSchema.js';
import { editKvedController } from '../controllers/kvedControllers/editKvedController.js';
import { checkForRegexp } from '../middlewares/checkForRegexp.js';
import { IDregexp } from '../common/regexp/deleteProfesion.js';
import { deleteKvedController } from '../controllers/kvedControllers/deleteKvedController.js';

const kvedRouter = express.Router();

kvedRouter.use(addUuidMiddleware);

kvedRouter.use(logRequest);

/**
 * @swagger
 * tags:
 *   name: KVED
 *   description: API для роботи з КВЕД (класифікатор видів економічної діяльності)
 */

/**
 * @swagger
 * /kved/upload:
 *   post:
 *     summary: Завантаження JSON-файлу КВЕД
 *     description: Завантажує JSON-файл для масового додавання КВЕД.
 *     tags: [KVED]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: JSON-файл для завантаження
 *     responses:
 *       200:
 *         description: File uploaded successfully. Data will be updated within 1-15 minutes.
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

kvedRouter.post(
  '/upload',
  upload.single('file'),
  checkJsonFile,
  uploadKvedController
);

/**
 * @swagger
 * /search:
 *   patch:
 *     summary: Пошук КВЕД
 *     description: Пошук КВЕД за ключовим словом.
 *     tags: [KVED]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditProfession'
 *     responses:
 *       200:
 *         description: Професія успішно оновлена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profession'
 *       400:
 *         description: Помилка валідації даних.
 *       404:
 *         description: Професія не знайдена.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

kvedRouter.get('/search', checkQueryParam(['q']), searchKvedController);

/**
 * @swagger
 * /kved/create:
 *   post:
 *     summary: Додавання КВЕД
 *     description: Додає новий КВЕД в список.
 *     tags: [KVED]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/taxObjects/Profession'
 *     responses:
 *       201:
 *         description: Обʼєкт оподаткування успішно створена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profession'
 *       400:
 *         description: Помилка валідації даних.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

kvedRouter.post(
  '/create',
  validateRequest(createKvedSchema),
  validateHtmlMiddleware,
  sanitizeHtmlMiddleware,
  createKvedController
);

/**
 * @swagger
 * /kved/edit:
 *   patch:
 *     summary: Редагування КВЕД
 *     description: Оновлює КВЕД за ID.
 *     tags: [KVED]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tax/EditProfession'
 *     responses:
 *       200:
 *         description: Професія успішно оновлена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/professions/Profession'
 *       400:
 *         description: Помилка валідації даних.
 *       404:
 *         description: Професія не знайдена.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

kvedRouter.patch(
  '/edit',
  validateRequest(editKvedSchema),
  validateHtmlMiddleware,
  sanitizeHtmlMiddleware,
  editKvedController
);

/**
 * @swagger
 * /kved/delete:
 *   delete:
 *     summary: Видалення обʼєкту оподаткування
 *     description: Видаляє обʼєкт оподаткування за ID.
 *     tags: [KVED]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID обʼєкту оподаткування для видалення
 *     responses:
 *       200:
 *         description: Обʼєкт оподаткування успішно видалено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/professions/Profession'
 *       404:
 *         description: Професія не знайдена.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

kvedRouter.delete(
  '/delete',
  checkQueryParam(['id']),
  checkForRegexp(IDregexp, 'id'),
  deleteKvedController
);

export default kvedRouter;
