import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { NotificationBell } from "./NotificationBell";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-blue-500/20"
            aria-label="Abrir menu"
          >
            <Menu />
          </button>

        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 md:gap-4">
              <NotificationBell />

              <div className="relative">
                <button
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md"
                >
                  <User />
                  <span className="hidden sm:inline text-sm">Conta</span>
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 ${open ? "visible" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 ${open ? "opacity-100" : "opacity-0"} transition-opacity`}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-white text-slate-800 transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform shadow-xl`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-lg font-bold"
            >
              🎟️ Gestão
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100"
              aria-label="Fechar menu"
            >
              <X />
            </button>
          </div>

        </aside>
      </div>
    </header>
  );
}
