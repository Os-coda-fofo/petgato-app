import { useLocalSearchParams } from 'expo-router';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { db } from '../../../services/auth/firebase-config';
import { useSession } from '../../../services/auth/ctx';

export default function Chat() {
  const { chatId } = useLocalSearchParams();
  const { user: sessionUser } = useSession();
  const [ messages, setMessages ] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, 'chats');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            user: data.user,
            groupChatId: data.groupChatId,
          };
        })
        // filtramos para mostrar apenas as mensagens do chat atual
        .filter((msg) => msg.groupChatId === chatId);

      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      if (!newMessages.length) return;
      const message = newMessages[0];

      // Crie no Firestore usando serverTimestamp
      await addDoc(collection(db, 'chats'), {
        _id: message._id,
        text: message.text,
        createdAt: serverTimestamp(),
        user: message.user,
        groupChatId: chatId,
      });
    },
    [chatId]
  );

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage = {true}
      onSend={messages => onSend(messages)}
      user={{
        _id: sessionUser?.uid || "default",
        name: sessionUser?.name || "Usuário",
        avatar: sessionUser?.pfpimage || "https://i.pravatar.cc/300"
      }}
    />
  );
}

