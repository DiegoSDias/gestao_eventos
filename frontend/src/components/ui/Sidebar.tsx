import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  User,
  Calendar,
  Ticket,
  CheckCircle2,
  Crown,
  Trash2,
  Award,
  ChevronDown,
  ChevronUp,
  LogOut,
  ShieldAlert,
  Users,
  Tags,
  LayoutDashboard,
  ListOrdered
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Sidebar() {
  const location = useLocation();
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isEventsOrganizerOpen, setIsEventsOrganizerOpen] = useState(false);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;
  
  // Funções para manter a sanfona ativa se o usuário estiver nas sub-rotas
  const isOrganizerActive = location.pathname.startsWith('/organizer');
  const isAdminActive = location.pathname.startsWith('/admin');

  function handleLogout() {
    signOut()

    navigate("/login");
  }

  const isAdmin = user?.role === 'admin';
  const isOrganizer = user?.role === 'organizer' || isAdmin;

  return (
    <aside className="w-64 h-screen bg-[#F8FAFC] border-r border-slate-200 flex flex-col shadow-sm fixed left-0 top-0 z-40">
      
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3 scrollbar-thin scrollbar-thumb-slate-200">
        <Link to="/" className="text-xl font-bold hover:text-blue-200 mb-10 px-4">
            🎟️ Gestão de Eventos
        </Link>

        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-r-lg border-l-4 transition-colors font-medium ${
            isActive('/')
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Home size={20} className={isActive('/') ? 'text-blue-600' : 'text-slate-500'} />
          Início
        </Link>

        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-r-lg border-l-4 transition-colors font-medium ${
            isActive('/profile')
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <User size={20} className={isActive('/profile') ? 'text-blue-600' : 'text-slate-500'} />
          Meu Perfil
        </Link>

        <div className="flex flex-col mt-1">
          <button
            onClick={() => setIsEventsOpen(!isEventsOpen)}
            className={`flex items-center justify-between px-4 py-3 rounded-r-lg border-l-4 transition-colors font-medium w-full cursor-pointer ${
              isActive('/my-events')
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar size={20} className={isActive('/my-events') ? 'text-blue-600' : 'text-slate-500'} />
              Meus Eventos
            </div>
            {isEventsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isEventsOpen && (
            <div className="flex flex-col gap-1 mt-1 pl-4 mb-2 animate-in slide-in-from-top-2 duration-200">
              <Link
                to="/my-events?tab=participant"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Ticket size={18} className="text-slate-400" />
                Minhas Inscrições
              </Link>
              
              <Link
                to="/my-events?tab=finished"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <CheckCircle2 size={18} className="text-slate-400" />
                Eventos Finalizados
              </Link>

            </div>
          )}
        </div>

        <Link
          to="/my-certificates"
          className={`flex items-center gap-3 px-4 py-3 rounded-r-lg border-l-4 transition-colors font-medium mt-1 ${
            isActive('/my-certificates')
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Award size={20} className={isActive('/my-certificates') ? 'text-blue-600' : 'text-slate-500'} />
          Certificados
        </Link>

        {isOrganizer && (
          <div className="flex flex-col mt-1">
            <button 
              onClick={() => setIsOrganizerOpen(!isOrganizerOpen)}
              className={`flex items-center justify-between px-4 py-3 rounded-r-lg border-l-4 transition-colors font-medium w-full cursor-pointer ${
                isOrganizerActive
                  ? 'border-blue-600 bg-blue-50 text-blue-700' 
                  : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Crown size={20} className={isOrganizerActive ? 'text-blue-600' : 'text-slate-500'} />
                Organizador
              </div>
              {isOrganizerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOrganizerOpen && (
              <div className="flex flex-col gap-1 mt-1 pl-4 mb-2 animate-in slide-in-from-top-2 duration-200">
                <Link to="/organizer/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <LayoutDashboard size={18} className="text-slate-400" /> Visão Geral
                </Link>

                <button
                  onClick={() => setIsEventsOrganizerOpen(!isEventsOrganizerOpen)}
                  className={`flex items-center justify-between px-4 py-3 rounded-r-lg border-l-4 transition-colors font-medium w-full cursor-pointer ${
                    isActive('/organizer/events')
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ListOrdered size={20} className={isActive('/organizer/events') ? 'text-blue-600' : 'text-slate-500'} />
                    Gerenciar Eventos
                  </div>
                  {isEventsOrganizerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isEventsOrganizerOpen && (
                <div className="flex flex-col gap-1 mt-1 pl-4 mb-2 animate-in slide-in-from-top-2 duration-200">

                  <Link
                    to="/organizer/events?tab=organizer"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Crown size={18} className="text-slate-400" />
                    Organizados
                  </Link>

                  <Link
                    to="/organizer/events?tab=trashed"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-slate-400" />
                    Lixeira
                  </Link>
                </div>
              )}
              </div>
            )}
          </div>
        )}

        {isAdmin && (
          <div className="flex flex-col mt-1">
            <button 
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`flex items-center justify-between px-4 py-3 rounded-r-lg border-l-4 transition-colors font-medium w-full cursor-pointer ${
                isAdminActive
                  ? 'border-blue-600 bg-blue-50 text-blue-700' 
                  : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldAlert size={20} className={isAdminActive? 'text-blue-600' : 'text-slate-500'} />
                Administração
              </div>
              {isAdminOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isAdminOpen && (
              <div className="flex flex-col gap-1 mt-1 pl-4 mb-2 animate-in slide-in-from-top-2 duration-200">
                <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <LayoutDashboard size={18} className="text-slate-400" /> Painel Central
                </Link>
                <Link to="/admin/users" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Users size={18} className="text-slate-400" /> Usuários
                </Link>
                <Link to="/admin/categories" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Tags size={18} className="text-slate-400" /> Categorias
                </Link>
                <Link to="/admin/events" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Calendar size={18} className="text-slate-400" /> Todos os Eventos
                </Link>
              </div>
            )}
          </div>
        )}

      </div>

      <div className="p-4 border-t border-slate-200 bg-[#F8FAFC]">
        <button
            onClick={() => {
                handleLogout();
            }}
            className="w-full text-center flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-bold bg-red-100 hover:bg-red-200 text-red-600 cursor-pointer transition-colors"
        >
            <LogOut size={18} />
            <span>Sair</span>
        </button>
      </div>

    </aside>
  );
}

