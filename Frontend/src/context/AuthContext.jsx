import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import cookies from 'js-cookie';
// 1. Importa la función de logout de tu servicio
import { logout as logoutService } from '../services/auth.service'; // Asegúrate que la ruta sea correcta

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = cookies.get('jwt-auth');
    const storedUser = sessionStorage.getItem('usuario');
    
    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(JSON.parse(storedUser));
        } else {
          cookies.remove('jwt-auth');
          sessionStorage.removeItem('usuario');
        }
      } catch (error) {
        console.error('Error al decodificar token:', error);
        cookies.remove('jwt-auth');
        sessionStorage.removeItem('usuario');
      }
    }
  }, []);

  // 2. Crea la función logout que actualiza el estado
  const logout = async () => {
    try {
      await logoutService(); // Llama a tu servicio (que borra cookies/session)
      setUser(null); // Actualiza el estado de React
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    // 3. Pasa 'logout' en el value
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};