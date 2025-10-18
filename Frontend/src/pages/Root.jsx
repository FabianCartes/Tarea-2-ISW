import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';
import { Header } from '../components/Header';

function Root() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
        
        <Header />

        <main className="flex-grow flex">
          <Outlet />
        </main>
        
      </div>
    </AuthProvider>
  );
}

export default Root;