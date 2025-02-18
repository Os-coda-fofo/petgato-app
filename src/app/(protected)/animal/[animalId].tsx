import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { captureRef } from 'react-native-view-shot';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import SharePetCard from '../../../components/SharePetCard';
import { useSession } from '../../../services/auth/ctx';
import { db } from '../../../services/auth/firebase-config';
import { sendAdoptionNotification } from '../../../services/sendPushNotifications';

const AnimalInfoScreen = () => {
  const viewShotRef = useRef(null);
  const { user: sessionUser} = useSession();
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
    localidade: string;
  }

  interface Owner {
    city: string;
  }

  const [pet, setPet] = useState<Pet | null>(null);
  const [ownerLocation, setOwnerLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleConfirmAdoption = async (animalId: string) => {
    console.log("🐾 Botão 'Pretendo Adotar' clicado.");

    try {
      const petRef = doc(db, `animals/${animalId}`);
      console.log("📡 Buscando dados do animal no Firestore...");

      const petSnap = await getDoc(petRef);

      if (!petSnap.exists()) {
        console.error("❌ Animal não encontrado no Firestore.");
        Alert.alert("Erro", "Animal não encontrado.");
        return;
      }

      const petData = petSnap.data();
      console.log("✅ Dados do animal encontrados:", petData);

      if (!sessionUser) {
        console.error("🚨 Usuário não autenticado.");
        Alert.alert("Erro", "Você precisa estar logado para adotar um animal.");
        return;
      }

      console.log(`👤 Usuário autenticado: ${sessionUser.uid}`);

      // Verifica se o usuário já é dono do animal
      if (petData.owner === sessionUser.uid) {
        console.warn("⚠️ O usuário já é o dono do animal.");
        Alert.alert("Aviso", "Você já é o proprietário deste animal.");
        return;
      }

      // Verifica se o usuário está bloqueado
      if (petData.blockedUsers && petData.blockedUsers.includes(sessionUser.uid)) {
        console.warn("🚫 O usuário está bloqueado para adotar este animal.");
        Alert.alert("Erro", "Você está bloqueado de adotar este animal.");
        return;
      }

      console.log("✍️ Adicionando usuário à lista de interessados...");

      // Adiciona o usuário à lista de interessados no Firestore
      await updateDoc(petRef, {
        interestedUsers: arrayUnion(sessionUser.uid),
      });

      console.log("✅ Usuário adicionado à lista de interessados com sucesso!");

      // 🔥 Enviar notificação ao dono do animal
      console.log("📢 Enviando notificação ao dono do animal...");
      await sendAdoptionNotification(petData.owner, petData.name, sessionUser.displayName);

      console.log("✅ Notificação enviada com sucesso!");

      Alert.alert("Sucesso", "Você demonstrou interesse na adoção deste animal.");
    } catch (error) {
      console.error("❌ Erro ao processar adoção:", error);
      Alert.alert("Erro", "Houve um problema ao processar sua solicitação.");
    }
  };

  const handleShare = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        console.log("Compartilhamento não disponível.");
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const docRef = doc(db, `animals/${animalId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const petData = docSnap.data() as Pet;
          setPet(petData);

          if (petData.owner) {
            await fetchOwnerLocation(petData.owner);
          } else {
            console.log('Animal não tem dono.');
            setOwnerLocation(null);
          }
        } else {
          console.log('Animal não encontrado.');
          setPet(null);
        }

      } catch (error) {
        console.error('Erro ao buscar o animal:', error);
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchOwnerLocation = async (ownerId: string) => {
      try {
        const ownerRef = doc(db, `users/${ownerId}`);
        const ownerSnap = await getDoc(ownerRef);

        if (ownerSnap.exists()) {
          const ownerData = ownerSnap.data() as Owner;
          setOwnerLocation(ownerData.city || 'Localização não disponível');
          console.log('Localização do owner:', ownerData.city);
        } else {
          console.log('Usuário owner não encontrado no banco de dados');
          setOwnerLocation(null);
        }
      } catch (error) {
        console.error('Erro ao buscar a localização do owner:', error);
        setOwnerLocation(null);
      }
    };

    fetchPet();
  }, [animalId]);

  if (loading) {
    return <Loading />;
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
    <>
      <Header title={pet.name} variant="yellow" showBackButton showShareIcon onSharePress={handleShare} onBackPress={() => router.back()} />
      <View style={styles.container}>
        <StatusBar backgroundColor={"#f7a800"} barStyle={"light-content"} />

        <ScrollView style={{ flex: 1 }}>

          <View key={pet.id}>

            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => {}}
            >
              <AntDesign name="hearto" size={24} color="#434343" />
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

            <View>
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
              <Text style={styles.text}>{ownerLocation}</Text>
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
              <Button title="PRETENDO ADOTAR" onPress={() => handleConfirmAdoption(animalId)} variant="default" />
            </View>
          </View>    
          </View>

        </ScrollView>
        <View style={{ position: "absolute", left: -9999  }}>
          <SharePetCard 
            ref={viewShotRef}
            name={pet.name}
            age={pet.age}
            temperament={[
                "timido",
                "calmo",
                "brincalhão",
            ]}
            photo={pet.photos}
            location={pet.localidade}
            about={pet.about}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 64,
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
    backgroundColor: '#e1f7f1',
    margin: 15,
    padding: 15,
    marginTop: 100,
    borderRadius: 8,
    maxWidth: 350,
    alignSelf: 'center',
    alignItems: 'center',
  },

  infoblock: {
    alignItems: 'flex-start',
    margin: 16,
    left: 16,
  },

  inline:{
    flex: 1,
    flexDirection: 'row',
  },

  horizontalLine: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
    maxWidth: 320,
    marginLeft: 16,
  },

  inputContainer: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonContainer: {
    width: 250,
    alignSelf: 'center',
    marginVertical: 16,
  },

  subtitle:{
    maxWidth: 350,
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
  },

  likeButton: {
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

export default AnimalInfoScreen;
