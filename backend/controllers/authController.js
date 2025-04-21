import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';



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

/*
export const getUserInfoByToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is required' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send user info
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};*/
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
