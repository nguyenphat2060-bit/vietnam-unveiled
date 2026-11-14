import nodemailer from 'nodemailer';

export interface SendMailResult {
  success: boolean;
  messageId?: string;
  previewUrl?: string | false;
  error?: string;
}

export async function sendWelcomeNewsletterEmail(recipientEmail: string): Promise<SendMailResult> {
  try {
    let transporter: any;

    // Check for custom SMTP environment variables
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Create Ethereal test account or JSON transport fallback for local demo
      try {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      } catch (e) {
        // Fallback to jsonTransport if external network is unavailable
        transporter = nodemailer.createTransport({
          jsonTransport: true,
        });
      }
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9F6; color: #121212; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid rgba(212,175,55,0.25); }
          .header { background: linear-gradient(135deg, #0F382C 0%, #082119 100%); padding: 40px 30px; text-align: center; color: #ffffff; }
          .header h1 { font-family: 'Georgia', serif; font-size: 26px; color: #D4AF37; margin: 10px 0 5px 0; letter-spacing: 2px; }
          .header p { font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #FFF1B0; margin: 0; }
          .content { padding: 35px 30px; line-height: 1.7; color: #333333; }
          .welcome-title { font-family: 'Georgia', serif; font-size: 22px; color: #0F382C; font-weight: bold; margin-bottom: 15px; }
          .voucher-box { background: #FAF6EA; border: 1.5px dashed #D4AF37; border-radius: 14px; padding: 20px; text-align: center; margin: 25px 0; }
          .voucher-code { font-family: monospace; font-size: 22px; font-weight: bold; color: #0F382C; letter-spacing: 3px; margin: 8px 0; display: inline-block; background: #ffffff; padding: 6px 16px; border-radius: 8px; border: 1px solid #D4AF37; }
          .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FFF1B0 0%, #D4AF37 50%, #C5A028 100%); color: #0F382C; font-weight: bold; text-decoration: none; border-radius: 30px; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 6px 18px rgba(212,175,55,0.35); }
          .dest-grid { margin: 25px 0; display: block; border-top: 1px solid #eeeeee; padding-top: 20px; }
          .footer { background-color: #121212; padding: 25px 30px; text-align: center; color: rgba(255,255,255,0.6); font-size: 11px; line-height: 1.6; }
          .footer a { color: #D4AF37; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p>The Timeless Charm</p>
            <h1>VIETNAM UNVEILED</h1>
            <div style="width: 40px; height: 1.5px; background: #D4AF37; margin: 15px auto 0 auto;"></div>
          </div>
          
          <div class="content">
            <div class="welcome-title">Chào mừng bạn gia nhập Bản Tin Di Sản!</div>
            <p>Kính gửi Quý lữ khách,</p>
            <p>Cảm ơn bạn đã đăng ký nhận bản tin từ <strong>Vietnam Unveiled</strong>. Bạn sẽ là người đầu tiên nhận được cẩm nang văn hóa độc quyền, dự báo mùa vàng Tam Cốc, lịch trình săn mây Sa Pa và các ưu đãi nghỉ dưỡng thượng lưu định kỳ.</p>
            
            <div class="voucher-box">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8C6D1F; font-weight: bold;">Đặc Quyền Chào Mừng Thành Viên Mới</span>
              <br/>
              <span class="voucher-code">UNVEILED-VIP2026</span>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #555555;">Giảm ngay 15% cho các dịch vụ du thuyền 5 sao Vịnh Hạ Long & Tour khám phá chuyên sâu Hội An.</p>
            </div>

            <p style="margin-top: 25px;"><strong>Những hành trình đang chờ đón bạn khám phá:</strong></p>
            <ul style="padding-left: 20px; font-size: 13px; color: #444444;">
              <li><strong>Phố Cổ Hội An:</strong> Dạo bước ngõ tường vàng rêu phong và dạ tiệc đèn lồng sông Hoài.</li>
              <li><strong>Kỳ quan Vịnh Hạ Long:</strong> Thư thái ngắm hoàng hôn dát vàng trên boong du thuyền cao cấp.</li>
              <li><strong>Thung Lũng Mường Hoa - Sa Pa:</strong> Ruộng bậc thang lượn sóng và đỉnh Fansipan mây ngàn.</li>
              <li><strong>Sơn Đoòng & Phong Nha:</strong> Thám hiểm lòng hang động tự nhiên lớn nhất hành tinh.</li>
            </ul>

            <div style="text-align: center; margin: 35px 0 15px 0;">
              <a href="http://localhost:3000/planner" class="btn">Lên Lịch Trình Thông Minh Ngay</a>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0 0 8px 0; color: #D4AF37; font-weight: bold;">VIETNAM UNVEILED • DI SẢN & THƯỢNG LƯU</p>
            <p style="margin: 0 0 12px 0;">Email này được gửi tự động để xác nhận lượt đăng ký của bạn tại <a href="http://localhost:3000">vietnamunveiled.com</a>.</p>
            <p style="margin: 0; font-size: 10px; color: rgba(255,255,255,0.4);">© 2026 Vietnam Unveiled. Mọi quyền được bảo lưu. Thành viên Mạng lưới Du lịch Bền vững UNESCO Heritage.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: '"Vietnam Unveiled" <newsletter@vietnamunveiled.com>',
      to: recipientEmail,
      subject: '✨ [Vietnam Unveiled] Xác nhận đăng ký Bản Tin Di Sản & Quà Tặng Độc Quyền',
      text: `Chào mừng bạn đến với Vietnam Unveiled! Mã ưu đãi của bạn: UNVEILED-VIP2026 (Giảm 15% du thuyền Hạ Long & tour Hội An). Hãy truy cập http://localhost:3000/planner để lên lịch trình ngay.`,
      html: htmlContent,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(`[Email Sent] Message ID: ${info.messageId}`);
    if (previewUrl) {
      console.log(`[Email Preview URL]: ${previewUrl}`);
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl,
    };
  } catch (err: any) {
    console.error('Failed to send newsletter welcome email:', err);
    return {
      success: false,
      error: err.message || 'Lỗi gửi email',
    };
  }
}
