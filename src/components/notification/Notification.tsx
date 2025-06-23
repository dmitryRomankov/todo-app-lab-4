import { useEffect, useState } from 'react';
import './Notification.css';

type NotificationType = 'add' | 'remove';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: NotificationType) => {
    const id = crypto.randomUUID();
    const notification: Notification = { id, message, type };

    setNotifications((prev) => {
      const next = [...prev, notification];
      return next.slice(-3);
    });

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  useEffect(() => {
    const handleAdd = () => addNotification('Task added successfully', 'add');
    const handleRemove = () =>
      addNotification('Task has been removed', 'remove');

    window.addEventListener('task-added', handleAdd);
    window.addEventListener('task-removed', handleRemove);

    return () => {
      window.removeEventListener('task-added', handleAdd);
      window.removeEventListener('task-removed', handleRemove);
    };
  }, []);

  const handleManualClose = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="notification-container">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`notification ${n.type === 'add' ? 'success' : 'error'}`}
        >
          <span>{n.message}</span>
          <button className="close-btn" onClick={() => handleManualClose(n.id)}>
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};
