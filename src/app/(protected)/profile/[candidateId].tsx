import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import { useSession } from '../../../services/auth/ctx';
import { db } from '../../../services/auth/firebase-config';

const UserProfileScreen = () => {
  const { user: sessionUser } = useSession();
  const { candidateId } = useLocalSearchParams();
  
  interface UserProfile {
    name: string;
    age: string;
    email: string;
    state: string;
    city: string;
    address: string;
    phone: string;
    username: string;
    pfpimage: string;
  }

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(db, 'users', candidateId as string);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserProfile(userSnap.data() as UserProfile);
        } else {
          console.error('Usuário não encontrado.');
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [candidateId]);

  if (loading) {
    return <Loading />;
  }

  if (!userProfile) {
    return (
      <View style={styles.notFound}>
        <Text>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Perfil do Usuário" showBackButton onBackPress={() => router.back()} />
      <StatusBar backgroundColor={"#88c9bf"} barStyle={"light-content"} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.profileContainer}>
          {userProfile.pfpimage && (
            <Image source={{ uri: userProfile.pfpimage }} style={styles.avatar} />
          )}
          
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.info}>📧 {userProfile.email}</Text>
          <Text style={styles.info}>📞 {userProfile.phone}</Text>
          <Text style={styles.info}>🏠 {userProfile.address}, {userProfile.city}, {userProfile.state}</Text>
          <Text style={styles.info}>👤 {userProfile.username}</Text>
          <Text style={styles.info}>🎂 {userProfile.age}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 64,
  },

  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileContainer: {
    alignItems: 'center',
    padding: 16,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  info: {
    fontSize: 16,
    color: '#757575',
    marginVertical: 4,
  },
});

export default UserProfileScreen;