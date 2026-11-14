import { NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/subscribers';

export async function GET() {
  try {
    const subscribers = getSubscribers();
    return NextResponse.json({
      success: true,
      subscribers,
      total: subscribers.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tải danh sách người đăng ký', error: error.message },
      { status: 500 }
    );
  }
}
