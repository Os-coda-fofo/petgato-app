import { AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';


const FullAnimalRegistry = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
              <StatusBar backgroundColor={"#ffd358"} barStyle={"dark-content"} />

                <View style={styles.header}>
                    <Link href="/" asChild>
                        <AntDesign name="arrowleft" size={24} color="#434343" />
                    </Link>
                    <Text style={styles.headerTitle}>Cadastro do Animal</Text>
                </View>

          <StatusBar backgroundColor={"#ffd358"} barStyle={"light-content"} />
  
          <Text style={styles.title}>Eba!</Text>
          <Text style={[ styles.subtitle, { color: '#757575' }]}> O cadastro do seu pet foi realizado com sucesso!{"\n"}</Text>
          <Text style={[ styles.subtitle, { color: '#757575' }]}> Certifique-se que permitiu o envio de{"\n"}
                        notificações por push no campo{"\n"}
                        privacidade do menu configurações do{"\n"}
                        aplicativo. Assim, poderemos te avisar{"\n"}
                        assim que alguém interessado entrar{"\n"}
                        em contato!</Text>

        <View style={styles.buttonContainer}>
            <View style={styles.shadowButton}>
          <Button title="MEUS PETS" onPress={() => router.push('/login')} variant="default"  />
          </View>
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
      gap: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadowButton: {
        backgroundColor: '#ffd358',
        height: 80,
        width: 200,
        borderColor: '#ffd358',
        alignItems: "center",
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
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
        backgroundColor: '#ffd358', // Cor amarela
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
    
  });

  export default FullAnimalRegistry;