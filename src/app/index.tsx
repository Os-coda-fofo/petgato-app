import Feather from '@expo/vector-icons/Feather';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import Button from '../components/Button';
import { DrawerSceneWrapper } from '../components/drawer-scene-wrapper';
import { useSession } from '../services/auth/ctx';


enableScreens();

const Home = () => {
  const router = useRouter();
  const { user, isLoading } = useSession();

  return (
    <DrawerSceneWrapper>
      <View style={styles.container}>
        <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />

        <Feather style={styles.menuIcon} name="menu" size={24} color="#88c9bf" />
        <Text style={styles.title}>Olá</Text>
        <Text style={[ styles.subtitle, { color: '#757575' }]}> Bem vindo ao Meau! Aqui você pode adotar, doar e ajudar cães e gatos com facilidade. Qual o seu interesse? </Text>
        
        <View style={styles.buttonContainer}>
          <Button title="ADOTAR" onPress={() => router.push('/animalsList')} variant="default" />
          <Button title="AJUDAR" onPress={() => router.push('/login-screen-error')} variant="default" />
          <Button title="CADASTRAR ANIMAL" onPress={() => router.push('/registerAnimal')} variant="default" />
        </View>

        <Link href={"/login"} style={styles.btnLogin} asChild>
          <TouchableOpacity>
            <Text style={styles.btnLogin}> login </Text>
          </TouchableOpacity>
        </Link>
        
        <Image style={styles.logo} source={require('../../assets/logo/Meau_marca_2.png')} />
      </View>
    </DrawerSceneWrapper>
  );
}

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source= {{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
          style={styles.img}/>
        <View style={styles.user}>
          <Text style={styles.hi}>Olá</Text>
          <Text style={styles.username}>Teste</Text>
        </View>

        <DrawerToggleButton />
      </View>
      <Home />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    paddingTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fafafa',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#88c9bf',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  user: {
    flex: 1,
    justifyContent: 'center',
  },
  hi: {
    fontSize: 14,
  },
  username: {
    fontSize: 16,
    fontWeight: '700',
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
