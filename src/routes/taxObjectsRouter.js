import express from 'express';
import { checkQueryParam } from '../helpers/checkQueryParams.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import { logRequest } from '../config/logConfig.js';
import { searchTaxObjectController } from '../controllers/taxObjectControllers/searchTaxObjectController.js';
import { addUuidMiddleware } from '../middlewares/addUuidMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { checkExcelFile } from '../middlewares/checkExcelFile.js';
import { uploadTaxObjectController } from '../controllers/taxObjectControllers/uploadTaxObjectController.js';

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
  '/tax-objects/upload',
  upload.single('file'),
  checkExcelFile,
  uploadTaxObjectController
);

/**
 * @swagger
 * /search:
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

taxObjectsRouter.get(
  '/tax-objects/search',
  checkQueryParam(['q']),
  ctrlWrapper(searchTaxObjectController)
);

export default taxObjectsRouter;
