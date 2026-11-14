import fs from 'fs';
import path from 'path';
import { Subscriber } from '@/types/auth';

const FILE_PATH = path.join(process.cwd(), 'src', 'data', 'subscribers.json');

export function getSubscribers(): Subscriber[] {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading subscribers file:', err);
    return [];
  }
}

export function saveSubscriber(email: string, welcomeEmailSent: boolean = true): Subscriber {
  const subscribers = getSubscribers();
  const existing = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    existing.status = 'active';
    existing.welcomeEmailSent = welcomeEmailSent;
    fs.writeFileSync(FILE_PATH, JSON.stringify(subscribers, null, 2), 'utf-8');
    return existing;
  }

  const newSub: Subscriber = {
    id: `sub-${Date.now()}`,
    email,
    subscribedAt: new Date().toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: 'active',
    welcomeEmailSent
  };

  subscribers.unshift(newSub);
  fs.writeFileSync(FILE_PATH, JSON.stringify(subscribers, null, 2), 'utf-8');
  return newSub;
}
