import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addInvoice } from "../store/invoiceSlice";

// Export this to your App.jsx
const NewInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initial state for the form
  const [formData, setFormData] = useState({
    senderAddress: "19 Union Terrace",
    senderCity: "London",
    senderPostCode: "E1 3EZ",
    senderCountry: "United Kingdom",
    clientName: "Alex Grim",
    clientEmail: "alexgrim@mail.com",
    clientAddress: "84 Church Way",
    clientCity: "Bradford",
    clientPostCode: "BD1 9PB",
    clientCountry: "United Kingdom",
    invoiceDate: "20 Aug 2021",
    paymentTerms: "Net 30 Days",
    projectDescription: "Graphic Design",
    items: [
      { id: 1, name: "Banner Design", qty: 1, price: 156.0 },
      { id: 2, name: "Email Design", qty: 2, price: 200.0 },
    ],
  });

  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: "", qty: 1, price: 0 };
    setFormData({ ...formData, items: [...formData.items, newItem] });
  };

  const handleDeleteItem = (id) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    });
  };

  const handleItemChange = (id, field, value) => {
    const newItems = formData.items.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]:
              field === "qty" || field === "price" ? Number(value) : value,
          }
        : item,
    );
    setFormData({ ...formData, items: newItems });
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  const parseDateFromInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDiscard = () => {
    navigate("/");
  };

  const handleSaveAsDraft = () => {
    const newInvoice = {
      id: `RT${Date.now()}`,
      date: formData.invoiceDate,
      name: formData.clientName,
      amount: String(
        formData.items
          .reduce((sum, item) => sum + item.qty * item.price, 0)
          .toFixed(2),
      ),
      status: "draft",
      description: formData.projectDescription,
      senderAddress: {
        street: formData.senderAddress,
        city: formData.senderCity,
        postCode: formData.senderPostCode,
        country: formData.senderCountry,
      },
      clientAddress: {
        street: formData.clientAddress,
        city: formData.clientCity,
        postCode: formData.clientPostCode,
        country: formData.clientCountry,
      },
      clientEmail: formData.clientEmail,
      items: formData.items,
    };
    dispatch(addInvoice(newInvoice));
    navigate("/");
  };

  const handleSaveAndSend = () => {
    const newInvoice = {
      id: `RT${Date.now()}`,
      date: formData.invoiceDate,
      name: formData.clientName,
      amount: String(
        formData.items
          .reduce((sum, item) => sum + item.qty * item.price, 0)
          .toFixed(2),
      ),
      status: "pending",
      description: formData.projectDescription,
      senderAddress: {
        street: formData.senderAddress,
        city: formData.senderCity,
        postCode: formData.senderPostCode,
        country: formData.senderCountry,
      },
      clientAddress: {
        street: formData.clientAddress,
        city: formData.clientCity,
        postCode: formData.clientPostCode,
        country: formData.clientCountry,
      },
      clientEmail: formData.clientEmail,
      items: formData.items,
    };
    dispatch(addInvoice(newInvoice));
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white min-h-screen p-8 md:p-14 shadow-2xl rounded-r-3xl relative overflow-y-auto">
      <h1 className="text-2xl font-bold text-[#0c0e1e] mb-12">New Invoice</h1>

      <form className="space-y-12 pb-32">
        {/* Bill From Section */}
        <section>
          <h2 className="text-[#7c5dfa] font-bold text-sm mb-6">Bill From</h2>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                Street Address
              </label>
              <input
                type="text"
value={String(formData.senderAddress || '')}
                onChange={(e) =>
                  handleFieldChange("senderAddress", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                  City
                </label>
                <input
                  type="text"
                  value={formData.senderCity}
                  onChange={(e) =>
                    handleFieldChange("senderCity", e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                  Post Code
                </label>
                <input
                  type="text"
                  value={formData.senderPostCode}
                  onChange={(e) =>
                    handleFieldChange("senderPostCode", e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1">
                <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.senderCountry}
                  onChange={(e) =>
                    handleFieldChange("senderCountry", e.target.value)
                  }
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bill To Section */}
        <section>
          <h2 className="text-[#7c5dfa] font-bold text-sm mb-6">Bill To</h2>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                Client's Name
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) =>
                  handleFieldChange("clientName", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                Client's Email
              </label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) =>
                  handleFieldChange("clientEmail", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                Street Address
              </label>
              <input
                type="text"
value={String(formData.clientAddress || '')}
                onChange={(e) =>
                  handleFieldChange("clientAddress", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                  City
                </label>
                <input
                  type="text"
                  value={formData.clientCity}
                  onChange={(e) =>
                    handleFieldChange("clientCity", e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                  Post Code
                </label>
                <input
                  type="text"
                  value={formData.clientPostCode}
                  onChange={(e) =>
                    handleFieldChange("clientPostCode", e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1">
                <label className="text-[#7e88c3] text-xs mb-2 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.clientCountry}
                  onChange={(e) =>
                    handleFieldChange("clientCountry", e.target.value)
                  }
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Date & Description Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col relative">
            <label className="text-[#7e88c3] text-xs mb-2 font-medium">
              Invoice Date
            </label>
            <input
              type="date"
              value={formatDateForInput(formData.invoiceDate)}
              onChange={(e) =>
                handleFieldChange(
                  "invoiceDate",
                  parseDateFromInput(e.target.value),
                )
              }
              className="input-field pr-10"
            />
            <div className="absolute right-4 bottom-4">
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2h-.667V.667A.667.667 0 0012.667 0a.667.667 0 00-.667.667V2H4V.667A.667.667 0 003.333 0a.667.667 0 00-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2A.668.668 0 011.333 14V6.667h13.334V14z"
                  fill="#7E88C3"
                  fillRule="nonzero"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col relative">
            <label className="text-[#7e88c3] text-xs mb-2 font-medium">
              Payment Terms
            </label>
            <select
              value={formData.paymentTerms}
              onChange={(e) =>
                handleFieldChange("paymentTerms", e.target.value)
              }
              className="input-field appearance-none cursor-pointer"
            >
              <option>Net 30 Days</option>
              <option>Net 15 Days</option>
              <option>Net 7 Days</option>
            </select>
            <div className="absolute right-4 bottom-5 pointer-events-none">
              <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1l4.228 4.228L9.456 1"
                  stroke="#7C5DFA"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-[#7e88c3] text-xs mb-2 font-medium">
            Project Description
          </label>
          <input
            type="text"
            value={formData.projectDescription}
            onChange={(e) =>
              handleFieldChange("projectDescription", e.target.value)
            }
            className="input-field"
          />
        </div>

        {/* Item List Section */}
        <section>
          <h3 className="text-[#777f98] font-bold text-lg mb-6">Item List</h3>
          <div className="space-y-4">
            {/* Table Header (Desktop only) */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-[#7e88c3] text-xs mb-4">
              <div className="col-span-5">Item Name</div>
              <div className="col-span-2">Qty.</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-1"></div>
            </div>

            {formData.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 items-center mb-8 md:mb-0"
              >
                <div className="col-span-12 md:col-span-5">
                  <label className="md:hidden text-[#7e88c3] text-xs mb-2 block font-medium">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(item.id, "name", e.target.value)
                    }
                    className="input-field"
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <label className="md:hidden text-[#7e88c3] text-xs mb-2 block font-medium">
                    Qty.
                  </label>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(item.id, "qty", e.target.value)
                    }
                    className="input-field text-center px-2"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <label className="md:hidden text-[#7e88c3] text-xs mb-2 block font-medium">
                    Price
                  </label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(item.id, "price", e.target.value)
                    }
                    className="input-field px-2"
                  />
                </div>
                <div className="col-span-3 md:col-span-2 text-[#888eb0] font-bold text-sm pt-2 md:pt-0">
                  <label className="md:hidden text-[#7e88c3] text-xs mb-2 block font-medium">
                    Total
                  </label>
                  {(item.qty * item.price).toFixed(2)}
                </div>
                <div className="col-span-1 flex justify-end md:justify-center pt-6 md:pt-0">
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-[#888eb0] hover:text-[#ec5757] transition-colors"
                  >
                    <svg
                      width="13"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                        fill="currentColor"
                        fillRule="nonzero"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="w-full mt-6 bg-[#f9fafe] hover:bg-[#dfe3fa] text-[#7e88c3] font-bold py-4 rounded-full transition-colors text-sm"
          >
            + Add New Item
          </button>
        </section>
      </form>

      {/* Footer Actions Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-8 flex items-center justify-between rounded-br-3xl">
        <button
          type="button"
          onClick={handleDiscard}
          className="px-6 py-4 rounded-full bg-[#f9fafe] text-[#7e88c3] font-bold text-sm hover:bg-[#dfe3fa] transition-colors"
        >
          Discard
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSaveAsDraft}
            className="px-6 py-4 rounded-full bg-[#373b53] text-[#dfe3fa] font-bold text-sm hover:bg-[#0c0e1e] transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSaveAndSend}
            className="px-6 py-4 rounded-full bg-[#7c5dfa] text-white font-bold text-sm hover:bg-[#9277ff] transition-colors"
          >
            Save & Send
          </button>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          border: 1px solid #dfe3fa;
          border-radius: 4px;
          padding: 0.875rem 1rem;
          color: #0c0e1e;
          font-weight: 700;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: #7c5dfa;
        }
        /* Remove arrows from number input */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default NewInvoice;
