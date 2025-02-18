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
    const prepareApp = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepareApp();
  }, []);

  prepareApp();
  }, [loaded]); // 🔥 Agora ele reexecuta quando `loaded` mudar!

  if (!loaded) {
    return null; // Mantém a SplashScreen até as fontes carregarem
  }

  return (
    <SessionProvider>
      <SafeAreaProvider>
        <CustomDrawer> {/* O Drawer encapsula toda a navegação */}
          <SafeAreaView style={styles.safeView}>
            <Slot /> {/* Aqui entram as telas do expo-router */}
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
  }
});

