import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['farmer', 'owner'], default: 'farmer' },
    phone: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otpCode: { type: String },
    otpExpiry: { type: Date },

    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: false },
      city: { type: String, default: 'Lucknow' },
    },
    language: { type: String, enum: ['en', 'hi'], default: 'en' },

    // ── Farmer-specific fields ──────────────────────────
    landSize: { type: Number }, // in acres
    cropType: { type: String, enum: ['wheat', 'rice', 'sugarcane', 'maize', 'cotton', 'vegetables', 'other'] },

    // ── Owner-specific fields ───────────────────────────
    businessName: { type: String },
    equipmentTypes: [{ type: String }],
    experience: { type: Number }, // years
    aadhaarRef: { type: String }, // filename reference only

    // ── Common advanced fields ──────────────────────────
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    notificationPrefs: {
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      email: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

userSchema.index({ location: '2dsphere' });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
