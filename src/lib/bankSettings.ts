import fs from 'fs';
import path from 'path';

export interface BankSettings {
  bankId: string;
  bankName: string;
  accountNo: string;
  accountName: string;
  branch: string;
  memoPrefix: string;
  customQrUrl?: string;
  supportHotline: string;
  amountMode?: 'fixed' | 'flexible';
  defaultAmount?: number;
  updatedAt: string;
}

const SETTINGS_FILE = path.join(process.cwd(), 'src', 'data', 'bankSettings.json');

const DEFAULT_SETTINGS: BankSettings = {
  bankId: 'MB',
  bankName: 'MBBank (Ngân hàng TMCP Quân Đội)',
  accountNo: '0901888999',
  accountName: 'VIETNAM UNVEILED TRAVEL CORP',
  branch: 'Chi nhánh Hà Nội - Hội sở chính',
  memoPrefix: 'VU-TOUR',
  customQrUrl: '',
  supportHotline: '1900 8888 (24/7 Concierge)',
  amountMode: 'fixed',
  defaultAmount: 15500000,
  updatedAt: new Date().toLocaleDateString('vi-VN')
};

export function getBankSettings(): BankSettings {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), 'utf-8');
      return DEFAULT_SETTINGS;
    }
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading bankSettings.json:', error);
    return DEFAULT_SETTINGS;
  }
}

export function saveBankSettings(newSettings: Partial<BankSettings>): BankSettings {
  const current = getBankSettings();
  const merged: BankSettings = {
    ...current,
    ...newSettings,
    updatedAt: new Date().toLocaleDateString('vi-VN')
  };

  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(merged, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing bankSettings.json:', error);
  }

  return merged;
}

/**
 * Generate VietQR Image URL accepted by all Vietnamese Banking Apps (NAPAS 247)
 */
export function generateVietQrUrl(params: {
  bankId: string;
  accountNo: string;
  accountName: string;
  amount?: number;
  memo: string;
  template?: 'compact' | 'compact2' | 'qr_only';
}): string {
  const { bankId, accountNo, accountName, amount, memo, template = 'compact2' } = params;
  const encodedAccountName = encodeURIComponent(accountName.trim());
  const encodedMemo = encodeURIComponent(memo.trim());

  if (amount && amount > 0) {
    return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodedMemo}&accountName=${encodedAccountName}`;
  } else {
    // Flexible amount: customer types in banking app
    return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?addInfo=${encodedMemo}&accountName=${encodedAccountName}`;
  }
}
