import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactEmailTemplate } from '@/lib/emails/contact-template';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, organisation, email, phone, subject, message } = body;

        // Logging for debugging in Netlify (Environment variables check)
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('CRITICAL: EMAIL_USER or EMAIL_PASS environment variables are missing!');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // More robust transporter config for serverless
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // Optimize for serverless: close connection faster
            pool: false, 
            timeout: 8000, // 8 seconds timeout to stay under Netlify's 10s limit
        });

        const mailOptions = {
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
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

        // Verification step
        console.log('Attempting to send email via SMTP...');
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        // Detailed error logging for Netlify Console
        console.error('SMTP Error Detail:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        
        return NextResponse.json(
            { error: 'Failed to send email. Please check server logs.' },
            { status: 500 }
        );
    }
}
