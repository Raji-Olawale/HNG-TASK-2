import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './invoiceSlice';
import { persistMiddleware } from './persist';

export const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
});

// Trigger load on app start
store.dispatch({ type: 'persist/load' });

export default store;

