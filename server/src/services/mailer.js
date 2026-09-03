const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.SMTP_PORT || '2525', 10),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }
  return null;
};

const sendEnquiryNotification = async (enquiryData) => {
  try {
    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@blackforestholidays.com';

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #10221b; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; color: #f29727; font-size: 22px;">New Travel Enquiry Received</h2>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Blackforest Holidays Website</p>
        </div>
        <div style="padding: 24px; color: #333333; line-height: 1.6;">
          <p><strong>Name:</strong> ${enquiryData.name}</p>
          <p><strong>Email:</strong> ${enquiryData.email}</p>
          <p><strong>Phone:</strong> ${enquiryData.phone}</p>
          <p><strong>Destination:</strong> ${enquiryData.destination || 'Not Specified'}</p>
          <p><strong>Travel Date:</strong> ${enquiryData.travelDate || 'Flexible'}</p>
          <p><strong>Travellers:</strong> ${enquiryData.travellers || '2 Adults'}</p>
          <p><strong>Budget:</strong> ${enquiryData.budget || 'Flexible'}</p>
          <div style="margin-top: 16px; background-color: #f9f9f9; padding: 12px; border-left: 4px solid #f29727;">
            <strong>Message / Requirements:</strong>
            <p style="margin: 8px 0 0; font-style: italic;">${enquiryData.message}</p>
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 12px; color: #777;">
          Blackforest Holidays Automated Notification System
        </div>
      </div>
    `;

    if (transporter) {
      await transporter.sendMail({
        from: `"Blackforest Holidays" <${process.env.SMTP_FROM || 'noreply@blackforestholidays.com'}>`,
        to: adminEmail,
        subject: `✈️ New Enquiry from ${enquiryData.name} - ${enquiryData.destination || 'Custom Journey'}`,
        html: emailHtml
      });
      console.log(`📧 Notification email sent to ${adminEmail}`);
    } else {
      console.log(`ℹ️ [Mailer Mock] New Enquiry from ${enquiryData.name} (${enquiryData.email}) logged. Configure SMTP credentials in .env to enable live email delivery.`);
    }
  } catch (error) {
    console.error('⚠️ Error sending enquiry notification email:', error.message);
  }
};

module.exports = { sendEnquiryNotification };
