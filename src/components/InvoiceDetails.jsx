import React from "react";

// You can export this to your App.jsx
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateInvoiceStatus } from "/src/store/invoiceSlice";

const InvoiceDetail = () => {
  const { invoice } = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${invoice.id}`);
  };

  const handleMarkPaid = () => {
    dispatch(updateInvoiceStatus({ id: invoice.id, status: "paid" }));
  };

  const invoiceData = {
    ...invoice,
    description: invoice.description || "Graphic Design",
    senderAddress: invoice.senderAddress || {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: invoice.clientAddress || {
      street: "84 Church Way",
      city: "Bradford",
      postCode: "BD1 9PB",
      country: "United Kingdom",
    },
    clientName: invoice.clientName || invoice.name,
    clientEmail: invoice.clientEmail || "alexgrim@mail.com",
    invoiceDate: invoice.date,
    paymentDue: invoice.paymentDue || "20 Sep 2021",
    items: invoice.items || [
      { name: "Banner Design", qty: 1, price: 156.0, total: 156.0 },
      { name: "Email Design", qty: 2, price: 200.0, total: 400.0 },
    ],
    totalAmount: parseFloat(invoice.amount),
  };

  return (
    <div className="min-h-screen bg-[#f8f8fb] py-8 px-4 md:px-0">
      <div className="max-w-3xl mx-auto">
        {/* Go Back Link */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-4 mb-8 text-sm font-bold text-[#0c0e1e] hover:opacity-70 transition-opacity"
        >
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.342.886L2.114 5.114l4.228 4.228"
              stroke="#7C5DFA"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          Go back
        </button>

        {/* Status Bar */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-[#858bb2] text-sm">Status</span>
            <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#ff8f00]/5 text-[#ff8f00] font-bold min-w-25">
              <div className="w-2 h-2 rounded-full bg-[#ff8f00]"></div>
              {invoiceData.status}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={handleEdit}
              className="flex-1 md:flex-none px-6 py-4 rounded-full bg-[#f9fafe] text-[#7e88c3] font-bold text-xs hover:bg-[#dfe3fa] transition-colors"
            >
              Edit
            </button>
            <button className="flex-1 md:flex-none px-6 py-4 rounded-full bg-[#ec5757] text-white font-bold text-xs hover:bg-[#ff9797] transition-colors">
              Delete
            </button>
            <button
              type="button"
              onClick={handleMarkPaid}
              className="flex-1 md:flex-none px-6 py-4 rounded-full bg-[#7c5dfa] text-white font-bold text-xs hover:bg-[#9277ff] transition-colors"
            >
              Mark as Paid
            </button>
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
            <div>
              <h1 className="text-lg font-bold text-[#0c0e1e] mb-1">
                <span className="text-[#7e88c3]">#</span>
                {invoiceData.id}
              </h1>
              <p className="text-[#7e88c3] text-sm">
                {invoiceData.description}
              </p>
            </div>
            <div className="text-[#7e88c3] text-xs text-left md:text-right leading-5">
              <p>{invoiceData.senderAddress.street}</p>
              <p>{invoiceData.senderAddress.city}</p>
              <p>{invoiceData.senderAddress.postCode}</p>
              <p>{invoiceData.senderAddress.country}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[#7e88c3] text-sm mb-3">Invoice Date</p>
                <p className="text-[#0c0e1e] font-bold text-base">
                  {invoiceData.invoiceDate}
                </p>
              </div>
              <div>
                <p className="text-[#7e88c3] text-sm mb-3">Payment Due</p>
                <p className="text-[#0c0e1e] font-bold text-base">
                  {invoiceData.paymentDue}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[#7e88c3] text-sm mb-3">Bill To</p>
              <p className="text-[#0c0e1e] font-bold text-base mb-2">
                {invoiceData.clientName}
              </p>
              <div className="text-[#7e88c3] text-xs leading-5">
                <p>{invoiceData.clientAddress.street}</p>
                <p>{invoiceData.clientAddress.city}</p>
                <p>{invoiceData.clientAddress.postCode}</p>
                <p>{invoiceData.clientAddress.country}</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="text-[#7e88c3] text-sm mb-3">Sent to</p>
              <p className="text-[#0c0e1e] font-bold text-base break-all">
                {invoiceData.clientEmail}
              </p>
            </div>
          </div>

          {/* Items Table Section */}
          <div className="bg-[#f9fafe] rounded-t-lg p-8">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-4 text-[#7e88c3] text-xs mb-8">
              <div className="col-span-1">Item Name</div>
              <div className="text-center">QTY.</div>
              <div className="text-right">Price</div>
              <div className="text-right">Total</div>
            </div>

            {/* Item Rows */}
            <div className="flex flex-col gap-6">
              {invoiceData.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 md:grid-cols-4 items-center"
                >
                  <div className="flex flex-col md:block col-span-1">
                    <p className="text-[#0c0e1e] font-bold text-sm md:text-base">
                      {item.name}
                    </p>
                    <p className="md:hidden text-[#7e88c3] font-bold text-sm mt-2">
                      {item.qty ?? 0} x £ {(item.price ?? 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="hidden md:block text-center text-[#7e88c3] font-bold">
                    {item.qty ?? 0}
                  </div>
                  <div className="hidden md:block text-right text-[#7e88c3] font-bold">
                    £ {(item.price ?? 0).toFixed(2)}
                  </div>
                  <div className="text-right text-[#0c0e1e] font-bold text-sm md:text-base">
                    £ {(item.total ?? 0).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grand Total Footer */}
          <div className="bg-[#373b53] rounded-b-lg p-8 flex items-center justify-between">
            <span className="text-white text-xs font-medium">Amount Due</span>
            <span className="text-white text-2xl md:text-3xl font-bold">
              £ {invoiceData.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
