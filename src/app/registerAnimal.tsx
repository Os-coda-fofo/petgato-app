import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

const AnimalScreen = () => {
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
    setCheckboxState(prevState => ({
      ...prevState,
      [key]: !prevState[key]
      
    }))
  }

  const handleFormChange = (key: string, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: value,
    }))
  }

  return (
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />

        <View style={styles.header}>
          <Link href="/" asChild>
            <AntDesign name="arrowleft" size={24} color="#434343" />
          </Link>
          <Text style={styles.headerTitle}>Cadastro Animal</Text>
        </View>

        <View style={{top: 100}}>

        
        <View style={styles.inputContainer}>
        <Text style={{ color: '#434343', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>Adoção</Text>
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>NOME DO ANIMAL</Text>

        <Input placeholder="Nome completo" onChangeText={(value) => handleFormChange('name', value)} value={formState.name}  />
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>FOTOS DO ANIMAL</Text>
        
        
        <View style={styles.imageBox}>
          <View style={{ margin: 40, alignItems: "center"}}>
          <MaterialIcons name="control-point" size={24} color="#434343" />
            <Text style={{ color: '#757575', fontFamily: 'Roboto_400Regular', fontSize: 16 }}>adicionar foto</Text>
          </View>
        </View>
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>ESPÉCIE</Text>
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
        </View>
        <View style={styles.registerBtn}>
          <Button title="COLOCAR PARA ADOÇÃO" onPress={() => {}} variant="yellow" />
        </View>
      </View>
      </View> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    
  },
  infoBox: {
    margin: 15,
    padding: 15,
    marginTop: 100,
    borderRadius: 8,
    maxWidth: 350,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  checkboxline:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  checkboxtempo:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    left: 15,
    justifyContent: 'space-between',
  },
  imageBox: {
    backgroundColor: "#e6e7e7",
    margin: 15,
    maxWidth: 250,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
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
    margin: 15,
    marginTop: 50,
    width: '70%',
    alignSelf: 'center',
  },
});

export default AnimalScreen;