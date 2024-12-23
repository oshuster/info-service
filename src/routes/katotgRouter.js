import express from 'express';
import { logRequest } from '../config/logConfig.js';
import { checkQueryParam } from '../helpers/checkQueryParams.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import { addUuidMiddleware } from '../middlewares/addUuidMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { checkExcelFile } from '../middlewares/checkExcelFile.js';
import { uploadKatotgController } from '../controllers/katotgControllers/uploadKatotgController.js';
import { searchKatotgController } from '../controllers/katotgControllers/searchKatotgController.js';

const katotgRouter = express.Router();

katotgRouter.use(logRequest);

katotgRouter.use(addUuidMiddleware);

katotgRouter.use(logRequest);
/**
 * @swagger
 * tags:
 *   name: Tax-Objects
 *   description: Класифікатор обʼєктів оподаткування
 */

/**
 * @swagger
 * /katotg/upload:
 *   patch:
 *     summary: Редагування професії
 *     description: Оновлює професію за ID.
 *     tags: [Professions]
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
  '/katotg/upload',
  upload.single('file'),
  checkExcelFile,
  uploadKatotgController
);

katotgRouter.get(
  '/katotg/search',
  checkQueryParam(['q']),
  ctrlWrapper(searchKatotgController)
);

export default katotgRouter;
