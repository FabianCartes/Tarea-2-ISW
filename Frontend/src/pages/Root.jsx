import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';
import { Header } from '../components/Header';

function Root() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        
        <Header />

        <main className="flex-grow">
          <Outlet />
        </main>
        
      </div>
    </AuthProvider>
  );
}

export default Root;