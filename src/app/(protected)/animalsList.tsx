import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';


const AnimalInfoScreen = () => {
  const mockPets = [
    {
      id: 1,
      nome: 'Bidu',
      sexo: 'Macho',
      porte: 'Médio',
      idade: 'Adulto',
      localizacao: 'Samambaia Sul - Distrito Federal',
      imagem: require('../../../assets/bidu.png'),
    },
    {
      id: 2,
      nome: 'Branquinha',
      sexo: 'Fêmea',
      porte: 'Pequeno',
      idade: 'Filhote',
      localizacao: 'Taguatinga Norte - Distrito Federal',
      imagem: require('../../../assets/bidu.png'),
    },
    {
      id: 3,
      nome: 'Rex',
      sexo: 'Macho',
      porte: 'Grande',
      idade: 'Filhote',
      localizacao: 'Ceilândia Sul - Distrito Federal',
      imagem: require('../../../assets/bidu.png'),
    },
    {
      id: 4,
      nome: 'Mel',
      sexo: 'Fêmea',
      porte: 'Pequeno',
      idade: 'Filhote',
      localizacao: 'Gama - Distrito Federal',
      imagem: require('../../../assets/bidu.png'),
    },
    {
      id: 5,
      nome: 'Branquinho',
      sexo: 'Macho',
      porte: 'Médio',
      idade: 'Adulto',
      localizacao: 'Samambaia Norte - Distrito Federal',
      imagem: require('../../../assets/bidu.png'),
    },

  ];

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
        <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />

        <Header title="Adotar" />

      {mockPets.map((pet) => (
        <View key={pet.id} style={styles.card}>
          
          <View>
            <TouchableOpacity
              key={pet.id}
              onPress={() => router.push(`./animal/${pet.id}`)} // Navega para a tela de detalhes
              >
            <Text style={styles.name}>{pet.nome}</Text>
            <Image source={pet.imagem} style={styles.image} />
            <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:50}}>
            <Text style={styles.info}>{pet.sexo}</Text>
            <Text style={styles.info}>{pet.idade}</Text>
            <Text style={styles.info}>{pet.porte}</Text>
            </View>
            <Text style={[styles.info,{alignSelf:"center"}]}>{pet.localizacao}</Text>
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



export default AnimalInfoScreen;

