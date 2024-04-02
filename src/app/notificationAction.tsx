'use server';

import Notification from './api/notification/logic';

export async function completeNotificationItem(id: string) {
  const notification = new Notification();
  await notification.delete(id);
}
