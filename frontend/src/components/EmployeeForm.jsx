import React, { useState } from 'react';
import api from '../api';

export default function EmployeeForm({ onAdded }) {
  const [form, setForm] = useState({ employee_id:'', full_name:'', email:'', department:'' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/employees/', form);
      setForm({ employee_id:'', full_name:'', email:'', department:'' });
      onAdded && onAdded();
    } catch (err) {
      alert(err?.response?.data || 'Failed to add');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit}>
      <input required placeholder="Employee ID" value={form.employee_id} onChange={e=>setForm({...form, employee_id:e.target.value})}/>
      <input required placeholder="Full name" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})}/>
      <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
      <input placeholder="Department" value={form.department} onChange={e=>setForm({...form, department:e.target.value})}/>
      <button className="btn btn-primary small" disabled={loading}>
        {loading ? 'Saving...' : 'Add Employee'}
      </button>
    </form>
  );
}
