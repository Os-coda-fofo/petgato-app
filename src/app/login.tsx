import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import Button from '../components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import Input from '../components/Input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase-config';

const LoginScreen = () => {
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
  })

  const handleFormChange = (key: string, value: string) => {
    setFormState({
      ...formState,
      [key]: value,
    })
  }

  const handleLogin = () => {
    createUserWithEmailAndPassword(auth, formState.email, formState.password)
    .then((userCredential) => {
      const user = userCredential.user

      console.log(user)
      setFormState({
        email: '',
        password: '',
      })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />

        <View style={styles.header}>
          <Link href="/" asChild>
            <AntDesign name="arrowleft" size={24} color="#434343" />
          </Link>
          <Text style={styles.headerTitle}>Login</Text>
        </View>

      <View style={styles.inputContainer}>
      <Input placeholder="Nome de usuário" onChangeText={(value) => handleFormChange('username', value)} value={formState.email} checked={formState.email.length > 0} />
        <Input placeholder="Senha" secureTextEntry onChangeText={(value) => handleFormChange('password', value)} value={formState.password} />
        <View style={{ width: '90%', marginTop: 40 }}>
        <Button title="ENTRAR" onPress={() => {}} variant="main" />
          <Text style={styles.registerBtn}>
            Não possui uma conta?
            <Link href="/register" style={{ color: '#88c9bf', fontFamily: 'Roboto_500Medium' }}>
              {' '}
              Cadastre-se
            </Link>
          </Text>
          <Button title="ENTRAR" onPress={() => handleLogin()} variant="main" />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button textColor="#ffff" title="ENTRAR COM FACEBOOK" onPress={() => {}} variant="facebook" />
        <Button textColor="#ffff" title="ENTRAR COM GOOGLE" onPress={() => {}} variant="google" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
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
    marginBottom: 80,
  },
  buttonContainer: {
    width: '70%',
  },
  registerBtn: {
    color: '#434343',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    marginTop: 16,
    alignSelf: 'center',
  },
});

export default LoginScreen;
