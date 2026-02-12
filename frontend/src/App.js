import React, { useState } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import AttendanceForm from './components/AttendanceForm';
import AttendanceList from './components/AttendanceList';

function App() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  return (
    <div
      className="App"
      style={{
        padding: '1.5rem',
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      }}
    >
      <h1>HRMS Lite</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '2rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Left panel: Employee Management */}
        <div>
          <EmployeeList onSelect={(id) => setSelectedEmployeeId(id)} />
        </div>

        {/* Right panel: Attendance */}
        <div>
          <h2>Attendance</h2>
          <AttendanceForm />
          <div style={{ marginTop: '1rem' }}>
            <AttendanceList employeeId={selectedEmployeeId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
  