import User from "../models/User.js";
import generateOTP from "../utils/generateOTP.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        const otp = generateOTP();

        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        console.log(
            `OTP for ${email}: ${otp}`
        );

        return res.status(200).json({
            success: true,
            message: "OTP Sent",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        if (Date.now() > user.otpExpires) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};