import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from "../../layouts/Layout";
import { CheckCircle, XCircle } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const result = location.state?.result?.toLowerCase();
  const message = location.state?.message;

  const isSpam = result === 'spam';
  const isHam = result === 'ham';

  const displayText = isSpam
    ? ' This message is SPAM!'
    : isHam
    ? ' This message is SAFE!'
    : 'No result';

  const description = isSpam
    ? 'This message appears to be unsolicited or potentially harmful. Be cautious and avoid clicking suspicious links.'
    : isHam
    ? 'This message seems legitimate and does not pose a spam threat.'
    : '';

  const iconStyle = {
    fontSize: '64px',
    marginBottom: '20px',
    color: isSpam ? '#dc3545' : isHam ? '#198754' : '#6c757d',
  };

  return (
    <Layout>
    
        <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1rem",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
         <div
          className="text-center"
          style={{
            maxWidth: "900px",
            width: "100%",
            backgroundColor: "rgba(13, 50, 89, 0.8)",
           //backgroundColor: "		rgb(218, 165, 32,0.5)",
            borderRadius: "1rem",
            padding: "2rem",
            //color: "white",
          }}
        >
          <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'white' }}>Original Message:</h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '30px',
            padding: '15px',
            backgroundColor: '#f1f3f5',
            borderRadius: '10px',
            border: '1px solid #ced4da',
            color: '#212529'
          }}>
            {message || 'No message provided.'}
          </p>

          {isSpam && <XCircle size={64} style={iconStyle} />}
          {isHam && <CheckCircle size={64} style={iconStyle} />}
          
          <h1 style={{ fontSize: '32px', marginBottom: '20px', color: isSpam ? '#dc3545' : '#198754' }}>
            {displayText}
          </h1>
          <p style={{ fontSize: '18px', color: 'white' }}>{description}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Result;
