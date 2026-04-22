import { configureStore } from '@reduxjs/toolkit';
// import storage from 'reduxjs-persist/lib/storage'; // Wait, no persist lib? Use custom.

export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Load on app start (special action)
  if (action.type === 'persist/load') {
    const saved = localStorage.getItem('invoices');
    if (saved) {
      store.dispatch({ type: 'invoices/setInvoices', payload: JSON.parse(saved) });
    }
    return result;
  }
  
  // Save after mutations (sync reducers too)
  if (action.type.startsWith('invoices/') || action.type.includes('setInvoices')) {
    const state = store.getState();
    localStorage.setItem('invoices', JSON.stringify(state.invoices.list));
  }
  
  return result;
};

