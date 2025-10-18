import axios from './root.service.js';

export async function getProfile() {
  try {
    const response = await axios.get('/profile/private');
    return response.data.data; 
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    throw error.response?.data || { message: 'Error al conectar con el servidor' };
  }
}

export async function updateProfile(data) {
  try {
    const response = await axios.patch('/profile/private', data);
    return response.data; //mensaje exito
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error.response?.data || { message: 'Error al conectar con el servidor' };
  }
}

export async function deleteProfile() {
  try {
    const response = await axios.delete('/profile/private');
    return response.data; //mensaje exito
  } catch (error) {
    console.error('Error al eliminar perfil:', error);
    throw error.response?.data || { message: 'Error al conectar con el servidor' };
  }
}