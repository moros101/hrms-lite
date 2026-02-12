import React, { useEffect, useState } from 'react';
import api from '../api';
import EmployeeForm from './EmployeeForm';

export default function EmployeeList({ onSelect }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employees/');
      const data = res.data;
      // Defensive: ensure we always end up with an array here
      if (Array.isArray(data)) {
        setEmployees(data);
      } else if (data && Array.isArray(data.results)) {
        // Support for paginated responses: { results: [...] }
        setEmployees(data.results);
      } else {
        console.warn('Unexpected /employees/ payload, expected array:', data);
        setEmployees([]);
        setError('Unexpected response from server.');
      }
    } catch (e) {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id) => {
    if(!window.confirm('Delete employee?')) return;
    try {
      await api.delete(`/employees/${id}/`);
      setEmployees(prev => prev.filter(e => e.id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <h2>Employees</h2>
      <EmployeeForm onAdded={fetch}/>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && Array.isArray(employees) && employees.length===0 && <p>No employees yet.</p>}
      <ul className="employee-list">
        {Array.isArray(employees) && employees.map(e => (
          <li key={e.id} className="employee-item">
            <div className="employee-meta" onClick={() => onSelect && onSelect(e.id)}>
              <span className="employee-name">
                {e.full_name} ({e.employee_id})
              </span>
              <span className="employee-sub">
                {e.department || 'No department'} · {e.email}
              </span>
            </div>
            <div className="item-actions">
              <button
                type="button"
                className="btn btn-ghost small"
                onClick={() => onSelect && onSelect(e.id)}
              >
                View attendance
              </button>
              <button
                type="button"
                className="btn btn-danger small"
                onClick={() => handleDelete(e.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
