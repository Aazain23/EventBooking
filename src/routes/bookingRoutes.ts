import { Router } from 'express';
import { createBooking, cancelBooking, printTicket } from '../controllers/bookingController';

const router = Router();

router.post('/', createBooking);
router.delete('/:id', cancelBooking);
router.post('/print-ticket', printTicket);

export default router;
