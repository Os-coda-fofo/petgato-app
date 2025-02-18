import { router } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/Header';

const InterestConfirmationScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Interesse Enviado" showBackButton onBackPress={() => router.back()} />
      <StatusBar backgroundColor={"#88c9bf"} />
      
      <View style={styles.content}>
        <Text style={styles.message}>Seu interesse foi enviado com sucesso!</Text>
        <Text style={styles.subMessage}>O responsável pelo animal entrará em contato em breve.</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => router.push('/') }>
          <Text style={styles.buttonText}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#88c9bf',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InterestConfirmationScreen;
