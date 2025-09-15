import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../utils/emailService.js";
import axios from "axios"

const otpStore = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      fullName,
      phoneNumber,
      image,
      bloodGroup,
      collegeId,
    } = req.body;

    const existingUser = await User.findOne({
      $or: [
        { email },
        { phoneNumber }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email ?
          "User already exists with this email" :
          "Phone number already registered"
      });
    }

  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
      phoneNumber,
      image: image || null,
      isEmailVerified: true ,
      bloodGroup:bloodGroup,
      collegeId,
    });

    
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

   
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      phoneNumber: newUser.phoneNumber,
      image: newUser.image,
      role: newUser.role,
      bloodGroup:bloodGroup,
      isEmailVerified: newUser.isEmailVerified,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    
    if (!user.isActive) {
      return res.status(403).json({ error: "Account has been deactivated" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

   
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      image: user.image,
      role: user.role,
      collegeId:user.collegeId,
      isEmailVerified: user.isEmailVerified,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: error.message });
  }
};
export const Blood=async(req,res)=>{
  try {
    const data=await User.find({})
    
  res.json(data)
  } catch (error) {
    res.json({message:`Error occured in Blood Controller ${error}`})
  }
}

export const verifyUser = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email }).select('-password');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      image: user.image,
      role: user.role,
      collegeId:user.collegeId,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const sendVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;

    console.log('Received verification request for:', email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const otp = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; 

  
    otpStore.set(email, {
      otp,
      expiry: expiryTime
    });

    console.log('Generated OTP:', otp);

    
    const emailSent = await sendOTPEmail(email, otp);
    if (!emailSent) {
      throw new Error('Failed to send email. Please try again later.');
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error('Error in sendVerificationOTP:', error);
    const errorMessage = error.code === 'EAUTH'
      ? 'Email service configuration error'
      : error.message || 'Failed to send OTP';
    res.status(500).json({ error: errorMessage });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOTPData = otpStore.get(email);
    if (!storedOTPData) {
      return res.status(400).json({ error: "OTP not found or expired. Please request a new one." });
    }

    if (Date.now() > storedOTPData.expiry) {
      otpStore.delete(email);
      return res.status(400).json({ error: "OTP has expired. Please request a new one." });
    }

    if (storedOTPData.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear the OTP after successful verification
    otpStore.delete(email);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const sendPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Store OTP with expiry
    otpStore.set(`reset_${email}`, {
      otp,
      expiry: expiryTime
    });

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp, "Password Reset");
    if (!emailSent) {
      throw new Error('Failed to send email. Please try again later.');
    }

    res.status(200).json({ message: "Password reset OTP sent successfully" });
  } catch (error) {
    console.error('Send password reset OTP error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const storedOTPData = otpStore.get(`reset_${email}`);
    if (!storedOTPData) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    if (Date.now() > storedOTPData.expiry) {
      otpStore.delete(`reset_${email}`);
      return res.status(400).json({ error: "OTP has expired" });
    }

    if (storedOTPData.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    // Clear OTP
    otpStore.delete(`reset_${email}`);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user; // From auth middleware
    const { fullName, phoneNumber, image } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if provided
    if (fullName) user.fullName = fullName;
    if (phoneNumber) {
      // Check if phone number is already taken by another user
      const existingPhone = await User.findOne({ 
        phoneNumber, 
        _id: { $ne: userId } 
      });
      if (existingPhone) {
        return res.status(400).json({ error: "Phone number already registered" });
      }
      user.phoneNumber = phoneNumber;
    }
    if (image !== undefined) user.image = image;

    await user.save();

    // Return updated user data (excluding password)
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      image: user.image,
      role: user.role,
      isEmailVerified: user.isEmailVerified
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
};
