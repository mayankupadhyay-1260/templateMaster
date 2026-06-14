import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { verifyOTP } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function OTP() {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(20);
    const navigate = useNavigate();
    const { login } = useAuth();
    const email = localStorage.getItem("email") || "";
    const inputRefs = useRef([]);

    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleChange = (index, value) => {
        if (value && isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (newOtp[index] && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").trim();
        if (data.length === 6 && !isNaN(data)) {
            const newOtp = data.split("");
            setOtp(newOtp);
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join("");
        if (otpCode.length < 6) {
            alert("Please enter a 6-digit OTP");
            return;
        }

        try {
            setLoading(true);
            const response = await verifyOTP(email, otpCode);
            const token = response.data.token;
            login(token);
            navigate("/home");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Invalid OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-[0px_10px_50px_rgba(0,0,0,0.06)] border border-gray-100 flex min-h-[560px]">
                
                {/* Left Panel: Visual */}
                <div className="w-1/2 bg-[#eef2f7] p-8 hidden md:flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute w-[250px] h-[250px] rounded-full bg-white opacity-60 blur-2xl -top-10 -left-10" />
                    <div className="absolute w-[350px] h-[350px] rounded-full bg-[#dbe2ee] opacity-50 blur-3xl -bottom-20 -right-20" />
                    
                    {/* Brand Logo Header */}
                    <div className="flex items-center gap-2 relative z-10">
                        <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="14" fill="url(#orange-grad-otp)" />
                            <rect x="10" y="10" width="12" height="12" rx="2" stroke="white" strokeWidth="2.5" opacity="0.9" />
                            <line x1="10" y1="16" x2="22" y2="16" stroke="white" strokeWidth="2.5" opacity="0.9" />
                            <line x1="16" y1="10" x2="16" y2="22" stroke="white" strokeWidth="2.5" opacity="0.9" />
                            <defs>
                                <linearGradient id="orange-grad-otp" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#f97316" />
                                    <stop stopColor="#ea580c" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="font-extrabold text-[#0b1a60] text-lg tracking-tight">Productr</span>
                    </div>

                    {/* Central Gradient Card */}
                    <div className="flex-1 flex items-center justify-center relative z-10">
                        <div className="w-[250px] h-[330px] rounded-[32px] bg-gradient-to-b from-[#f97316] to-[#7c3aed] p-6 flex flex-col items-center justify-center shadow-xl text-center">
                            <div className="flex-1 flex items-center justify-center">
                                <svg className="w-24 h-24 text-white opacity-95" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 10.2l-.3 1.7L9 14.5l-.5 3h2l.7-3.8 2.8-2.2 2 1.5V19h2v-6.5l-3.2-2.5.5-2.7c.6.9 1.6 1.5 2.7 1.5h1v-2h-1c-.9 0-1.8-.5-2.2-1.3l-1-1.6C12.9 4.3 12.1 4 11.2 4c-.9 0-1.6.4-2.1 1.1L6 9.8V15h2v-4.2l1.8-1.7" />
                                </svg>
                            </div>
                            <p className="text-white font-bold text-base leading-snug px-2">
                                Uplist your product to market
                            </p>
                        </div>
                    </div>

                    {/* Bottom layout space placeholder */}
                    <div className="h-6 relative z-10" />
                </div>

                {/* Right Panel: OTP Form */}
                <div className="w-full md:w-1/2 bg-[#f8fafc] p-12 flex flex-col justify-between min-h-[500px]">
                    <div />

                    <div>
                        <h1 className="text-2xl font-bold text-[#0b1a60] mb-8">
                            Login to your Productr Account
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Enter OTP
                                </label>
                                
                                <div className="flex gap-2.5 justify-between">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={handlePaste}
                                            className="w-12 h-12 border border-gray-200 rounded-xl text-center text-lg font-bold bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                                            maxLength={6}
                                            required
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#0b1a60] hover:bg-[#000840] text-white p-3.5 rounded-xl font-bold text-sm transition shadow-md active:scale-[0.99] cursor-pointer"
                            >
                                {loading ? "Verifying..." : "Enter your OTP"}
                            </button>
                        </form>
                    </div>

                    {/* Footer Resend timer */}
                    <div className="text-center text-xs text-gray-400 font-medium">
                        Didnt recive OTP ?{" "}
                        <span className="text-[#102aeb] font-semibold hover:underline cursor-pointer">
                            {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}