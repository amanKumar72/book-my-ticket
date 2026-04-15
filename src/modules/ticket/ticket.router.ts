import express from 'express';
import { bookTicket, getSeats } from './ticket.controller';
import { isAuthenticated } from '../auth/auth.middleware';
const router = express.Router();
router.put('/book/:id', isAuthenticated, bookTicket);
router.get('/:id', isAuthenticated, getSeats);
export default router;
