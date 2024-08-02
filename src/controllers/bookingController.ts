import { Request, Response } from 'express';
import Booking from '../models/booking';
import Event from '../models/event';

export const createBooking = async (req: Request, res: Response) => {
  const { userId, eventId, quantity } = req.body;

  if (quantity > 15) {
    return res.status(400).json({ message: 'Cannot book more than 15 tickets in one request' });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.bookedTickets + quantity > event.totalTickets) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const booking = new Booking({ userId, eventId, quantity });
    event.bookedTickets += quantity;
    await event.save();
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const event = await Event.findById(booking.eventId);

    if (event) {
      event.bookedTickets -= booking.quantity;
      await event.save();
    }

    await Booking.deleteOne({ _id: id });
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const printTicket = async (req: Request, res: Response) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId).populate('eventId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      userId: booking.userId,
      event: booking.eventId,
      quantity: booking.quantity,
      timestamp: booking.timestamp
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};
