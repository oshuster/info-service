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
import { searchCodeIncomeController } from '../controllers/codeIncomeControllers/searchCodeIncomeController.js';
import { createCodeIncomeController } from '../controllers/codeIncomeControllers/createCodeIncomeController.js';
import { createCodeIncomeSchema } from '../schemas/codeIncome/createCodeIncomeSchema.js';
import { editCodeIncomeSchema } from '../schemas/codeIncome/editCodeIncomeSchema.js';
import { editCodeIncomeController } from '../controllers/codeIncomeControllers/editCodeIncomeController.js';
import { deleteCodeIncomeController } from '../controllers/codeIncomeControllers/deleteCodeIncomeController.js';

const codeIncomeRouter = express.Router();

codeIncomeRouter.use(addUuidMiddleware);

codeIncomeRouter.use(logRequest);

/**
 * @swagger
 * tags:
 *   name: Code-Income
 *   description: API для роботи з кодами ознаки доходів
 */

/**
 * @swagger
 * /code-income/create:
 *   post:
 *     summary: Додавання коду доходу
 *     description: Додає новий код доходу в базу даних.
 *     tags: [Code-Income]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaxObject'
 *           example:
 *             code: 12345
 *             name: "Доходи за продаж напоїв"
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

codeIncomeRouter.post(
  '/create',
  validateRequest(createCodeIncomeSchema),
  createCodeIncomeController
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

codeIncomeRouter.get(
  '/search',
  checkQueryParam(['q']),
  searchCodeIncomeController
);

/**
 * @swagger
 * /code-income/edit:
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

codeIncomeRouter.patch(
  '/edit',
  validateRequest(editCodeIncomeSchema),
  editCodeIncomeController
);

/**
 * @swagger
 * /code-income/delete:
 *   delete:
 *     summary: Видалення обʼєкту оподаткування
 *     description: Видаляє обʼєкт оподаткування за ID.
 *     tags: [Code-Income]
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

codeIncomeRouter.delete(
  '/delete',
  checkQueryParam(['id']),
  deleteCodeIncomeController
);

export default codeIncomeRouter;
