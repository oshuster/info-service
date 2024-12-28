import express from 'express';
import { checkQueryParam } from '../middlewares/checkQueryParams.js';
import { logRequest } from '../config/logConfig.js';
import { addUuidMiddleware } from '../middlewares/addUuidMiddleware.js';
import { validateRequest } from '../middlewares/validateProfession.js';
import { searchCategoryInsuredController } from '../controllers/categoryInsuredControllers/searchCategoryInsuredController.js';
import { editCategoryInsuredController } from '../controllers/categoryInsuredControllers/editCategoryInsuredController.js';
import { deleteCategoryInsuredController } from '../controllers/categoryInsuredControllers/deleteCategoryInsuredController.js';
import { createCategoryInsuredSchema } from '../schemas/categoryInsured/createCategoryInsuredSchema.js';
import { createCategoryInsuredController } from '../controllers/categoryInsuredControllers/createCategoryInsuredController.js';
import { editCategoryInsuredSchema } from '../schemas/categoryInsured/editCategoryInsuredSchema.js';

const categoryInsuredRouter = express.Router();

categoryInsuredRouter.use(addUuidMiddleware);

categoryInsuredRouter.use(logRequest);

/**
 * @swagger
 * tags:
 *   name: Category-Insured
 *   description: API для роботи з кодами категорій застрахованої особи
 */

/**
 * @swagger
 * /category-insured/create:
 *   post:
 *     summary: Додавання категорії застрахованої особи
 *     description: Додає нову категорію застрахованої особи в базу даних.
 *     tags: [Category-Insured]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInsured'
 *           example:
 *             code: 12345
 *             name: "Категорія працівників ІТ-сфери"
 *             description: "Категорія працівників ІТ-сфери"
 *     responses:
 *       201:
 *         description: Категорію успішно створено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryInsured'
 *       400:
 *         $ref: '#/components/responses/ValidationKvedError'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

categoryInsuredRouter.post(
  '/create',
  validateRequest(createCategoryInsuredSchema),
  createCategoryInsuredController
);

/**
 * @swagger
 * /category-insured/search:
 *   get:
 *     summary: Пошук категорій застрахованих осіб
 *     description: Пошук категорій застрахованих осіб за ключовими словами.
 *     tags: [Category-Insured]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Ключове слово для пошуку
 *         example: "Працівники"
 *     responses:
 *       200:
 *         description: Успішний пошук. Повертається список категорій застрахованих осіб.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryInsured'
 *       400:
 *         $ref: '#/components/responses/ValidationKvedError'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

categoryInsuredRouter.get(
  '/search',
  checkQueryParam(['q']),
  searchCategoryInsuredController
);

/**
 * @swagger
 * /category-insured/edit:
 *   patch:
 *     summary: Редагування категорії застрахованої особи
 *     description: Оновлює існуючу категорію застрахованої особи за ID.
 *     tags: [Category-Insured]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditCategoryInsured'
 *           example:
 *             id: "48be695f-962c-49c5-9789-5fee3c6c06b3"
 *             code: 54321
 *             name: "Працівники будівельної сфери"
 *             description: "Категорія працівників ІТ-сфери"
 *     responses:
 *       200:
 *         description: Категорію успішно оновлено.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryInsured'
 *       400:
 *         $ref: '#/components/responses/ValidationKvedError'
 *       404:
 *         $ref: '#/components/responses/ObjectNotFound'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

categoryInsuredRouter.patch(
  '/edit',
  validateRequest(editCategoryInsuredSchema),
  editCategoryInsuredController
);

/**
 * @swagger
 * /category-insured/delete:
 *   delete:
 *     summary: Видалення категорії застрахованої особи
 *     description: Видаляє категорію застрахованої особи за ID.
 *     tags: [Category-Insured]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID категорії для видалення
 *         example: "48be695f-962c-49c5-9789-5fee3c6c06b0"
 *     responses:
 *       200:
 *         description: Категорію успішно видалено.
 *       404:
 *         $ref: '#/components/responses/ObjectNotFound'
 *       500:
 *         description: Внутрішня помилка сервера.
 */

categoryInsuredRouter.delete(
  '/delete',
  checkQueryParam(['id']),
  deleteCategoryInsuredController
);

export default categoryInsuredRouter;
