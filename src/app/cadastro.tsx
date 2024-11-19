import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

const CadastroScreen = () => {
  const [formState, setFormState] = React.useState({
    username: '',
    password: '',
  })

  const handleUsernameChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      username: value,
    }))
  }

  const handlePasswordChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      password: value,
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
      <Text style={[ styles.subtitle, { color: '#757575' }]}> As informações preenchidas serão divulgadas apenas para a pessoa com qual você realizar o processo de adoção e/ou apadrinhamento, após a formalização do processo.</Text>
      </View> 

      
        <View style={styles.inputContainer}>
        <Text style={{ color: '#88c9bf', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>INFORMAÇÕES PESSOAIS</Text>

        <Input placeholder="Nome completo" onChangeText={handleUsernameChange} value={formState.username} checked={formState.username.length > 0} />
        <Input placeholder="Idade" secureTextEntry onChangeText={handlePasswordChange} value={formState.password} />
        <Input placeholder="E-mail" onChangeText={handleUsernameChange} value={formState.username} checked={formState.username.length > 0} />
        <Input placeholder="Estado" secureTextEntry onChangeText={handlePasswordChange} value={formState.password} />
        <Input placeholder="Cidade" onChangeText={handleUsernameChange} value={formState.username} checked={formState.username.length > 0} />
        <Input placeholder="Endereço" secureTextEntry onChangeText={handlePasswordChange} value={formState.password} />
        <Input placeholder="Telefone" onChangeText={handleUsernameChange} value={formState.username} checked={formState.username.length > 0} />
        <Text style={{ color: '#88c9bf', fontFamily: 'Roboto_400Regular', fontSize: 16, marginTop: 16,alignSelf: "flex-start"}}>INFORMAÇÕES DE PERFIL</Text>
      
        <Input placeholder="Nome de usuário" secureTextEntry onChangeText={handlePasswordChange} value={formState.password} />
        <Input placeholder="Senha" onChangeText={handleUsernameChange} value={formState.username} checked={formState.username.length > 0} />
        <Input placeholder="Confirmação de senha" secureTextEntry onChangeText={handlePasswordChange} value={formState.password} />
        
        <Text style={{ color: '#88c9bf', fontFamily: 'Roboto_400Regular', fontSize: 16, marginTop: 16, alignSelf: "flex-start" }}>FOTO DE PERFIL</Text>
        </View>
        
        <View style={styles.imageBox}>
          <View style={{ margin: 40, alignItems: "center"}}>
        <MaterialIcons name="control-point" size={24} color="#434343" />
            <Text style={{ color: '#757575', fontFamily: 'Roboto_400Regular', fontSize: 16 }}>adicionar foto</Text>
        </View>
        </View>
        <View style={{alignSelf: 'center'}}>
        <Button title="FAZER CADASTRO" onPress={() => {}} variant="main" />
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
    backgroundColor: "#e1f7f1",
    margin: 15,
    padding: 15,
    marginTop: 100,
    borderRadius: 8,
    maxWidth: 350,
    alignSelf: 'center',
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
  }
});

export default CadastroScreen;
