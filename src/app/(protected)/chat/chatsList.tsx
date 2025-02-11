import { router } from 'expo-router';
import {
  collection,
  getDocs
} from 'firebase/firestore';
import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { db } from '../../../services/auth/firebase-config';
import { useSession } from '../../../services/auth/ctx';
import Header from '../../../components/Header';

interface Chat {
  id: string;
  owner: string;
  client: string;
  petId: string;
}

interface User {
  uid: string;
  name: string;
  pfpimage: string;
  email: string;
}

interface Pet {
  pid: string;
  name: string;
}

export default function ChatList() {
  const { user: sessionUser } = useSession();
  const currentUserId = sessionUser?.uid;

  const [chats, setChats] = useState<Chat[]>([]);
  
  const [usersMap, setUsersMap] = useState<Record<string, User>>({});
  const [petsMap, setPetsMap] = useState<Record<string, Pet>>({});

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!currentUserId) return;

    (async () => {
      try {
        // Dispara as requisições simultaneamente
        const [usersSnap, chatsSnap, petsSnap] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(collection(db, 'groupChats')),
          getDocs(collection(db, 'animals')),
        ]);

        // Mapeia usuários, exceto o atual
        const tempUsersMap: Record<string, User> = {};
        usersSnap.forEach((doc) => {
          const uid = doc.id;
          if (uid !== currentUserId) {
            tempUsersMap[uid] = {
              uid,
              ...doc.data(),
            } as User;
          }
        });

        // Mapeia pets em um dicionário
        const tempPetsMap: Record<string, Pet> = {};
        petsSnap.forEach((doc) => {
          const pid = doc.id;
          tempPetsMap[pid] = {
            pid,
            ...doc.data(),
          } as Pet;
        });

        // Carrega apenas os chats que pertencem ao usuário atual
        const tempChats: Chat[] = [];
        chatsSnap.forEach((doc) => {
          const chatData = doc.data() as Omit<Chat, 'id'>;
          const chatId = doc.id;
          // Se o chat pertence ao usuário logado (owner ou client), adiciona na lista
          if (chatData.owner === currentUserId || chatData.client === currentUserId) {
            tempChats.push({
              id: chatId,
              ...chatData,
            });
          }
        });

        setUsersMap(tempUsersMap);
        setPetsMap(tempPetsMap);
        setChats(tempChats);
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore:', error);
      }
    })();
  }, [currentUserId]);

  const handleChatOpen = useCallback((chatId: string) => {
    // Redireciona para a tela do chat correspondente
    router.push(`/chat/${chatId}`);
  }, []);

  const renderChatItem = useCallback((chat: Chat) => {
    const isCurrentUserClient = chat.client === currentUserId;
    // Pega o outro usuário (que não seja o atual)
    const otherUserId = isCurrentUserClient ? chat.owner : chat.client;
    const otherUser = usersMap[otherUserId];
    const petData = petsMap[chat.petId];

    const userName = otherUser?.name ?? 'Usuário';
    const petName = petData?.name ?? 'Desconhecido';

    return (
      <TouchableOpacity
        key={chat.id}
        style={styles.chatItem}
        onPress={() => handleChatOpen(chat.id)}
      >
        <Text style={styles.chatText}>Chat com: {userName}</Text>
        <Text style={styles.chatSubText}>Pet: {petName}</Text>
      </TouchableOpacity>
    );
  }, [currentUserId, usersMap, petsMap, handleChatOpen]);

  // Filtra a lista de chats de acordo com o termo de busca
  const filteredChats = chats.filter((chat) => {
    const isCurrentUserClient = chat.client === currentUserId;
    const otherUserId = isCurrentUserClient ? chat.owner : chat.client;
    const otherUserName = usersMap[otherUserId]?.name?.toLowerCase() || '';
    const petName = petsMap[chat.petId]?.name?.toLowerCase() || '';
    const st = searchTerm.toLowerCase();

    // Exemplo: filtrar se o termo aparece no nome do outro usuário OU no nome do pet
    return otherUserName.includes(st) || petName.includes(st);
  });

  const hasChats = filteredChats.length > 0;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f7a800" barStyle="light-content" />
      <Header
        title="Chats"
        showBackButton
        onBackPress={() => router.back()}
        variant="yellow"
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar chats..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {hasChats ? (
          chats.map(renderChatItem)
        ) : (
          <View style={styles.noChatsContainer}>
            <Text style={styles.noChatsText}>Nenhum chat encontrado.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 72,
  },

  chatItem: {
    backgroundColor: '#cfe9e5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 1, // para Android
    shadowColor: '#000', // para iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  chatText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  chatSubText: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },

  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noChatsText: {
    fontSize: 16,
    color: '#999',
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },

  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    borderColor: '#ffd358',
    borderWidth: 1,
  },
});
