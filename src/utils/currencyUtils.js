export const fetchExchangeRate = async (baseCurrency) => {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/2f5d0ff4f869151f8d029bcc/latest/${baseCurrency}`);    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};
export const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (!rates) return amount;
  if (fromCurrency === toCurrency) return amount;
  let inUSD = amount;
  if (fromCurrency !== 'USD') {
    inUSD = amount / rates[fromCurrency];
  }
  if (toCurrency === 'USD') {
    return inUSD;
  }
  return inUSD * rates[toCurrency];
};