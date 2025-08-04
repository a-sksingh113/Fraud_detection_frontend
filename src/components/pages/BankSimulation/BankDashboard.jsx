

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../../layouts/Layout";

const BankDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

    const handleResize = () => setIsMobile(window.innerWidth < 1100);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        fontFamily: 'Arial, sans-serif',
        //minHeight: '100vh',
        width: '100vw',
      }}>
        {/* Sidebar or Top Shortcut Buttons */}
        {!isMobile ? (
          <div style={{
            minWidth: '200px',
            backgroundColor: 'rgba(0, 4, 9, 0.8)',
            padding: '20px',
            minHeight: '100vh',
            marginTop: '75px',
            borderStartEndRadius: '20px',
            position: 'sticky',
            top: 0
          }}>
            <h3 style={{ marginBottom: '20px', color: 'white' }}>Menu</h3>
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
        ) : (
          <div style={{
            

              display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: '#001f3f',
            padding: '10px 0',
            position: 'fixed',
            bottom: 0,
            width: '100vw',
            zIndex: 1000,
            boxShadow: '0 -2px 10px rgba(0,0,0,0.3)',
          }}>
            <button onClick={() => setShowUsers(false)} style={mobileButtonStyle}>Dashboard</button>
            <button onClick={() => setShowUsers(true)} style={mobileButtonStyle}>All Users</button>
          </div>
        )}

        {/* Main Content */}
        <div style={{ flex: 1, padding: '30px' }}>
          {!showUsers ? (
            <div style={mainContentStyle}>
              <div style={cardStyle}>
                <h2 style={{ textAlign: 'center', color: 'white' }}>Bank AI Fraud Detection Dashboard</h2>
                <div style={logContainerStyle}>
                  {logs.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'gray' }}>No user activities logged yet.</p>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} style={{
                        backgroundColor: log.type === 'fraud' ? '#ffe6e6' : '#e6ffe6',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        color: 'black'
                      }}>
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
          ) : (
            <div style={mainContentStyle}>
              <div style={cardStyle}>
                <h2 style={{ textAlign: 'center', color: 'white' }}>👥 All Users</h2>
                {users.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'black' }}>No users found.</p>
                ) : (
               
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
  <table style={{ minWidth: '600px', borderCollapse: 'collapse', marginTop: '20px', width: '100%' }}>

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
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Shared styles
const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: 'black',
  fontWeight: 'bold',
  textAlign: 'left',
  color: 'white'
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  color: 'white'
};

const mobileButtonStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  fontSize: '14px'
};

const mainContentStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 20px'
};

const cardStyle = {
  width: '100%',
  maxWidth: '1200px',
  backgroundColor: 'rgba(13, 50, 89, 0.8)',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  padding: '2rem'
};

const logContainerStyle = {
  border: '1px solid #ccc',
  padding: '1rem',
  borderRadius: '0.5rem',
  marginTop: '1.5rem',
  maxHeight: '60vh',
  overflowY: 'auto',
  backgroundColor: 'white',
  color: 'black'
};

export default BankDashboard;
