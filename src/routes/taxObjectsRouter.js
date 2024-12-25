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
 *   description: Класифікатор обʼєктів оподаткування
 */

/**
 * @swagger
 * /tax-objects/upload:
 *   patch:
 *     summary: Редагування професії
 *     description: Оновлює професію за ID.
 *     tags: [Tax-Objects]
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
 *     description: Додає новий обʼєкт оподаткування в список.
 *     tags: [Tax-Objects]
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

taxObjectsRouter.post(
  '/create',
  validateRequest(createTaxObjectSchema),
  createTaxObjectController
);

/**
 * @swagger
 * /tax-object/search:
 *   patch:
 *     summary: Пошук обʼєкту оподаткування
 *     description: Пошук обʼєкту оподаткування за пошуковим словом.
 *     tags: [Tax-Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/taxObjects/EditTaxObject'
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

taxObjectsRouter.get(
  '/search',
  checkQueryParam(['q']),
  searchTaxObjectController
);

/**
 * @swagger
 * /tax-object/edit:
 *   patch:
 *     summary: Редагування обʼєкту оподаткування
 *     description: Оновлює обʼєкт оподаткування за ID.
 *     tags: [Tax-Objects]
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

taxObjectsRouter.patch(
  '/edit',
  validateRequest(editTaxObjectSchema),
  editTaxObjectController
);

/**
 * @swagger
 * /delete:
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

taxObjectsRouter.delete(
  '/delete',
  checkQueryParam(['id']),
  checkForRegexp(IDregexp, 'id'),
  deleteTaxObjectController
);

export default taxObjectsRouter;
