import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { swaggerDocs } from './config/swaggerConfig.js';
import professionsRouter from './routes/professionsRouter.js';
import { logError } from './config/logError.js';
import { serviceLogger } from './config/logConfig.js';
import { initializeDatabase } from './services/dbServices/dbInit.js';
import taxObjectsRouter from './routes/taxObjectsRouter.js';
import katotgRouter from './routes/katotgRouter.js';
import kvedRouter from './routes/kvedRouter.js';
import codeIncomeRouter from './routes/codeIncomeRouter.js';
import categoryInsuredRouter from './routes/categoryInsuredRouter.js';

const HTTP_PORT = process.env.PORT || 3344;
const app = express();
let client;

const startServer = async () => {
  try {
    client = await initializeDatabase();

    app.use(morgan('tiny'));
    app.use(
      cors({
        origin: '*',
        methods: 'GET,POST,PUT,DELETE, PATCH',
        allowedHeaders: 'Content-Type,Authorization',
      })
    );
    app.use(express.json());

    app.use('/info-service/', (req, res, next) => {
      req.client = client;
      next();
    });

    app.use('/info-service/professions', professionsRouter);
    app.use('/info-service/tax-objects', taxObjectsRouter);
    app.use('/info-service/katotg', katotgRouter);
    app.use('/info-service/kved', kvedRouter);
    app.use('/info-service/code-income', codeIncomeRouter);
    app.use('/info-service/code-insured', categoryInsuredRouter);

    swaggerDocs(app, HTTP_PORT);

    app.use((_, res) => {
      res.status(404).json({ message: 'Route not found' });
    });

    app.use((err, req, res, next) => {
      const { status = 500, message = 'Server error' } = err;
      res.status(status).json({ message });
    });

    app.listen(HTTP_PORT, () => {
      serviceLogger.info(
        `HTTP Server is running. Use our API on port: ${HTTP_PORT}`
      );
      console.log(`HTTP Server is running. Use our API on port: ${HTTP_PORT}`);
    });
  } catch (error) {
    logError(error, null, 'Failed to start the server');
    console.error('Failed to start the server', error);
  }
};

startServer();

process.on('SIGINT', async () => {
  try {
    await client.end();
    console.log('PostgreSQL client disconnected gracefully');
    process.exit(0);
  } catch (error) {
    console.error('Error during disconnection', error);
    process.exit(1);
  }
});
