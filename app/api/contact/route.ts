import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactEmailTemplate } from '@/lib/emails/contact-template';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, organisation, email, phone, subject, message } = body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to your own email address
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: ContactEmailTemplate({ 
                name, 
                email, 
                organisation, 
                phone, 
                subject, 
                message 
            }),
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('SMTP Error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
