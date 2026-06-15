import { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export interface AppNotification {
  id: string;
  type: string;
  data: {
    title: string;
    message: string;
    type: string;
  };
  read_at: string | null;
  created_at: string;
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
          try {
            const response = await api.get('/notifications');
            const dataList = response.data.data.data ? response.data.data.data : response.data.data;
    
            setNotifications(dataList);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        }

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => n.read_at === null).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (id: string) => {
    await api.patch(`/notifications/${id}/read`);
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n)
    );
  };

  const markAllAsRead = async () => {
    await api.patch(`/notifications/read-all`);
    setNotifications(prev => 
        prev.map(n => n.read_at === null
            ? {...n, read_at: new Date().toISOString()}
            : n)
    )
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-white hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <Bell size={24} />

        {unreadCount > 0 && (
          <span className="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white shadow-sm">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">

            {loading && (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            )}

          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-base">Notificações</h3>
            {unreadCount > 0 && (
              <button 
                onClick={() => markAllAsRead()}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
                <Bell size={32} className="text-slate-300" />
                <p className="text-sm">Você não tem novas notificações.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-50">
                {notifications.map((notification) => {
                  const isUnread = notification.read_at === null;
                  return (
                    <li key={notification.id} className={`p-4 hover:bg-slate-50 transition-colors flex gap-4 ${isUnread ? 'bg-blue-50/30' : 'opacity-70'}`}>
    
                      <div className={`mt-1 shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isUnread ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        {notification.type.includes('Cancel') ? <AlertCircle size={18} /> : 
                         notification.type.includes('Registration') ? <CheckCircle2 size={18} /> : 
                         <Info size={18} />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${isUnread ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>
                          {notification.data.title}
                        </p>
                        <p className="text-sm text-slate-500 mt-0.5 line-clamp-2 leading-snug">
                          {notification.data.message}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-2">
                          {new Date(notification.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>

                      {isUnread && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          title="Marcar como lida"
                          className="shrink-0 text-blue-400 hover:text-blue-600 p-1 self-start cursor-pointer"
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          
          <div className="p-3 border-t border-slate-100 text-center bg-slate-50/50">
            <Link to="/notifications" onClick={() => setIsOpen(false)} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
              Ver histórico completo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


