export interface InvoiceData {
  invoiceNumber: string;
  paymentId: string;
  orderId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  userType?: 'company' | 'customer';
  gstNumber?: string;
  panNumber?: string;
  items: { description: string; quantity: number; unitPrice: number }[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
}

export function generateInvoice(data: InvoiceData) {
  const itemRows = data.items
    .map(
      (item, i) => `
      <tr style="background:${i % 2 === 0 ? '#f9fafb' : '#fff'}">
        <td style="padding:10px 16px;font-size:13px;color:#374151">${item.description}</td>
        <td style="padding:10px 16px;font-size:13px;color:#374151;text-align:center">${item.quantity}</td>
        <td style="padding:10px 16px;font-size:13px;color:#374151;text-align:right">₹${item.unitPrice.toLocaleString('en-IN')}</td>
        <td style="padding:10px 16px;font-size:13px;color:#374151;text-align:right">₹${(item.quantity * item.unitPrice).toLocaleString('en-IN')}</td>
      </tr>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Invoice ${data.invoiceNumber} - Vegnar Green</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f3f4f6;color:#111827}
    .page{max-width:800px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10)}
    .header{background:linear-gradient(135deg,#166534 0%,#15803d 60%,#16a34a 100%);padding:36px 40px;display:flex;justify-content:space-between;align-items:center}
    .logo-area{display:flex;align-items:center;gap:14px}
    .logo-img{width:56px;height:56px;object-fit:contain;background:#fff;border-radius:8px;padding:4px}
    .brand-name{color:#fff;font-size:22px;font-weight:700;letter-spacing:.5px}
    .brand-tagline{color:#bbf7d0;font-size:11px;margin-top:2px}
    .invoice-label{text-align:right;color:#fff}
    .invoice-label h2{font-size:28px;font-weight:800;letter-spacing:1px}
    .invoice-label p{font-size:12px;color:#bbf7d0;margin-top:4px}
    .green-bar{height:4px;background:linear-gradient(90deg,#4ade80,#166534)}
    .body{padding:36px 40px}
    .meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px}
    .meta-box h4{font-size:11px;text-transform:uppercase;letter-spacing:.8px;color:#6b7280;margin-bottom:8px}
    .meta-box p{font-size:13px;color:#111827;line-height:1.6}
    .meta-box .highlight{font-size:14px;font-weight:600;color:#166534}
    .status-badge{display:inline-block;background:#dcfce7;color:#166534;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;border:1px solid #86efac;margin-top:6px}
    table{width:100%;border-collapse:collapse;margin-bottom:24px}
    thead tr{background:#166534}
    thead th{padding:11px 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#fff;text-align:left}
    thead th:last-child,thead th:nth-child(3),thead th:nth-child(2){text-align:right}
    thead th:nth-child(2){text-align:center}
    .totals{display:flex;justify-content:flex-end;margin-bottom:32px}
    .totals-box{width:260px}
    .totals-row{display:flex;justify-content:space-between;padding:7px 0;font-size:13px;color:#374151;border-bottom:1px solid #f3f4f6}
    .totals-row.total{font-size:16px;font-weight:700;color:#166534;border-bottom:none;padding-top:12px}
    .payment-info{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin-bottom:28px}
    .payment-info h4{font-size:12px;text-transform:uppercase;letter-spacing:.6px;color:#166534;margin-bottom:10px;font-weight:700}
    .payment-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .payment-grid p{font-size:12px;color:#374151}
    .payment-grid span{font-weight:600;color:#111827}
    .footer{background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;display:flex;justify-content:space-between;align-items:center}
    .footer p{font-size:11px;color:#9ca3af}
    .footer .eco{font-size:11px;color:#166534;font-weight:600}
    @media print{
      body{background:#fff}
      .page{box-shadow:none;margin:0;border-radius:0}
      .print-btn{display:none!important}
    }
  </style>
</head>
<body>
  <div style="text-align:center;padding:16px;background:#fff" class="print-btn">
    <button onclick="window.print()" style="background:#166534;color:#fff;border:none;padding:10px 28px;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;margin-right:8px">🖨️ Print / Save PDF</button>
    <button onclick="window.close()" style="background:#e5e7eb;color:#374151;border:none;padding:10px 20px;border-radius:6px;font-size:14px;cursor:pointer">Close</button>
  </div>
  <div class="page">
    <div class="header">
      <div class="logo-area">
        <img src="/assets/img/vegnar-green.png" alt="Vegnar Green" class="logo-img" onerror="this.style.display='none'"/>
        <div>
          <div class="brand-name">Vegnar Green</div>
          <div class="brand-tagline">Sustainable Tableware Solutions</div>
        </div>
      </div>
      <div class="invoice-label">
        <h2>INVOICE</h2>
        <p>#${data.invoiceNumber}</p>
      </div>
    </div>
    <div class="green-bar"></div>
    <div class="body">
      <div class="meta-grid">
        <div class="meta-box">
          <h4>Bill To</h4>
          <p class="highlight">${data.customerName}</p>
          <p>${data.customerEmail}</p>
          <p>${data.customerPhone}</p>
          <p>${data.customerAddress}</p>
          ${data.userType === 'company' && data.gstNumber ? `<p style="margin-top:8px;font-size:12px"><strong>GST No:</strong> ${data.gstNumber}</p>` : ''}
          ${data.userType === 'customer' && data.panNumber ? `<p style="margin-top:8px;font-size:12px"><strong>PAN No:</strong> ${data.panNumber}</p>` : ''}
          ${data.userType === 'customer' && !data.panNumber ? `<p style="margin-top:8px;font-size:12px;color:#6b7280"><strong>Type:</strong> Individual Customer</p>` : ''}
          ${data.userType === 'company' ? `<p style="margin-top:8px;font-size:12px;color:#6b7280"><strong>Type:</strong> Business/Company</p>` : ''}
        </div>
        <div class="meta-box" style="text-align:right">
          <h4>Invoice Details</h4>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Invoice No:</strong> ${data.invoiceNumber}</p>
          <p><strong>Order ID:</strong> ${data.orderId}</p>
          <div class="status-badge">✓ PAID</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align:center">Qty</th>
            <th style="text-align:right">Unit Price</th>
            <th style="text-align:right">Amount</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div class="totals">
        <div class="totals-box">
          <div class="totals-row"><span>Subtotal</span><span>₹${data.subtotal.toLocaleString('en-IN')}</span></div>
          <div class="totals-row"><span>GST (5%)</span><span>₹${data.tax.toLocaleString('en-IN')}</span></div>
          <div class="totals-row total"><span>Total Paid</span><span>₹${data.total.toLocaleString('en-IN')}</span></div>
        </div>
      </div>

      <div class="payment-info">
        <h4>Payment Information</h4>
        <div class="payment-grid">
          <p>Payment ID: <span>${data.paymentId}</span></p>
          <p>Order ID: <span>${data.orderId}</span></p>
          <p>Method: <span>Razorpay</span></p>
          <p>Status: <span style="color:#166534">✓ Successful</span></p>
        </div>
      </div>

      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:14px 18px;font-size:12px;color:#92400e">
        <strong>Note:</strong> This is a computer-generated invoice and does not require a physical signature. For queries, contact us at <strong>connect@vegnar.com</strong> or <strong>+91 90333 31031</strong>.
      </div>
    </div>
    <div class="footer">
      <div>
        <p>Vegnar Green | connect@vegnar.com | +91 90333 31031</p>
        <p>www.vegnar.com</p>
      </div>
      <div class="eco">🌿 100% Eco-Friendly Products</div>
    </div>
  </div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}
