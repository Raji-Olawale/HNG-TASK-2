import React from 'react';
// import { Plus, ChevronDown } from "react-icons/hi2";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const invoiceCount = useSelector((state) => state.invoices.list.length);

  const handleNewInvoice = () => {
    navigate('/new');
  };

  return (
    <header className="flex justify-between items-center mb-16">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Invoices
        </h1>
        <p className="text-slate-400 text-sm">
          There are {invoiceCount} total invoices
        </p>
      </div>

      <div className="flex items-center gap-8">
        <button className="flex items-center gap-3 font-bold text-sm text-slate-900">
          Filter by status{' '}
          {/* <ChevronDown className="text-purple-500 w-4 h-4" /> */}
        </button>

        <button 
          onClick={handleNewInvoice}
          className="bg-[#7C5DFA] hover:bg-[#9277FF] text-white pl-2 pr-4 py-2 rounded-full flex items-center gap-4 transition-colors font-bold text-sm"
        >
          <span className="bg-white rounded-full p-2">
            {/* <Plus className="text-[#7C5DFA] w-4 h-4" strokeWidth={4} /> */}
          </span>
          New Invoice
        </button>
      </div>
    </header>
  );
};

export default Header;

