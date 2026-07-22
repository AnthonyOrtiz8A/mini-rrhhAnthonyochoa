import Header from './layouts/Header';
import EmployeeCard from './components/EmployeeCard';
import StatsBadge from './components/StatsBadge';
import { mockEmployees } from './utils/mockData';
import type { Employee } from './types';

function App() {
  const handleSelectEmployee = (employee: Employee) => {
    console.log('Empleado seleccionado:', employee.name);
    alert(`Seleccionaste a ${employee.name} — ${employee.position}`);
  };

  const total = mockEmployees.length;
  const active = mockEmployees.filter((e) => e.status === 'active').length;
  const onLeave = mockEmployees.filter((e) => e.status === 'on_leave').length;
  const inactive = mockEmployees.filter((e) => e.status === 'inactive').length;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header />
      <main style={{ padding: '24px' }}>
        <h2 style={{ marginBottom: '16px', color: '#1e293b' }}>
          Empleados ({mockEmployees.length})
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <StatsBadge label="Total de empleados" value={total} color="#1d4ed8" />
          <StatsBadge label="Empleados activos" value={active} color="#16a34a" />
          <StatsBadge label="Empleados en permiso" value={onLeave} color="#ca8a04" />
          <StatsBadge label="Empleados inactivos" value={inactive} color="#dc2626" />
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {mockEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onSelect={handleSelectEmployee}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;