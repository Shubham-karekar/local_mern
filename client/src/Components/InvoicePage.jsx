import React, { useRef } from "react";
import { useCartContext } from "../Context/CartContext";
import { useAuth } from "../Store/auth";
import FormatPrice from "../Helpers/FormatPrice";
import html2pdf from "html2pdf.js";

const InvoicePage = () => {
  const { cart, total_price, shipping_fee } = useCartContext();
  const { user } = useAuth();
  const invoiceRef = useRef();
  const invoiceId = "INV-" + Math.floor(Math.random() * 1000000);
  const creationDate = new Date().toLocaleDateString();

  const company = {
    name: "My E-Store Pvt. Ltd.",
    address: "123 Market Street, New Delhi, India",
    email: "support@myecom.com",
    phone: "+91 9876543210",
  };

  const handlePrint = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 0.3,
      filename: `invoice-${invoiceId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="container my-5">
      <div className="card shadow" ref={invoiceRef}>
        <div className="card-body p-5">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="text-primary fw-bold">Invoice</h4>
              <p className="mb-0 text-muted">ID: #{invoiceId}</p>
              <p className="mb-0 text-muted">Date: {creationDate}</p>
            </div>
            <button className="btn btn-outline-primary" onClick={handlePrint}>
              <i className="fas fa-print me-2" /> Print Invoice
            </button>
          </div>

          {/* Company Info */}
          <div className="text-center mb-4">
            <i className="fab fa-shopify fa-3x text-primary mb-2" />
            <h5 className="fw-bold">{company.name}</h5>
            <p className="mb-1 text-muted">{company.address}</p>
            <p className="mb-1 text-muted">{company.email}</p>
            <p className="mb-0 text-muted">{company.phone}</p>
          </div>

          <hr className="mb-4" />

          {/* Customer & Invoice Info */}
          <div className="row mb-4">
            <div className="col-md-6">
              <h6 className="text-muted fw-semibold">Bill To:</h6>
              <p className="mb-1 fw-bold text-dark">
                {user?.username || "Customer Name"}
              </p>
              <p className="mb-1 text-muted">
                {user?.address
                  ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.pincode}, ${user.address.country}`
                  : "No address available"}
              </p>
              <p className="mb-1 text-muted">{user?.email}</p>
              <p className="mb-0 text-muted">{user?.phone}</p>
            </div>
            <div className="col-md-6 text-md-end mt-4 mt-md-0">
              <h6 className="text-muted fw-semibold">Invoice Status:</h6>
              <span className="badge bg-warning text-dark py-2 px-3">Unpaid</span>
            </div>
          </div>

          {/* Cart Table */}
          <div className="table-responsive mb-4">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => {
                  const quantity = item.quantity ?? item.amount ?? 1;
                  const total = (item.price ?? 0) * quantity;
                  return (
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{quantity}</td>
                      <td><FormatPrice price={item.price} /></td>
                      <td><FormatPrice price={total} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="row justify-content-end">
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Subtotal</span>
                  <FormatPrice price={total_price} />
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Shipping</span>
                  <FormatPrice price={shipping_fee} />
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light fw-bold fs-5">
                  <span>Total</span>
                  <FormatPrice price={total_price + shipping_fee} />
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5">
            <p className="text-muted small">Thank you for shopping with us!</p>
            <p className="text-muted small mb-0">
              Please contact us if you have any questions about this invoice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
