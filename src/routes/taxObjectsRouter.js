import express from 'express';
import { checkQueryParam } from '../middlewares/checkQueryParams.js';
import { logRequest } from '../config/logConfig.js';
import { searchTaxObjectController } from '../controllers/taxObjectControllers/searchTaxObjectController.js';
import { addUuidMiddleware } from '../middlewares/addUuidMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { checkExcelFile } from '../middlewares/checkExcelFile.js';
import { uploadTaxObjectController } from '../controllers/taxObjectControllers/uploadTaxObjectController.js';
import { validateRequest } from '../middlewares/validateProfession.js';
import { createTaxObjectController } from '../controllers/taxObjectControllers/createTaxObjectController.js';
import { createTaxObjectSchema } from '../schemas/taxObjects/createTaxObjectSchema.js';
import { editTaxObjectSchema } from '../schemas/taxObjects/editTaxObjectSchema.js';
import { editTaxObjectController } from '../controllers/taxObjectControllers/editTaxObjectController.js';
import { checkForRegexp } from '../middlewares/checkForRegexp.js';
import { IDregexp } from '../common/regexp/deleteProfesion.js';
import { deleteTaxObjectController } from '../controllers/taxObjectControllers/deleteTaxObjectController.js';

const taxObjectsRouter = express.Router();

taxObjectsRouter.use(addUuidMiddleware);

taxObjectsRouter.use(logRequest);

/**
 * @swagger
 * tags:
 *   name: Tax-Objects
 *   description: API для роботи з класифікатором обʼєктів оподаткування
 */

/**
 * @swagger
 * /tax-objects/upload:
 *   post:
 *     summary: Завантаження Excel-файлу
 *     description: Завантажує Excel-файл для масового додавання обʼєктів оподаткування.
 *     tags: [Tax-Objects]
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
 *         description: Missing file
 *       500:
 *         description: Внутрішня помилка сервера.
 */

taxObjectsRouter.post(
  '/upload',
  upload.single('file'),
  checkExcelFile,
  uploadTaxObjectController
);

/**
 * @swagger
 * /tax-objects/create:
 *   post:
 *     summary: Додавання обʼєкту оподаткування
 *     description: Додає новий обʼєкт оподаткування в базу даних.
 *     tags: [Tax-Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaxObject'
 *           example:
 *             code: "123456"
 *             name: "Адміністративний будинок"
 *     responses:
 *       201:
 *         description: Обʼєкт успішно створено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaxObject'
 *       400:
 *         $ref: '#/components/responses/ValidationTypeObjectsError'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

taxObjectsRouter.post(
  '/create',
  validateRequest(createTaxObjectSchema),
  createTaxObjectController
);

/**
 * @swagger
 * /tax-objects/search:
 *   get:
 *     summary: Пошук обʼєкту оподаткування
 *     description: Пошук обʼєктів оподаткування за ключовими словами.
 *     tags: [Tax-Objects]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Ключове слово для пошуку
 *         example: "Будинок"
 *     responses:
 *       200:
 *         description: Успішний пошук. Повертається список обʼєктів.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaxObject'
 *       400:
 *         $ref: '#/components/responses/ValidationTaxObjectsError'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

taxObjectsRouter.get(
  '/search',
  checkQueryParam(['q']),
  searchTaxObjectController
);

/**
 * @swagger
 * /tax-objects/edit:
 *   patch:
 *     summary: Редагування обʼєкту оподаткування
 *     description: Оновлює обʼєкт оподаткування за ID.
 *     tags: [Tax-Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditTaxObject'
 *           example:
 *             id: 1
 *             code: "654321"
 *             name: "Житловий будинок"
 *     responses:
 *       200:
 *         description: Обʼєкт успішно оновлено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaxObject'
 *       400:
 *         $ref: '#/components/responses/ValidationTypeObjectsError'
 *       404:
 *         $ref: '#/components/responses/ObjectNotFound'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

taxObjectsRouter.patch(
  '/edit',
  validateRequest(editTaxObjectSchema),
  editTaxObjectController
);

/**
 * @swagger
 * /tax-objects/delete:
 *   delete:
 *     summary: Видалення обʼєкту оподаткування
 *     description: Видаляє обʼєкт оподаткування за ID.
 *     tags: [Tax-Objects]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID обʼєкту оподаткування для видалення
 *         example: 1
 *     responses:
 *       200:
 *         description: Обʼєкт успішно видалено.
 *       404:
 *         $ref: '#/components/responses/ObjectNotFound'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

taxObjectsRouter.delete(
  '/delete',
  checkQueryParam(['id']),
  checkForRegexp(IDregexp, 'id'),
  deleteTaxObjectController
);

export default taxObjectsRouter;
