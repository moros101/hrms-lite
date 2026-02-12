import React, {useState, useEffect} from 'react';
import api from '../api';

export default function AttendanceForm() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ employee: '', date: '', status: 'P' });

  useEffect(() => {
    api.get('/employees/')
      .then(r => {
        const data = r.data;
        if (Array.isArray(data)) {
          setEmployees(data);
        } else if (data && Array.isArray(data.results)) {
          setEmployees(data.results);
        } else {
          console.warn('Unexpected /employees/ payload in AttendanceForm:', data);
          setEmployees([]);
        }
      })
      .catch(err => {
        console.error('Failed to load employees for attendance form', err);
        setEmployees([]);
      });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/attendances/', form);
      alert('Attendance marked');
      setForm({...form, employee:'', date:''});
    } catch (err) {
      alert(err?.response?.data || 'Failed to mark attendance');
    }
  };

  return (
    <form onSubmit={submit}>
      <select required value={form.employee} onChange={e=>setForm({...form, employee: e.target.value})}>
        <option value="">Select employee</option>
        {Array.isArray(employees) &&
          employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
      </select>
      <input required type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
      <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
        <option value="P">Present</option>
        <option value="A">Absent</option>
      </select>
      <button className="btn btn-primary small">Mark</button>
    </form>
  );
}
