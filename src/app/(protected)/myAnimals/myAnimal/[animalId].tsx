import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import { db } from '../../../../services/auth/firebase-config';
import Loading from '../../../../components/Loading';
import PagerView from 'react-native-pager-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyAnimalInfoScreen = () => {

  const {animalId} = useLocalSearchParams();
  interface Pet {
    owner: string;
    id: string;
    name: string;
    gender: string;
    size: string;
    age: string;
    diseases: string;
    about: string;
    species: string;
    photos: string[];
    brincalhao: boolean;
    timido: boolean;
    calmo: boolean;
    guarda: boolean;
    amoroso: boolean;
    preguicoso: boolean;
    vacinado: boolean;
    vermifugado: boolean;
    castrado:boolean;
    doente: boolean;
    termo: boolean;
    fotos: boolean;
    visita: boolean;
    acompanhamento: boolean;
    acompanhamentoTempo: string;
  }

  interface Owner {
    city: string;
  }

  const [pet, setPet] = useState<Pet | null>(null);
  const [ownerLocation, setOwnerLocation ] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const docRef = doc(db, `animals/${animalId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const petData = docSnap.data() as Pet;
          setPet(petData);

          const ownerRef = doc(db, `users/${petData.owner}`);
          const ownerSnap = await getDoc(ownerRef);

          if (ownerSnap.exists()) {
            const ownerData = ownerSnap.data();
            const ownerLocalidade = ownerData.city || 'Não disponível';
            setPet((prev) => prev ? { ...prev, localidade: ownerLocalidade } : prev);
          } else {
            console.log('Dono não encontrado no banco de dados');
            setPet((prev) => prev ? { ...prev, localidade: 'Não disponível' } : prev);
          }
        } else {
          console.log('Animal não encontrado no banco de dados');
          setPet(null);
        }
      } catch (error) {
        console.error('Erro ao buscar o animal ou dono:', error);
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [animalId]);


  if (loading) {
    return <Loading />;
  }

  if (!pet) {
    return
  }

  const Divider = () => { 
    return <View style={{ height: 1, backgroundColor: "#E0E0E0", marginHorizontal: 20 }} /> 
  }

  return (
    <View style={styles.container}>

      <Header title={pet.name} showBackButton showShareIcon onBackPress={() => router.back()}/>
      <StatusBar backgroundColor={"#88c9bf"} />

      <ScrollView style={{ flexGrow: 1 }}>
        <View key={pet.id}>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {}}
            >
              <MaterialCommunityIcons name="pencil" size={24} color="#434343" />
            </TouchableOpacity>

            <PagerView style={{ height: 300 }} initialPage={0}>
              {pet.photos.map((photo, index) => (
                <View key={index}>
                  <Image 
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: photo }} 
                    resizeMode="cover" 
                  />
                </View>
              ))}
            </PagerView>
          
          <View >
            <Text style={{ fontFamily: "Roboto_500Medium", fontSize: 16, color: "#434343", paddingTop: 24, paddingLeft: 32 }}>{pet.name}</Text>

            <View style={styles.inline}>
              <View style={styles.infoblock}>
                <Text style={styles.title}>SEXO</Text>
                <Text style={styles.text}>{pet.gender}</Text>
              </View>

              <View style={styles.infoblock}>
                <Text style={styles.title}>PORTE</Text>
                <Text style={styles.text}>{pet.size}</Text>
              </View>

              <View style={styles.infoblock}>
                <Text style={styles.title}>IDADE</Text>
                <Text style={styles.text}>{pet.age}</Text>
              </View>

            </View>
            <View style={styles.infoblock}>
              <Text style={styles.title}>LOCALIZAÇÃO</Text>
              <Text style={styles.text}>{pet.localidade || "Não encontrada"}</Text>
            </View>

            <Divider />

            <View style={styles.inline}>

              <View style={styles.infoblock}>
                <Text style={styles.title}>CASTRADO</Text>
                <Text style={styles.text}>{pet.castrado  ? 'Sim' : 'Não'}</Text>
              </View>

              <View style={styles.infoblock}>
                <Text style={styles.title}>VERMIFUGADO</Text>
                <Text style={styles.text}>{pet.vermifugado ? 'Sim' : 'Não'}</Text>
              </View>

            </View>

            <View style={styles.inline}>
            <View style={styles.infoblock}>
              <Text style={styles.title}>VACINADO</Text>
              <Text style={styles.text}>{pet.vacinado  ? 'Sim' : 'Não'}</Text>
            </View>
            <View style={styles.infoblock}>
              <Text style={styles.title}>DOENÇAS</Text>
              <Text style={styles.text}>{pet.doente  ? 'Sim' : 'Nenhuma'}</Text>
            </View>
            </View>
            <Divider />
            <View style={styles.infoblock}>
            <Text style={styles.title}>TEMPERAMENTO</Text>
            <Text style={styles.text}>{[
    pet.brincalhao && "brincalhão",
    pet.timido && "tímido",
    pet.calmo && "calmo",
    pet.guarda && "guarda",
    pet.amoroso && "amoroso",
    pet.preguicoso && "preguiçoso",
  ]
    .filter(Boolean)
    .join(", ")}</Text>
            </View>
            <Divider />
            <View style={styles.infoblock}>
            <Text style={styles.title}>EXIGÊNCIAS DO DOADOR</Text>
            <Text style={styles.text}>{[
    pet.termo && "Termo de adoção",
    pet.fotos && "Fotos da casa",
    pet.visita && "Visita prévia",
    pet.acompanhamento && `Acompanhamento durante ${pet.acompanhamentoTempo}`,
  ]
    .filter(Boolean)
    .join(", ")}</Text>
            </View>
            <Divider />
            <View style={styles.infoblock}>
            <Text style={styles.title}>MAIS SOBRE {pet.name.toUpperCase()}</Text>
            <Text style={styles.text}>{pet.about}</Text>
            </View>
            <View style={[styles.buttonContainer, { flexDirection: 'row' }]}>
              <View style={{ marginHorizontal: 10, width: 150 }}>
                <Button title="VER INTERESSADOS" onPress={() => router.push(`./candidate/${animalId}`)} variant="main" />
              </View>
              <View style={{ marginHorizontal: 10, width: 150 }}>
                <Button title="REMOVER PET" onPress={() => router.push(`./remove/${animalId}`)} variant="main"/>
              </View>
            </View>
          </View>    
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 64
  },

  title: {
    color: '#f7a800',
    fontSize: 12,
    fontFamily: 'Roboto_500Medium',
  },

  text: {
    color: '#757575',
    fontSize: 14,
  },

  infoBox: {
    backgroundColor: "#e1f7f1",
    margin: 15,
    padding: 15,
    marginTop: 100,
    borderRadius: 8,
    maxWidth: 350,
    alignSelf: 'center',
    alignItems: 'center',
  },

  infoblock: {
    alignItems: "flex-start",
    margin: 16,
    left: 16,
  },

  inline:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: 350,
  },

  horizontalLine: {
    height: 1,
    backgroundColor: "#E0E0E0", 
    marginVertical: 10,
    maxWidth: 320,
    marginLeft: 16,
  },

  imageBox: {
    backgroundColor: "#e6e7e7",
    width: '100%',
    height: 200,
    top: 64,
    alignSelf: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#cfe9e5',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_500Medium',
    color: '#434343',
  },

  inputContainer: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonContainer: {
    width: 250,
    height: 40,
    margin: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  subtitle:{
    maxWidth: 350,
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
  },

  registerBtn: {
    margin: 15,
    marginTop: 50,
    width: '70%',
    alignSelf: 'center',
  },

  editButton: {
    position: 'absolute',
    top: 270,
    right: 16,
    backgroundColor: '#ffff',
    padding: 16,
    borderRadius: 100,
    borderColor: "#000",
    borderWidth: 0.5,
    zIndex: 10,
  }
});

export default MyAnimalInfoScreen;
