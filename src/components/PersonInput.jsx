import React from 'react';
const PersonInput = ({ index, person, onNameChange, onDeletePerson }) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <input
        type="text"
        value={person.name}
        onChange={(e) => onNameChange(index, e.target.value)}
        placeholder={`Person ${index + 1}`}
        style={{ flexGrow: 1 }}
      />
      {index > 1 && (
        <button 
          onClick={() => onDeletePerson(index)}
          style={{ 
            marginLeft: '10px',
            backgroundColor: '#dc3545',
            padding: '5px 10px'
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};
export default PersonInput;