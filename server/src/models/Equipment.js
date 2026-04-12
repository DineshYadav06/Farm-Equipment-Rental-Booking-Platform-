import mongoose from 'mongoose';

const equipmentSchema = mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'Tractor', 'Harvester', 'Plow'
    description: { type: String, required: true },
    ratePerHour: { type: Number, required: true },
    ratePerDay: { type: Number, required: true },
    image: { type: String, required: false },
    availabilityStatus: { type: Boolean, default: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
  },
  { timestamps: true }
);

equipmentSchema.index({ location: '2dsphere' });

const Equipment = mongoose.model('Equipment', equipmentSchema);
export default Equipment;
