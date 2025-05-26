import React from 'react';
const ItemInput = ({ 
  item, 
  index, 
  people, 
  onItemNameChange, 
  onItemCostChange, 
  onItemAssignmentChange,
  onDeleteItem 
}) => {
  return (
    <div className="item" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
      <div style={{ flex: '2 1 200px' }}>
        <input
          type="text"
          value={item.name}
          onChange={(e) => onItemNameChange(index, e.target.value)}
          placeholder="Item name"
        />
      </div>
      <div style={{ flex: '1 1 100px' }}>
        <input
          type="number"
          min="0"
          step="0.01"
          value={item.cost}
          onChange={(e) => onItemCostChange(index, e.target.value)}
          placeholder="Cost"
        />
      </div>
      <div style={{ flex: '2 1 200px' }}>
        <select
          value={item.assignedTo}
          onChange={(e) => onItemAssignmentChange(index, e.target.value)}
        >
          <option value="">-- Assign to --</option>
          <option value="everyone">Everyone</option>
          {people.map((person, idx) => (
            <option key={idx} value={idx}>
              {person.name || `Person ${idx + 1}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button 
          onClick={() => onDeleteItem(index)}
          style={{ 
            backgroundColor: '#dc3545',
            padding: '5px 10px'
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default ItemInput;