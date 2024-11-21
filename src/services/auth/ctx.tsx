import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { View, Text } from 'react-native';
import React, { useContext, createContext, useState, useEffect, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
  user: any;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

// Hook para acessar o contexto
const useSession = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be used within an AuthProvider');
  }
  return value;
}

// Componente de provedor do contexto
const SessionProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitora mudanças de estado de autenticação no Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Função para realizar login
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para realizar logout
  const signOut = async () => {
    setIsLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {isLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}

// Componente opcional para exibir enquanto verifica o estado do usuário
function LoadingScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export { useSession, SessionProvider };
