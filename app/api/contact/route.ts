import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ContactEmailTemplate } from "@/lib/emails/contact-template";

export async function POST(request: Request) {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    try {
        const body = await request.json();
        const { name, organisation, email, phone, subject, message } = body;

        if (!EMAIL_USER || !EMAIL_PASS) {
            console.error("ERROR: Missing EMAIL_USER or EMAIL_PASS in environment variables.");
            return NextResponse.json(
                { error: "Server configuration error (Incomplete Env Vars)" },
                { status: 500 },
            );
        }

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
            to: EMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: ContactEmailTemplate({
                name,
                email,
                organisation,
                phone,
                subject,
                message,
            }),
        };

        console.log("Attempting to send email via SMTP...");
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("SMTP Error Detail:", {
            message: error.message,
            code: error.code,
        });

        return NextResponse.json(
            { error: "Failed to send email. Error: " + (error.message || "Unknown Error") },
            { status: 500 },
        );
    }
}
