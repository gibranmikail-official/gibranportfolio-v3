export function ContactEmailTemplate({
    name,
    email,
    organisation,
    phone,
    subject,
    message,
}: {
    name: string;
    email: string;
    organisation: string;
    phone: string;
    subject: string;
    message: string;
}) {
    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 40px 0 40px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td align="left" style="padding: 40px 40px 20px 40px; background-color: #ffffff;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="width: 4px; background-color: #ea580c; border-radius: 4px;">&nbsp;</td>
                                    <td style="padding-left: 15px;">
                                        <h1 style="color: #ea580c; font-size: 24px; margin: 0; font-weight: 700; letter-spacing: -0.025em;">New Contact Form Submission</h1>
                                        <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Received from GGENK website</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- User Info Section -->
                    <tr>
                        <td style="padding: 20px 40px 20px 40px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fcfcfc; border: 1px solid #f3f4f6; border-radius: 12px; padding: 20px;">
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <div style="color: #9ca3af; font-size: 11px; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">From</div>
                                        <div style="color: #111827; font-size: 16px; font-weight: 700;">\${name}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <div style="color: #9ca3af; font-size: 11px; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Email</div>
                                        <div><a href="mailto:\${email}" style="color: #ea580c; font-size: 15px; font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(234, 88, 12, 0.2);">\${email}</a></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td width="50%" style="vertical-align: top;">
                                                    <div style="color: #9ca3af; font-size: 11px; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Organisation</div>
                                                    <div style="color: #374151; font-size: 14px;">\${organisation || 'Not specified'}</div>
                                                </td>
                                                <td width="50%" style="vertical-align: top;">
                                                    <div style="color: #9ca3af; font-size: 11px; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Phone</div>
                                                    <div style="color: #374151; font-size: 14px;">\${phone || 'Not specified'}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Subject Section -->
                    <tr>
                        <td style="padding: 10px 40px 10px 40px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding: 12px 20px; background-color: rgba(234, 88, 12, 0.05); border-left: 3px solid #ea580c; border-radius: 4px;">
                                        <span style="color: #9ca3af; font-size: 11px; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 2px;">Subject</span>
                                        <span style="color: #ea580c; font-size: 15px; font-weight: 700;">\${subject}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Message Section -->
                    <tr>
                        <td style="padding: 20px 40px 40px 40px;">
                            <div style="color: #9ca3af; font-size: 11px; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; margin-left: 4px;">Message Content</div>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 25px; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">\${message}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 0 40px 40px 40px;">
                            <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">This message was sent securely from GGENK website contact form.<br/>&copy; 2026 GGENK Community. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}
