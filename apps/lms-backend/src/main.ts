/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { APIError } from './utils/error';
import { env } from './utils/config';


const app = express();

//----------------Helmet Setup --------------

app.use(helmet());

// ------------------------- CORS Setup -------------------------
app.use(
  cors({
    origin: ['http://your-frontend-url.com'], // replace with your actual frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Support cookies
  })
);

// ------------------------- Middleware for JSON and Cookies -------------------------
app.use(express.json());
app.use(cookieParser());

// ------------------------- Testing Routes -------------------------
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Backend',
    data: null,
    isSuccess: true,
  });
});

// ------------------------- Routes -------------------------
// Add your application routes here

// ------------------------- General Error Handler -------------------------
app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  if (error instanceof APIError) {
    res.status(error.status).json({
      message: error.message,
      data: null,
      isSuccess: false,
    });
    return;
  }

  res.status(500).json({
    message: 'Something went wrong on the server',
    data: null,
    isSuccess: false,
  });
});

// Start Server
app.listen(env.PORT, () => {
  console.log(
    `Server starting at port ${env.PORT} \nhttp://${env.HOST}:${env.PORT}`
  );
});
