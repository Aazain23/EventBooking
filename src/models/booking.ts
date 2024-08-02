import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
  userId: string;
  eventId: mongoose.Types.ObjectId;
  quantity: number;
  timestamp: Date;
}

const bookingSchema: Schema = new Schema({
  userId: { type: String, required: true },
  eventId: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IBooking>('Booking', bookingSchema);
