import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserType = 'brand' | 'influencer';

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData, userType: UserType) => Promise<void>;
  logout: () => void;
  error: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('dinfluencer_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data for demonstration
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        type: email.includes('brand') ? 'brand' : 'influencer',
      };
      
      setUser(mockUser);
      localStorage.setItem('dinfluencer_user', JSON.stringify(mockUser));
      
      // Redirect based on user type
      if (mockUser.type === 'brand') {
        navigate('/brand/dashboard');
      } else {
        navigate('/influencer/dashboard');
      }
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData, userType: UserType) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate password match
      if (userData.password !== userData.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        type: userType,
      };
      
      setUser(newUser);
      localStorage.setItem('dinfluencer_user', JSON.stringify(newUser));
      
      // Redirect based on user type
      if (userType === 'brand') {
        navigate('/brand/dashboard');
      } else {
        navigate('/influencer/dashboard');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro no registro. Tente novamente.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dinfluencer_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};