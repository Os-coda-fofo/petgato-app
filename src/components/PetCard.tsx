import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface AnimalCardProps {
  id: string;
  name: string;
  photos?: string[];
  gender: string;
  age: string;
  size: string;
  localidade: string;
  variant?: 'cyan' | 'yellow';
  whereToGo: () => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({id, name, photos, gender, age, size, localidade, variant='yellow', whereToGo}) => {
  return (
    <View key={id} style={styles.card}>
      
      <View >
        <TouchableOpacity
          key={id}
          onPress={whereToGo}
        >
        <Text style={styles[variant]}>{name}</Text>
        <Image source={{ uri: photos?.[0] }} style={styles.image} />
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 50, paddingTop: 5 }}>
        <Text style={styles.info}>{gender.toUpperCase()}</Text>
        <Text style={styles.info}>{age.toUpperCase()}</Text>
        <Text style={styles.info}>{size.toUpperCase()}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 5, paddingTop: 5 }}>
        <Text style={styles.info}>{localidade.toUpperCase()}</Text>
      </View>
      </TouchableOpacity>
      </View>
    </View>
  )}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
    width: '90%',
    elevation: 4, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 100,
  },

  yellow: {
    backgroundColor: '#fee29b',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    color: '#434343',
    padding: 10,
  },

  cyan: {
    backgroundColor: '#cfe9e5',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    color: '#434343',
    padding: 10,
  },
  
  image: {
    width: '100%',
    minHeight: 200,
    resizeMode: 'cover',
    objectFit: 'cover',
  },

  info: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#434343',
  },

});

export default AnimalCard;
