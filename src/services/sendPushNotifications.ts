import { getDoc, doc } from "firebase/firestore";
import { db } from "./auth/firebase-config";

export async function sendAdoptionNotification(animalId: string, animalName: string, adopterName: string) {
  console.log("📡 Buscando informações do animal para notificar o dono...");

  // 🔥 Primeiro, buscamos os dados do animal para obter o ownerId (dono do animal)
  const animalDoc = await getDoc(doc(db, "animals", animalId));

  if (!animalDoc.exists()) {
    console.error("❌ Animal não encontrado no Firestore.");
    return;
  }

  const animalData = animalDoc.data();
  const ownerId = animalData.owner; // Obtendo o ID do dono do animal

  console.log(`✅ Dono do animal encontrado: ${ownerId}`);

  // 🔥 Agora buscamos os dados do dono do animal
  const userDoc = await getDoc(doc(db, "users", ownerId));

  if (!userDoc.exists()) {
    console.error("❌ Usuário dono do animal não encontrado no Firestore.");
    return;
  }

  const notificationToken = userDoc.data().expoPushToken;
  console.log("✅ Token de notificação encontrado:", notificationToken);

  if (!notificationToken) {
    console.warn("⚠️ O dono do animal não tem um token de notificação registrado.");
    return;
  }

  try {
    console.log("📢 Enviando push notification...");

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: notificationToken.data,
        sound: "default",
        title: "Novo Interesse na Adoção!",
        body: `${adopterName} quer adotar ${animalName}. Veja os detalhes!`,
        data: { screen: "/myAnimals/myAnimal/candidate", animalId: animalId },
      }),
    });

    console.log("✅ Notificação enviada com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao enviar notificação:", error);
  }
}
