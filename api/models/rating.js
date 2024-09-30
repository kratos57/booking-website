import mongoose from 'mongoose';

const { Schema } = mongoose;
const RatingSchema = new Schema({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
   // This field is marked as required
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model('Rating', RatingSchema);
