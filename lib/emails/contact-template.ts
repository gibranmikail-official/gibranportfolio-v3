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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; color: #E5E5E5;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0A0A0A; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #121212; border: 1px solid #262626; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 16px rgba(0,0,0,0.6);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 35px 30px; text-align: center; border-bottom: 1px solid #262626; background-color: #18181A;">
              <h1 style="margin: 0; font-size: 24px; color: #eb8424; font-weight: bold; letter-spacing: 0.5px;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #A3A3A3;">Website Notification</p>
            </td>
          </tr>

          <!-- Personal Info -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px;">Name</span><br>
                    <strong style="font-size: 16px; color: #FFFFFF; display: block; margin-top: 6px;">${name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px;">Email</span><br>
                    <a href="mailto:${email}" style="font-size: 16px; color: #eb8424; text-decoration: none; display: block; margin-top: 6px; font-weight: bold;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px;">Organisation</span><br>
                    <span style="font-size: 16px; color: #E5E5E5; display: block; margin-top: 6px;">${organisation || 'N/A'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px;">
                    <span style="font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px;">Phone</span><br>
                    <span style="font-size: 16px; color: #E5E5E5; display: block; margin-top: 6px;">${phone || 'N/A'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 30px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-top: 1px solid #262626;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subject -->
          <tr>
            <td style="padding: 25px 30px 10px 30px;">
              <span style="font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px;">Subject</span><br>
              <h2 style="margin: 8px 0 0 0; font-size: 18px; color: #eb8424; font-weight: 600;">${subject}</h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 10px 30px 35px 30px;">
              <span style="font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px;">Message</span><br>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 12px; background-color: #0A0A0A; border: 1px solid #262626; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px; font-size: 15px; color: #D4D4D4; line-height: 1.7; white-space: pre-wrap; font-family: Arial, Helvetica, sans-serif;">${message}</td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Footer -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; margin-top: 24px;">
          <tr>
            <td align="center" style="font-size: 13px; color: #525252;">
              This message was sent from gibranmikail.my.id
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
