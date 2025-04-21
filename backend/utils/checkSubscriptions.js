import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Function to update expired subscriptions
const updateSubscriptions = async () => {
    try {
        const now = new Date();

        // Find all users where subscription is expired
        const users = await User.find({ 
            subscribed: true, 
            subscriptionExpiresAt: { $lt: now } 
        });

        if (users.length > 0) {
            // Update users whose subscription expired
            await User.updateMany(
                { subscribed: true, subscriptionExpiresAt: { $lt: now } },
                { subscribed: false, subscriptionExpiresAt: null }
            );
            console.log(`✅ Updated ${users.length} expired subscriptions.`);
        } else {
            console.log('✅ No expired subscriptions found.');
        }
    } catch (error) {
        console.error('❌ Error updating subscriptions:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the function
updateSubscriptions();
