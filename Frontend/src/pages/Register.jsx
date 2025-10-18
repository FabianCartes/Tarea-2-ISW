import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { register } from '../services/auth.service'; 
import { showSuccessAlert, showErrorAlert } from '../helpers/sweetAlert'; 

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        showErrorAlert('Error', 'Las contraseñas no coinciden.');
        return;
      }

      try {
        const response = await register({ email, password });

        if (response.data) { 
          showSuccessAlert('¡Éxito!', 'Usuario registrado correctamente. Ahora inicia sesión.');
          navigate('/'); // Redirige al login
        } else {
          showErrorAlert('Error', response.message || 'No se pudo registrar.');
        }

      } catch (error) {
          console.error('Error al registrar:', error);
          showErrorAlert('Error', error.message || 'Error de conexión con el servidor.');
      }
    };

    return (
      <div className="w-full flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-8">
              Crear Cuenta
            </h1>
            {/**contenedor de email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>
            {/*campo de contraseña*/}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>
            {/*campo de confirmacion contraseña */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**********"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all"
            >
              Registrarse
            </button>
            {/*redirige a login */}
            <p className="text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/" className="font-semibold text-purple-600 hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
}

export default Register;