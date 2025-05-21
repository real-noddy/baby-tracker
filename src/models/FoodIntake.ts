import mongoose from 'mongoose';

const NutritionSchema = new mongoose.Schema({
  calories: {
    type: Number,
    default: 0,
  },
  protein: {
    type: Number,
    default: 0,
  },
  carbs: {
    type: Number,
    default: 0,
  },
  fat: {
    type: Number,
    default: 0,
  },
  fiber: {
    type: Number,
    default: 0,
  },
  sugar: {
    type: Number,
    default: 0,
  },
  vitamins: {
    type: Map,
    of: Number,
    default: {},
  },
  minerals: {
    type: Map,
    of: Number,
    default: {},
  },
});

const FoodIntakeSchema = new mongoose.Schema({
  baby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baby',
    required: true,
  },
  foodName: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true,
  },
  foodType: {
    type: String,
    enum: ['breast milk', 'formula', 'solid food', 'water', 'other'],
    required: [true, 'Food type is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  unit: {
    type: String,
    enum: ['ml', 'oz', 'g', 'serving'],
    required: [true, 'Unit is required'],
  },
  consumedAt: {
    type: Date,
    required: [true, 'Consumed date and time is required'],
    default: Date.now,
  },
  nutritionalInfo: {
    type: NutritionSchema,
    default: () => ({}),
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

export default mongoose.models.FoodIntake || mongoose.model('FoodIntake', FoodIntakeSchema); 