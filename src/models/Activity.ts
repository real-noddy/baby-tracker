import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  baby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baby',
    required: true,
  },
  type: {
    type: String,
    enum: ['diaper', 'poop', 'sleep', 'bath', 'medicine', 'other'],
    required: [true, 'Activity type is required'],
  },
  details: {
    // For diaper: wet, dirty, both
    // For poop: color, consistency
    // For sleep: duration
    // For medicine: name, dosage
    type: Map,
    of: String,
    default: {},
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required'],
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  notes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema); 