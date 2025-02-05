import React, { forwardRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ViewShot from "react-native-view-shot";

type SharePetCardProps = {
  name: string;
  age: string;
  location: string;
  about: string;
  temperament: string[];
  photo: string[];
};

const SharePetCard = forwardRef<ViewShot, SharePetCardProps>((props, ref): React.ReactElement => {
  return (
    <ViewShot ref={ref} style={styles.container}>
      {/* Cabeçalho com o nome do pet */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{props.name}</Text>
      </View>

      {/* Imagem do pet */}
      <Image style={styles.petImage} source={{ uri: props.photo[0] }} />

      {/* Informações sobre o pet */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Idade: {props.age}</Text>
        <Text style={styles.infoText}>Localização: {props.location}</Text>
        <Text style={styles.infoText}>
          Temperamento: {props.temperament.join(", ")}
        </Text>
        <Text style={styles.infoText}>Sobre o pet: {props.about}</Text>
      </View>

      {/* Logotipo ou marca */}
      <View style={styles.logotypeContainer}>
        <Text style={styles.logotype}>Adote um Pet</Text>
      </View>
    </ViewShot>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContainer: {
    backgroundColor: "#ffd358",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  petImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#434343",
  },
  logotypeContainer: {
    backgroundColor: "#f7a800",
    padding: 16,
    alignItems: "center",
  },
  logotype: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SharePetCard;
