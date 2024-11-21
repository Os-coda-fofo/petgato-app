import { AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';


const LoginScreenError = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
              <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />

                <View style={styles.header}>
                    <Link href="/" asChild>
                        <AntDesign name="arrowleft" size={24} color="#434343" />
                    </Link>
                    <Text style={styles.headerTitle}>Cadastro</Text>
                </View>

          <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />
  
          <Text style={styles.title}>Ops!</Text>
          <Text style={[ styles.subtitle, { color: '#757575' }]}> Você não pode realizar esta ação sem possuir um cadastro.</Text>

        <View style={styles.buttonContainer}>
          <Button title="FAZER CADASTRO" onPress={() => router.push('/register')} variant="main" />
          <Text style={[ styles.subtitle, { color: '#757575' }]}> Já possui cadatro?</Text>
          <Button title="FAZER LOGIN" onPress={() => router.push('/login')} variant="main" />
        </View>
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
      color: '#88c9bf',
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
  });

  export default LoginScreenError;