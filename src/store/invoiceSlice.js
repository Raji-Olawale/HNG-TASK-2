import { createSlice } from "@reduxjs/toolkit";

const initialInvoices = [
  {
    id: "RT3080",
    date: "19 Aug 2021",
    name: "Jensen Huang",
    amount: "1800.90",
    status: "paid",
    description: "Website Re-design",
    clientEmail: "jensen.huang@company.com",
    paymentTerms: "Net 30 Days",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London", 
      postCode: "E1 3EZ",
      country: "United Kingdom"
    },
    clientAddress: {
      street: "84 Church Way", 
      city: "Bradford",
      postCode: "BD1 9PB",
      country: "United Kingdom"
    },
    clientName: "Jensen Huang",
    items: [
      { id: 1, name: "Website Re-design", qty: 2, price: 900.45, total: 1800.90 }
    ]
  },
  {
    id: "XM9141",
    date: "20 Sep 2021", 
    name: "Alex Grim",
    amount: "556.00",
    status: "pending",
    description: "Logo Design",
    clientEmail: "alexgrim@mail.com",
    paymentTerms: "Net 30 Days",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ", 
      country: "United Kingdom"
    },
    clientAddress: {
      street: "84 Church Way",
      city: "Bradford",
      postCode: "BD1 9PB",
      country: "United Kingdom"
    },
    clientName: "Alex Grim",
    items: [
      { id: 1, name: "Logo Design", qty: 1, price: 278.00, total: 278.00 },
      { id: 2, name: "Banner Design", qty: 1, price: 278.00, total: 278.00 }
    ]
  },
  {
    id: "RG0314",
      date: "01 Oct 2021",
      name: "John Morrison", 
      amount: "14002.33",
      status: "paid",
      description: "App Development",
      clientEmail: "john.morrison@company.com",
      paymentTerms: "Net 30 Days",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom"
      },
      clientAddress: {
        street: "3123 Main St",
        city: "Boston",
        postCode: "02108",
        country: "United States"
      },
      clientName: "John Morrison",
      items: [
        { id: 1, name: "App Development", qty: 5, price: 2800.47, total: 14002.33 }
      ]
    },
    {
      id: "RT2080",
      date: "12 Oct 2021",
      name: "Alysa Werner",
      amount: "102.04",
      status: "pending",
      description: "Landing Page Design",
      clientEmail: "alysa.werner@company.com",
      paymentTerms: "Net 15 Days",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom"
      },
      clientAddress: {
        street: "47 Utah Ave",
        city: "Salt Lake City",
        postCode: "84101",
        country: "United States"
      },
      clientName: "Alysa Werner",
      items: [
        { id: 1, name: "Landing Page Design", qty: 1, price: 102.04, total: 102.04 }
      ]
    },
    {
      id: "AA1449",
      date: "14 Oct 2021",
      name: "Mellisa Clarke",
      amount: "4032.33",
      status: "pending",
      description: "Brand Identity Kit", 
      clientEmail: "mellisa.clarke@company.com",
      paymentTerms: "Net 30 Days",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom"
      },
      clientAddress: {
        street: "88 New York Ave",
        city: "New York",
        postCode: "10101",
        country: "United States"
      },
      clientName: "Mellisa Clarke",
      items: [
        { id: 1, name: "Logo Design", qty: 3, price: 1344.11, total: 4032.33 }
      ]
    },
    {
      id: "TY9141",
      date: "31 Oct 2021",
      name: "Thomas Wayne",
      amount: "6155.91",
      status: "pending",
      description: "Custom Icons Set",
      clientEmail: "thomas.wayne@company.com",
      paymentTerms: "Net 30 Days",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom"
      },
      clientAddress: {
        street: "567 Gotham St",
        city: "Gotham",
        postCode: "12345",
        country: "United States"
      },
      clientName: "Thomas Wayne",
      items: [
        { id: 1, name: "Custom Icons Set", qty: 8, price: 769.49, total: 6155.91 }
      ]
    },
    {
      id: "FV2353",
      date: "12 Nov 2021",
      name: "Anita Wainwright",
      amount: "3102.04",
      status: "draft",
      description: "Marketing Material",
      clientEmail: "anita.wainwright@company.com", 
      paymentTerms: "Net 7 Days",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom"
      },
      clientAddress: {
        street: "890 High St",
        city: "Edinburgh",
        postCode: "EH1 1AA",
        country: "United Kingdom"
      },
      clientName: "Anita Wainwright",
      items: [
        { id: 1, name: "Marketing Material", qty: 2, price: 1551.02, total: 3102.04 }
      ]
    }
  ];

const invoiceSlice = createSlice({
  name: "invoices",
initialState: {
    list: initialInvoices,
    selectedId: null,
  },
  reducers: {
    addInvoice: (state, action) => {
      state.list.push(action.payload);
    },
    updateInvoiceStatus: (state, action) => {
      const { id, status } = action.payload;
      const invoice = state.list.find((inv) => inv.id === id);
      if (invoice) invoice.status = status;
    },
deleteInvoice: (state, action) => {
      state.list = state.list.filter((inv) => inv.id !== action.payload);
      if (state.selectedId === action.payload) state.selectedId = null;
    },
    updateInvoice: (state, action) => {
      const { id, updates } = action.payload;
      const invoice = state.list.find((inv) => inv.id === id);
      if (invoice) {
        Object.assign(invoice, updates);
      }
    },
    setInvoices: (state, action) => {
      state.list = action.payload;
    },
    selectInvoice: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const {
  addInvoice,
  updateInvoiceStatus,
  deleteInvoice,
  updateInvoice,
  setInvoices,
  selectInvoice,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
