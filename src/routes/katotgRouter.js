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
 *   description: Класифікатор обʼєктів оподаткування
 */

/**
 * @swagger
 * /katotg/upload:
 *   patch:
 *     summary: Редагування професії
 *     description: Оновлює професію за ID.
 *     tags: [KATOTG]
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

katotgRouter.post(
  '/upload',
  upload.single('file'),
  checkExcelFile,
  uploadKatotgController
);

/**
 * @swagger
 * /katotg/search:
 *   patch:
 *     summary: Пошук КАТОТГ
 *     description: Пошук КАТОТГ за ключовим словом.
 *     tags: [KATOTG]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/katotg/EditProfession'
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

katotgRouter.get('/search', checkQueryParam(['q']), searchKatotgController);

/**
 * @swagger
 * /katotg/create:
 *   post:
 *     summary: Додавання КАТОТГ
 *     description: Додає новий КАТОТГ в список.
 *     tags: [KATOTG]
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

katotgRouter.post(
  '/create',
  validateRequest(createKatotgSchema),
  createKatotgController
);

/**
 * @swagger
 * /katotg/edit:
 *   patch:
 *     summary: Редагування КАТОТГ
 *     description: Оновлює КАТОТГ за ID.
 *     tags: [KATOTG]
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

katotgRouter.patch(
  '/edit',
  validateRequest(editKatotgSchema),
  editKatotgController
);

/**
 * @swagger
 * /katotg/delete:
 *   delete:
 *     summary: Видалення КАТОТГ
 *     description: Видаляє КАТОТГ за ID.
 *     tags: [KATOTG]
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

katotgRouter.delete(
  '/delete',
  checkQueryParam(['id']),
  checkForRegexp(IDregexp, 'id'),
  deleteKatotgController
);

export default katotgRouter;
