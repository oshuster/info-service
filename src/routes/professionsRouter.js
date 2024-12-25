import express from 'express';
import { logRequest } from '../config/logConfig.js';
import { checkQueryParam } from '../middlewares/checkQueryParams.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import { addUuidMiddleware } from '../middlewares/addUuidMiddleware.js';
import { validateRequest } from '../middlewares/validateProfession.js';
import { editProfController } from '../controllers/professionsControlers/editProfController.js';
import { profController } from '../controllers/professionsControlers/searchProfController.js';
import { createProfController } from '../controllers/professionsControlers/createProfController.js';
import { deleteProfController } from '../controllers/professionsControlers/deleteProfController.js';
import { uploadProfController } from '../controllers/professionsControlers/uploadProfController.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { checkExcelFile } from '../middlewares/checkExcelFile.js';
import { createProfessionSchema } from '../schemas/professions/createSchema.js';
import { editProfessionSchema } from '../schemas/professions/editSchema.js';
import { IDregexp } from '../common/regexp/deleteProfesion.js';
import { checkForRegexp } from '../middlewares/checkForRegexp.js';

const professionsRouter = express.Router();

professionsRouter.use(addUuidMiddleware);

professionsRouter.use(logRequest);

/**
 * @swagger
 * tags:
 *   name: Professions
 *   description: Операції з професіями
 */

/**
 * @swagger
 * /professions/search:
 *   get:
 *     summary: Пошук професій
 *     description: Повертає список професій на основі запиту.
 *     tags: [Professions]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Пошуковий запит для назви або коду професії
 *         example: "інженер"
 *     responses:
 *       200:
 *         description: Успішний запит. Повертається список професій.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/professions/Profession'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

professionsRouter.get('/search', checkQueryParam(['q']), profController);

/**
 * @swagger
 * /professions/create:
 *   post:
 *     summary: Додавання професії
 *     description: Додає нову професію в список.
 *     tags: [Professions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/professions/Profession'
 *           example:
 *             code_kp: "1234"
 *             name: "Інженер"
 *     responses:
 *       201:
 *         description: Професія успішно створена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profession'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

professionsRouter.post(
  '/create',
  validateRequest(createProfessionSchema),
  createProfController
);

/**
 * @swagger
 * /professions/delete:
 *   delete:
 *     summary: Видалення професії
 *     description: Видаляє професію за ID.
 *     tags: [Professions]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID професії для видалення
 *         example: "1"
 *     responses:
 *       200:
 *         description: Професія успішно видалена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profession'
 *       404:
 *         $ref: '#/components/responses/ProfessionNotFound'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

professionsRouter.delete(
  '/delete',
  checkQueryParam(['id']),
  checkForRegexp(IDregexp, 'id'),
  deleteProfController
);

/**
 * @swagger
 * /professions/edit:
 *   patch:
 *     summary: Редагування професії
 *     description: Оновлює професію за ID.
 *     tags: [Professions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profession'
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

professionsRouter.patch(
  '/edit',
  validateRequest(editProfessionSchema),
  editProfController
);

/**
 * @swagger
 * /professions/upload:
 *   post:
 *     summary: Завантаження Excel файлу професій
 *     description: Завантажує Excel файл для масового додавання професій.
 *     tags: [Professions]
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
 *                 description: Excel файл для завантаження
 *     responses:
 *       200:
 *         description: File uploaded successfully. Data will be updated within 1-15 minutes.
 *       400:
 *        description: The file is not in Excel format (.xls or .xlsx)
 *       500:
 *         description: Error loading file in profController.
 */

professionsRouter.post(
  '/upload',
  upload.single('file'),
  checkExcelFile,
  uploadProfController
);

export default professionsRouter;
