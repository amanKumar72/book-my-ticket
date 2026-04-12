import express from 'express';
import cors from 'cors';
import authRouter from './modules/auth/auth.route'
import ApiError from './common/utils/apiError';

const app: express.Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter)
app.use('/health', (_, res) => {
    res.status(200).json({ message: 'Healthy' })
})
app.use((err: ApiError | Error | any,  req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    error: err || null,
  });
});

app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

export default app;
