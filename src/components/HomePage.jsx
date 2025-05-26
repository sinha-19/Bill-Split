import React from 'react';
import { SplitSquareVertical as SplitSquare } from 'lucide-react';
const HomePage = ({ onStartSplitting }) => {
  return (
    <div className="container">
      <div style={styles.wrapper}>
        <div style={styles.iconWrapper}>
          <SplitSquare size={72} color="#3b82f6" strokeWidth={1.5} />
        </div>
        <h1 style={styles.title}>Welcome to <span style={styles.brand}>BillSplit</span></h1>
        <p style={styles.subtitle}>Easily split bills with friends and family — fast, fair, and effortless.</p>
        <button 
          onClick={onStartSplitting}
          style={styles.button}
        >
          🚀 Start Splitting
        </button>
      </div>
    </div>
  );
};
const styles = {
  wrapper: {
    textAlign: 'center',
    marginTop: '80px',
    animation: 'fadeInUp 0.6s ease-in-out',
  },
  iconWrapper: {
    background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
    display: 'inline-flex',
    padding: '16px',
    borderRadius: '50%',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.05)',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    margin: '10px 0',
    fontWeight: 700,
    color: '#1f2937',
  },
  brand: {
    background: 'linear-gradient(to right, #3b82f6, #6366f1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#6b7280',
    marginBottom: '30px',
    maxWidth: '500px',
    margin: '0 auto 30px',
  },
  button: {
    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    color: 'white',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
  }
};
export default HomePage;
