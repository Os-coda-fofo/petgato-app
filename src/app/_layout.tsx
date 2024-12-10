import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
    const loadFonts = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    }
    loadFonts();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeView}>
          <Stack>
            <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
            <Stack.Screen 
              name="login" 
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen 
              name="login-screen-error"
              options={{ title: "login-error", headerShown: false }}
            />
            <Stack.Screen
              name="register"
              options={{ title: "Cadastro", headerShown: false }}
            />
            <Stack.Screen
            name="registerAnimal"
            options={{ title: "Cadastro do Animal", headerShown: false }}
          />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </SessionProvider>
  )
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#ffff',
  }
});
