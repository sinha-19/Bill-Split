import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CreateSplitPage from './components/CreateSplitPage';
import ResultPage from './components/ResultPage';
import { loadBillData, clearBillData } from './utils/storageUtils';
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [billData, setBillData] = useState(null);
  useEffect(() => {
    const savedData = loadBillData();
    if (savedData) {
      setBillData(savedData);
      setCurrentPage('result');
    }
  }, []);
  const handleStartSplitting = () => {
    setCurrentPage('create');
  };
  const handleSplitComplete = (data) => {
    setBillData(data);
    setCurrentPage('result');
  };
  const handleReset = () => {
    clearBillData();
    setBillData(null);
    setCurrentPage('home');
  };
  return (
    <div className="app">
      <Header />  
      {currentPage === 'home' && (
        <HomePage onStartSplitting={handleStartSplitting} />
      )}
      {currentPage === 'create' && (
        <CreateSplitPage onComplete={handleSplitComplete} />
      )}
      {currentPage === 'result' && billData && (
        <ResultPage data={billData} onReset={handleReset} />
      )}
      <Footer />
    </div>
  );
}
export default App;