import React from 'react';
import InvoiceItem from './InvoiceItem.jsx';

import { useSelector } from 'react-redux';

const InvoicesList = () => {
  const invoices = useSelector((state) => state.invoices.list);

  return (
    <section>
      {invoices.map((invoice) => (
        <InvoiceItem key={invoice.id} invoice={invoice} />
      ))}
    </section>
  );
};

export default InvoicesList;

