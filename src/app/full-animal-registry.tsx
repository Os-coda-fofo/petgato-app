import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { useSession } from '../services/auth/ctx';
import Header from '../components/Header';

const FullAnimalRegistry = () => {
    const router = useRouter();
    const { user } = useSession();
    return (
        <View style={styles.container}>
          <StatusBar backgroundColor={"#ffd358"} barStyle={"dark-content"} />

          <Header title="Cadastro realizado" variant="yellow"/>
  
          <Text style={styles.title}>Eba!</Text>
          <Text style={[ styles.subtitle, { color: '#757575' }]}> O cadastro do seu pet foi realizado com sucesso!{"\n"}</Text>
          <Text style={[ styles.subtitle, { color: '#757575' }]}> 
            Certifique-se que permitiu o envio de{"\n"}
            notificações por push no campo{"\n"}
            privacidade do menu configurações do{"\n"}
            aplicativo. Assim, poderemos te avisar{"\n"}
            assim que alguém interessado entrar{"\n"}
            em contato!
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="MEUS PETS" onPress={() => router.push(`./myAnimals/${user.uid}`)} variant="default"  />
          </View>
        </View>
    );
}

export const screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },

  title: {
    fontSize: 72,
    color: '#ffd358', // Cor amarela
    fontFamily: 'CourgetteRegular',
    marginBottom: 52
  },

  subtitle: {
    maxWidth: 300,
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    marginBottom: 48
  },

  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 122,
    height: 44,
    marginTop: 68,
  },

  menuIcon : {
    position: 'absolute',
    top: 16,
    left: 16,
  },
});

export default FullAnimalRegistry;
