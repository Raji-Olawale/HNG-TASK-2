import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    paid: "bg-emerald-50 text-emerald-500",
    pending: "bg-orange-50 text-orange-400",
    draft: "bg-gray-50 text-slate-700",
  };

  const dots = {
    paid: "bg-emerald-500",
    pending: "bg-orange-400",
    draft: "bg-slate-700",
  };

  return (
    <div
      className={`flex items-center justify-center w-28 py-3 rounded-md capitalize font-bold text-xs ${styles[status]}`}
    >
      <span className={`w-2 h-2 rounded-full mr-2 ${dots[status]}`}></span>
      {status}
    </div>
  );
};

export default StatusBadge;

