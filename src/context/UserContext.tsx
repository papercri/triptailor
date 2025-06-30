'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  onAuthStateChanged,
  User,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  reload
} from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';

interface UserContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

// Registro de usuario con updateProfile para displayName
const signUp = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  await reload(userCredential.user); // Forzar recarga para actualizar perfil
  return userCredential.user;
};

// Login normal
const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
 const logout = async () => {
    await signOut(auth);
    setUser(null);
    setLoading(true);
  };
  return (
    <UserContext.Provider value={{ user, loading, logout, signIn, signUp }}>
      {children}
    </UserContext.Provider>
  );
};
