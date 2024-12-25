import express from 'express';
import { logRequest } from '../config/logConfig.js';
import { checkQueryParam } from '../middlewares/checkQueryParams.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import { addUuidMiddleware } from '../middlewares/addUuidMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { checkExcelFile } from '../middlewares/checkExcelFile.js';
import { uploadKatotgController } from '../controllers/katotgControllers/uploadKatotgController.js';
import { searchKatotgController } from '../controllers/katotgControllers/searchKatotgController.js';
import { validateRequest } from '../middlewares/validateProfession.js';
import { createKatotgSchema } from '../schemas/katotg/createKatotgSchema.js';
import { createKatotgController } from '../controllers/katotgControllers/createKatotgController.js';
import { editKatotgSchema } from '../schemas/katotg/editKatotgSchema.js';
import { editKatotgController } from '../controllers/katotgControllers/editKatotgController.js';
import { IDregexp } from '../common/regexp/deleteProfesion.js';
import { checkForRegexp } from '../middlewares/checkForRegexp.js';
import { deleteKatotgController } from '../controllers/katotgControllers/deleteKatotgController.js';

const katotgRouter = express.Router();

katotgRouter.use(logRequest);

katotgRouter.use(addUuidMiddleware);

katotgRouter.use(logRequest);
/**
 * @swagger
 * tags:
 *   name: KATOTG
 *   description: Довідник КАТОТТГ
 */

/**
 * @swagger
 * /katotg/upload:
 *   post:
 *     summary: Завантаження Excel-файлу
 *     description: Завантажує Excel-файл для масового додавання обʼєктів оподаткування.
 *     tags: [KATOTG]
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
 *                 description: Excel-файл для завантаження
 *     responses:
 *       200:
 *         description: File uploaded successfully. Data will be updated within 1-15 minutes.
 *       400:
 *         description: File is missing
 *       500:
 *         description: Внутрішня помилка сервера.
 */

katotgRouter.post(
  '/upload',
  upload.single('file'),
  checkExcelFile,
  uploadKatotgController
);

/**
 * @swagger
 * /katotg/search:
 *   get:
 *     summary: Пошук КАТОТГ
 *     description: Пошук обʼєктів оподаткування за ключовими словами.
 *     tags: [KATOTG]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Ключове слово для пошуку
 *         example: "Київ"
 *     responses:
 *       200:
 *         description: Успішний пошук. Повертається список обʼєктів.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Katotg'
 *       400:
 *         $ref: '#/components/responses/ValidationKatotgError'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

katotgRouter.get('/search', checkQueryParam(['q']), searchKatotgController);

/**
 * @swagger
 * /katotg/create:
 *   post:
 *     summary: Додавання обʼєкту оподаткування
 *     description: Додає новий обʼєкт оподаткування в базу даних.
 *     tags: [KATOTG]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Katotg'
 *           example:
 *             katotg: "UA05120090012345678"
 *             dps_name: "ФЛОРІАНІВКА"
 *             adress: "село Флоріанівка Вінницька обл. Хмільницький район"
 *             dps_code: "456"
 *     responses:
 *       201:
 *         description: Обʼєкт успішно створено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Katotg'
 *       400:
 *         $ref: '#/components/responses/ValidationKatotgError'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

katotgRouter.post(
  '/create',
  validateRequest(createKatotgSchema),
  createKatotgController
);

/**
 * @swagger
 * /katotg/edit:
 *   patch:
 *     summary: Редагування обʼєкту оподаткування
 *     description: Оновлює існуючий обʼєкт оподаткування за ID.
 *     tags: [KATOTG]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Katotg'
 *           example:
 *             id: 1
 *             katotg: "UA05120090012345678"
 *             dps_name: "ФЛОРІАНІВКА"
 *             adress: "село Флоріанівка Вінницька обл. Хмільницький район"
 *             dps_code: "456"
 *     responses:
 *       200:
 *         description: Обʼєкт успішно оновлено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Katotg'
 *       400:
 *         $ref: '#/components/responses/ValidationKatotgError'
 *       404:
 *         $ref: '#/components/responses/ObjectNotFound'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

katotgRouter.patch(
  '/edit',
  validateRequest(editKatotgSchema),
  editKatotgController
);

/**
 * @swagger
 * /katotg/delete:
 *   delete:
 *     summary: Видалення обʼєкту оподаткування
 *     description: Видаляє обʼєкт оподаткування за ID.
 *     tags: [KATOTG]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID обʼєкту оподаткування для видалення
 *         example: "1"
 *     responses:
 *       200:
 *         description: Обʼєкт успішно видалено.
 *       404:
 *         $ref: '#/components/responses/ObjectNotFound'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

katotgRouter.delete(
  '/delete',
  checkQueryParam(['id']),
  checkForRegexp(IDregexp, 'id'),
  deleteKatotgController
);

export default katotgRouter;
