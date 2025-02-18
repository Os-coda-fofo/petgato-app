import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";
import { registerForPushNotificationsAsync } from "./pushNotifications";
import { useSession } from "./auth/ctx";
import { useRouter } from "expo-router";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useSession();
  const router = useRouter();

  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync({ userId: user.uid }).then((token) => {
        console.log("🔔 Expo Push Token: ", token);
        setExpoPushToken(token);
      })
      .catch((e) => {
        console.error("🔔 Error: ", e);
        setError(e);
      });
    }
    
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("🔔 Notification Received: ", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "🔔 Notification Response: ",
          JSON.stringify(response, null, 2),
          JSON.stringify(response.notification.request.content.data, null, 2)
        );

        // Navigate to the screen based on the data in the notification
        const screen = response.notification.request.content.data.screen;
        const animalId = response.notification.request.content.data.animalId;

        if (screen && animalId) {
          console.log("🔔 Navigate to screen: ", screen);
          router.push(`${screen}/${animalId}`);
        }
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [user]);

  return (
    <NotificationContext.Provider value={{ expoPushToken, notification, error }} >
      {children}
    </NotificationContext.Provider>
  );
};
