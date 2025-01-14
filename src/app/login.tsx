import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import Button from '../components/Button';
import { Link } from 'expo-router';
import Input from '../components/Input';
import { useSession } from '../services/auth/ctx';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import { auth } from '../services/auth/firebase-config';

const LoginScreen = () => {
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
  })
  const { signIn, isLoading } = useSession();
  const router = useRouter();

  const handleFormChange = (key: string, value: string) => {
    setFormState({
      ...formState,
      [key]: value,
    })
  }

  const verifyEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return emailRegex.test(email)
  }

  const handleLogin = async () => {
    try {
      await signIn(formState.email, formState.password)
      console.log('Logado com sucesso!')
      router.replace('/logged')
    } 
    catch (error) {
      console.error('Erro de login', error);
  }}

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontFamily: 'CourgetteRegular' }} >Loading...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />

      <Header title="Login" />

      <View style={styles.inputContainer}>
      <Input placeholder="Nome de usuário" onChangeText={(value) => handleFormChange('email', value)} value={formState.email} checked={formState.email.length > 0} />
        <Input placeholder="Senha" secureTextEntry onChangeText={(value) => handleFormChange('password', value)} value={formState.password} />
        <View style={{ width: '90%', marginTop: 40 }}>
          <Button title="ENTRAR" onPress={() => handleLogin()} variant="main" />
          <Text style={styles.forgotBtn}>
            Esqueceu sua senha?
            <Link href="" style={{ color: '#88c9bf', fontFamily: 'Roboto_500Medium' }}>
              {' '}
              Recupere-a
            </Link>
          </Text>
          </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button textColor="#ffff" title="ENTRAR COM FACEBOOK" onPress={() => {}} variant="facebook" />
        <Button textColor="#ffff" title="ENTRAR COM GOOGLE" onPress={() => {}} variant="google" />
      </View>

      <Text style={styles.registerBtn}>
        Não possui uma conta?
        <Link href="/register" style={{ color: '#88c9bf', fontFamily: 'Roboto_500Medium' }}>
          {' '}
          Cadastre-se
        </Link>
      </Text>
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
    position: 'absolute',
    bottom: 24,
    color: '#434343',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  forgotBtn: {
    color: '#434343',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
