import express from 'express';
import { logRequest } from '../config/logConfig.js';
import { checkQueryParam } from '../helpers/checkQueryParams.js';
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
 * /search:
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
 *         description: Помилка валідації даних.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

professionsRouter.get(
  '/professions/search',
  checkQueryParam(['q']),
  ctrlWrapper(profController)
);

/**
 * @swagger
 * /create:
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
 *     responses:
 *       201:
 *         description: Професія успішно створена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profession'
 *       400:
 *         description: Помилка валідації даних.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

professionsRouter.post(
  '/professions/create',
  validateRequest(createProfessionSchema),
  ctrlWrapper(createProfController)
);

/**
 * @swagger
 * /delete:
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
 *     responses:
 *       200:
 *         description: Професія успішно видалена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/professions/Profession'
 *       404:
 *         description: Професія не знайдена.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

professionsRouter.delete(
  '/professions/delete',
  checkQueryParam(['id']),
  ctrlWrapper(deleteProfController)
);

/**
 * @swagger
 * /edit:
 *   patch:
 *     summary: Редагування професії
 *     description: Оновлює професію за ID.
 *     tags: [Professions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/professions/EditProfession'
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

professionsRouter.patch(
  '/professions/edit',
  validateRequest(editProfessionSchema),
  ctrlWrapper(editProfController)
);

/**
 * @swagger
 * /upload:
 *   patch:
 *     summary: Редагування професії
 *     description: Оновлює професію за ID.
 *     tags: [Professions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/professions/EditProfession'
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

professionsRouter.post(
  '/professions/upload',
  upload.single('file'),
  checkExcelFile,
  uploadProfController
);

export default professionsRouter;
