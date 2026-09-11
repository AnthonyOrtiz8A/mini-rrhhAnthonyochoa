// src/pages/EmployeeDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../hook/useEmployees';
import type { EmployeeStatus } from '../types';

const statusConfig: Record<EmployeeStatus, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Activo' },
  inactive: { bg: 'bg-red-100', text: 'text-red-800', label: 'Inactivo' },
  on_leave: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En permiso' },
};

function formatSalary(salary: number) {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 2,
  }).format(salary);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-GT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employeeId = id ? Number(id) : null;

  const { data: employee, isLoading, isError, error } = useEmployee(employeeId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/empleados')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver
      </button>

      {isLoading && (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mr-3" />
          <span>Cargando empleado...</span>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 font-medium">Error al cargar el empleado</p>
          <p className="text-red-500 text-sm mt-1">
            {(error as Error)?.message || 'Error desconocido'}
          </p>
        </div>
      )}

      {!isLoading && !isError && employee && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 p-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden text-blue-700 font-semibold text-xl shrink-0">
              {employee.avatarUrl ? (
                <img
                  src={employee.avatarUrl}
                  alt={`Avatar de ${employee.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                employee.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">{employee.name}</h1>
              <p className="text-slate-500">{employee.position}</p>
            </div>
            <span
              className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${statusConfig[employee.status].bg} ${statusConfig[employee.status].text}`}
            >
              {statusConfig[employee.status].label}
            </span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 p-6">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400 mb-1">Email</dt>
              <dd className="text-slate-800">{employee.email}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400 mb-1">Cargo</dt>
              <dd className="text-slate-800">{employee.position}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400 mb-1">Departamento</dt>
              <dd className="text-slate-800">{employee.department}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400 mb-1">Salario</dt>
              <dd className="text-slate-800">{formatSalary(employee.salary)}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400 mb-1">Fecha de ingreso</dt>
              <dd className="text-slate-800">{formatDate(employee.hireDate)}</dd>
            </div>

            {employee.phone && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400 mb-1">Teléfono</dt>
                <dd className="text-slate-800">{employee.phone}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}

export default EmployeeDetailPage;