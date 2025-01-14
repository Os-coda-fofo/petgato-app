import { router, useLocalSearchParams } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { db } from '../../services/auth/firebase-config';



const MyAnimalsInfoScreen = () => {
  
  const {ownerId} = useLocalSearchParams();
  interface Pet {
    id: string;
    name: string;
    photos: string;
    gender: string;
    age: string;
    size: string;
  }

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'animals'), where('owner', '==', ownerId)));
        const petsData = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Pet, 'id'>;
          return {
            id: doc.id,
            ...data,
          };
        });
        setPets(petsData);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#88c9bf" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }


  return (
    <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
        <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />

        <Header title="Meus Pets" />

      {pets.map((pet) => (
        <View key={pet.id} style={styles.card}>
          
          <View>
            <TouchableOpacity
              key={pet.id}
              onPress={() => router.push(`./myAnimal/${pet.id}`)} // Navega para a tela de detalhes
              >
            <Text style={styles.name}>{pet.name}</Text>
            <Image source={{ uri: pet.photos[0] }} style={styles.image} />
            <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:50}}>
            <Text style={styles.info}>{pet.gender}</Text>
            <Text style={styles.info}>{pet.age}</Text>
            <Text style={styles.info}>{pet.size}</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={{margin:70}}/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#fafafa',
      },
  card: {
    backgroundColor: '#fff',
    
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
    width: '90%',
    elevation: 4, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 100,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  
  name: {
    backgroundColor: '#fee29b',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 5,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  scroll: {
    flex: 1,
  },
});



export default MyAnimalsInfoScreen;

