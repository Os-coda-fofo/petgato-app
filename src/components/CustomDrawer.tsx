import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import HomeScreen from '../app/(drawer)/home';
import ProfileScreen from './app/(drawer)/profile';

const Drawer = createDrawerNavigator();

interface CustomDrawerProps {
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ children }) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </NavigationContainer>
  );
};

export default CustomDrawer;