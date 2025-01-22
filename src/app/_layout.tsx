import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    <GestureHandlerRootView style={styles.container}>
      <SessionProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.safeView}>
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
      </SessionProvider>
    </GestureHandlerRootView>
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

