'use client';
import React, { useState } from 'react';
import { completeNotificationItem } from '~/app/notificationAction';
import { dmSans } from '~/font';
import { useClickOutside } from '~/hooks/useClickOutside';

type Notification = {
  id: string;
  isRead: boolean;
  message: string;
  createdAt: Date;
};

const BellIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
    />
  </svg>
);

type Props = {
  notifications: Notification[];
};
const NotificationDropdown = (props: Props) => {
  const [openDropdown, toggleDropdown] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>(
    props.notifications
  );

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const notificationNum = () => {
    if (!notifications?.length) return null;
    if (notifications.length > 10) return '10+';
    return notifications.length;
  };
  const numNotif = notificationNum();

  return (
    <div className={`${dmSans.className} relative`} ref={dropdownRef}>
      <button
        onClick={() => toggleDropdown(true)}
        className={`flex cursor-pointer relative `}
      >
        {Boolean(notifications.length) && (
          <div
            className={`flex absolute flex-grow -top-2 -right-1 text-[8px] rounded-full bg-slate-600 items-center justify-center text-white ${
              numNotif === '10+' ? 'w-[18px] h-[18px]' : 'w-4 h-4'
            }`}
          >
            {numNotif}
          </div>
        )}
        <BellIcon />
      </button>
      {openDropdown && Boolean(notifications.length) && (
        <div className="z-50 flex flex-col gap-3 text-sm w-[250px] absolute top-6 -right-0 shadow-lg border border-stone-500/20 bg-white shadow-stone-500/40 py-4 rounded-lg">
          <span className="text-center text-base font-medium">
            Notifications
          </span>
          {notifications.map(notif => (
            <button
              onClick={async () => {
                setNotifications(prev => prev.filter(p => p.id !== notif.id));
                toggleDropdown(false);
                completeNotificationItem(notif.id);
              }}
              className="flex flex-wrap cursor-pointer text-sm px-3 py-3 hover:bg-gray-200 border-t border-gray-200"
              key={notif.id}
            >
              {notif.message}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
