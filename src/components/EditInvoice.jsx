import React, { useState, useEffect, useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateInvoice } from "/src/store/invoiceSlice";

const EditInvoice = () => {
  const { invoice } = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(() => ({
    ...invoice,
    senderStreet: invoice.senderAddress?.street ?? "19 Union Terrace",
    senderCity: invoice.senderAddress?.city ?? "London",
    senderPostCode: invoice.senderAddress?.postCode ?? "E1 3EZ",
    senderCountry: invoice.senderAddress?.country ?? "United Kingdom",
    clientStreet: invoice.clientAddress?.street ?? "84 Church Way",
    clientCity: invoice.clientAddress?.city ?? "Bradford",
    clientPostCode: invoice.clientAddress?.postCode ?? "BD1 9PB",
    clientCountry: invoice.clientAddress?.country ?? "United Kingdom",
    items: invoice.items ?? [
      { id: 1, name: "Banner Design", qty: 1, price: 156.0 },
      { id: 2, name: "Email Design", qty: 2, price: 200.0 },
    ],
  }));

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

  const handleInputChange = (e, index, field) => {
    const newItems = [...formData.items];
    newItems[index][field] =
      field === "qty" || field === "price"
        ? Number(e.target.value)
        : e.target.value;
    setFormData({ ...formData, items: newItems });
  };

  const handleCancel = () => {
    navigate(`/invoice/${invoice.id}`);
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const calculateTotals = useCallback(() => {
    const totalItems = formData.items.reduce((sum, item) => {
      const total = item.qty * item.price;
      return sum + total;
    }, 0);
    return totalItems.toFixed(2);
  }, [formData.items]);

  useEffect(() => {
    const total = calculateTotals();
    const updatedItems = formData.items.map((item) => ({
      ...item,
      total: (item.qty * item.price).toFixed(2),
    }));
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      amount: total,
    }));
  }, [formData.items, calculateTotals]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.clientName?.trim())
      newErrors.clientName = "Client name is required";
    if (!formData.clientEmail?.trim())
      newErrors.clientEmail = "Client email is required";
    if (!formData.projectDescription?.trim())
      newErrors.projectDescription = "Description is required";
    if (formData.items.length === 0)
      newErrors.items = "At least one item required";
    formData.items.forEach((item, index) => {
      if (!item.name?.trim())
        newErrors[`itemName_${index}`] = `Item ${index + 1} name required`;
      if (item.qty <= 0)
        newErrors[`itemQty_${index}`] = `Item ${index + 1} qty > 0`;
      if (item.price <= 0)
        newErrors[`itemPrice_${index}`] = `Item ${index + 1} price > 0`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      dispatch(
        updateInvoice({
          id: invoice.id,
          updates: {
            invoiceDate: formData.invoiceDate,
            clientName: formData.clientName,
            amount: String(formData.amount),
            status: formData.status,
            projectDescription: formData.projectDescription,
            senderAddress: {
              street: formData.senderStreet,
              city: formData.senderCity,
              postCode: formData.senderPostCode,
              country: formData.senderCountry,
            },
            clientAddress: {
              street: formData.clientStreet,
              city: formData.clientCity,
              postCode: formData.clientPostCode,
              country: formData.clientCountry,
            },
            clientEmail: formData.clientEmail,
            paymentTerms: formData.paymentTerms,
            items: formData.items,
          },
        }),
      );
      navigate(`/invoice/${invoice.id}`);
    } catch (error) {
      console.error("Update failed:", error);
      setErrors({ general: "Failed to save changes. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-14 shadow-2xl rounded-r-3xl h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-[#0c0e1e] mb-12">
        Edit <span className="text-[#888eb0]">#</span>
        {invoice.id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Bill From Section */}
        <section>
          <h2 className="text-[#7c5dfa] font-bold text-sm mb-6">Bill From</h2>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-[#7e88c3] text-xs mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={String(formData.senderStreet || "")}
                onChange={(e) =>
                  handleFieldChange("senderStreet", e.target.value)
                }
                className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-[#7e88c3] text-xs mb-2">City</label>
                <input
                  type="text"
                  value={String(formData.senderCity || "")}
                  onChange={(e) =>
                    handleFieldChange("senderCity", e.target.value)
                  }
                  className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#7e88c3] text-xs mb-2">Post Code</label>
                <input
                  type="text"
                  value={String(formData.senderPostCode || "")}
                  onChange={(e) =>
                    handleFieldChange("senderPostCode", e.target.value)
                  }
                  className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
                />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1">
                <label className="text-[#7e88c3] text-xs mb-2">Country</label>
                <input
                  type="text"
                  value={String(formData.senderCountry || "")}
                  onChange={(e) =>
                    handleFieldChange("senderCountry", e.target.value)
                  }
                  className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
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
              <label className="text-[#7e88c3] text-xs mb-2">
                Client's Name
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) =>
                  handleFieldChange("clientName", e.target.value)
                }
                className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#7e88c3] text-xs mb-2">
                Client's Email
              </label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) =>
                  handleFieldChange("clientEmail", e.target.value)
                }
                className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#7e88c3] text-xs mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={String(formData.clientStreet || "")}
                onChange={(e) =>
                  handleFieldChange("clientStreet", e.target.value)
                }
                className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-[#7e88c3] text-xs mb-2">City</label>
                <input
                  type="text"
                  value={String(formData.clientCity || "")}
                  onChange={(e) =>
                    handleFieldChange("clientCity", e.target.value)
                  }
                  className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#7e88c3] text-xs mb-2">Post Code</label>
                <input
                  type="text"
                  value={String(formData.clientPostCode || "")}
                  onChange={(e) =>
                    handleFieldChange("clientPostCode", e.target.value)
                  }
                  className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
                />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1">
                <label className="text-[#7e88c3] text-xs mb-2">Country</label>
                <input
                  type="text"
                  value={String(formData.clientCountry || "")}
                  onChange={(e) =>
                    handleFieldChange("clientCountry", e.target.value)
                  }
                  className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Date and Terms Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-[#7e88c3] text-xs mb-2">Invoice Date</label>
            <input
              type="date"
              value={formData.invoiceDate}
              onChange={(e) => handleFieldChange("invoiceDate", e.target.value)}
              className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-[#7e88c3] text-xs mb-2">Payment Terms</label>
            <select
              value={formData.paymentTerms}
              onChange={(e) =>
                handleFieldChange("paymentTerms", e.target.value)
              }
              className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white appearance-none cursor-pointer"
            >
              <option>Net 30 Days</option>
              <option>Net 15 Days</option>
              <option>Net 1 Day</option>
            </select>
            <div className="absolute right-4 bottom-4 pointer-events-none">
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
          <label className="text-[#7e88c3] text-xs mb-2">
            Project Description
          </label>
          <input
            type="text"
            value={formData.projectDescription}
            onChange={(e) =>
              handleFieldChange("projectDescription", e.target.value)
            }
            className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
          />
        </div>

        {/* Item List Section */}
        <section>
          <h3 className="text-[#777f98] font-bold text-lg mb-4">Item List</h3>
          <div className="space-y-4">
            {/* Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-[#7e88c3] text-xs mb-2">
              <div className="col-span-5">Item Name</div>
              <div className="col-span-2">Qty.</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-1"></div>
            </div>

            {formData.items.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 items-center mb-10 md:mb-0"
              >
                <div className="col-span-12 md:col-span-5">
                  <label className="md:hidden text-[#7e88c3] text-xs mb-2 block">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleInputChange(e, index, "name")}
                    className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <label className="md:hidden text-[#7e88c3] text-xs mb-2 block">
                    Qty.
                  </label>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleInputChange(e, index, "qty")}
                    className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white text-center"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <label className="md:hidden text-[#7e88c3] text-xs mb-2 block">
                    Price
                  </label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleInputChange(e, index, "price")}
                    className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
                  />
                </div>
                <div className="col-span-3 md:col-span-2 text-[#888eb0] font-bold text-sm">
                  <label className="md:hidden text-[#7e88c3] text-xs mb-2 block">
                    Total
                  </label>
                  {item.total}
                </div>
                <div className="col-span-1 flex justify-end md:justify-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="hover:text-[#ec5757] transition-colors"
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
            className="w-full mt-4 bg-[#f9fafe] hover:bg-[#dfe3fa] text-[#7e88c3] font-bold py-4 rounded-full transition-colors text-sm"
          >
            + Add New Item
          </button>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-[#7e88c3] text-xs mb-2">
              Invoice Amount
            </label>
            <input
              type="number"
              value={formData.amount}
              readOnly
              className="w-full px-4 py-3.5 rounded border border-purple-100 bg-purple-50 text-sm font-bold text-gray-900 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#7e88c3] text-xs mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleFieldChange("status", e.target.value)}
              className="w-full px-4 py-3.5 rounded border border-purple-200 text-sm font-bold text-gray-900 outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white appearance-none cursor-pointer"
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex justify-end gap-2 py-8 bg-white md:sticky bottom-0">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-4 rounded-full bg-[#f9fafe] text-[#7e88c3] font-bold text-sm hover:bg-[#dfe3fa] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || Object.keys(errors).length > 0}
            className={`px-6 py-4 rounded-full font-bold text-sm transition-colors ${
              isLoading || Object.keys(errors).length > 0
                ? "bg-gray-400 cursor-not-allowed text-gray-300"
                : "bg-[#7c5dfa] text-white hover:bg-[#9277ff]"
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInvoice;
