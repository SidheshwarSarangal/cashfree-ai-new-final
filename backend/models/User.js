import mongoose from 'mongoose';



const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscribed: { type: Boolean, default: false },
    subscriptionId: { type: String, default: null },
    subscriptionExpiresAt: { type: Date, default: null }
}, { timestamps: true });

// Pre-save hook to set expiration date if subscribed
UserSchema.pre('save', function (next) {
    if (this.isModified('subscribed') && this.subscribed === true) {
        // Set expiration date to 1 month from now
        this.subscriptionExpiresAt = new Date();
        this.subscriptionExpiresAt.setMonth(this.subscriptionExpiresAt.getMonth() + 1);
    }
    next();
});

export default mongoose.model('User', UserSchema);
