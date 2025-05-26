import React from 'react';
const CurrencySelector = ({ selectedCurrency, onCurrencyChange }) => {
  const currencies = [
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
  ];
  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="currency">Select Currency:</label>
      <select
        id="currency"
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        style={{ marginLeft: '10px', padding: '5px' }}
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} - {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CurrencySelector;