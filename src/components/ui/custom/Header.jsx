import React from 'react';

function Header() {
  return (
    <div className='p-3 shadow-sw flex justify-between items-center px-5'>
      <h1 style={{ fontSize: '20px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>Travel Genius</h1>
      <div>
        <button style={{ backgroundColor: 'darkred', color: 'white' }}>Sign In</button>
        
      </div>
    </div>
  );
}

export default Header;

