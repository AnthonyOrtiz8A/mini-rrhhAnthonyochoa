// src/pages/DashboardPage.tsx
import { Link } from 'react-router-dom';
import { mockEmployees } from '../utils/mockData';

function DashboardPage() {
  const total = mockEmployees.length;
  const active = mockEmployees.filter(e => e.status === 'active').length;
  const onLeave = mockEmployees.filter(e => e.status === 'on_leave').length;

  const stats = [
    {
      label: 'Total empleados',
      value: total,
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      ring: 'ring-blue-200',
      text: 'text-blue-800',
      badge: 'bg-blue-500',
      icon: '👥',
    },
    {
      label: 'Activos',
      value: active,
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      ring: 'ring-green-200',
      text: 'text-green-800',
      badge: 'bg-green-500',
      icon: '✅',
    },
    {
      label: 'En permiso',
      value: onLeave,
      bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      ring: 'ring-yellow-200',
      text: 'text-yellow-800',
      badge: 'bg-yellow-500',
      icon: '🌤️',
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Estadísticas */}
      <div className="flex flex-col sm:flex-row gap-5 mb-10 flex-wrap">
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`${stat.bg} ${stat.ring} relative overflow-hidden p-6 rounded-2xl
                       min-w-[180px] flex-1 ring-1 shadow-sm
                       hover:shadow-xl hover:-translate-y-1
                       transition-all duration-200 cursor-default`}
          >
            <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${stat.badge} opacity-10`} />
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{stat.icon}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.badge} text-white`}>
                {stat.label}
              </span>
            </div>
            <p className={`m-0 text-4xl font-extrabold ${stat.text}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Acciones */}
      <div className="flex gap-3">
        <Link
          to="/empleados"
          className="group px-6 py-3 bg-brand-800 hover:bg-brand-700 text-white
                     rounded-xl text-sm font-semibold shadow-md hover:shadow-lg
                     transition-all duration-200 inline-flex items-center gap-2"
        >
          Ver empleados
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;