import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DoshaType } from './QuizData';

interface User {
    email: string;
    name: string;
    googleAccessToken?: string;
}

interface AuthContextType {
    user: User | null;
    savedDosha: DoshaType | null;
    login: (email: string, name: string, googleAccessToken?: string) => void;
    logout: () => void;
    saveDoshaResult: (dosha: DoshaType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [savedDosha, setSavedDosha] = useState<DoshaType | null>(null);

    // Initialize from exact same format we'll use to save
    useEffect(() => {
        const storedUser = localStorage.getItem('prakriti_user');
        const storedDosha = localStorage.getItem('prakriti_dosha');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedDosha) {
            setSavedDosha(storedDosha as DoshaType);
        }
    }, []);

    const login = (email: string, name: string, googleAccessToken?: string) => {
        const newUser = { email, name, googleAccessToken };
        setUser(newUser);
        localStorage.setItem('prakriti_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        setSavedDosha(null);
        localStorage.removeItem('prakriti_user');
        localStorage.removeItem('prakriti_dosha');
    };

    const saveDoshaResult = (dosha: DoshaType) => {
        setSavedDosha(dosha);
        localStorage.setItem('prakriti_dosha', dosha);
    };

    return (
        <AuthContext.Provider value={{ user, savedDosha, login, logout, saveDoshaResult }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
