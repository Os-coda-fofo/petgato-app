import Feather from '@expo/vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, StatusBar, Alert } from 'react-native';
import Button from '../components/Button';
import { useSession } from '../services/auth/ctx';
import { useNotification } from '../services/NotificationContext';

const Home = () => {
  const router = useRouter();
  const { user } = useSession();
  const { expoPushToken, notification, error } = useNotification();

  if (error) {
    return <Text style={styles.errorMessage}>Error: {error.message}</Text>;
  }

  if (expoPushToken) {
    console.log(expoPushToken);
  }

  if (notification) {
    console.log(notification);
  }

  const handleMyPets = () => {
    if (user) {
      router.replace(`/myAnimals/${user?.uid}`);
    } else {
      Alert.alert('Usuário não logado', 'Faça login para acessar seus pets');
      router.replace('/login');
    }
  }

  return (
      <View style={styles.container}>
      <Text> {expoPushToken} </Text>
      <Text> {notification?.request.content.title} </Text>
      <Text> {JSON.stringify(notification?.request.content.data, null, 2)} </Text>
      <Text> {error} </Text>
      
        <TouchableOpacity  style={styles.menuIcon} onPress={handleMyPets}>
          <Feather name="menu" size={24} color="#88c9bf" />
        </TouchableOpacity>

        <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />
        <Text style={styles.title}>Olá</Text>
        <Text style={[ styles.subtitle, { color: '#757575' }]}> Bem vindo ao Meau! Aqui você pode adotar, doar e ajudar cães e gatos com facilidade. Qual o seu interesse? </Text>
        
        <View style={styles.buttonContainer}>
          <Button title="ADOTAR" onPress={() => router.push('/animalsList')} variant="default" />
          <Button title="AJUDAR" onPress={() => router.push('/chat/chatsList')} variant="default" />
          <Button title="CADASTRAR ANIMAL" onPress={() => router.push('/registerAnimal')} variant="default" />
        </View>

        <Link href={"/login"} style={styles.btnLogin} asChild>
          <TouchableOpacity>
            <Text style={styles.btnLogin}> login </Text>
          </TouchableOpacity>
        </Link>
        
        <Image style={styles.logo} source={require('../../assets/logo/Meau_marca_2.png')} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fafafa',
  },

  title: {
    fontSize: 72,
    color: '#ffd358',
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
    width: 320,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnLogin: {
    fontSize: 16,
    color: '#88c9bf',
    textAlign: 'center', 
    marginTop: 44,
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

  errorMessage: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default Home;
