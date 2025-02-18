import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Bubble, GiftedChat, IMessage, InputToolbar, Send } from 'react-native-gifted-chat';
import Header from '../../../components/Header';
import { useSession } from '../../../services/auth/ctx';
import { db } from '../../../services/auth/firebase-config';

interface User {
  uid: string;
  name: string;
  pfpimage: string;
  email: string;
}

export default function Chat() {
  const { chatId } = useLocalSearchParams();
  const { user: sessionUser } = useSession();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userChat, setUserChat] = useState<User | null>(null);
  const [chatPartner, setChatPartner] = useState<User | null>(null);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#88c9bf', // Verde-claro para remetente
            padding: 8,
            borderRadius: 10,
          },
          left: {
            backgroundColor: '#f0f0f0', // Cinza-claro para recebido
            padding: 8,
            borderRadius: 10,
          },
        }}
        textStyle={{
          right: { color: '#fff' }, // Texto branco para remetente
          left: { color: '#333' },  // Texto escuro para recebido
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          borderRadius: 25, // Deixa arredondado
          marginHorizontal: 10,
          marginBottom: 5,
        }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome name="send" size={24} color="#88c9bf" />
        </View>
      </Send>
    );
  };

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
    if (!chatId) return;

    const groupChatRef = doc(db, 'groupChats', chatId as string);

    const unsubscribe = onSnapshot(groupChatRef, async (docSnap) => {
      const data = docSnap.data();
      if (data && data.messages) {
        const fetchedMessages = data.messages.map((msg: any) => ({
          _id: msg._id,
          text: msg.text,
          createdAt: new Date(msg.createdAt), // Parse da string para Date
          user: msg.user,
        }));
        fetchedMessages.sort((a: { createdAt: Date }, b: { createdAt: Date }) => b.createdAt.getTime() - a.createdAt.getTime());
        setMessages(fetchedMessages);

        // Buscar informações do parceiro de chat
        const partnerId = data.owner === sessionUser.uid ? data.client : data.owner;
        const partnerRef = doc(db, 'users', partnerId);
        const partnerSnap = await getDoc(partnerRef);
        if (partnerSnap.exists()) {
          setChatPartner(partnerSnap.data() as User);
        }
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [chatId, sessionUser.uid]);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      if (!newMessages.length) return;
      const message = newMessages[0];

      const newMessage = {
        _id: message._id,
        text: message.text,
        createdAt: new Date().toISOString(), // Salva como string
        user: message.user,
      };

      const groupChatRef = doc(db, 'groupChats', chatId as string);

      await updateDoc(groupChatRef, {
        messages: arrayUnion(newMessage),
      });
    },
    [chatId]
  );

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={chatPartner ? chatPartner.name : 'Usuário'}
        showBackButton
        onBackPress={() => router.back()}
        variant="default"
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: sessionUser?.uid || 'default',
          name: userChat?.name || 'Usuário',
          avatar: userChat?.pfpimage || 'https://i.pravatar.cc/300',
        }}
        showAvatarForEveryMessage={true}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />
    </View>
  );
}