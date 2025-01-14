import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
      <View style={styles.header}>
        <Link href="/" asChild>
          <AntDesign name="arrowleft" size={24} color="#434343" />
        </Link>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
  );  
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#cfe9e5',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_500Medium',
    color: '#434343',
  },
});

export default Header;
