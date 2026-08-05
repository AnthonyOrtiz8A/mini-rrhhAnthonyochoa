// src/layouts/Header.tsx
import { Link } from 'react-router-dom';
import type { User } from '../types';

interface HeaderProps {
  user?: User;
  onLogout: () => void;
}

function Header({ user, onLogout }: HeaderProps) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 24px', background: '#1e293b', color: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>👥</span>
        <strong>Mini RRHH</strong>
      </div>

      <nav style={{ display: 'flex', gap: '4px' }}>
        {[
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/empleados', label: 'Empleados' },
        ].map(item => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
        {user && <span>{user.name}</span>}
        <button
          onClick={onLogout}
          style={{
            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.8)',
            cursor: 'pointer', fontSize: '14px', padding: '4px 8px'
          }}
        >
          Salir
        </button>
      </div>
    </header>
  );
}

export default Header;