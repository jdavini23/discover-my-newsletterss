import nodemailer from 'nodemailer';
import { config } from '../config';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: config.EMAIL_SECURE,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

/**
 * Send a password reset email
 * @param to Recipient email address
 * @param resetLink Password reset link
 */
export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
  try {
    await transporter.sendMail({
      from: `"Newsletter App" <${config.EMAIL_FROM}>`,
      to: to,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password. Click the link below to reset:</p>
          <p>
            <a href="${resetLink}" style="
              display: inline-block; 
              padding: 10px 20px; 
              background-color: #4CAF50; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px;
            ">Reset Password</a>
          </p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>This link will expire in 30 minutes.</p>
          <small>© ${new Date().getFullYear()} Newsletter App</small>
        </div>
      `,
      text: `Password Reset Request. Click the following link to reset your password: ${resetLink}`
    });
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw new Error('Email could not be sent');
  }
}
