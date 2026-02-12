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
      setEmployees(res.data);
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
      {!loading && employees.length===0 && <p>No employees yet.</p>}
      <ul className="employee-list">
        {employees.map(e => (
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
