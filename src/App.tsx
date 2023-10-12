import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [name, setInputValue] = useState('');

  // useEffect(() => {
    const handleBlur = () => {
    axios.post('http://127.0.0.1:8000/api/emp-att-record',
    { emp_name: name }
    ,{
      headers: {"Access-Control-Allow-Origin": "*"},      
    })
      .then((response) => {
        // console.log(response.data[0].employee_id);
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <h1>Attendance List</h1>
      Emp Name  
      <input
        type="text"
        value={name}
        placeholder='Enter Name to search'
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur} 
      />

      <table>
      <tr>
        <td>Name</td>
        <td>Check-In</td>
        <td>Check-Out</td>
        <td>Total Working Hours</td>
      </tr>      
              
        {attendanceData.map((entry: any) => (
          <tr key={entry.id}>
          <td>{entry.name}</td>
          <td>{entry.In}</td>
          <td>{entry.Out}</td>
          <td>{entry.hours}</td>          
          </tr>
        ))}
      
      </table>
    </div>
  );
}

export default App;
