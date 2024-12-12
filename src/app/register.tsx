import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useSession } from '../services/auth/ctx';
import Header from '../components/Header';

const RegisterScreen = () => {
  const [formState, setFormState] = React.useState({
    name: '',
    age: '',
    email: '',
    state: '',
    city: '',
    address: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  
  const { user, signUp, isLoading, redirectTo } = useSession();
  const router = useRouter();

  if (user) {
    router.replace(redirectTo || '/animalsList');
    return null;
  }

  const handleSubmit = async () => {
    const { name, age, email, state, city, address, phone, username, password, confirmPassword } = formState;

    if (!email || !password || password !== confirmPassword) {
      console.log('Erro', 'Verifique os campos de e-mail e senha');
      return;
    }

    const userData = {
      name,
      age,
      state,
      city,
      address,
      phone,
      username,
    };

    try {
      await signUp(email, password, userData);
      console.log('Sucesso', 'Cadastro realizado com sucesso!');
    } catch (error) {
      console.log('Erro', 'Houve um problema ao criar a conta');
    }
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

      <Header title="Cadastro" />

      <View style={styles.infoBox}>
      <Text style={[ styles.subtitle, { color: '#757575' }]}> As informações preenchidas serão divulgadas apenas para a pessoa com qual você realizar o processo de adoção e/ou apadrinhamento, após a formalização do processo.</Text>
      </View> 

      
        <View style={styles.inputContainer}>
        <Text style={{ color: '#88c9bf', fontFamily: 'Roboto_400Regular', fontSize: 16 , alignSelf: 'flex-start'}}>INFORMAÇÕES PESSOAIS</Text>

        <Input placeholder="Nome completo" onChangeText={(value) => handleFormChange('name', value)} value={formState.name}  />
        <Input placeholder="Idade" onChangeText={(value) => handleFormChange('age', value)} value={formState.age} />
        <Input placeholder="E-mail" onChangeText={(value) => handleFormChange('email', value)} value={formState.email}  />
        <Input placeholder="Estado" onChangeText={(value) => handleFormChange('state', value)} value={formState.state} />
        <Input placeholder="Cidade" onChangeText={(value) => handleFormChange('city', value)} value={formState.city}  />
        <Input placeholder="Endereço" onChangeText={(value) => handleFormChange('address', value)} value={formState.address} />
        <Input placeholder="Telefone" onChangeText={(value) => handleFormChange('phone',value)} value={formState.phone}  />
        <Text style={{ color: '#88c9bf', fontFamily: 'Roboto_400Regular', fontSize: 16, marginTop: 16,alignSelf: "flex-start" }} >INFORMAÇÕES DE PERFIL</Text>
      
        <Input placeholder="Nome de usuário" onChangeText={(value) => handleFormChange('username', value)} value={formState.username}  />
        <Input placeholder="Senha" secureTextEntry onChangeText={(value) => handleFormChange('password', value)} value={formState.password}  />
        <Input placeholder="Confirmação de senha" secureTextEntry onChangeText={(value) => handleFormChange('confirmPassword', value)} value={formState.confirmPassword} />
        
        <Text style={{ color: '#88c9bf', fontFamily: 'Roboto_400Regular', fontSize: 16, marginTop: 16, alignSelf: "flex-start" }}>FOTO DE PERFIL</Text>
        </View>
        
        <View style={styles.imageBox}>
          <View style={{ margin: 40, alignItems: "center"}}>
          <MaterialIcons name="control-point" size={24} color="#434343" />
            <Text style={{ color: '#757575', fontFamily: 'Roboto_400Regular', fontSize: 16 }}>adicionar foto</Text>
          </View>
        </View>
        <View style={styles.registerBtn}>
          <Button title={ isLoading ? "Carregando..." : "FAZER CADASTRO" } onPress={() => {handleSubmit(), router.replace('/login')}} variant="main" />
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
  },
  registerBtn: {
    margin: 15,
    marginTop: 50,
    width: '70%',
    alignSelf: 'center',
  },
});

export default RegisterScreen;
