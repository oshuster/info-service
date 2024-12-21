import express from 'express';
import { logRequest } from '../config/logConfig.js';
import { checkQueryParam } from '../helpers/checkQueryParams.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import { katotgController } from '../controllers/katotgControllers/katotgController.js';

const katotgRouter = express.Router();

katotgRouter.use(logRequest);

katotgRouter.get(
  '/katotg/search',
  checkQueryParam(['q']),
  ctrlWrapper(katotgController)
);

export default katotgRouter;
