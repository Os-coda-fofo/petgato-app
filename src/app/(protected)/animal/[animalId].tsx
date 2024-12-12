import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';
import Header from '../../../components/Header';


const AnimalInfoScreen = () => {

  const {animalId} = useLocalSearchParams();

  console.log(animalId);
    
    const mockPets = [
        {
          id: 1,
          nome: 'Bidu',
          sexo: 'Macho',
          porte: 'Médio',
          idade: 'Adulto',
          localizacao: 'Samambaia Sul - Distrito Federal',
          castrado: 'Não',
          vermifugado: 'Sim',
          vacinado: 'Não',
          doencas: 'Nenhuma',
          temperamento: 'Calmo e dócil',
          exigencias: 'Termo de adoção, fotos da casa, visita prévia e acompanhamento durante três meses',
          descricao: 'Bidu é um cão muito dócil e de fácil convivência. Adora caminhadas e se dá muito bem com crianças. Tem muito medo de raios e de chuva, nesses momentos ele requer mais atenção. Está disponível para adoção pois eu e minha família o encontramos na rua e não podemos mantê-lo em nossa casa.'


        },
        {
          id: 2,
          nome: 'Branquinha',
          sexo: 'Fêmea',
          porte: 'Pequeno',
          idade: 'Filhote',
          localizacao: 'Taguatinga Norte - Distrito Federal',
          castrado: 'Não',
          vermifugado: 'Sim',
          vacinado: 'Não',
          doencas: 'Nenhuma',
          temperamento: 'Calma e dócil',
          exigencias: 'Termo de adoção, fotos da casa, visita prévia e acompanhamento durante três meses',
          descricao: 'Branquinha é uma cadela muito dócil e de fácil convivência. Adora brincar e se dá muito bem com crianças. Está disponível para adoção pois eu e minha família a encontramos na rua e não podemos mantê-la em nossa casa.'
        },
        {
          id: 3,
          nome: 'Rex',
          sexo: 'Macho',
          porte: 'Grande',
          idade: 'Filhote',
          localizacao: 'Ceilândia Sul - Distrito Federal',
          castrado: 'Não',
          vermifugado: 'Sim',
          vacinado: 'Não',
          doencas: 'Nenhuma',
          temperamento: 'Brincalhão e dócil',
          exigencias: 'Termo de adoção, fotos da casa, visita prévia e acompanhamento durante três meses',
          descricao: 'Rex é um cão muito brincalhão e de fácil convivência. Adora brincar e se dá muito bem'
        },
      ];
      const pet = mockPets.find((animal) => animal.id.toString() === animalId.toString());

      if (!pet) {
        return (
          <View style={styles.container}>
            <Text>Animal não encontrado.</Text>
          </View>
        );
      }

  

  return (
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <StatusBar backgroundColor={"#ffee29b"} barStyle={"light-content"} />
      
        <View key={pet.id}>
          <Header title={pet.nome} />
          
          <Image 
            style={styles.imageBox}
            source={require('../../../../assets/bidu.png')} 
            resizeMode="cover" />
          
          <View style={styles.body}>
            <Text style={{color: "#434343", left: 20, fontWeight: 'bold'}}>{pet.nome}</Text>
            <View style={styles.inline}>
              <View style={styles.infoblock}>
                <Text style={{color: '#f7a800'}}>SEXO</Text>
                <Text style={{color: "#757575"}}>{pet.sexo}</Text>
              </View>
              <View style={styles.infoblock}>
              <Text style={{color: '#f7a800'}}>PORTE</Text>
                <Text style={{color: "#757575"}}>{pet.porte}</Text>
              </View>
              <View style={styles.infoblock}>
              <Text style={{color: '#f7a800'}}>IDADE</Text>
                <Text style={{color: "#757575"}}>{pet.idade}</Text>
              </View>
            </View>
            <View style={styles.infoblock}>
            <Text style={{color: '#f7a800'}}>LOCALIZAÇÃO</Text>
              <Text style={{color: "#757575"}}>{pet.localizacao}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.inline}>
            <View style={styles.infoblock}>
            <Text style={{color: '#f7a800'}}>CASTRADO</Text>
              <Text style={{color: "#757575"}}>{pet.castrado}</Text>
            </View>
            <View style={styles.infoblock}>
            <Text style={{color: '#f7a800'}}>VERMIFUGADO</Text>
            <Text style={{color: "#757575"}}>{pet.vermifugado}</Text>
            </View>
            </View>
            <View style={styles.inline}>
            <View style={styles.infoblock}>
            <Text style={{color: '#f7a800'}}>VACINADO</Text>
            <Text style={{color: "#757575"}}>{pet.vacinado}</Text>
            </View>
            <View style={styles.infoblock}>
            <Text style={{color: '#f7a800'}}>DOENÇAS</Text>
            <Text style={{color: "#757575"}}>{pet.doencas}</Text>
            </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.infoblock}>
            <Text style={{color: '#f7a800'}}>TEMPERAMENTO</Text>
            <Text style={{color: "#757575"}}>{pet.temperamento}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.infoblock}>
            <Text style={{color: '#f7a800'}}>EXIGÊNCIAS DO DOADOR</Text>
            <Text style={{maxWidth: 320, color: "#434343"}}>{pet.exigencias}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.infoblock}>
            <Text style={{color: '#f7a800'}}>MAIS SOBRE {pet.nome.toUpperCase()}</Text>
            <Text style={{maxWidth: 320, color: "#434343"}}>{pet.descricao}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="PRETENTO ADOTAR" onPress={() => router.push('/confirmacao')} variant="default" />
            </View>
          </View>    
        </View>
        
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
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
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
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
