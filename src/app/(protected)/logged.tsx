import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSession } from '../../services/auth/ctx';
import Button from '../../components/Button';

const Protected = () => {
  const { user, signOut } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Usuário deslogado com sucesso!");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Bem-vindo, usuário: {user?.email || 'Não identificado'}
      </Text>
      <Button title="Deslogar" onPress={handleSignOut} variant="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Protected;
