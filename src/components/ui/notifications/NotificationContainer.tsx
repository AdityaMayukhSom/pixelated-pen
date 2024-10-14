import { useAppSelector } from "devstream/aurelia/hooks";
import { Notification } from "./Notification";

export const NotificationContainer = () => {
  //   const { notifications, dismissNotification } = useNotifications();

  const notifications = useAppSelector((state) => state.notifications);

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end space-y-4 px-4 py-6 sm:items-start sm:p-6"
    >
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
