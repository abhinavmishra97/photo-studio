// Email templates for birthday and anniversary wishes

export function getBirthdayEmailHTML(name: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Birthday!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header with Logo -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); border-radius: 12px 12px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
                                🎉 Happy Birthday! 🎉
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px; color: #333333; font-size: 18px; line-height: 1.6;">
                                Dear <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #555555; font-size: 16px; line-height: 1.6;">
                                Wishing you a very Happy Birthday! 🎂
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #555555; font-size: 16px; line-height: 1.6;">
                                May this special day bring you joy, happiness, and wonderful memories. We hope your day is filled with love, laughter, and everything that makes you smile.
                            </p>
                            
                            <p style="margin: 0 0 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                                Thank you for being a valued part of the Ram Photo Studio family. We look forward to capturing more beautiful moments with you!
                            </p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <div style="display: inline-block; padding: 20px 30px; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); border-radius: 8px;">
                                    <p style="margin: 0; color: #ffffff; font-size: 20px; font-weight: bold;">
                                        Have a wonderful day! 🎈
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f8f8; border-radius: 0 0 12px 12px; text-align: center;">
                            <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                                <strong>Ram Photo Studio</strong>
                            </p>
                            <p style="margin: 0 0 5px; color: #888888; font-size: 13px;">
                                Near Peeli Kothi, Circular Road, Hathras - 204101
                            </p>
                            <p style="margin: 0 0 5px; color: #888888; font-size: 13px;">
                                📞 91-5722-297297 | 91-9412733288
                            </p>
                            <p style="margin: 0; color: #888888; font-size: 13px;">
                                📧 ramdigitalphotostudio@gmail.com
                            </p>
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

export function getAnniversaryEmailHTML(name: string, spouseName?: string): string {
    const greeting = spouseName
        ? `Dear ${name} and ${spouseName}`
        : `Dear ${name}`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Anniversary!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%); border-radius: 12px 12px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
                                💕 Happy Anniversary! 💕
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px; color: #333333; font-size: 18px; line-height: 1.6;">
                                ${greeting},
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #555555; font-size: 16px; line-height: 1.6;">
                                Wishing you a very Happy Anniversary! 💐
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #555555; font-size: 16px; line-height: 1.6;">
                                May your love continue to grow stronger with each passing year. Here's to many more years of happiness, laughter, and beautiful memories together.
                            </p>
                            
                            <p style="margin: 0 0 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                                Thank you for being a valued part of the Ram Photo Studio family. We feel honored to have been part of your journey!
                            </p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <div style="display: inline-block; padding: 20px 30px; background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%); border-radius: 8px;">
                                    <p style="margin: 0; color: #ffffff; font-size: 20px; font-weight: bold;">
                                        Celebrate your love! ❤️
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f8f8; border-radius: 0 0 12px 12px; text-align: center;">
                            <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                                <strong>Ram Photo Studio</strong>
                            </p>
                            <p style="margin: 0 0 5px; color: #888888; font-size: 13px;">
                                Near Peeli Kothi, Circular Road, Hathras - 204101
                            </p>
                            <p style="margin: 0 0 5px; color: #888888; font-size: 13px;">
                                📞 91-5722-297297 | 91-9412733288
                            </p>
                            <p style="margin: 0; color: #888888; font-size: 13px;">
                                📧 ramdigitalphotostudio@gmail.com
                            </p>
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
