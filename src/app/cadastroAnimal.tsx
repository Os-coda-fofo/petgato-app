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
  const [isGato, setGato] = React.useState(false);
  const [isCachorro, setCachorro] = React.useState(false);
    const [isMacho, setMacho] = React.useState(false);
    const [isFemea, setFemea] = React.useState(false);
    const [isPequeno, setPequeno] = React.useState(false);
    const [isMedio, setMedio] = React.useState(false);
    const [isGrande, setGrande] = React.useState(false);
    const [isFilhote, setFilhote] = React.useState(false);
    const [isAdulto, setAdulto] = React.useState(false);
    const [isIdoso, setIdoso] = React.useState(false);
    const [isBrincalhao, setBrincalhao] = React.useState(false);
    const [isTimido, setTimido] = React.useState(false);
    const [isCalmo, setCalmo] = React.useState(false);
    const [isGuarda, setGuarda] = React.useState(false);
    const [isAmoroso, setAmoroso] = React.useState(false);
    const [isPreguicoso, setPreguicoso] = React.useState(false);
    const [isVacinado, setVacinado] = React.useState(false);
    const [isVermifugado, setVermifugado] = React.useState(false);
    const [isCastrado, setCastrado] = React.useState(false);
    const [isDoente, setDoente] = React.useState(false);
    const [isTermo, setTermo] = React.useState(false);
    const [isFotos, setFotos] = React.useState(false);
    const [isVisita, setVisita] = React.useState(false);
    const [isAcompanhamento, setAcompanhamento] = React.useState(false);
    const [is1mes, set1mes] = React.useState(false);
    const [is3mes, set3mes] = React.useState(false);
    const [is6mes, set6mes] = React.useState(false);

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
          <Text style={styles.headerTitle}>Cadastro Pessoal</Text>
        </View>

      <View style={styles.infoBox}>
      <Text style={[ styles.subtitle, { color: '#757575' ,alignSelf: 'flex-start'}]}> Tenho interesse em cadastrar o animal para: </Text>
      </View> 

      <View style={styles.registerBtn}>
          <Button title="ADOÇÃO" onPress={() => {}} variant="yellow" />
          <Button title="APADRINHAR" onPress={() => {}} variant="white" textColor='#bdbdbd'/>
          <Button title="AJUDA" onPress={() => {}} variant="white" />
        </View>

        
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
        <Checkbox style={styles.checkbox} value={isCachorro} onValueChange={setCachorro} />
        <Text style={styles.paragraph}>Cachorro</Text>
        <Checkbox style={styles.checkbox} value={isGato} onValueChange={setGato} />
        <Text style={styles.paragraph}>Gato</Text>
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>SEXO</Text>
        <Checkbox style={styles.checkbox} value={isMacho} onValueChange={setMacho} />
        <Text style={styles.paragraph}>Macho</Text>
        <Checkbox style={styles.checkbox} value={isFemea} onValueChange={setFemea} />
        <Text style={styles.paragraph}>Fêmea</Text>
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>PORTE</Text>
        <Checkbox style={styles.checkbox} value={isPequeno} onValueChange={setPequeno} />
        <Text style={styles.paragraph}>Pequeno</Text>
        <Checkbox style={styles.checkbox} value={isMedio} onValueChange={setMedio} />
        <Text style={styles.paragraph}>Médio</Text>
        <Checkbox style={styles.checkbox} value={isGrande} onValueChange={setGrande} />
        <Text style={styles.paragraph}>Grande</Text>
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>IDADE</Text>
        <Checkbox style={styles.checkbox} value={isFilhote} onValueChange={setFilhote} />
        <Text style={styles.paragraph}>Filhote</Text>
        <Checkbox style={styles.checkbox} value={isAdulto} onValueChange={setAdulto} />
        <Text style={styles.paragraph}>Adulto</Text>
        <Checkbox style={styles.checkbox} value={isIdoso} onValueChange={setIdoso} />
        <Text style={styles.paragraph}>Idoso</Text>
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>TEMPERAMENTO</Text>
        <Checkbox style={styles.checkbox} value={isBrincalhao} onValueChange={setBrincalhao} />
        <Text style={styles.paragraph}>Brincalhão</Text>
        <Checkbox style={styles.checkbox} value={isTimido} onValueChange={setTimido} />
        <Text style={styles.paragraph}>Tímido</Text>
        <Checkbox style={styles.checkbox} value={isCalmo} onValueChange={setCalmo} />
        <Text style={styles.paragraph}>Calmo</Text>
        <Checkbox style={styles.checkbox} value={isGuarda} onValueChange={setGuarda} />
        <Text style={styles.paragraph}>Guarda</Text>
        <Checkbox style={styles.checkbox} value={isAmoroso} onValueChange={setAmoroso} />
        <Text style={styles.paragraph}>Amoroso</Text>
        <Checkbox style={styles.checkbox} value={isPreguicoso} onValueChange={setPreguicoso} />
        <Text style={styles.paragraph}>Preguiçoso</Text>
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>SAÚDE</Text>
        <Checkbox style={styles.checkbox} value={isVacinado} onValueChange={setVacinado} />
        <Text style={styles.paragraph}>Vacinado</Text>
        <Checkbox style={styles.checkbox} value={isVermifugado} onValueChange={setVermifugado} />
        <Text style={styles.paragraph}>Vermifugado</Text>
        <Checkbox style={styles.checkbox} value={isCastrado} onValueChange={setCastrado} />
        <Text style={styles.paragraph}>Castrado</Text>
        <Checkbox style={styles.checkbox} value={isDoente} onValueChange={setDoente} />
        <Text style={styles.paragraph}>Doente</Text>
        <Input placeholder="Doenças do animal" onChangeText={(value) => handleFormChange('saude', value)} value={formState.saude}  />
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>EXIGÊNCIAS PARA ADOÇÃO</Text>
        <Checkbox style={styles.checkbox} value={isTermo} onValueChange={setTermo} />
        <Text style={styles.paragraph}>Termo de adoção</Text>
        <Checkbox style={styles.checkbox} value={isFotos} onValueChange={setFotos} />
        <Text style={styles.paragraph}>Fotos da Casa</Text>
        <Checkbox style={styles.checkbox} value={isVisita} onValueChange={setVisita} />
        <Text style={styles.paragraph}>Visita prévia ao animal</Text>
        <Checkbox style={styles.checkbox} value={isAcompanhamento} onValueChange={setAcompanhamento} />
        <Text style={styles.paragraph}>Acompanhamento pós adoção</Text>
        <Checkbox style={styles.checkboxFade} value={is1mes} onValueChange={set1mes} />
        <Text style={styles.paragraphFade}>1 mês</Text>
        <Checkbox style={styles.checkboxFade} value={is3mes} onValueChange={set3mes} />
        <Text style={styles.paragraphFade}>3 meses</Text>
        <Checkbox style={styles.checkboxFade} value={is6mes} onValueChange={set6mes} />
        <Text style={styles.paragraphFade}>6 meses</Text>
        <Text style={{ color: '#f7a800', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>SOBRE O ANIMAL</Text>
        <Input placeholder="Compartilhe a história do animal" onChangeText={(value) => handleFormChange('sobre', value)} value={formState.sobre}  />
        </View>
        <View style={styles.registerBtn}>
          <Button title="COLOCAR PARA ADOÇÃO" onPress={() => {}} variant="yellow" />
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
