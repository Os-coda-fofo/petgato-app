import { DrawerToggleButton } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function Configurations() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Teste</Text>


        <DrawerToggleButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    paddingTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fafafa',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#88c9bf',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  user: {
    flex: 1,
    justifyContent: 'center',
  },
  hi: {
    fontSize: 14,
  },
  username: {
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    fontSize: 72,
    color: '#ffd358',
    fontFamily: 'CourgetteRegular',
    marginBottom: 52
  },
  subtitle: {
    maxWidth: 300,
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    marginBottom: 48
  },
  buttonContainer: {
    width: 320,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    fontSize: 16,
    color: '#88c9bf',
    textAlign: 'center', 
    marginTop: 44,
  },
  logo: {
    width: 122,
    height: 44,
    marginTop: 68,
  },
  menuIcon : {
    position: 'absolute',
    top: 16,
    left: 16,
  }
});