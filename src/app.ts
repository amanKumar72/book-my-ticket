import express from 'express';
import cors from 'cors';
import authRouter from './modules/auth/auth.route'
import ApiError from './common/utils/apiError';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import ticketRouter from './modules/ticket/ticket.router';
import movieRouter from './modules/movie/movie.router';

const __dirname = dirname(fileURLToPath(import.meta.url));
// import { prisma } from "@/common/config/prisma";
// async function init() {
//     await prisma.movie.create({
//         data: {
//             name: 'Dhurandhar The Revenge',
//             description: 'Jassi ko ghar ki yaad kyu nhi aai?',
//             director: 'Dhurandar',
//             actor: 'Dhurandar',
//             duration: 230,
//         }
//     })
//     for (let i = 0; i < 100; i++) {
//         await prisma.ticket.create({
//             data: {
//                 movieId: 1,
//                 seat: i+1,
//                 isBooked: false,
//             }
//         })
//     }
// }

// init()

const app: express.Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter)
app.use('/health', (_, res) => {
    res.status(200).json({ message: 'Healthy' })
})
app.use('/ticket', ticketRouter)
app.use('/movie', movieRouter)
app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});
app.get("/login", (_req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});
app.get("/signup", (_req, res) => {
  res.sendFile(__dirname + "/views/signup.html");
});
app.get("/booking", (_req, res) => {
  res.sendFile(__dirname + "/views/booking.html");
});

app.get("/my-bookings", (_req, res) => {
  res.sendFile(__dirname + "/views/my-bookings.html");
});

app.get("/.well-known/appspecific/com.chrome.devtools.json", (_req, res) => {
  res.status(204).send();
});

app.all("{*path}", (_req, _res) => {
  throw ApiError.notFound(`Route ${_req.originalUrl} not found`);
});

app.use((err: ApiError | Error | any,  _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    error: err || null,
  });
});


export default app;
