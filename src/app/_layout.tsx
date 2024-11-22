import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import {
  createStaticNavigation,
  NavigationContainer
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import NotFoundScreen from './+not-found';
import Home from './index';
import LoginScreen from './login';
import LoginScreenError from './login-screen-error';
import RegisterScreen from './register';

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

  const Stack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
      Home: Home,
      Login: LoginScreen,
      LoginScreenError: LoginScreenError,
      Register: RegisterScreen,
      NotFound: NotFoundScreen,
    },
  });
  
  const Navigation = createStaticNavigation(Stack);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeView}>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginScreenError" component={LoginScreenError} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
)
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#ffff',
  }
});
