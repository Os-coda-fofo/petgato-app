import { View, StyleSheet, Text, Image } from 'react-native';
import { Link, Stack } from 'expo-router';
import {
  useNavigation
} from '@react-navigation/native';

export default function NotFoundScreen() {
  const navigation = useNavigation();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text> 404 not found </Text>
        <Link href="/" style={styles.button}>
            Voltar para a tela inicial.
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    fontSize: 20,
  },
});
