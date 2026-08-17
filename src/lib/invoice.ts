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

export function getInvoiceHtml(data: InvoiceData): string {
  const itemRows = data.items
    .map(
      (item, i) => `
      <tr style="background:${i % 2 === 0 ? '#f9fafb' : '#fff'}">
        <td style="padding:6px 10px;font-size:11px;color:#374151">${item.description}</td>
        <td style="padding:6px 10px;font-size:11px;color:#374151;text-align:center">${item.quantity}</td>
        <td style="padding:6px 10px;font-size:11px;color:#374151;text-align:right">₹${item.unitPrice.toLocaleString('en-IN')}</td>
        <td style="padding:6px 10px;font-size:11px;color:#374151;text-align:right">₹${(item.quantity * item.unitPrice).toLocaleString('en-IN')}</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Invoice ${data.invoiceNumber} - Vegnar Green</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    @page{size:A4 portrait;margin:6mm 8mm}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#e5e7eb;color:#111827}
    .print-btn{text-align:center;padding:12px;background:#e5e7eb}
    .page{width:100%;max-width:720px;background:#fff;margin:12px auto;display:flex;flex-direction:column;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10)}
    .header{background:linear-gradient(135deg,#166534 0%,#15803d 60%,#16a34a 100%);padding:14px 22px;display:flex;justify-content:space-between;align-items:center;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .logo-area{display:flex;align-items:center;gap:10px}
    .logo-img{width:34px;height:34px;object-fit:contain;background:#fff;border-radius:5px;padding:2px}
    .brand-name{color:#fff;font-size:16px;font-weight:700;letter-spacing:.5px}
    .brand-tagline{color:#bbf7d0;font-size:9px;margin-top:1px}
    .invoice-label{text-align:right}
    .invoice-label h2{font-size:19px;font-weight:800;letter-spacing:1px;color:#fff}
    .invoice-label p{font-size:10px;color:#bbf7d0;margin-top:2px}
    .green-bar{height:3px;background:linear-gradient(90deg,#4ade80,#166534);-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .body{padding:10px 22px;display:flex;flex-direction:column;gap:8px}
    .meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .meta-box h4{font-size:9px;text-transform:uppercase;letter-spacing:.8px;color:#6b7280;margin-bottom:4px}
    .meta-box p{font-size:10px;color:#111827;line-height:1.5}
    .meta-box .highlight{font-size:11px;font-weight:600;color:#166534}
    .status-badge{display:inline-block;background:#dcfce7;color:#166534;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;border:1px solid #86efac;margin-top:3px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    table{width:100%;border-collapse:collapse}
    thead tr{background:#166534;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    thead th{padding:5px 9px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#fff;text-align:left}
    thead th:last-child,thead th:nth-child(3){text-align:right}
    thead th:nth-child(2){text-align:center}
    tbody tr:nth-child(even){background:#f9fafb;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    tbody td{padding:5px 9px;font-size:10px;color:#374151}
    .totals{display:flex;justify-content:flex-end}
    .totals-box{width:200px}
    .totals-row{display:flex;justify-content:space-between;padding:3px 0;font-size:10px;color:#374151;border-bottom:1px solid #f3f4f6}
    .totals-row.total{font-size:12px;font-weight:700;color:#166534;border-bottom:none;padding-top:4px}
    .payment-info{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:5px;padding:8px 11px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .payment-info h4{font-size:9px;text-transform:uppercase;letter-spacing:.6px;color:#166534;margin-bottom:4px;font-weight:700}
    .payment-grid{display:grid;grid-template-columns:1fr 1fr;gap:3px}
    .payment-grid p{font-size:10px;color:#374151}
    .payment-grid span{font-weight:600;color:#111827}
    .note{background:#fffbeb;border:1px solid #fde68a;border-radius:5px;padding:8px 12px;font-size:10px;color:#92400e;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .footer{background:#f9fafb;border-top:1px solid #e5e7eb;padding:6px 22px;display:flex;justify-content:space-between;align-items:center;-webkit-print-color-adjust:exact;print-color-adjust:exact;page-break-inside:avoid;page-break-before:avoid}
    .footer p{font-size:8px;color:#9ca3af;white-space:nowrap}
    .footer .eco{font-size:8px;color:#166534;font-weight:600;white-space:nowrap}
    @media print{
      body{background:#fff;margin:0}
      .print-btn{display:none!important}
      .page{margin:0;max-width:100%;border-radius:0;box-shadow:none;page-break-inside:avoid}
      *{page-break-inside:avoid}
    }
  </style>
</head>
<body>
  <div class="print-btn">
    <button id="downloadBtn" onclick="downloadPDF()" style="background:#166534;color:#fff;border:none;padding:9px 24px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;margin-right:8px;box-shadow:0 2px 6px rgba(0,0,0,0.15)">📥 Download PDF Invoice</button>
    <button onclick="window.print()" style="background:#374151;color:#fff;border:none;padding:9px 18px;border-radius:6px;font-size:13px;cursor:pointer;margin-right:8px">🖨️ Print</button>
    <button onclick="window.close()" style="background:#9ca3af;color:#fff;border:none;padding:9px 16px;border-radius:6px;font-size:13px;cursor:pointer">Close</button>
  </div>
  <div class="page">
    <div class="header">
      <div class="logo-area">
        <img src="https://vegnar.com/assets/img/vegnar-green.png" alt="Vegnar Green" class="logo-img" onerror="this.style.display='none'"/>
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
          ${data.userType === 'company' && data.gstNumber ? `<p style="margin-top:6px;font-size:11px"><strong>GST:</strong> ${data.gstNumber}</p>` : ''}
          ${data.userType === 'customer' && data.panNumber ? `<p style="margin-top:6px;font-size:11px"><strong>PAN:</strong> ${data.panNumber}</p>` : ''}
          ${data.userType === 'customer' && !data.panNumber ? `<p style="margin-top:6px;font-size:11px;color:#6b7280"><strong>Type:</strong> Individual</p>` : ''}
          ${data.userType === 'company' ? `<p style="margin-top:6px;font-size:11px;color:#6b7280"><strong>Type:</strong> Business</p>` : ''}
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

      <div class="note">
        <strong>Note:</strong> Computer-generated invoice. Contact <strong>connect@vegnar.com</strong> or <strong>+91 90333 31031</strong>.
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

  <script>
    function downloadPDF() {
      const btn = document.getElementById('downloadBtn');
      if(btn) btn.innerText = '⏳ Generating PDF...';
      
      const element = document.querySelector('.page');
      const opt = {
        margin:       [5, 5, 5, 5],
        filename:     'Invoice-${data.invoiceNumber}.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save().then(function() {
          if(btn) btn.innerText = '✅ PDF Downloaded';
          setTimeout(function() { if(btn) btn.innerText = '📥 Download PDF Invoice'; }, 3000);
        }).catch(function() {
          window.print();
          if(btn) btn.innerText = '📥 Download PDF Invoice';
        });
      } else {
        window.print();
        if(btn) btn.innerText = '📥 Download PDF Invoice';
      }
    }

    // Auto-trigger PDF download on load after 600ms delay
    window.addEventListener('load', function() {
      setTimeout(function() {
        downloadPDF();
      }, 600);
    });
  </script>
</body>
</html>`;
}

export function getInvoiceEmailHtml(data: InvoiceData): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Tax Invoice ${data.invoiceNumber}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif; -webkit-font-smoothing:antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f6f8; padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Main Container Table -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
          
          <!-- BRAND HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f4d3a 0%, #166534 100%); padding: 25px 30px; text-align: left;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="55" style="vertical-align: middle;">
                    <img src="https://vegnar.com/assets/img/vegnar-green.png" alt="Vegnar Green" width="44" height="44" style="display:block; background:#ffffff; border-radius:8px; padding:3px;" />
                  </td>
                  <td style="vertical-align: middle; padding-left: 12px;">
                    <div style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.5px;">Vegnar Green</div>
                    <div style="font-size: 11px; color: #a8e6cf; margin-top: 2px;">Sustainable Tableware Solutions</div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 1px;">TAX INVOICE</div>
                    <div style="font-size: 12px; color: #a8e6cf; font-weight: 600; margin-top: 2px;">#${data.invoiceNumber}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SUCCESS BANNER -->
          <tr>
            <td style="background-color: #f0faf5; border-bottom: 1px solid #dcfce7; padding: 12px 30px; text-align: center;">
              <span style="font-size: 13px; color: #166534; font-weight: bold; display: inline-block;">
                ✅ Payment Received & Verified — Thank You for Your Order!
              </span>
            </td>
          </tr>

          <!-- INVOICE META DETAILS -->
          <tr>
            <td style="padding: 24px 30px 10px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <!-- BILL TO -->
                  <td width="55%" style="vertical-align: top; padding-right: 15px;">
                    <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.8px; margin-bottom: 6px;">BILL TO</div>
                    <div style="font-size: 14px; font-weight: bold; color: #0f172a; margin-bottom: 4px;">${data.customerName}</div>
                    <div style="font-size: 12px; color: #475569; line-height: 1.6;">
                      📧 ${data.customerEmail}<br/>
                      📞 ${data.customerPhone}<br/>
                      📍 ${data.customerAddress}
                    </div>
                    ${data.userType === 'company' && data.gstNumber ? `<div style="font-size: 11px; font-weight: 600; color: #1e293b; margin-top: 6px;">GSTIN: ${data.gstNumber}</div>` : ''}
                    ${data.userType === 'customer' && data.panNumber ? `<div style="font-size: 11px; font-weight: 600; color: #1e293b; margin-top: 6px;">PAN: ${data.panNumber}</div>` : ''}
                  </td>
                  
                  <!-- INVOICE INFO -->
                  <td width="45%" style="vertical-align: top; text-align: right; background-color: #f8fafc; padding: 14px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.8px; margin-bottom: 6px; text-align: right;">INVOICE DETAILS</div>
                    <table border="0" cellpadding="3" cellspacing="0" width="100%">
                      <tr>
                        <td align="right" style="font-size: 11px; color: #64748b;">Date:</td>
                        <td align="right" style="font-size: 11px; font-weight: 600; color: #0f172a;">${data.date}</td>
                      </tr>
                      <tr>
                        <td align="right" style="font-size: 11px; color: #64748b;">Invoice No:</td>
                        <td align="right" style="font-size: 11px; font-weight: 600; color: #0f172a;">${data.invoiceNumber}</td>
                      </tr>
                      <tr>
                        <td align="right" style="font-size: 11px; color: #64748b;">Order ID:</td>
                        <td align="right" style="font-size: 11px; font-weight: 600; color: #0f172a;">${data.orderId}</td>
                      </tr>
                      <tr>
                        <td align="right" style="font-size: 11px; color: #64748b;">Status:</td>
                        <td align="right">
                          <span style="background-color:#dcfce7; color:#166534; font-size:10px; font-weight:bold; padding:2px 8px; border-radius:12px; border:1px solid #86efac; display:inline-block;">✓ PAID</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ITEMS TABLE -->
          <tr>
            <td style="padding: 15px 30px;">
              <table border="0" cellpadding="10" cellspacing="0" width="100%" style="border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #166534; color: #ffffff;">
                    <th align="left" style="font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 10px; color: #ffffff;">Item Description</th>
                    <th align="center" style="font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 10px; color: #ffffff;" width="50">Qty</th>
                    <th align="right" style="font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 10px; color: #ffffff;" width="80">UnitPrice</th>
                    <th align="right" style="font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 10px; color: #ffffff;" width="90">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.items.map((item, i) => `
                    <tr style="background-color: ${i % 2 === 0 ? '#f8fafc' : '#ffffff'}; border-bottom: 1px solid #f1f5f9;">
                      <td align="left" style="font-size: 12px; color: #334155; padding: 10px; line-height: 1.5;">${item.description}</td>
                      <td align="center" style="font-size: 12px; color: #334155; padding: 10px;">${item.quantity}</td>
                      <td align="right" style="font-size: 12px; color: #334155; padding: 10px;">₹${item.unitPrice.toLocaleString('en-IN')}</td>
                      <td align="right" style="font-size: 12px; font-weight: 600; color: #0f172a; padding: 10px;">₹${(item.quantity * item.unitPrice).toLocaleString('en-IN')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- TOTALS TABLE -->
          <tr>
            <td style="padding: 0 30px 20px 30px;" align="right">
              <table border="0" cellpadding="4" cellspacing="0" width="240" style="border-collapse: collapse;">
                <tr>
                  <td align="left" style="font-size: 12px; color: #64748b; padding: 4px 0;">Subtotal:</td>
                  <td align="right" style="font-size: 12px; font-weight: 600; color: #334155; padding: 4px 0;">₹${data.subtotal.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td align="left" style="font-size: 12px; color: #64748b; padding: 4px 0; border-bottom: 1px solid #e2e8f0;">GST (5%):</td>
                  <td align="right" style="font-size: 12px; font-weight: 600; color: #334155; padding: 4px 0; border-bottom: 1px solid #e2e8f0;">₹${data.tax.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td align="left" style="font-size: 14px; font-weight: bold; color: #166534; padding: 8px 0 0 0;">Total Amount Paid:</td>
                  <td align="right" style="font-size: 15px; font-weight: 800; color: #166534; padding: 8px 0 0 0;">₹${data.total.toLocaleString('en-IN')}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PAYMENT INFO BOX -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table border="0" cellpadding="12" cellspacing="0" width="100%" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #166534; letter-spacing: 0.6px; margin-bottom: 6px;">PAYMENT TRANSACTION DETAILS</div>
                    <table border="0" cellpadding="3" cellspacing="0" width="100%">
                      <tr>
                        <td width="50%" style="font-size: 11px; color: #334155;">Payment ID: <strong style="color:#0f172a;">${data.paymentId}</strong></td>
                        <td width="50%" style="font-size: 11px; color: #334155;">Order ID: <strong style="color:#0f172a;">${data.orderId}</strong></td>
                      </tr>
                      <tr>
                        <td style="font-size: 11px; color: #334155;">Payment Gateway: <strong style="color:#0f172a;">Razorpay</strong></td>
                        <td style="font-size: 11px; color: #334155;">Payment Status: <strong style="color:#166534;">✓ Successful</strong></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 30px; text-align: center;">
              <div style="font-size: 12px; color: #475569; font-weight: 600; margin-bottom: 4px;">Vegnar Green — Sustainable Tableware Solutions</div>
              <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
                Email: <a href="mailto:connect@vegnar.com" style="color: #166534; text-decoration: none; font-weight: 600;">connect@vegnar.com</a> | Phone: <a href="tel:+919033331031" style="color: #166534; text-decoration: none; font-weight: 600;">+91 90333 31031</a>
              </div>
              <div style="font-size: 11px; color: #166534; font-weight: bold;">🌱 100% Sugarcane Bagasse Eco-Friendly Products</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateInvoice(data: InvoiceData) {
  const html = getInvoiceHtml(data);
  // Use blob URL to avoid popup blockers in production
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    // Fallback: direct download as HTML file
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${data.invoiceNumber}.html`;
    a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
