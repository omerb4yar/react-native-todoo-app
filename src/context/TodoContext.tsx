import React, { createContext, useContext, ReactNode } from 'react';
import useTodos from '../hooks/useTodos';
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';
import { useState, useEffect } from 'react';

type ReturnTypeHook = ReturnType<typeof useTodos>;

const TodoContext = createContext<ReturnTypeHook | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, [auth]);

    const todoState = useTodos(user);

    return (
        <TodoContext.Provider value={todoState}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};
