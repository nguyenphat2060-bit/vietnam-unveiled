import { NextResponse } from 'next/server';
import { saveSubscriber } from '@/lib/subscribers';
import { sendWelcomeNewsletterEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Vui lòng cung cấp địa chỉ email hợp lệ.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Địa chỉ email không đúng định dạng. Vui lòng kiểm tra lại.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Send Welcome Email with Nodemailer
    const emailResult = await sendWelcomeNewsletterEmail(cleanEmail);

    // Save to Persistent Storage
    const subscriber = saveSubscriber(cleanEmail, emailResult.success);

    return NextResponse.json({
      success: true,
      message: 'Đăng ký thành công! Vui lòng kiểm tra hộp thư email của bạn.',
      subscriber,
      previewUrl: emailResult.previewUrl || undefined,
    });
  } catch (error: any) {
    console.error('Subscription API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Có lỗi xảy ra khi xử lý đăng ký bản tin. Vui lòng thử lại sau.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
