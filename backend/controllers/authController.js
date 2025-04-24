import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { v2 as cloudinary } from 'cloudinary';

export const uploadImage = async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const file = req.files.image;

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'temp_uploads',
            public_id: Date.now().toString(), // this becomes the public_id
        });

        const optimizedUrl = cloudinary.url(result.public_id, {
            fetch_format: 'auto',
            quality: 'auto',
        });

        const croppedUrl = cloudinary.url(result.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        res.json({
            success: true,
            originalUrl: result.secure_url,
            optimizedUrl,
            croppedUrl,
            publicId: result.public_id, // ✅ return public_id here
        });

    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ success: false, message: 'Upload failed' });
    }
};

export const deleteImage = async (req, res) => {
    const { public_id } = req.body;
  
    if (!public_id) {
      return res.status(400).json({ success: false, message: 'public_id is required' });
    }
  
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      
      if (result.result !== 'ok') {
        return res.status(500).json({ success: false, message: 'Failed to delete image' });
      }
  
      res.status(200).json({ success: true, message: 'Image deleted successfully', result });
    } catch (err) {
      console.error('Cloudinary delete error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };


export const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        // Check password complexity (at least 1 letter and 1 digit)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one letter and one digit'
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ success: true, message: 'Signup successful' });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'Signup failed' });
    }
};

// Login User

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {

            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                subscribed: user.subscribed
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        console.log("xxxxxxxxxxxxxxxxxxxxxxx")

        res.status(200).json({
            success: true,
            message: 'Signin successful',
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get Logged-In User (Protected Route)
export const getLoggedInUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


export const getUserInfoByToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export const updateSubscriptionStatus = async (req, res) => {
    const { userId, subscriptionId, subscriptionExpiresAt } = req.body;

    if (!userId || !subscriptionId || !subscriptionExpiresAt) {
        return res.status(400).json({
            success: false,
            message: 'userId, subscriptionId, and subscriptionExpiresAt are required'
        });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                subscribed: true,
                subscriptionId,
                subscriptionExpiresAt: new Date(subscriptionExpiresAt)
            },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
