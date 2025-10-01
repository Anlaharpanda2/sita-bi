import * as nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Pastikan variabel environment sudah di-set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('ERROR: EMAIL_USER and EMAIL_PASS environment variables must be set.');
      // In a real app, you might want to throw an error or have a fallback
      // For now, we create a non-functional transporter to avoid crashing.
      this.transporter = nodemailer.createTransport({});
      return;
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // 'sitabi.pnp@gmail.com'
        pass: process.env.EMAIL_PASS, // App Password Anda
      },
    });
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const frontendUrl = process.env.FRONTEND_URL;
    const verificationLink = `${frontendUrl}/verify-otp?token=${token}`;

    const appName = process.env.APP_NAME || 'SITA-BI Politekni Negeri Padang';

    const mailOptions = {
      from: `"${appName}" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Verifikasi Alamat Email Anda',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Selamat Datang di SITA-BI!</h2>
          <p>Terima kasih telah mendaftar. Silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda.</p>
          <a href="${verificationLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
            Verifikasi Email
          </a>
          <p style="margin-top: 20px;">Jika tombol tidak berfungsi, Anda juga bisa menyalin dan menempelkan link berikut di browser Anda:</p>
          <p><a href="${verificationLink}">${verificationLink}</a></p>
          <p>Link ini akan kedaluwarsa dalam 1 jam.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending verification email to ${to}:`, error);
      // In a real app, you might want to handle this error more gracefully
      throw new Error('Could not send verification email.');
    }
  }
}
