import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import Layout from "./Layout.jsx";
import InvoicesList from "./components/InvoicesList.jsx";
import InvoiceDetail from "./components/InvoiceDetails.jsx";
import EditInvoice from "./components/EditInvoice.jsx";
import NewInvoice from "./components/NewInvoice.jsx";

const invoiceLoader = ({ params }) => {
  const state = store.getState();
  const invoice = state.invoices?.list.find((inv) => inv.id === params.id);
  if (!invoice) throw new Response("Not Found", { status: 404 });
  return { invoice };
};

const editLoader = ({ params }) => {
  const state = store.getState();
  const invoice = state.invoices?.list.find((inv) => inv.id === params.id);
  if (!invoice) throw new Response("Not Found", { status: 404 });
  return { invoice };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <InvoicesList />,
      },
      {
        path: "new",
        element: <NewInvoice />,
      },
      {
        path: "invoice/:id",
        element: <InvoiceDetail />,
        loader: invoiceLoader,
      },
      {
        path: "edit/:id",
        element: <EditInvoice />,
        loader: editLoader,
      },
    ],
  },
]);

export default function InvoiceApp() {
  return <RouterProvider router={router} />;
}
