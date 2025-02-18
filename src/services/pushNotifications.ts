import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./auth/firebase-config";

interface Notification {
  userId: string;
}

export async function registerForPushNotificationsAsync({ userId }: Notification) {
  if (!Device.isDevice) {
    console.log("Notificações push só funcionam em dispositivos reais.");
    return null;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      sound: "default",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("🚫 Permissão negada para notificações.");
    return null;
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(`📲 Expo Push Token obtido para usuário ${userId}: ${token}`);

    if (!userId) {
      console.log("❌ userId não definido.");
      return null;
    }

    await setDoc(doc(db, "users", userId), { expoPushToken: token }, { merge: true });
    console.log(`✅ Token salvo no Firestore para o usuário ${userId}`);

    return token;
  } catch (error) {
    console.error("❌ Erro ao obter o token de notificação:", error);
    return null;
  }
}
