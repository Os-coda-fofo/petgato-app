import { router } from 'expo-router';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { db } from '../services/auth/firebase-config';
import Loading from '../components/Loading';
import PetCard from '../components/PetCard';

const AnimalInfoScreen = () => {
  interface Pet {
    id: string;
    name: string;
    photos?: string[];
    gender: string;
    age: string;
    size: string;
    owner: string;
    localidade: string;
  }
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'animals'));

        const petsData = await Promise.all(
          querySnapshot.docs.map(async (docs) => {
            const data = docs.data() as Omit<Pet, 'id' | 'localidade'>;
            let localidade = 'Não informada';

            if (data.owner) {
              const ownerDoc = await getDoc(doc(db, 'users', data.owner));
              if (ownerDoc.exists()) {
                const ownerData = ownerDoc.data() as { city?: string };
                localidade = ownerData.city || 'Não informada';
              }
            }

            return {
              id: docs.id,
              ...data,
              localidade,
            };
          })
        );

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
    return <Loading />;
  } 

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100  }}>
      <View style={styles.container}>
      <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />

      <Header title="Adotar" variant="yellow" showMenuButton showSearchIcon onBackPress={() => router.back()} />

      {pets.map((pet) => (
        <PetCard 
          id={pet.id} 
          key={pet.id} 
          name={pet.name} 
          gender={pet.gender} 
          age={pet.age} 
          size={pet.size} 
          localidade={pet.localidade} 
          photos={pet.photos} 
          whereToGo={() => router.push(`./animal/${pet.id}`)}
        />
      ))}
      </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    minHeight: 200,
    resizeMode: 'cover',
    objectFit: 'cover',
  },

  name: {
    backgroundColor: '#fee29b',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    color: '#434343',
    padding: 10,
  },

  info: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#434343',
  },

});

export default AnimalInfoScreen;
