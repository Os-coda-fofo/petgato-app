import { FirebaseError } from 'firebase/app';
import { User, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { auth, db } from './firebase-config';

const AuthContext = createContext<{
  user: any;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: object) => Promise<void>;
  signOut: () => Promise<void>;
  setRedirectTo: (path: string | null) => void;
  redirectTo: string | null;
}>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  setRedirectTo: () => {},
  redirectTo: null,
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
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

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

      console.log('Usuário logado com sucesso!');
      console.log('Usuário:', auth.currentUser);
    } catch (error) {
      if (error instanceof FirebaseError) {
      if (error.code === 'auth/invalid-email') {
        alert('E-mail inválido . Por favor, verifique o e-mail fornecido.');
        throw new Error('E-mail inválido');
      } else if (error.code === 'auth/wrong-password') {
        alert('Senha incorreta. Tente novamente.');
        throw new Error('Senha incorreta.');
      } else {
        alert('Erro ao fazer login. Tente novamente.');
        throw new Error('Erro ao fazer login.');
      }
    } else {
      console.error('Unexpected error:', error);}
    }
      finally {
        setIsLoading(false);
      }
  }

  // Função para criar nova conta e salvar dados no Firestore
  const signUp = async (email: string, password: string, userData: object) => {
    setIsLoading(true);
    try {
      // Cria o usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Salva os dados adicionais do usuário no Firestore
      await setDoc(doc(db, 'users', uid), {
        email,
        ...userData, // Inclui os dados adicionais
        createdAt: new Date(),
      });

      console.log('Conta criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar conta', error);
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
      setRedirectTo(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, setRedirectTo, redirectTo  }}>
      {children}
    </AuthContext.Provider>
  );
};

export { SessionProvider, useSession };

