import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getProfile, updateProfile, deleteProfile } from '../services/profile.service';
import { useAuth } from '../context/AuthContext';
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from '../helpers/sweetAlert';


const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleGetProfile = async () => {
    try {
      const data = await getProfile();
      setProfileData(data.userData);  
    } catch (error) {
      showErrorAlert('Error', error.message || 'Error al obtener el perfil');
    }
  };

  const handleEditClick = () => {
    setFormData({ 
      email: profileData.email, 
      password: '' 
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };


  const handleDeleteClick = () => {
    const onConfirm = async () => {
      try {
        const response = await deleteProfile();
        showSuccessAlert('Eliminado', response.message || 'Usuario eliminado exitosamente');
        await logout();
        navigate('/'); 

      } catch (error) {
        console.error('Error al eliminar:', error);
        showErrorAlert('Error', error.message || 'No se pudo eliminar el perfil');
      }
    };
    deleteDataAlert(onConfirm);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const dataToUpdate = {
        email: formData.email,
      };

      if (formData.password) { 
        dataToUpdate.password = formData.password;
      }
      
      const response = await updateProfile(dataToUpdate);
      setProfileData(response.data); 
      setIsEditing(false);
      showSuccessAlert('¡Éxito!', response.message || 'Perfil actualizado');

    } catch (error) {
      console.error('Error al actualizar:', error);
      showErrorAlert('Error', error.message || 'No se pudo actualizar el perfil');
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all">      
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Bienvenido a la pagina de inicio
        </h1>
        {!profileData && (
          <button 
            onClick={handleGetProfile} 
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Obtener Perfil
          </button>
        )}
        {profileData && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            {isEditing ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Editar Perfil</h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Deja en blanco para no cambiar" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                {/* Botones del formulario */}
                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    Guardar Cambios
                  </button>
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </form>

            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Datos del usuario:</h2>
                <p className="text-lg"><strong>Email:</strong> {profileData.email}</p>
                <p className="text-lg break-words"><strong>Contraseña:</strong> {profileData.password}</p>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleEditClick}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    Editar Perfil
                  </button>
                  <button
                    onClick={handleDeleteClick} 
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    Eliminar Perfil
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;