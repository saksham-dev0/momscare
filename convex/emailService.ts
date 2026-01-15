"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import nodemailer from "nodemailer";

// Email configuration from environment variables
const getEmailConfig = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL || "sakshamsharmaofficial7@gmail.com";

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS environment variables must be set");
  }

  return { host, port, user, pass, adminEmail };
};

// Create nodemailer transporter
const createTransporter = () => {
  const config = getEmailConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
};

// Email template: Applicant - Pending Verification
const getPendingVerificationEmailTemplate = (name: string, applicantType: "doctor" | "nurse") => {
  const role = applicantType === "doctor" ? "Doctor" : "Nurse";
  return {
    subject: "Onboarding Successful - Verification Pending",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Onboarding Successful</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">MomsCare</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: 600;">Dear ${name},</h2>
              
              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thank you for completing your ${role} onboarding application with MomsCare. We have successfully received your application and all submitted documents.
              </p>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 15px; line-height: 1.6;">
                  <strong>Your application is currently under review.</strong> Our team is carefully verifying your credentials and documents to ensure the highest standards of care for our patients.
                </p>
              </div>
              
              <p style="margin: 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Please wait while we complete the verification process. We typically review applications within 3-5 business days. You will receive an email notification once your account has been verified.
              </p>
              
              <p style="margin: 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                If you have any questions or need to update your application, please don't hesitate to contact our support team.
              </p>
              
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Best regards,</p>
                <p style="margin: 0; color: #1f2937; font-size: 14px; font-weight: 600;">The MomsCare Team</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                This is an automated message. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
};

// Email template: Admin - New Application
const getAdminNewApplicationEmailTemplate = (
  name: string,
  email: string,
  applicantType: "doctor" | "nurse"
) => {
  const role = applicantType === "doctor" ? "Doctor" : "Nurse";
  return {
    subject: `New ${role} Application Received - ${name}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">MomsCare Admin</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: 600;">New ${role} Application</h2>
              
              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                A new ${role.toLowerCase()} has submitted an onboarding application and is awaiting verification.
              </p>
              
              <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; margin: 24px 0; border-radius: 6px;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #0c4a6e; font-size: 15px; font-weight: 600;">Name:</td>
                    <td style="padding: 8px 0; color: #0c4a6e; font-size: 15px;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #0c4a6e; font-size: 15px; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0; color: #0c4a6e; font-size: 15px;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #0c4a6e; font-size: 15px; font-weight: 600;">Type:</td>
                    <td style="padding: 8px 0; color: #0c4a6e; font-size: 15px;">${role}</td>
                  </tr>
                </table>
              </div>
              
              <p style="margin: 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Please review the application in the admin dashboard and verify the applicant's credentials and documents.
              </p>
              
              <div style="margin-top: 32px; text-align: center;">
                <a href="${process.env.ADMIN_DASHBOARD_URL || 'https://your-domain.com/admin'}" style="display: inline-block; padding: 12px 24px; background-color: #0f766e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">
                  Review Application
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                MomsCare Admin Notification System
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
};

// Email template: Applicant - Approved
const getApprovedEmailTemplate = (name: string, applicantType: "doctor" | "nurse") => {
  const role = applicantType === "doctor" ? "Doctor" : "Nurse";
  return {
    subject: "Account Verified - You're Now Live!",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Verified</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #059669 0%, #10b981 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">MomsCare</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: 600;">Congratulations, ${name}!</h2>
              
              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                We are pleased to inform you that your ${role} account has been successfully verified and approved!
              </p>
              
              <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; color: #065f46; font-size: 15px; line-height: 1.6;">
                  <strong>Your account is now active!</strong> Patients can now request your services through the MomsCare platform.
                </p>
              </div>
              
              <p style="margin: 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                As a verified ${role.toLowerCase()}, you can now:
              </p>
              
              <ul style="margin: 20px 0; padding-left: 24px; color: #4b5563; font-size: 16px; line-height: 1.8;">
                <li>Receive service requests from patients</li>
                <li>Manage your availability and schedule</li>
                <li>Access your professional dashboard</li>
                <li>Build your reputation through patient reviews</li>
              </ul>
              
              <p style="margin: 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                We're excited to have you as part of the MomsCare community. If you have any questions or need assistance, our support team is here to help.
              </p>
              
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Best regards,</p>
                <p style="margin: 0; color: #1f2937; font-size: 14px; font-weight: 600;">The MomsCare Team</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                This is an automated message. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
};

// Internal action: Send email to applicant (pending verification)
export const sendPendingVerificationEmail = internalAction({
  args: {
    email: v.string(),
    name: v.string(),
    applicantType: v.union(v.literal("doctor"), v.literal("nurse")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    try {
      const config = getEmailConfig();
      const transporter = createTransporter();
      const template = getPendingVerificationEmailTemplate(args.name, args.applicantType);

      await transporter.sendMail({
        from: `"MomsCare" <${config.user}>`,
        to: args.email,
        subject: template.subject,
        html: template.html,
      });

      console.log(`Pending verification email sent to ${args.email}`);
    } catch (error) {
      console.error("Failed to send pending verification email:", error);
      // Don't throw - email failure shouldn't break the flow
    }
    return null;
  },
});

// Internal action: Send email to admin (new application)
export const sendAdminNewApplicationEmail = internalAction({
  args: {
    name: v.string(),
    email: v.string(),
    applicantType: v.union(v.literal("doctor"), v.literal("nurse")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    try {
      const config = getEmailConfig();
      const transporter = createTransporter();
      const template = getAdminNewApplicationEmailTemplate(args.name, args.email, args.applicantType);

      await transporter.sendMail({
        from: `"MomsCare" <${config.user}>`,
        to: config.adminEmail,
        subject: template.subject,
        html: template.html,
      });

      console.log(`New application notification sent to admin for ${args.name}`);
    } catch (error) {
      console.error("Failed to send admin notification email:", error);
      // Don't throw - email failure shouldn't break the flow
    }
    return null;
  },
});

// Internal action: Send email to applicant (approved)
export const sendApprovedEmail = internalAction({
  args: {
    email: v.string(),
    name: v.string(),
    applicantType: v.union(v.literal("doctor"), v.literal("nurse")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    try {
      const config = getEmailConfig();
      const transporter = createTransporter();
      const template = getApprovedEmailTemplate(args.name, args.applicantType);

      await transporter.sendMail({
        from: `"MomsCare" <${config.user}>`,
        to: args.email,
        subject: template.subject,
        html: template.html,
      });

      console.log(`Approval email sent to ${args.email}`);
    } catch (error) {
      console.error("Failed to send approval email:", error);
      // Don't throw - email failure shouldn't break the flow
    }
    return null;
  },
});
