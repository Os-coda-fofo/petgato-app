import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SessionProvider } from '../services/auth/ctx';

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen 
        name="index"
        options={{
          drawerLabel: "Meu perfil",
          headerTitle: "Meu perfil",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Meus pets"
        options={{
          drawerLabel: "Meus pets",
          headerTitle: "Meus pets",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="log-in-outline" size={size} color={color} />
          ),
        }}
        />
     </Drawer>
    </GestureHandlerRootView>
  );
};

export { DrawerLayout };

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
              name="animalInfo"
              options={{ title: "Detalhes-Animal", headerShown: false }}
            />
            <Stack.Screen
              name="register"
              options={{ title: "Cadastro", headerShown: false }}
            />
            <Stack.Screen
              name="animalsList"
              options={{ title: "Listagem de animais", headerShown: false }}
            />
            <Stack.Screen
              name="animal/[animalId]"
              options={{ title: "Validação de animal", headerShown: false }}
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
