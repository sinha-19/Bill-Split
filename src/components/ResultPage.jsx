import React from 'react';
import { ArrowRight } from 'lucide-react';
const ResultPage = ({ data, onReset }) => {
  const { people, transactions, totalBill, equalShare, currency } = data;
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  return (
    <div className="container">
      <h2>Bill Split Results</h2>
      <div className="card">
        <h3>Summary</h3>
        <p>Total Bill: {formatCurrency(totalBill)}</p>
        <p>Equal Share: {formatCurrency(equalShare)}</p>
      </div>
      <div className="card">
        <h3>Who Pays Whom</h3>
        {transactions.length === 0 ? (
          <p>Everyone has paid their fair share!</p>
        ) : (
          <div>
            {transactions.map((transaction, index) => (
              <div key={index} className="result-summary" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <strong>{people[transaction.from].name}</strong>
                </div>
                <div style={{ margin: '0 10px' }}>
                  <ArrowRight />
                </div>
                <div style={{ flex: 1 }}>
                  <strong>{people[transaction.to].name}</strong>
                </div>
                <div style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>    
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={onReset}>Start Over</button>
      </div>
    </div>
  );
};
export default ResultPage;