import express from 'express';
import { checkQueryParam } from '../middlewares/checkQueryParams.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import { logRequest } from '../config/logConfig.js';
import { searchTaxObjectController } from '../controllers/taxObjectControllers/searchTaxObjectController.js';
import { addUuidMiddleware } from '../middlewares/addUuidMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { checkJsonFile } from '../middlewares/checkJsonFile.js';
import { uploadKvedController } from '../controllers/kvedControllers/uploadKvedController.js';

const kvedRouter = express.Router();

kvedRouter.use(addUuidMiddleware);

kvedRouter.use(logRequest);

/**
 * @swagger
 * tags:
 *   name: KVED
 *   description: Класифікатор обʼєктів оподаткування
 */

/**
 * @swagger
 * /kved/upload:
 *   patch:
 *     summary: Редагування професії
 *     description: Оновлює професію за ID.
 *     tags: [KVED]
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

kvedRouter.post(
  '/upload',
  upload.single('file'),
  checkJsonFile,
  uploadKvedController
);

/**
 * @swagger
 * /search:
 *   patch:
 *     summary: Редагування професії
 *     description: Оновлює професію за ID.
 *     tags: [KVED]
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

kvedRouter.get(
  '/search',
  checkQueryParam(['q']),
  ctrlWrapper(searchTaxObjectController)
);

export default kvedRouter;
