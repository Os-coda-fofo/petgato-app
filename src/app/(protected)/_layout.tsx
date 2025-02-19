import React from 'react';
import { Redirect, Slot } from 'expo-router';
import { useSession } from '../../services/auth/ctx';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../../components/Loading';

export default function ProtectedLayout() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Slot/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export const screenOptions = {
  headerShown: false,
};
