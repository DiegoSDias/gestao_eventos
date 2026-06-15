import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/ui/Sidebar';
import Navbar from './components/ui/Navbar';


export function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">

      {isAuthenticated && <Sidebar />}

      <div className={`flex-1 flex flex-col min-w-0 ${isAuthenticated ? 'ml-64' : ''}`}>
        
        {isAuthenticated && <Navbar />}

        <main className="flex-1">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
}

export default App;