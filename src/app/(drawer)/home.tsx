
import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: { 
    fontSize: 20,
    fontWeight: 'bold',
  }
  }
);