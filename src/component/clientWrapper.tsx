'use client'; // <-- Vital

import dynamic from 'next/dynamic';
import React from 'react';

// Cargamos los Providers (Redux + PersistGate) solo en el cliente
const ReduxProvider = dynamic(
  () => import('@/app/providers').then((mod) => mod.Providers),
  { ssr: false }
);

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}