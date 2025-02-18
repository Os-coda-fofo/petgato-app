import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomDrawer from '../components/CustomDrawer';
import { SessionProvider } from '../services/auth/ctx';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    CourgetteRegular: require("../../assets/fonts/Courgette-Regular.ttf"),
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
  console.log("Fontes carregadas?", loaded); // 🔥 Verificar no console
  const prepareApp = async () => {
    if (loaded) {
      console.log("Escondendo SplashScreen..."); // 🔥 Confirmação no console
      await SplashScreen.hideAsync();
    }
  };
  prepareApp();
}, [loaded]);

  return (
    <SessionProvider>
      <SafeAreaProvider>
        <CustomDrawer> {/* Agora o CustomDrawer gerencia a navegação */}
          <SafeAreaView style={styles.safeView}>
            <Slot />
          </SafeAreaView>
        </CustomDrawer>
      </SafeAreaProvider>
    </SessionProvider>
  );
}

export const screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});
