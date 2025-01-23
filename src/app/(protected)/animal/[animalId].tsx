import { router, useLocalSearchParams } from 'expo-router';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { db } from '../../../services/auth/firebase-config';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';

const AnimalInfoScreen = () => {

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
  
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  const handleConfirmAdoption = () => {
    router.push('/confirmacao/');
  };
    
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const docRef = doc(db, 'animals/'+ animalId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPet(docSnap.data() as Pet);
        } else {
          console.log('Animal não encontrado no banco de dados');
          setPet(null);
        }
      } catch (error) {
        console.error('Erro ao buscar o animal:', error);
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [animalId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f7a800" />
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.notFound}>
        <Text>Animal não encontrado.</Text>
      </View>
    );
  }

  const Divider = () => { 
    return <View style={{ height: 1, backgroundColor: "#E0E0E0", marginHorizontal: 20 }} /> 
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={"#ffee29b"} barStyle={"dark-content"} />

        <View key={pet.id}>
          <Header title={pet.name} />

          <Image 
          style={styles.imageBox}
          source={{ uri: pet.photos[0] }} 
          resizeMode="cover" 
          />

          <View style={styles.body}>
            <Text style={{ fontFamily: "Roboto_500Medium", fontSize: 16, color: "#434343", }}>{pet.name}</Text>
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

              <View style={styles.infoblock}>
                <Text style={styles.title}>LOCALIZAÇÃO</Text>
                <Text style={styles.text}>{pet.city}</Text>
              </View>

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

          <View style={styles.buttonContainer}>
            <Button title="PRETENDO ADOTAR" onPress={handleConfirmAdoption} variant="default" />
          </View>
        </View>    
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
  },

  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#f7a800',
    fontSize: 12,
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

  body: {
    top: 100,
  },

  inline:{
    flex: 1,
    flexDirection: 'row',
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
    height: 35,
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

});

export default AnimalInfoScreen;
