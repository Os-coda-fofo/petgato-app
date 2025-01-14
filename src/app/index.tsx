import Feather from '@expo/vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import { auth } from '../services/auth/firebase-config';

const Home = () => {
  const id = auth.currentUser?.uid;
  const router = useRouter();
  return (
      <View style={styles.container}>
          <TouchableOpacity  style={styles.menuIcon} onPress={() => router.push(`./myAnimals/${id}`)}>
            <Feather name="menu" size={24} color="#88c9bf" />
          </TouchableOpacity>
        <Text style={styles.title}>Olá!</Text>
        <Text style={[ styles.subtitle, { color: '#757575' }]}> Bem vindo ao Meau! Aqui você pode adotar, doar e ajudar cães e gatos com facilidade. Qual o seu interesse? </Text>
        
        <View style={styles.buttonContainer}>
          <Button title="ADOTAR" onPress={() => router.push('/animalsList')} variant="default" />
          <Button title="AJUDAR" onPress={() => router.push('/ajudar')} variant="default" />
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
  }
});

export default Home;
