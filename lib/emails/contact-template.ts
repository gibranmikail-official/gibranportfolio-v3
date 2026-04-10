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
    <title>New Portfolio Message - Gibran Mikail</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 40px 10px 40px 10px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; background-color: #0c0c0c; border: 1px solid #1f1f1f; border-radius: 12px; overflow: hidden;">
                    <!-- Header Bar -->
                    <tr>
                        <td style="height: 4px; background: linear-gradient(to right, #f97316, #ea580c);"></td>
                    </tr>
                    
                    <!-- Header Content -->
                    <tr>
                        <td align="left" style="padding: 35px 40px 25px 40px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td>
                                        <div style="color: #f97316; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 8px;">Contact Notification</div>
                                        <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 600; letter-spacing: -0.01em;">New Message Received</h1>
                                        <p style="color: #94a3b8; font-size: 14px; margin: 8px 0 0 0;">Received via gibranmikail.my.id</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Details Section -->
                    <tr>
                        <td style="padding: 0 40px 20px 40px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #141414; border: 1px solid #262626; border-radius: 8px; padding: 24px;">
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 6px;">Sender Information</div>
                                        <div style="color: #ffffff; font-size: 18px; font-weight: 600;">${name}</div>
                                        <div style="margin-top: 4px;"><a href="mailto:${email}" style="color: #f97316; font-size: 14px; text-decoration: none; font-weight: 500;">${email}</a></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td width="50%" style="vertical-align: top; padding-right: 15px;">
                                                    <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 6px;">Organisation</div>
                                                    <div style="color: #e2e8f0; font-size: 14px;">${organisation || "—"}</div>
                                                </td>
                                                <td width="50%" style="vertical-align: top;">
                                                    <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 6px;">Phone</div>
                                                    <div style="color: #e2e8f0; font-size: 14px;">${phone || "—"}</div>
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
                        <td style="padding: 0 40px 20px 40px;">
                            <div style="padding: 16px 20px; background-color: rgba(249, 115, 22, 0.08); border-left: 2px solid #f97316; border-radius: 4px;">
                                <div style="color: #f97316; font-size: 10px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 4px;">Subject</div>
                                <div style="color: #ffffff; font-size: 15px; font-weight: 600;">${subject}</div>
                            </div>
                        </td>
                    </tr>

                    <!-- Message Section -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 12px;">Message Content</div>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #141414; border: 1px solid #262626; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 24px; color: #e2e8f0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 30px 40px 40px 40px; border-top: 1px solid #1f1f1f; background-color: #0a0a0a;">
                            <p style="color: #64748b; font-size: 12px; margin: 0; line-height: 1.6;">
                                This message was sent via the contact form on your portfolio website.<br/>
                                <strong style="color: #94a3b8;">&copy; 2026 Gibran Mikail.</strong> All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
                
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding-top: 24px;">
                            <a href="https://gibranmikail.my.id" style="color: #64748b; font-size: 11px; text-decoration: none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Visit Website</a>
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
