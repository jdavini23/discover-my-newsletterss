import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  InfoCircledIcon, 
  CheckCircledIcon, 
  CrossCircledIcon, 
  ExclamationTriangleIcon 
} from '@radix-ui/react-icons';
import { useNotificationStore } from '../../stores/rootStore';

const NotificationIcon = {
  success: CheckCircledIcon,
  error: CrossCircledIcon,
  warning: ExclamationTriangleIcon,
  info: InfoCircledIcon,
};

const NotificationColor = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
};

export const NotificationCenter: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        removeNotification(notifications[0].id);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications, removeNotification]);

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = NotificationIcon[notification.type];
          const bgColor = NotificationColor[notification.type];

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center p-4 rounded-lg shadow-lg text-white ${bgColor}`}
            >
              <Icon className="w-6 h-6 mr-3" />
              <span>{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4 hover:bg-white/20 rounded-full p-1"
              >
                ✕
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
