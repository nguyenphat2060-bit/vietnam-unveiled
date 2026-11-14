import { NextResponse } from 'next/server';
import { getBankSettings, saveBankSettings, BankSettings } from '@/lib/bankSettings';

export async function GET() {
  try {
    const settings = getBankSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tải thông tin ngân hàng.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.bankId || !body.accountNo || !body.accountName) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng điền đầy đủ Mã ngân hàng, Số tài khoản và Chủ tài khoản.' },
        { status: 400 }
      );
    }

    const updated = saveBankSettings(body);
    return NextResponse.json({
      success: true,
      message: 'Đã lưu cấu hình thanh toán VietQR thành công!',
      settings: updated
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi cập nhật cấu hình ngân hàng.' },
      { status: 500 }
    );
  }
}
