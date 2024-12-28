import express from 'express';
import { checkQueryParam } from '../middlewares/checkQueryParams.js';
import { logRequest } from '../config/logConfig.js';
import { addUuidMiddleware } from '../middlewares/addUuidMiddleware.js';
import { uploadTaxObjectController } from '../controllers/taxObjectControllers/uploadTaxObjectController.js';
import { validateRequest } from '../middlewares/validateProfession.js';
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
 *             $ref: '#/components/schemas/CodeIncome'
 *           example:
 *             code: 12345
 *             name: "Доходи від продажу напоїв"
 *     responses:
 *       201:
 *         description: Код доходу успішно створено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodeIncome'
 *       400:
 *         $ref: '#/components/responses/ValidationCodeIncomeError'
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
 * /code-income/search:
 *   get:
 *     summary: Пошук кодів доходів
 *     description: Пошук кодів доходів за ключовими словами.
 *     tags: [Code-Income]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Ключове слово для пошуку
 *         example: "Продаж"
 *     responses:
 *       200:
 *         description: Успішний пошук. Повертається список кодів доходів.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CodeIncome'
 *       400:
 *         $ref: '#/components/responses/ValidationCodeIncomeError'
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
 *     summary: Редагування коду доходу
 *     description: Оновлює існуючий код доходу за ID.
 *     tags: [Code-Income]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditCodeIncome'
 *           example:
 *             id: "48be695f-962c-49c5-9789-5fee3c6c06b3"
 *             code: 54321
 *             name: "Доходи від здачі в оренду майна"
 *     responses:
 *       200:
 *         description: Код доходу успішно оновлено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodeIncome'
 *       400:
 *         $ref: '#/components/responses/ValidationCodeIncomeError'
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
 *     summary: Видалення коду доходу
 *     description: Видаляє код доходу за ID.
 *     tags: [Code-Income]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID коду доходу для видалення
 *         example: "48be695f-962c-49c5-9789-5fee3c6c06b0"
 *     responses:
 *       200:
 *         description: Код доходу успішно видалено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodeIncome'
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
