import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
//import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//import { SessionProvider } from '../services/auth/ctx';
import { Stack } from 'expo-router';
//import { DrawerToggleButton } from '@react-navigation/drawer';

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
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      await SplashScreen.hideAsync();
    }
    prepareApp();
  }, []);

  if (!loaded) {
    return null;
  }
  
  return (
    <Stack>
  
    <Stack.Screen name="index" options={{ title: "Home" }} />
    <Stack.Screen name="settings" options={{ title: "Settings" }} />
    <Stack.Screen name="(drawer)/_layout" options={{ headerShown: false }} />
  </Stack>
    /*
    <GestureHandlerRootView>
      <Drawer screenOptions={{ 
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
        drawerInactiveTintColor: '#727D9B',
        drawerActiveTintColor: '#FFFFFF',
        drawerHideStatusBarOnOpen: true,
        drawerStyle: {
          backgroundColor: '#1D1F25',
          paddindTop: 32,
          width: '50%',
        },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Início',
            drawerIcon: ({ color }) => (
              <Feather name="home" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="configurations"
          options={{
            drawerLabel: 'Configurações',
            drawerIcon: ({ color }) => (
              <Feather name="settings" size={20} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
   */ 
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

