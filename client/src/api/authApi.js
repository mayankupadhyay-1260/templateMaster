import api from "./axios";

export const login = (email) =>
    api.post("/auth/login", {
        email,
    });

export const verifyOTP = (
    email,
    otp
) =>
    api.post("/auth/verify-otp", {
        email,
        otp,
    });