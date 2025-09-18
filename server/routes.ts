import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { router as routes } from './routes/index';

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Flight booking submission endpoint
  app.post("/api/flight-booking", async (req, res) => {
    try {
      const bookingData = req.body;

      // Format the booking data for WhatsApp message
      const message = formatBookingMessage(bookingData);

      // Send WhatsApp message
      const whatsappUrl = `https://wa.me/2347032615370?text=${encodeURIComponent(message)}`;

      // Send confirmation email to customer
      await sendConfirmationEmail(bookingData);

      // Save booking data (you can implement database storage here)
      console.log("Booking received:", bookingData);
      console.log("WhatsApp message would be sent:", message);
      console.log("WhatsApp URL:", whatsappUrl);

      res.json({
        success: true,
        message: "Booking request received successfully",
        whatsappUrl
      });

    } catch (error) {
      console.error("Error processing booking:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process booking request"
      });
    }
  });

  // Mount all routes
  app.use(routes);

  const httpServer = createServer(app);
  return httpServer;
}

function formatBookingMessage(data: any): string {
  const fromCountry = data.from ? `(${data.from.toUpperCase()})` : '';
  const toCountry = data.to ? `(${data.to.toUpperCase()})` : '';

  return `🛫 NEW FLIGHT BOOKING REQUEST

👤 Name: ${data.fullName}
📧 Email: ${data.email}
📱 Phone: ${data.phone}

✈️ FLIGHT DETAILS:
📍 From: ${fromCountry}
📍 To: ${toCountry}
📅 Departure: ${data.departureDate}
📅 Return: ${data.returnDate || 'One way'}
👥 Passengers: ${data.passengers}
🎫 Class: ${data.class}

💬 Special Requests: ${data.specialRequests || 'None'}

Please contact the customer within 24 hours.`;
}

async function sendConfirmationEmail(bookingData: any) {
  // Create a test account for development (you should use real SMTP credentials in production)
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransporter({
    host: "smtp.ethereal.email", // Use your actual SMTP server in production
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const mailOptions = {
    from: '"SN-SP Travel" <noreply@snsp.com>',
    to: bookingData.email,
    subject: "Flight Booking Request Confirmation - SN-SP Travel",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for your flight booking request!</h2>

        <p>Dear ${bookingData.fullName},</p>

        <p>We have successfully received your flight booking request. Our team will review your requirements and contact you within 24 hours with personalized flight options.</p>

        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Your Booking Details:</h3>
          <p><strong>From:</strong> ${bookingData.from ? bookingData.from.toUpperCase() : 'Not specified'}</p>
          <p><strong>To:</strong> ${bookingData.to ? bookingData.to.toUpperCase() : 'Not specified'}</p>
          <p><strong>Departure Date:</strong> ${bookingData.departureDate}</p>
          <p><strong>Return Date:</strong> ${bookingData.returnDate || 'One way'}</p>
          <p><strong>Passengers:</strong> ${bookingData.passengers}</p>
          <p><strong>Class:</strong> ${bookingData.class}</p>
          ${bookingData.specialRequests ? `<p><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>` : ''}
        </div>

        <p>If you have any immediate questions, please don't hesitate to contact us:</p>
        <ul>
          <li>WhatsApp: +234 703 261 5370</li>
          <li>Email: info@snsp.com</li>
        </ul>

        <p>Thank you for choosing SN-SP Travel!</p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #6b7280; font-size: 14px;">
          This is an automated confirmation email. Please do not reply to this email.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}