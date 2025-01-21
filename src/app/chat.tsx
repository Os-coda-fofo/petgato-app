import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { auth, db } from '../services/auth/firebase-config';


export default function Chat() {
    interface User {
        uid: string;
        name: string;
        pfpimage: string;
        email: string;
      }
  const [messages, setMessages] = useState<IMessage[]>([]);
  const userId = auth.currentUser?.uid;
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {
          try {
            const docRef = doc(db, 'users/'+ userId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                setUser(docSnap.data() as User);
            } else {
              console.log('Usuário não encontrado no banco de dados');
              setUser(null);
            }
          } catch (error) {
            console.error('Erro ao buscar o user:', error);
            setUser(null);
          } 
        };

        fetchUser();
    // Listener para carregar mensagens do Firebase em tempo real
    const messagesRef = collection(db, 'chat');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(), 
            user: data.user,
          };
        });
        setMessages(fetchedMessages); 
      });

    return () => unsubscribe();
  }, [userId]);

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    const { _id, createdAt, text, user } = messages[0];
    const messagesRef = collection(db, 'messages');
    setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
    await addDoc(messagesRef, { _id, createdAt, text, user });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage = {true}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId || "defaut",
        name: user?.name || "defaut",
        avatar: user?.pfpimage || "default-avatar"
      }}
    />
  );
}

