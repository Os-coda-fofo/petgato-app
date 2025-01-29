import { router } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { auth, db } from '../services/auth/firebase-config';

interface Chat {
    id:string
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
    pid: string,
    name: string;
  }

export default function ChatList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const currentUserId = auth.currentUser?.uid;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        const fetchedUsers = querySnapshot.docs
          .map(doc => ({ uid: doc.id, ...doc.data() } as User))
          .filter(user => user.uid !== currentUserId); // Exclui o usuário atual
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    const fetchChats = async () => {
        try {
          const chatsRef = collection(db, 'groupChats');
          const querySnapshot = await getDocs(chatsRef);
          const fetchedChats = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as Chat))
            .filter(chat => (chat.owner == currentUserId) || (chat.client == currentUserId)); // procura qual chat o usuário tem
          setChats(fetchedChats);
        } catch (error) {
          console.error('Erro ao buscar usuários:', error);
        }
      };
      const fetchPets = async () => {
        try {
          const PetsRef = collection(db, 'animals');
          const querySnapshot = await getDocs(PetsRef);
          const fetchedPets = querySnapshot.docs
            .map(doc => ({ pid: doc.id, ...doc.data() } as Pet))
          setPets(fetchedPets);
        } catch (error) {
          console.error('Erro ao buscar pet:', error);
        }
      };
    fetchPets();
    fetchChats();
    fetchUsers();
  }, [currentUserId]);

  const handleChatOpen = (chatId: string) => { 
    router.push(`/chat/${chatId}`); // Redireciona para o chat com o usuário específico


 };

 return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Seus Chats</Text>
      {chats.length > 0 ? (
        chats.map(chat => (
          <TouchableOpacity key={chat.id} style={styles.chatItem} onPress={() => handleChatOpen(chat.id)}>
            <Text style={styles.chatText}>
              {`Chat com: ${
                users.find(user => user.uid === (chat.client === currentUserId ? chat.owner : chat.client))?.name || 'Usuário'
              }`}
            </Text>
            <Text style={styles.chatSubText}>Nome do Pet: {pets.find(pet => pet.pid === chat.petId)?.name || 'Desconhecido'}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noChats}>Nenhum chat encontrado.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chatText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noChats: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});