import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 text-center border-b border-slate-800 mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold font-title">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          BookCoverPro AI
        </span>
      </h1>
    </header>
  );
};

export default Header;