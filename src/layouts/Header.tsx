// src/layouts/Header.tsx
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { User } from '../types';

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/empleados', label: 'Empleados' },
];

function Header({ user, onLogout }: HeaderProps) {
  const { pathname } = useLocation();

  // Controla el ciclo de vida del mensaje de bienvenida:
  // 'idle' -> no se muestra | 'entering' -> animando entrada | 'visible' -> quieto
  // 'exiting' -> animando salida | 'done' -> ya solo se muestra el nombre
  const [welcomeStage, setWelcomeStage] = useState<'idle' | 'entering' | 'visible' | 'exiting' | 'done'>('idle');

  useEffect(() => {
    if (!user) return;

    // Si ya se mostró en esta sesión, va directo al nombre (sin animar)
    if (sessionStorage.getItem('welcomeShown')) {
      const toDoneImmediate = setTimeout(() => setWelcomeStage('done'), 0);
      return () => clearTimeout(toDoneImmediate);
    }

    // El flag se marca DENTRO del primer timeout (no antes de agendarlo),
    // para que sobreviva correctamente al doble-montaje de React StrictMode
    // en desarrollo: si esta ejecución del efecto se cancela, nunca llega
    // a marcar el flag, y la siguiente ejecución sí completa el ciclo.
    const toEntering = setTimeout(() => {
      sessionStorage.setItem('welcomeShown', '1');
      setWelcomeStage('entering');
    }, 0);
    const toVisible = setTimeout(() => setWelcomeStage('visible'), 50);
    const toExiting = setTimeout(() => setWelcomeStage('exiting'), 5000);
    const toDone = setTimeout(() => setWelcomeStage('done'), 5300);

    return () => {
      clearTimeout(toEntering);
      clearTimeout(toVisible);
      clearTimeout(toExiting);
      clearTimeout(toDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name]);

  const handleLogout = () => {
    sessionStorage.removeItem('welcomeShown');
    onLogout?.();
  };

  return (
    <header className="bg-brand-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">👥</span>
          <span className="font-bold text-xl tracking-tight">Mini RRHH</span>
        </div>

        {/* Navegación */}
        {user && (
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${pathname.startsWith(item.to)
                    ? 'bg-white/20 text-white'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Usuario y logout */}
        {user && (
          <div className="flex items-center gap-3">
            {welcomeStage !== 'idle' && welcomeStage !== 'done' ? (
              <span
                className={`hidden md:flex items-center gap-1.5 text-sm font-semibold
                           px-3 py-1 rounded-full ring-1 ring-white/40
                           bg-gradient-to-r from-white/15 via-white/25 to-white/15
                           shadow-[0_0_12px_rgba(255,255,255,0.35)]
                           transition-all duration-500 ease-out
                           ${welcomeStage === 'entering'
                             ? 'opacity-0 scale-75 -translate-y-3'
                             : welcomeStage === 'visible'
                               ? 'opacity-100 scale-100 translate-y-0'
                               : 'opacity-0 scale-90 translate-y-2'
                           }`}
              >
                <span className="inline-block animate-bounce">👋</span>
                <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
                  ¡Bienvenido, {user.name}!
                </span>
              </span>
            ) : (
              <span className="hidden md:block text-sm text-white/80">
                {user.name}
              </span>
            )}
            <span className="text-xs bg-blue-500 px-2 py-0.5 rounded-full
                             uppercase font-medium">
              {user.role}
            </span>
            {onLogout && (
              <button
                onClick={handleLogout}
                className="text-sm text-white/75 hover:text-white border
                           border-white/30 hover:border-white/60
                           px-3 py-1.5 rounded-md transition-colors"
              >
                Salir
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;