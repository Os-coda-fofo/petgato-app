import { 
  addDoc, 
  collection, 
  doc, 
  getDoc, 
  onSnapshot, 
  orderBy, 
  query, 
  serverTimestamp 
} from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { db } from '../../../services/auth/firebase-config';
import { useSession } from '../../../services/auth/ctx';

interface User {
  uid: string;
  name: string;
  pfpimage: string;
  email: string;
}

export default function Chat() {
  const { user: sessionUser } = useSession();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userChat, setUserChat] = useState<User | null>(null);

  useEffect(() => {
    if (!sessionUser?.uid) return;

    (async () => {
      try {
        const docRef = doc(db, 'users', sessionUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserChat(docSnap.data() as User);
        } else {
          console.log('Usuário não encontrado no banco de dados');
          setUserChat(null);
        }
      } catch (error) {
        console.error('Erro ao buscar o user:', error);
        setUserChat(null);
      }
    })();
  }, [sessionUser?.uid]);

  useEffect(() => {
    const messagesRef = collection(db, 'chats');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          user: data.user,
        };
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    if (!newMessages.length) return;
    const [message] = newMessages;

    // Inserimos a mensagem no Firestore usando serverTimestamp
    await addDoc(collection(db, 'chats'), {
      _id: message._id,
      text: message.text,
      createdAt: serverTimestamp(),
      user: message.user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage
      onSend={onSend}
      user={{
        _id: sessionUser?.uid || "default",
        name: userChat?.name || "default",
        avatar: userChat?.pfpimage || "https://i.pravatar.cc/300"
      }}
    />
  );
}
