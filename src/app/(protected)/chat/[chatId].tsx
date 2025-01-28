import { useLocalSearchParams } from 'expo-router';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { auth, db } from '../../../services/auth/firebase-config';


export default function Chat() {
    interface User {
        uid: string;
        name: string;
        pfpimage: string;
        email: string;
      }

    const {chatId} = useLocalSearchParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const userId = auth.currentUser?.uid;
  const [user, setUser] = useState<User | null>();
  


  useEffect(() => {
    
    // Listener para carregar mensagens do Firebase em tempo real
    const messagesRef = collection(db, 'chats');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs
            .map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(), 
            user: data.user,
            groupChatId: data.groupChatId
          };
        })
        .filter(chat => chat.groupChatId === chatId);
        setMessages(fetchedMessages); 
      });

    return () => unsubscribe();
  }, [userId]);

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    const { _id, createdAt, text, user } = messages[0];
    const groupChatId = chatId;
    const messagesRef = collection(db, 'chats');
    setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
    await addDoc(messagesRef, { _id, createdAt, text, user, groupChatId });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage = {true}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId || "defaut",
        name: user?.name || "defaut",
        avatar: user?.pfpimage || "https://i.pravatar.cc/300"
      }}
    />
  );
}

