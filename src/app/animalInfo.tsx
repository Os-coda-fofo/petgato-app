import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';


const AnimalInfoScreen = () => {

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
        // Adicione mais pets conforme necessário
      ];


  

  return (
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <StatusBar backgroundColor={"#ffee29b"} barStyle={"light-content"} />
      {mockPets.map((pet) => (
        <View>
          <Header title={pet.nome} />
          
          <Image 
            style={styles.imageBox}
            source={require('../../assets/bidu.png')} 
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
        ))}
      
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
