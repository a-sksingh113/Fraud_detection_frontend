import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../../layouts/Layout";

const BankDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);


  const fetchLogs = async () => {
    try {
      const res = await axios.get('https://api.ucohakethon.pixbit.me/api/admin/logs');
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://api.ucohakethon.pixbit.me/api/admin/users');
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchUsers();
    const interval = setInterval(() => {
      fetchLogs();
      fetchUsers();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: '#f2f2f2', padding: '20px', height: '100vh' }}>
        <h3 style={{ marginBottom: '20px' }}> Menu</h3>
        <button
          onClick={() => setShowUsers(false)}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        >
          Dashboard
        </button>
        <button
          onClick={() => setShowUsers(true)}
          style={{ display: 'block', padding: '8px', width: '100%' }}
        >
          All Users
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        {!showUsers ? (
          <>
            <h2 style={{ textAlign: 'center' }}> Bank AI Fraud Detection Dashboard</h2>
         

            <div
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '8px',
                marginTop: '20px',
                maxHeight: '500px',
                overflowY: 'auto',
              }}
            >
              {logs.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'gray' }}>No user activities logged yet.</p>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: log.type === 'fraud' ? '#ffe6e6' : '#e6ffe6',
                      padding: '10px',
                      marginBottom: '10px',
                      borderRadius: '5px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    <strong>{log.timestamp}</strong>
                    <p>User Account Number: <strong>{log.userId}</strong></p>
                    <p>Amount: ₹{log.amount}</p>
                    <p>Merchant: {log.merchantID}</p>
                    <p>Status: <span style={{ color: log.type === 'fraud' ? 'red' : 'green' }}>{log.message}</span></p>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: 'center' }}>👥 All Users</h2>
            {users.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'gray' }}>No users found.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Merchant ID</th>
                    <th style={thStyle}>Account No</th>
                    <th style={thStyle}>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx}>
                      <td style={tdStyle}>{user.name}</td>
                      <td style={tdStyle}>{user.email}</td>
                      <td style={tdStyle}>{user.merchantId}</td>
                      <td style={tdStyle}>{user.accountNumber}</td>
                      <td style={tdStyle}>{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
    </Layout>
  );
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: '#f8f8f8',
  fontWeight: 'bold',
  textAlign: 'left'
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px'
};

export default BankDashboard;
