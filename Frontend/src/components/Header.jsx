import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showLogoutConfirm } from '../helpers/sweetAlert.js'; 

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const onConfirm = async () => {
      await logout(); 
      navigate('/'); 
    };
    showLogoutConfirm(onConfirm);
  };

  if (!user) {
    return null;
  }
  
  return (
    <header className="bg-white text-gray-800 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/home" 
          className="text-xl font-bold text-blue-600 hover:text-blue-800"
        >
          AppUsuarios
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 hidden sm:block">
            Hola, {user.nombre || user.email} 
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};