import { router, useLocalSearchParams } from 'expo-router';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Loading from '../../../../../components/Loading';
import { useSession } from '../../../../../services/auth/ctx';
import { db } from '../../../../../services/auth/firebase-config';

interface InterestedUser {
  uid: string;
  name: string;
  email: string;
  phone: string;
  photoURL?: string; // Foto de perfil opcional
}

const InterestedListScreen = () => {
const { user: sessionUser } = useSession();
  const { animalId } = useLocalSearchParams();
  const [interestedUsers, setInterestedUsers] = useState<InterestedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterestedUsers = async () => {
      try {
        // Obtém o documento do animal
        const animalRef = doc(db, 'animals', animalId as string);
        const animalSnap = await getDoc(animalRef);

        if (!animalSnap.exists()) {
          console.error('Animal não encontrado.');
          return;
        }

        const animalData = animalSnap.data();
        const interestedUserIds = animalData.interestedUsers || []; // Lista de IDs

        if (interestedUserIds.length === 0) {
          setLoading(false);
          return;
        }

        // Busca os usuários na coleção 'users'
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('__name__', 'in', interestedUserIds));
        const querySnapshot = await getDocs(q);

        const users: InterestedUser[] = querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          ...(doc.data() as InterestedUser),
          uid: doc.id,
        }));

        setInterestedUsers(users);
      } catch (error) {
        console.error('Erro ao buscar interessados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterestedUsers();
  }, [animalId]);

  // Função para aceitar um usuário
  const handleAcceptUser = async (userId: string) => {
    try {
      const animalRef = doc(db, 'animals', animalId as string);
  
      // Atualize o documento do animal
      await updateDoc(animalRef, {
        interestedUsers: [], // Remove todos os interessados
        owner: userId, // Define o novo proprietário
      });
  
      // Limpe a lista de interessados no estado
      setInterestedUsers([]);
  
      console.log(`Usuário ${userId} aceito como novo proprietário.`);
    } catch (error) {
      console.error('Erro ao aceitar usuário:', error);
    }
  };

  // Função para bloquear um usuário
  const handleBlockUser = async (userId: string) => {
    try {
      const animalRef = doc(db, 'animals', animalId as string);
      await updateDoc(animalRef, {
        interestedUsers: arrayRemove(userId), // Remove dos interessados
        blockedUsers: arrayUnion(userId), // Adiciona aos bloqueados (se necessário)
      });

      setInterestedUsers((prev) => prev.filter((user) => user.uid !== userId));
      console.log(`Usuário ${userId} bloqueado.`);
    } catch (error) {
      console.error('Erro ao bloquear usuário:', error);
    }
  };

  const saveChatData = async (userId: string) => {

    try {
      // Crie uma referência para o Firestore
      const groupChatCollectionRef = collection(db, 'groupChats');

      // Crie um objeto com os dados do formulário
      const chatData = {
        owner: sessionUser.uid,
        client: userId,
        petId: animalId
      };

      console.log("Usuário:", userId);
      console.log('Dados do dodo:', sessionUser.uid);
      console.log('Dados do pet:', animalId);
      const chatRef = await addDoc(groupChatCollectionRef, chatData);
      const chatId = chatRef.id;
      console.log('chat criado com sucesso!');
      return chatId;
    } catch (error) {
      console.error('Erro ao salvar o chat:', error);
    }
    
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header title="Interessados" showBackButton onBackPress={() => router.back()} />
      <StatusBar backgroundColor={"#88c9bf"} />
      <FlatList
        data={interestedUsers}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.photoURL && <Image source={{ uri: item.photoURL }} style={styles.avatar} />}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>📧 {item.email}</Text>
            <Text style={styles.phone}>📞 {item.phone}</Text>

            <View style={styles.buttonContainer}>
                <View style={{width: '30%'}}>
                <Button title="Conversar" onPress={async () => {router.push(`../../../chat/${await saveChatData((item.uid))}`)}} variant="default" />
                </View>
                <View style={{width: '30%'}}>
                <Button title="Aceitar" onPress={() => handleAcceptUser(item.uid)} variant="default" />
                </View>
                <View style={{width: '30%'}}>
                <Button title="Bloquear" onPress={() => handleBlockUser(item.uid)} variant="default" />
                </View>
            </View>

          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum interessado encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 64,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribui os botões igualmente
    alignItems: 'center', // Alinha os botões verticalmente
    gap: 8, // Espaço entre os botões
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: '#757575',
  },
  phone: {
    fontSize: 14,
    color: '#757575',
  },
  emptyText: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 16,
    marginTop: 20,
  },
});

export default InterestedListScreen;
