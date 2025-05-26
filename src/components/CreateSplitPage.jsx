import React, { useState, useEffect } from 'react';
import PersonInput from './PersonInput';
import ItemInput from './ItemInput';
import CurrencySelector from './CurrencySelector';
import { fetchExchangeRate } from '../utils/currencyUtils';
const CreateSplitPage = ({ onComplete }) => {
  const [people, setPeople] = useState([
    { name: '' },
    { name: '' }
  ]);
  const [items, setItems] = useState([
    { name: '', cost: '', assignedTo: '' }
  ]);
  const [currency, setCurrency] = useState('INR');
  const [errors, setErrors] = useState({});
  const [exchangeRates, setExchangeRates] = useState(null);
  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        const rates = await fetchExchangeRate('USD');
        setExchangeRates(rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
    getExchangeRates();
  }, []);
  const handleAddPerson = () => {
    setPeople([...people, { name: '' }]);
  };
  const handleDeletePerson = (index) => {
    const newPeople = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);
    const newItems = items.map(item => {
      if (item.assignedTo === index.toString()) {
        return { ...item, assignedTo: '' };
      } else if (item.assignedTo > index.toString()) {
        return { ...item, assignedTo: (parseInt(item.assignedTo) - 1).toString() };
      }
      return item;
    });
    setItems(newItems);
  };
  const handleNameChange = (index, name) => {
    const newPeople = [...people];
    newPeople[index].name = name;
    setPeople(newPeople);
  };
  const handleAddItem = () => {
    setItems([...items, { name: '', cost: '', assignedTo: '' }]);
  };
  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const handleItemNameChange = (index, name) => {
    const newItems = [...items];
    newItems[index].name = name;
    setItems(newItems);
  };
  const handleItemCostChange = (index, cost) => {
    const newItems = [...items];
    newItems[index].cost = cost;
    setItems(newItems);
  };
  const handleItemAssignmentChange = (index, assignedTo) => {
    const newItems = [...items];
    newItems[index].assignedTo = assignedTo;
    setItems(newItems);
  };
  const calculateSplit = () => {
    const newErrors = {};
    if (people.some(person => !person.name.trim())) {
      newErrors.people = 'All people must have names';
    }
    if (items.some(item => !item.name.trim())) {
      newErrors.itemNames = 'All items must have names';
    }
    if (items.some(item => !item.cost || isNaN(item.cost) || parseFloat(item.cost) <= 0)) {
      newErrors.itemCosts = 'All items must have valid costs';
    }
    if (items.some(item => item.assignedTo === '')) {
      newErrors.itemAssignments = 'All items must be assigned to someone';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    const owes = {};
    const totalPerPerson = Array(people.length).fill(0);
    people.forEach((person, index) => {
      owes[index] = 0;
    });
    items.forEach(item => {
      const cost = parseFloat(item.cost);
      if (item.assignedTo === 'everyone') {
        const splitCost = cost / people.length;
        people.forEach((_, index) => {
          totalPerPerson[index] += splitCost;
        });
      } else {
        const personIndex = parseInt(item.assignedTo);
        totalPerPerson[personIndex] += cost;
      }
    });
    const totalBill = totalPerPerson.reduce((sum, cost) => sum + cost, 0);
    const equalShare = totalBill / people.length;
    const debts = [];
    people.forEach((person, index) => {
      const balance = equalShare - totalPerPerson[index];
      owes[index] = balance;
    });
    const debtors = Object.entries(owes)
      .filter(([_, amount]) => amount > 0)
      .map(([index, amount]) => ({ index: parseInt(index), amount }))
      .sort((a, b) => b.amount - a.amount);
    const creditors = Object.entries(owes)
      .filter(([_, amount]) => amount < 0)
      .map(([index, amount]) => ({ index: parseInt(index), amount: -amount }))
      .sort((a, b) => b.amount - a.amount);
    const transactions = [];
    while (debtors.length > 0 && creditors.length > 0) {
      const debtor = debtors[0];
      const creditor = creditors[0];
      const amount = Math.min(debtor.amount, creditor.amount);
      transactions.push({
        from: debtor.index,
        to: creditor.index,
        amount
      });
      debtor.amount -= amount;
      creditor.amount -= amount;
      if (debtor.amount < 0.01) debtors.shift();
      if (creditor.amount < 0.01) creditors.shift();
    }
    const billData = {
      people,
      items,
      currency,
      transactions,
      totalBill,
      equalShare
    };
    localStorage.setItem('billSplitData', JSON.stringify(billData));
    onComplete(billData);
  };
  return (
    <div className="container">
      <h2>Start Splitting Bills</h2>  
      <CurrencySelector 
        selectedCurrency={currency} 
        onCurrencyChange={setCurrency} 
      />
      <div className="card">
        <h3>Who's splitting the bill?</h3>
        {errors.people && <p className="error">{errors.people}</p>}
        {people.map((person, index) => (
          <PersonInput
            key={index}
            index={index}
            person={person}
            onNameChange={handleNameChange}
            onDeletePerson={handleDeletePerson}
          />
        ))}
        <button 
          onClick={handleAddPerson}
          style={{ marginTop: '10px' }}
        >
          Add Person
        </button>
      </div>
      <div className="card">
        <h3>What are you splitting?</h3>
        {(errors.itemNames || errors.itemCosts || errors.itemAssignments) && (
          <div className="error">
            {errors.itemNames && <p>{errors.itemNames}</p>}
            {errors.itemCosts && <p>{errors.itemCosts}</p>}
            {errors.itemAssignments && <p>{errors.itemAssignments}</p>}
          </div>
        )}
        <div className="item-list">
          {items.map((item, index) => (
            <ItemInput
              key={index}
              index={index}
              item={item}
              people={people}
              onItemNameChange={handleItemNameChange}
              onItemCostChange={handleItemCostChange}
              onItemAssignmentChange={handleItemAssignmentChange}
              onDeleteItem={handleDeleteItem}
            />
          ))}
        </div>
        <button 
          onClick={handleAddItem}
          style={{ marginRight: '10px' }}
        >
          Add Item
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          className="success"
          onClick={calculateSplit}
          style={{ padding: '12px 30px', fontSize: '18px' }}
        >
          Calculate Split
        </button>
      </div>
    </div>
  );
};
export default CreateSplitPage;