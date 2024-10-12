// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import router from "./routers/index.js";
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const setupServer = () => {
  const app = express();
  
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(logger);
  app.use(cors());
  app.use(cookieParser());
  
  app.use(express.json());

  app.use(router);
  

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

export default setupServer;
