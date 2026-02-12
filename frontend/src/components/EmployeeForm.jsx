import React, { useState } from 'react';
import api from '../api';

export default function EmployeeForm({ onAdded }) {
  const [form, setForm] = useState({ employee_id: '', full_name: '', email: '', department: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.employee_id.trim()) next.employee_id = 'Employee ID is required';
    if (!form.full_name.trim()) next.full_name = 'Full name is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/employees/', form);
      setForm({ employee_id: '', full_name: '', email: '', department: '' });
      setErrors({});
      onAdded && onAdded();
    } catch (err) {
      alert(err?.response?.data || 'Failed to add');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit}>
      <input
        required
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={e => setForm({ ...form, employee_id: e.target.value })}
      />
      {errors.employee_id && <small className="text-muted">{errors.employee_id}</small>}

      <input
        required
        placeholder="Full name"
        value={form.full_name}
        onChange={e => setForm({ ...form, full_name: e.target.value })}
      />
      {errors.full_name && <small className="text-muted">{errors.full_name}</small>}

      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <small className="text-muted">{errors.email}</small>}

      <input
        placeholder="Department"
        value={form.department}
        onChange={e => setForm({ ...form, department: e.target.value })}
      />

      <button className="btn btn-primary small" disabled={loading}>
        {loading ? 'Saving...' : 'Add Employee'}
      </button>
    </form>
  );
}
