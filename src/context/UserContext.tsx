import React, { createContext, useContext, ReactNode } from 'react';
import { useUser } from '../hooks/useUser';
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';
import { useState, useEffect } from 'react';

type ReturnTypeHook = ReturnType<typeof useUser>;

const UserContext = createContext<ReturnTypeHook | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, [auth]);

    const userState = useUser(user);

    return (
        <UserContext.Provider value={userState}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
