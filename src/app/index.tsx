import { DrawerToggleButton } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      
      <View style={styles.user}>
        <Text style={styles.hi}>Olá,</Text>
        <Text style={styles.username}>Usuário</Text>
      </View>

      <DrawerToggleButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 7,
  },
  user: {
    alignItems: 'center',
    marginTop: 20,
  },
  hi: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
  },
});
