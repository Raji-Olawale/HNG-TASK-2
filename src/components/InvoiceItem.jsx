import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectInvoice } from "../store/invoiceSlice";
import StatusBadge from "./StatusBadge.jsx";

const InvoiceItem = ({ invoice }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectInvoice(invoice.id));
    navigate(`/invoice/${invoice.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="block w-full text-left"
    >
      <div className="flex items-center bg-white p-6 rounded-lg shadow-sm border border-transparent hover:border-purple-500 transition-all cursor-pointer mb-4">
        <span className="font-bold text-sm w-20">
          <span className="text-slate-400">#</span>
          {invoice.id}
        </span>
        <span className="text-slate-400 text-sm flex-1">
          Due {invoice.date}
        </span>
        <span className="text-slate-400 text-sm flex-1">{invoice.name}</span>
        <span className="font-bold text-lg flex-1 text-right mr-8">
          £ {invoice.amount}
        </span>
        <StatusBadge status={invoice.status} />
        {/* <ChevronRight className="ml-4 text-purple-500 w-4 h-4" /> */}
      </div>
    </button>
  );
};

export default InvoiceItem;
