import express from 'express';
import { getMovie, getMovies } from './movie.controller';
import { isAuthenticated } from '../auth/auth.middleware';
const router = express.Router();
router.get('/:id', isAuthenticated, getMovie);
router.get('/', isAuthenticated, getMovies);
export default router;
