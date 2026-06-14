import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOTPEmail = async (toEmail, otp) => {
    const mailOptions = {
        from: `"Productr" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Your Productr Login OTP",
        html: `
            <div style="font-family: Inter, Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #fafbfc; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
                <div style="background: linear-gradient(135deg, #0b1a60, #102aeb); padding: 32px 40px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Productr</h1>
                    <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px;">Product Management Platform</p>
                </div>
                <div style="padding: 40px;">
                    <p style="color: #374151; font-size: 15px; margin: 0 0 24px;">Here is your One-Time Password to log in:</p>
                    <div style="background: #f3f4f6; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                        <span style="font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #0b1a60;">${otp}</span>
                    </div>
                    <p style="color: #6b7280; font-size: 13px; margin: 0;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
                </div>
                <div style="padding: 20px 40px; background: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">If you didn't request this, you can safely ignore this email.</p>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};
