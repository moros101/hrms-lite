import React, {useState, useEffect} from 'react';
import api from '../api';

export default function AttendanceList({ employeeId }) {
  const [records, setRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState('');

  const fetch = async () => {
    const params = dateFilter ? { date: dateFilter } : {};
    const res = await api.get(`/employees/${employeeId}/attendance/`, { params });
    setRecords(res.data);
  };

  useEffect(() => { if(employeeId) fetch(); }, [employeeId, dateFilter]);

  if(!employeeId) return <p>Select an employee to view attendance.</p>;

  return (
    <div>
      <h3>Attendance</h3>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input type="date" value={dateFilter} onChange={e=>setDateFilter(e.target.value)}/>
        <button className="btn btn-primary small" type="button" onClick={fetch}>
          Filter
        </button>
      </div>
      <div className="attendance-list">
        {records.map(r => (
          <div key={r.id} className="attendance-row">
            <span>{r.date}</span>
            <span
              className={
                'status-pill ' +
                (r.status === 'P' ? 'status-present' : 'status-absent')
              }
            >
              {r.status === 'P' ? 'Present' : 'Absent'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
