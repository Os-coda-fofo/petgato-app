import { getDoc, doc } from "firebase/firestore";
import { db } from "./auth/firebase-config";

export async function sendAdoptionNotification( animalOwnerId: string, animalName: string, adopterName: string ) {
  const userDoc = await getDoc(doc(db, "users", animalOwnerId));

  if (userDoc.exists()) {
    const notificationToken = userDoc.data().notificationToken;

    if (notificationToken) {
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: notificationToken,
          sound: "default",
          title: "Novo Interesse na Adoção!",
          body: `${adopterName} quer adotar ${animalName}. Veja os detalhes!`,
          data: { screen: "AdoptionRequests", animalId: animalOwnerId },
        }),
      });
    }
  }
}
