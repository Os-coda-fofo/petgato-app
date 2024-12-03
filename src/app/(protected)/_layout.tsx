import React from 'react';
import { Redirect, Slot, Stack } from 'expo-router';
import { useSession } from '../../services/auth/ctx';

export default function ProtectedLayout() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Slot />
    </Stack>
  );
}
