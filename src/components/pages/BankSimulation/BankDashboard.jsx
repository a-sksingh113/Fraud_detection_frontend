import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../../layouts/Layout";

const BankDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);


  const fetchLogs = async () => {
    try {
      const res = await axios.get('https://spam-detector-app-backend.vercel.app/api/admin/logs');
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://spam-detector-app-backend.vercel.app/api/admin/users');
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
     
    <div style={{ display: 'flex',
       fontFamily: 'Arial, sans-serif',
       }}>
      
      {/* Sidebar */}
      <div style={{marginTop:'75px',height:''}}>
         <div style={{ width: '200px',
           backgroundColor: 'rgba(0, 4, 9, 0.8)',
            padding: '20px',
             minHeight: '100vh',
             borderStartEndRadius:'20px', 
             position:'sticky'
              }}>
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
      </div>
     

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        {!showUsers ? (
          <>
           <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: "1200px",
            backgroundColor: "rgba(13, 50, 89, 0.8)",
            borderRadius: "1rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            fontFamily: '"Segoe UI", sans-serif',
          }}
        >
            <h2 style={{ textAlign: 'center' }}> Bank AI Fraud Detection Dashboard</h2>
         

            <div
              
              style={{
               border: '1px solid #ccc',
               padding: '1rem',
               borderRadius: '0.5rem',
              marginTop: '1.5rem',
               maxHeight: '60vh',           // 60% of viewport height
               overflowY: 'auto',
               backgroundColor: 'white',    // optional for contrast
               color: 'black',
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
                      color:'black',
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
            </div>
            </div>
          </>
        ) : (
          <>
              <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "850px",
            backgroundColor: "rgba(13, 50, 89, 0.8)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            padding: "40px",
            fontFamily: '"Segoe UI", sans-serif',
          }}
        >
            <h2 style={{ textAlign: 'center' }}>👥 All Users</h2>
            {users.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'black' }}>No users found.</p>
            ) : (
              <table style={{ width: '100vw', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>MerchantID</th>
                    <th style={thStyle}>Account No</th>
                    <th style={thStyle}>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx}>
                      <td style={tdStyle}>{user.name}</td>
                      <td style={tdStyle}>{user.email}</td>
                      <td style={tdStyle}>{user.merchantID}</td>
                      <td style={tdStyle}>{user._id}</td>
                      <td style={tdStyle}>{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </div>
            </div>
          </>
        )}
      </div>
    </div>
    </Layout>
    // </div>
  );
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: 'black',
  fontWeight: 'bold',
  textAlign: 'left'
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px'
};

export default BankDashboard;
