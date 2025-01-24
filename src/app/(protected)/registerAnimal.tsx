import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app, auth } from '../../services/auth/firebase-config';
import Header from '../../components/Header';

const AnimalScreen = () => {
  const router = useRouter();

  const id = auth.currentUser?.uid;
  const db = getFirestore(app); 

  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImages(prevImages => [...prevImages, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const [formState, setFormState] = React.useState({
    name: '',
    saude: '',
    sobre: '',
  })

  const [checkboxState, setCheckboxState] = React.useState({
    isGato: false,
    isCachorro: false,
    isMacho: false,
    isFemea: false,
    isPequeno: false,
    isMedio: false,
    isGrande: false,
    isFilhote: false,
    isAdulto: false,
    isIdoso: false,
    isBrincalhao: false,
    isTimido: false,
    isCalmo: false,
    isGuarda: false,
    isAmoroso: false,
    isPreguicoso: false,
    isVacinado: false,
    isVermifugado: false,
    isCastrado: false,
    isDoente: false,
    isTermo: false,
    isFotos: false,
    isVisita: false,
    isAcompanhamento: false,
    is1mes: false,
    is3mes: false,
    is6mes: false,
  })

  const handleCheckboxChange = (key: keyof typeof checkboxState) =>{
    if (key === 'isCachorro' || key === 'isGato') {
      setCheckboxState(prevState => ({
        ...prevState,
        isCachorro: false,
        isGato: false,
        [key]: true
      }))
    }

    else if (key === 'isMacho' || key === 'isFemea') {
      setCheckboxState(prevState => ({
        ...prevState,
        isMacho: false,
        isFemea: false,
        [key]: true
      }))
    }

    else if (key === 'isPequeno' || key === 'isMedio' || key === 'isGrande') {
      setCheckboxState(prevState => ({
        ...prevState,
        isPequeno: false,
        isMedio: false,
        isGrande: false,
        [key]: true
      }))
    }

    else if (key === 'isFilhote' || key === 'isAdulto' || key === 'isIdoso') {
      setCheckboxState(prevState => ({
        ...prevState,
        isFilhote: false,
        isAdulto: false,
        isIdoso: false,
        [key]: true
      }))
    }

    else if (key === 'is1mes' || key === 'is3mes' || key === 'is6mes') {
      setCheckboxState(prevState => ({
        ...prevState,
        is1mes: false,
        is3mes: false,
        is6mes: false,
        isAcompanhamento: true,
        [key]: true
      }))
    }

    else if (key === 'isAcompanhamento'){
      setCheckboxState(prevState => ({
        ...prevState,
        is1mes: false,
        is3mes: false,
        is6mes: false,
        [key]: !prevState[key]
      }))
    }

    else{
      setCheckboxState(prevState => ({
        ...prevState,
        [key]: !prevState[key]
      }))
    }}

    const handleFormChange = (key: string, value: string) => {
      setFormState(prevState => ({
        ...prevState,
        [key]: value,
      }))
    }

    // Função para salvar os dados do animal no Firestore
    const saveAnimalData = async () => {
      if (!id) {
        console.error('Usuário não está logado');
        return;
      }

      try {
        // Crie uma referência para o Firestore
        const animalCollectionRef = collection(db, 'animals');

        // Crie um objeto com os dados do formulário
        const animalData = {
          owner: id,
          name: formState.name,
          diseases: formState.saude,
          about: formState.sobre,
          species: checkboxState.isCachorro ? 'Cachorro' : checkboxState.isGato ? 'Gato' : '',
          gender: checkboxState.isMacho ? 'Macho' : checkboxState.isFemea ? 'Fêmea' : '',
          size: checkboxState.isPequeno ? 'Pequeno' : checkboxState.isMedio ? 'Médio' : checkboxState.isGrande ? 'Grande' : '',
          photos: images,
          age: checkboxState.isFilhote ? 'Filhote' : checkboxState.isAdulto ? 'Adulto' : checkboxState.isIdoso ? 'Idoso' : '',
          brincalhao: checkboxState.isBrincalhao,
          timido: checkboxState.isTimido,
          calmo: checkboxState.isCalmo,
          guarda: checkboxState.isGuarda,
          amoroso: checkboxState.isAmoroso,
          preguicoso: checkboxState.isPreguicoso,
          vacinado: checkboxState.isVacinado,
          vermifugado: checkboxState.isVermifugado,
          castrado: checkboxState.isCastrado,
          doente: checkboxState.isDoente,
          termo: checkboxState.isTermo,
          fotos: checkboxState.isFotos,
          visita: checkboxState.isVisita,
          acompanhamento: checkboxState.isAcompanhamento,
          acompanhamentoTempo: checkboxState.is1mes ? '1 mês' : checkboxState.is3mes ? '3 meses' : checkboxState.is6mes ? '6 meses' : '',
          createdAt: new Date().toISOString(),
        };

        console.log("Usuário:", id);
        console.log('Dados do animal:', animalData);
        await addDoc(animalCollectionRef, animalData);

        console.log('Animal adicionado com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar os dados do animal:', error);
      }
    };

  return (
    <ScrollView style={{ flex: 1, paddingBottom: 24 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />

          <Header title="Cadastro de Animal" variant="yellow" showBackButton onBackPress={() => router.back()} />

          <View style={{top: 100}}>
          
          <View style={styles.inputContainer}>
          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>NOME DO ANIMAL</Text>

          <Input placeholder="Nome completo" onChangeText={(value) => handleFormChange('name', value)} value={formState.name}  />
          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>FOTOS DO ANIMAL</Text>
          
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imagePickerBox}>
              <MaterialIcons name="control-point" size={24} color="#434343" />
              <Button title="adicionar foto" onPress={pickImage} variant="transparent" />
            </View>
          </TouchableOpacity>

          <ScrollView horizontal>
            {images.map((uri, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri }} style={styles.image} />
                <Button title="Remover" onPress={() => removeImage(index)} variant="transparent" />
              </View>
            ))}
          </ScrollView>
          
          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start' }}>ESPÉCIE</Text>
          <View style={styles.checkboxline}>
            <Checkbox style={styles.checkbox} value={checkboxState.isCachorro} onValueChange={() => handleCheckboxChange('isCachorro')} />
            <Text style={styles.paragraph}>Cachorro</Text>
            <Checkbox style={styles.checkbox} value={checkboxState.isGato} onValueChange={() => handleCheckboxChange('isGato')} />
            <Text style={styles.paragraph}>Gato</Text>
          </View>

          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>SEXO</Text>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isMacho} onValueChange={() => handleCheckboxChange('isMacho')} />
          <Text style={styles.paragraph}>Macho</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isFemea} onValueChange={() => handleCheckboxChange('isFemea')} />
          <Text style={styles.paragraph}>Fêmea</Text>
          </View>
          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>PORTE</Text>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isPequeno} onValueChange={() => handleCheckboxChange('isPequeno')} />
          <Text style={styles.paragraph}>Pequeno</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isMedio} onValueChange={() => handleCheckboxChange('isMedio')} />
          <Text style={styles.paragraph}>Médio</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isGrande} onValueChange={() => handleCheckboxChange('isGrande')} />
          <Text style={styles.paragraph}>Grande</Text>
          </View>
          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>IDADE</Text>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isFilhote} onValueChange={() => handleCheckboxChange('isFilhote')} />
          <Text style={styles.paragraph}>Filhote</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isAdulto} onValueChange={() => handleCheckboxChange('isAdulto')} />
          <Text style={styles.paragraph}>Adulto</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isIdoso} onValueChange={() => handleCheckboxChange('isIdoso')} />
          <Text style={styles.paragraph}>Idoso</Text>
          </View>
          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>TEMPERAMENTO</Text>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isBrincalhao} onValueChange={() => handleCheckboxChange('isBrincalhao')} />
          <Text style={styles.paragraph}>Brincalhão</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isTimido} onValueChange={() => handleCheckboxChange('isTimido')} />
          <Text style={styles.paragraph}>Tímido</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isCalmo} onValueChange={() => handleCheckboxChange('isCalmo')} />
          <Text style={styles.paragraph}>Calmo</Text>
          </View>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isGuarda} onValueChange={() => handleCheckboxChange('isGuarda')} />
          <Text style={styles.paragraph}>Guarda</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isAmoroso} onValueChange={() => handleCheckboxChange('isAmoroso')} />
          <Text style={styles.paragraph}>Amoroso</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isPreguicoso} onValueChange={() => handleCheckboxChange('isPreguicoso')} />
          <Text style={styles.paragraph}>Preguiçoso</Text>
          </View>
          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>SAÚDE</Text>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isVacinado} onValueChange={() => handleCheckboxChange('isVacinado')} />
          <Text style={styles.paragraph}>Vacinado</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isVermifugado} onValueChange={() => handleCheckboxChange('isVermifugado')} />
          <Text style={styles.paragraph}>Vermifugado</Text>
          </View>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isCastrado} onValueChange={() => handleCheckboxChange('isCastrado')} />
          <Text style={styles.paragraph}>Castrado</Text>
          <Checkbox style={styles.checkbox} value={checkboxState.isDoente} onValueChange={() => handleCheckboxChange('isDoente')} />
          <Text style={styles.paragraph}>Doente</Text>
          </View>
          <Input placeholder="Doenças do animal" onChangeText={(value) => handleFormChange('saude', value)} value={formState.saude}  />
          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>EXIGÊNCIAS PARA ADOÇÃO</Text>
          
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isTermo} onValueChange={() => handleCheckboxChange('isTermo')} />
          <Text style={styles.paragraph}>Termo de adoção</Text>
          </View>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isFotos} onValueChange={() => handleCheckboxChange('isFotos')} />
          <Text style={styles.paragraph}>Fotos da Casa</Text>
          </View>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isVisita} onValueChange={() => handleCheckboxChange('isVisita')} />
          <Text style={styles.paragraph}>Visita prévia ao animal</Text>
          </View>
          <View style={styles.checkboxline}>
          <Checkbox style={styles.checkbox} value={checkboxState.isAcompanhamento} onValueChange={() => handleCheckboxChange('isAcompanhamento')} />
          <Text style={styles.paragraph}>Acompanhamento pós adoção</Text>
          </View>
          <View style={styles.checkboxtempo}>
          <Checkbox style={styles.checkboxFade} value={checkboxState.is1mes} onValueChange={() => handleCheckboxChange('is1mes')} />
          <Text style={styles.paragraphFade}>1 mês</Text>
          </View>
          <View style={styles.checkboxtempo}>
          <Checkbox style={styles.checkboxFade} value={checkboxState.is3mes} onValueChange={() => handleCheckboxChange('is3mes')} />
          <Text style={styles.paragraphFade}>3 meses</Text>
          </View>
          <View style={styles.checkboxtempo}>
          <Checkbox style={styles.checkboxFade} value={checkboxState.is6mes} onValueChange={() => handleCheckboxChange('is6mes')} />
          <Text style={styles.paragraphFade}>6 meses</Text>
          </View>
          <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>SOBRE O ANIMAL</Text>
          <Input placeholder="Compartilhe a história do animal" onChangeText={(value) => handleFormChange('sobre', value)} value={formState.sobre}  />
          <View style={styles.registerBtn}>
            <Button title="COLOCAR PARA ADOÇÃO" onPress={async () => { await saveAnimalData(); router.push('/full-animal-registry'); }} variant="yellow" />
          </View>
          
          </View>
        </View>
      </View> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
  },

  checkboxline:{
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },

  checkboxtempo:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    left: 15,
    justifyContent: 'space-between',
  },

  imageContainer: {
    margin: 10,
    alignItems: 'center',
  },

  imagePickerBox: {
    backgroundColor: "#e6e7e7",
    margin: 30,
    padding: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  paragraph: {
    fontSize: 14,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  checkbox: {
    margin: 8,
  },
  paragraphFade: {
    fontSize: 15,
    color: '#bdbdbd',
  },
  checkboxFade: {
    margin: 8,
    color: '#bdbdbd',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#ffd358',
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
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '70%',
  },
  subtitle:{
    maxWidth: 350,
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
  },
  registerBtn: {
    margin: 20,
    marginBottom: 200,
    width: '70%',
    alignSelf: 'center',
  },
});

export default AnimalScreen;
