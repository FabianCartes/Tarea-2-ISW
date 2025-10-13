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

