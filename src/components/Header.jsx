import React from 'react';
import { IndianRupee } from 'lucide-react';
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
          <IndianRupee size={24} color="#4a90e2" />
          <h1 style={{ margin: '0 0 0 10px' }}>BillSplit</h1>
        </div>
      </div>
    </header>
  );
};
export default Header;