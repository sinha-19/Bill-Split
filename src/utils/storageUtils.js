export const saveBillData = (data) => {
  try {
    localStorage.setItem('billSplitData', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};
export const loadBillData = () => {
  try {
    const data = localStorage.getItem('billSplitData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};
export const clearBillData = () => {
  try {
    localStorage.removeItem('billSplitData');
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};