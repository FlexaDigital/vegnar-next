'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Download, ShoppingCart, Plus, Check } from 'lucide-react';
import Image from 'next/image';
import { numberToWords } from '@/lib/pdf-utils';
import productsData from '@/data/products.json';
import countryList from '@/data/country-list.json';
import { DomesticProduct as Product } from '@/types/product';
import { useProducts } from '@/lib/products-context';
import ProductPreviewModal from '@/components/ProductPreviewModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoImg from '../../../public/assets/img/vegnar-green.png';

const products: Product[] = productsData as Product[];

function PackingListPageInner() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { 
    wpImageMap, 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    updateCartUnit,
    clearCart 
  } = useProducts();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vegnar_last_invoice');
      if (saved) setLastInvoiceData(JSON.parse(saved));
    } catch {}
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const categories = [...new Set(products.map(p => p.category))];


  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.item_code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setCurrentPage(1); // Reset to first page when filters change
    return filtered;
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    if (searchParams.get('checkout') === '1') {
      setShowQuoteForm(true);
    }
  }, [searchParams]);
  const [orderType, setOrderType] = useState<'domestic' | 'international'>('domestic');


  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      formType: 'QuoteCartForm',
      'Company Name': formData.get('companyName'),
      'Email': formData.get('email'),
      'Mobile Number': formData.get('mobile'),
      'Country': formData.get('country'),
      'Address': formData.get('address'),
      'Delivery Terms': formData.get('deliveryTerms'),
      'Port of Discharge': formData.get('portOfDischarge'),
      'Final Delivery Address': formData.get('finalDeliveryAddress'),
      'Additional Requirements': formData.get('additionalRequirements'),
      'Products Count': cart.length,
      ...cart.reduce((acc, item, index) => {
        const productNum = index + 1;
        acc[`Product ${productNum} Name`] = item.product.product;
        acc[`Product ${productNum} Code`] = item.product.item_code;
        acc[`Product ${productNum} Quantity`] = item.quantity;
        acc[`Product ${productNum} Unit`] = item.unit;
        acc[`Product ${productNum} Weight`] = (item.product.product_weight_g || 0) + 'g';
        acc[`Product ${productNum} Pcs Per Carton`] = item.product.pcs_per_carton;
        return acc;
      }, {} as Record<string, any>),
      'Total Pieces': cart.reduce((total, item) => {
        const pieces = item.unit === 'cartons' 
          ? item.quantity * item.product.pcs_per_carton
          : item.quantity;
        return total + pieces;
      }, 0),
      'Total Weight': cart.reduce((total, item) => {
        const cartons = item.unit === 'cartons' 
          ? item.quantity 
          : Math.ceil(item.quantity / item.product.pcs_per_carton);
        return total + (cartons * (item.product.net_weight_kg || 0));
      }, 0).toFixed(1) + ' kg',
      'Total CBM': cart.reduce((total, item) => {
        const cartons = item.unit === 'cartons' 
          ? item.quantity 
          : Math.ceil(item.quantity / item.product.pcs_per_carton);
        const cbm = item.product.length_m && item.product.width_m && item.product.height_m
          ? item.product.length_m * item.product.width_m * item.product.height_m
          : 0;
        return total + (cartons * cbm);
      }, 0).toFixed(3) + ' m³'
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbys6WK8uBmZQM2vP5KMOu16UWd1qwsUbBmdvp9qxeioPb3B6F2mSpyai2pT1PJYQsZQJQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Save lead to Inventory Management system
      fetch(process.env.NEXT_PUBLIC_LEAD_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload['Company Name'],
          email: payload['Email'],
          phone: payload['Mobile Number'],
          company: payload['Company Name'],
          country: payload['Country'],
          message: `Quote Request | Products: ${payload['Products Count']} | Delivery: ${payload['Delivery Terms']} | Address: ${payload['Address']}`,
          formType: 'QuoteCartForm',
        }),
      }).catch(() => {}); // Silent fail

      // Assume success with no-cors
      alert('Quote request submitted successfully! Your PDF is being generated...');
      
      // Generate PDF after successful submission
      downloadPDF();
      
      form.reset();
      setShowQuoteForm(false);
      clearCart(); // Clear cart after successful submission
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPricePerPiece = (product: Product, quantity: number, unit: 'pieces' | 'cartons') => {
    const cartons = unit === 'cartons' ? quantity : Math.ceil(quantity / product.pcs_per_carton);
    
    let priceStr = product.price_1_to_10_box;
    if (cartons > 30) {
      priceStr = product.price_31_to_100_box;
    } else if (cartons > 10) {
      priceStr = product.price_11_to_30_box;
    }
    
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const form = document.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);
    const quoteNo = `QT-${Math.floor(Math.random() * 90000) + 10000}`;
    const date = new Date().toLocaleDateString('en-GB');
    const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');
    const isDomestic = orderType === 'domestic';

    // Outer Border
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    // Header Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Vegnar Global LLP', 15, 20);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('B-623, RK Iconic', 15, 26);
    
    doc.setFont('helvetica', 'normal');
    doc.text('150 Feet Ring Road, Ayodhya Chowk', 15, 31);
    doc.text('Rajkot Gujarat 360007, India', 15, 36);
    
    doc.setFont('helvetica', 'bold');
    doc.text('GSTIN: 24ABAFV3901A1ZV', 15, 42);
    
    doc.setFont('helvetica', 'normal');
    doc.text('Phone: +91 9998040482 | www.vegnar.com', 15, 47);

    // Logo on the Right
    try {
      doc.addImage(logoImg.src, 'PNG', 150, 15, 45, 15);
    } catch (e) {
      // Fallback if logo fails
    }

    // Centered Quote Title
    doc.setLineWidth(0.1);
    doc.line(10, 52, 200, 52);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Quote', 105, 62, { align: 'center' });
    doc.line(10, 67, 200, 67);

    // Info Rows
    doc.setFontSize(9.5);
    const labelX1 = 15;
    const valueX1 = 40;
    const labelX2 = 110;
    const valueX2 = 145;

    doc.setFont('helvetica', 'bold');
    doc.text('Quote No:', labelX1, 73);
    doc.setFont('helvetica', 'normal');
    doc.text(quoteNo, valueX1, 73);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Terms of Delivery:', labelX2, 73);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.get('deliveryTerms') as string || (isDomestic ? 'Ex-works' : 'FOB'), valueX2, 73);

    doc.setFont('helvetica', 'bold');
    doc.text('Quote Date:', labelX1, 79);
    doc.setFont('helvetica', 'normal');
    doc.text(date, valueX1, 79);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Terms:', labelX2, 79);
    doc.setFont('helvetica', 'normal');
    doc.text('100% advance', valueX2, 79);

    doc.setFont('helvetica', 'bold');
    doc.text('Expiry Date:', labelX1, 85);
    doc.setFont('helvetica', 'normal');
    doc.text(expiry, valueX1, 85);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Reference:', labelX2, 85);
    doc.setFont('helvetica', 'normal');
    doc.text('Online Inquiry', valueX2, 85);

    doc.line(10, 90, 200, 90);

    // Billed To / Shipped To Headers
    doc.setFont('helvetica', 'bold');
    doc.text('Detail of Receiver (Billed to)', 15, 96);
    doc.text('Detail of Consignee (Shipped to)', 110, 96);
    doc.line(10, 98, 200, 98);
    doc.line(105, 90, 105, 125); // Vertical separator

    // Party Details
    const company = (formData.get('companyName') as string || 'Valued Customer').toUpperCase();
    const rawAddress = (formData.get('billingAddress') as string || formData.get('address') as string || 'N/A').toUpperCase();
    const city = (formData.get('city') as string || '').toUpperCase();
    const state = (formData.get('state') as string || '').toUpperCase();
    const country = isDomestic ? 'INDIA' : (countryList.find(c => c.code === formData.get('country'))?.name || '').toUpperCase();

    const fullAddress = `${rawAddress}\n${city} ${state} ${country}`.trim();

    doc.setFont('helvetica', 'bold');
    doc.text('Name: ', 15, 104);
    doc.setFont('helvetica', 'normal');
    doc.text(company, 30, 104);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Name: ', 110, 104);
    doc.setFont('helvetica', 'normal');
    doc.text(company, 125, 104);

    doc.setFont('helvetica', 'bold');
    doc.text('Address: ', 15, 110);
    doc.setFont('helvetica', 'normal');
    doc.text(fullAddress, 35, 110, { maxWidth: 65 });
    
    doc.setFont('helvetica', 'bold');
    doc.text('Address: ', 110, 110);
    doc.setFont('helvetica', 'normal');
    doc.text(fullAddress, 130, 110, { maxWidth: 65 });

    doc.line(10, 128, 200, 128);
    doc.line(105, 90, 105, 128); // Vertical separator


    // Product Table
    const tableData = cart.map((item, index) => {
      const pricePerPiece = getPricePerPiece(item.product, item.quantity, item.unit);
      const totalPieces = item.unit === 'cartons' ? item.quantity * item.product.pcs_per_carton : item.quantity;
      
      let rate = pricePerPiece;
      let amount = totalPieces * pricePerPiece;
      const cgstAmt = amount * 0.025;
      const sgstAmt = amount * 0.025;

      if (!isDomestic) {
        const fobPrice = item.product.fob_price_per_carton_usd || 0;
        const totalCartons = item.unit === 'cartons' ? item.quantity : Math.ceil(item.quantity / item.product.pcs_per_carton);
        amount = totalCartons * fobPrice;
        rate = fobPrice;
      }
      
      const desc = `${item.product.product.toUpperCase()}\nSet of ${item.product.pcs_per_pack} | ${item.product.color} | ${item.product.pcs_per_carton} Pack`;

      const row = [
        index + 1,
        desc,
        item.product.hsn_code || '48237010',
        isDomestic ? 'Pcs' : 'Carton',
        (isDomestic ? totalPieces : (item.unit === 'cartons' ? item.quantity : Math.ceil(item.quantity / item.product.pcs_per_carton))).toLocaleString(),
        rate.toFixed(2),
      ];

      if (isDomestic) {
        row.push('2.5%', cgstAmt.toFixed(2));
        row.push('2.5%', sgstAmt.toFixed(2));
      }

      row.push(amount.toFixed(2));
      return row;
    });

    const tableHead = isDomestic 
      ? [
          [{ content: 'No', rowSpan: 2 }, { content: 'Product Description', rowSpan: 2 }, { content: 'HSN Code', rowSpan: 2 }, { content: 'UOM', rowSpan: 2 }, { content: 'Qty', rowSpan: 2 }, { content: 'Rate', rowSpan: 2 }, { content: 'CGST', colSpan: 2, halign: 'center' as const }, { content: 'SGST', colSpan: 2, halign: 'center' as const }, { content: 'Total', rowSpan: 2 }],
          ['%', 'Amount', '%', 'Amount']
        ]
      : [
          ['No', 'Product Description', 'HSN Code', 'UOM', 'Qty', 'Rate', 'Total']
        ];

    autoTable(doc, {
      startY: 128,
      head: tableHead,
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold', lineWidth: 0.1, lineColor: [0, 0, 0] },
      styles: { fontSize: 7.5, cellPadding: 2, valign: 'middle', lineColor: [0, 0, 0] },
      margin: { left: 10, right: 10 },
      columnStyles: isDomestic ? {
        0: { cellWidth: 8 },
        1: { cellWidth: 42 },
        2: { cellWidth: 18 },
        3: { cellWidth: 12 },
        4: { cellWidth: 18, halign: 'center' },
        5: { cellWidth: 15, halign: 'right' },
        6: { cellWidth: 10, halign: 'center' },
        7: { cellWidth: 18, halign: 'right' },
        8: { cellWidth: 10, halign: 'center' },
        9: { cellWidth: 18, halign: 'right' },
        10: { cellWidth: 21, halign: 'right' },
      } : {
        0: { cellWidth: 10 },
        1: { cellWidth: 80 },
        4: { halign: 'center' },
        5: { halign: 'right' },
        6: { halign: 'right' },
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    // Totals Section
    let subTotal = 0;
    if (isDomestic) {
      subTotal = cart.reduce((total, item) => {
        const price = getPricePerPiece(item.product, item.quantity, item.unit);
        const pcs = item.unit === 'cartons' ? item.quantity * item.product.pcs_per_carton : item.quantity;
        return total + (pcs * price);
      }, 0);
    } else {
      subTotal = cart.reduce((total, item) => {
        const cartons = item.unit === 'cartons' ? item.quantity : Math.ceil(item.quantity / item.product.pcs_per_carton);
        return total + (cartons * (item.product.fob_price_per_carton_usd || 0));
      }, 0);
    }

    const cgstTotal = isDomestic ? subTotal * 0.025 : 0;
    const sgstTotal = isDomestic ? subTotal * 0.025 : 0;
    const grandTotal = subTotal + cgstTotal + sgstTotal;
    const symbol = isDomestic ? 'Rs. ' : 'USD ';

    doc.line(10, finalY, 200, finalY);

    // Summary Box
    doc.rect(10, finalY, 105, 45); // Left Box (Words/Notes)
    doc.rect(115, finalY, 85, 45); // Right Box (Calculations)

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Total Invoice amount in words', 15, finalY + 7);
    doc.line(10, finalY + 10, 115, finalY + 10);
    
    doc.setFont('helvetica', 'italic');
    doc.text(isDomestic ? numberToWords(Math.round(grandTotal)) : `USD ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} Only`, 15, finalY + 18, { maxWidth: 90 });

    doc.setFont('helvetica', 'bold');
    doc.text('Note:', 15, finalY + 34);
    doc.setFont('helvetica', 'normal');
    doc.text('Quote is valid for 7 days.', 15, finalY + 39);

    // Right side totals
    const rowH = 7;
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount before Tax', 120, finalY + 7);
    doc.text(subTotal.toLocaleString(undefined, { minimumFractionDigits: 2 }), 195, finalY + 7, { align: 'right' });
    
    if (isDomestic) {
      doc.text('CGST (2.5%)', 120, finalY + 7 + rowH);
      doc.text(cgstTotal.toLocaleString(undefined, { minimumFractionDigits: 2 }), 195, finalY + 7 + rowH, { align: 'right' });
      
      doc.text('SGST (2.5%)', 120, finalY + 7 + (rowH * 2));
      doc.text(sgstTotal.toLocaleString(undefined, { minimumFractionDigits: 2 }), 195, finalY + 7 + (rowH * 2), { align: 'right' });
    }

    doc.setFontSize(11);
    doc.text('Grand Total', 120, finalY + 38);
    doc.text(symbol + grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 }), 195, finalY + 38, { align: 'right' });

    // Bank Details + Signature
    const bankY = finalY + 45;
    doc.rect(10, bankY, 105, 40);
    doc.rect(115, bankY, 85, 40);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Bank Details', 15, bankY + 8);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Bank Name: Axis Bank', 15, bankY + 15);
    doc.text('Bank A/C: 925020013383048', 15, bankY + 22);
    doc.text('Bank IFSC: UTIB0005420', 15, bankY + 29);
    doc.text('Swift Code: AXISINBB087', 15, bankY + 36);

    doc.setFontSize(8);
    doc.text('Certified that the particulars given above are true and correct', 118, bankY + 6);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('For Vegnar Global LLP', 157.5, bankY + 14, { align: 'center' });
    
    doc.text('Authorised signatory', 157.5, bankY + 34, { align: 'center' });

    // Terms & Conditions — always on a new page for clean layout
    doc.addPage();
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);

    const terms = [
      { title: '1. Price Validity', body: 'Prices are subject to change without prior notice. Prices prevailing on the date of dispatch shall apply.' },
      { title: '2. Taxes & Levies', body: 'All prices are exclusive of GST and any other applicable government duties or levies, charged extra at actual rates.' },
      { title: '3. Terms of Delivery', body: 'All supplies are on Ex-Works (Rajkot) basis. Risk passes to Buyer once consignment is handed over to carrier at our warehouse.' },
      { title: '4. Minimum Order Value', body: 'Orders above Rs.1,00,000: standard handling. Orders below Rs.1,00,000 will incur a Local Handling & Transportation Surcharge of Rs.1,500.' },
      { title: '5. Lead Time & Dispatch', body: 'Standard lead time is 5-7 working days from confirmed order and payment realization. Transit time is beyond Seller control.' },
      { title: '6. Payment Terms', body: '100% advance payment required. Alternative credit terms only if pre-approved in writing by Management.' },
      { title: '7. Order Finality', body: 'Prices are fixed and non-negotiable to ensure fairness across our distribution network. No discounts or price adjustments will be entertained.' },
      { title: '8. Shortages & Damages', body: 'Claims for shortages or damage must be reported within 48 hours of receipt, with unboxing video/photos and acknowledged LR copy with clear remark.' },
      { title: '9. Jurisdiction', body: 'All transactions and disputes shall be subject to the exclusive jurisdiction of the courts in Rajkot, Gujarat only.' },
    ];

    // Header
    doc.setFillColor(22, 101, 52);
    doc.rect(10, 10, 190, 12, 'F');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Terms & Conditions', 105, 18, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    // Draw each term as a full-width row
    const tcStartY = 26;
    const tcColW = 190;
    const tcPad = 4;
    const titleFontSize = 8.5;
    const bodyFontSize = 8;
    const lineH = 4.5;

    let curY = tcStartY;
    terms.forEach((t, i) => {
      // Measure body text height
      doc.setFontSize(bodyFontSize);
      doc.setFont('helvetica', 'normal');
      const bodyLines = doc.splitTextToSize(t.body, tcColW - tcPad * 2 - 2);
      const cellH = tcPad + lineH + bodyLines.length * lineH + tcPad;

      // Alternate row background
      if (i % 2 === 0) {
        doc.setFillColor(245, 250, 245);
        doc.rect(10, curY, tcColW, cellH, 'F');
      }
      doc.setDrawColor(200, 220, 200);
      doc.setLineWidth(0.2);
      doc.rect(10, curY, tcColW, cellH);

      // Title
      doc.setFontSize(titleFontSize);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(22, 101, 52);
      doc.text(t.title, 10 + tcPad, curY + tcPad + lineH - 1);

      // Body
      doc.setFontSize(bodyFontSize);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
      doc.text(bodyLines, 10 + tcPad + 2, curY + tcPad + lineH * 2 - 1);

      curY += cellH;
    });

    // Footer note
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(120, 120, 120);
    doc.text('This quote is computer generated. For queries contact: connect@vegnar.com | +91 9998040482', 105, curY + 8, { align: 'center' });

    doc.save(`Vegnar_Quote_${quoteNo}.pdf`);
  };

  const exportToCSV = () => {
    const headers = [
      'Item Code', 'Category', 'Sub Category', 'Product', 'Color', 'Vendor',
      'Weight', 'Pcs/Pack', 'Packs/Carton', 'Pcs/Carton', 'Price/Carton'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredProducts.map(product => [
        product.item_code,
        product.category,
        product.sub_category,
        `"${product.product}"`,
        product.color,
        product.preferred_vendor || '',
        product.product_weight_g || 0,
        product.pcs_per_pack,
        product.packs_per_carton,
        product.pcs_per_carton,
        product.price_per_carton_inr || 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vegnar-packing-list.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    document.title = "Get Quote - Sugarcane Bagasse Products | Biodegradable Tableware Pricing - Vegnar Green";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Request instant quotes for premium sugarcane bagasse tableware. Compare prices, specifications, and get bulk pricing for biodegradable plates, bowls, containers.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
        <div className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none" style={{backgroundSize: '200px'}}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Get Quote - Biodegradable Tableware</h1>
                <p className="mt-1 text-sm text-gray-500">Premium sugarcane bagasse products with instant pricing and specifications</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a7a2b] hover:bg-[#0f5a1f] relative transition-colors"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Quote Cart ({cart.length})
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </button>


              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name or item code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {showFilters && (
              <div className="mt-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </p>
          </div>

          {/* Products Table - Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pcs/Pack</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packs/Box</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pcs/Box</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.map((product) => (
                  <tr key={product.item_code} className="hover:bg-gray-50 cursor-pointer" onClick={() => setPreviewProduct(product)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {wpImageMap[product.item_code] ? (
                        <div className="relative w-12 h-12">
                          <Image 
                            src={wpImageMap[product.item_code]} 
                            alt={product.product} 
                            fill
                            className="object-cover rounded shadow-sm border border-gray-200"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400 border border-gray-200">No Img</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.product}</div>
                        <div className="text-sm text-gray-500">{product.item_code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.color || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.pcs_per_pack}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.packs_per_carton}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.pcs_per_carton.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                      {cart.some(item => item.product.item_code === product.item_code) ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => {
                                const item = cart.find(item => item.product.item_code === product.item_code);
                                if (item && item.quantity > 1) {
                                  updateCartQuantity(product.item_code, item.quantity - 1);
                                }
                              }}
                              className="px-2 py-1 hover:bg-gray-100 text-sm"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-sm min-w-[40px] text-center">
                              {cart.find(item => item.product.item_code === product.item_code)?.quantity || 0}
                              <span className="text-xs text-gray-500 ml-1">
                                {cart.find(item => item.product.item_code === product.item_code)?.unit === 'cartons' ? 'ctns' : 'pcs'}
                              </span>
                            </span>
                            <button
                              onClick={() => {
                                const item = cart.find(item => item.product.item_code === product.item_code);
                                if (item) {
                                  updateCartQuantity(product.item_code, item.quantity + 1);
                                }
                              }}
                              className="px-2 py-1 hover:bg-gray-100 text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                      {cart.some(item => item.product.item_code === product.item_code) ? (
                        <button
                          onClick={() => removeFromCart(product.item_code)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-red-600 transition-colors"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Added
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a7a2b] hover:bg-[#0f5a1f] transition-colors"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Products Cards - Mobile */}
          <div className="md:hidden space-y-4 p-4">
            {currentProducts.map((product) => (
              <div key={product.item_code} className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer" onClick={() => setPreviewProduct(product)}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 flex space-x-3">
                    {wpImageMap[product.item_code] ? (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image 
                          src={wpImageMap[product.item_code]} 
                          alt={product.product} 
                          fill
                          className="object-cover rounded shadow-sm border border-gray-200"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center text-[10px] text-gray-400 border border-gray-200">No Img</div>
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900 leading-tight">{product.product}</h3>
                      <p className="text-sm text-gray-500">{product.item_code}</p>
                      <p className="text-xs text-blue-600 mt-1">{product.category}</p>
                    </div>
                  </div>
                  {cart.some(item => item.product.item_code === product.item_code) ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFromCart(product.item_code); }}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-red-600 transition-colors"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Added
                    </button>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a7a2b] hover:bg-[#0f5a1f] transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-3 pt-3 border-t">
                  <div>
                    <span className="text-gray-500">Color:</span>
                    <span className="ml-1 font-medium">{product.color || '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Pcs/Pack:</span>
                    <span className="ml-1 font-medium">{product.pcs_per_pack}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Packs/Box:</span>
                    <span className="ml-1 font-medium">{product.packs_per_carton}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Pcs/Box:</span>
                    <span className="ml-1 font-medium">{product.pcs_per_carton.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === pageNum
                              ? 'bg-green-600 text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                
                <div className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Preview Modal */}
      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Request Quote</h2>
                <button
                  onClick={() => setShowQuoteForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* Cart Items */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Selected Products</h3>
                  <button
                    onClick={() => setShowQuoteForm(false)}
                    className="bg-[#1a7a2b] hover:bg-[#0f5a1f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    + Add More Products
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-gray-500">No products selected</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.product.item_code} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.product}</h4>
                            <p className="text-sm text-gray-500">{item.product.item_code}</p>
                            <p className="text-sm text-green-600 font-medium">
                              {item.unit === 'cartons' 
                                ? `Total: ${(item.quantity * item.product.pcs_per_carton).toLocaleString()} pieces`
                                : `≈ ${Math.ceil(item.quantity / item.product.pcs_per_carton)} cartons`
                              }
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <select
                              value={item.unit}
                              onChange={(e) => updateCartUnit(item.product.item_code, e.target.value as 'pieces' | 'cartons')}
                              className="border rounded px-2 py-1"
                            >
                              <option value="pieces">Pieces</option>
                              <option value="cartons">Cartons</option>
                            </select>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateCartQuantity(item.product.item_code, parseInt(e.target.value) || 1)}
                              className="w-20 text-center border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                              onClick={() => removeFromCart(item.product.item_code)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Totals */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3">Quote Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white p-3 rounded border">
                          <span className="text-gray-600">Total Pieces:</span>
                          <div className="font-bold text-lg text-green-700">
                            {cart.reduce((total, item) => {
                              const pieces = item.unit === 'cartons' 
                                ? item.quantity * item.product.pcs_per_carton
                                : item.quantity;
                              return total + pieces;
                            }, 0).toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <span className="text-gray-600">Total Weight:</span>
                          <div className="font-bold text-lg text-green-700">
                            {cart.reduce((total, item) => {
                              const cartons = item.unit === 'cartons' 
                                ? item.quantity 
                                : Math.ceil(item.quantity / item.product.pcs_per_carton);
                              return total + (cartons * (item.product.net_weight_kg || 0));
                            }, 0).toFixed(1)} kg
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <span className="text-gray-600">Total CBM:</span>
                          <div className="font-bold text-lg text-green-700">
                            {cart.reduce((total, item) => {
                              const cartons = item.unit === 'cartons' 
                                ? item.quantity 
                                : Math.ceil(item.quantity / item.product.pcs_per_carton);
                              const cbm = (item.product.length_m && item.product.width_m && item.product.height_m && 
                                          item.product.length_m > 0 && item.product.width_m > 0 && item.product.height_m > 0)
                                ? item.product.length_m * item.product.width_m * item.product.height_m
                                : 0.001;
                              return total + (cartons * cbm);
                            }, 0).toFixed(3)} m³
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Quote Form */}
              <form className="space-y-4" onSubmit={handleQuoteSubmit}>
                <div className="flex space-x-6 mb-6 p-4 bg-gray-50 rounded-lg">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="orderType" 
                      value="domestic" 
                      checked={orderType === 'domestic'} 
                      onChange={() => setOrderType('domestic')}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Domestic Inquiry</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="orderType" 
                      value="international" 
                      checked={orderType === 'international'} 
                      onChange={() => setOrderType('international')}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">International Inquiry</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="companyName" type="text" placeholder="Company Name" className="border rounded px-3 py-2" required />
                  <input name="contactPerson" type="text" placeholder="Contact Person" className="border rounded px-3 py-2" required />
                  <input name="email" type="email" placeholder="Email" className="border rounded px-3 py-2" required />
                  <input name="mobile" type="tel" placeholder="Mobile Number" className="border rounded px-3 py-2" required />
                  
                  {orderType === 'domestic' ? (
                    <>
                      <input name="gstin" type="text" placeholder="GSTIN (Optional)" className="border rounded px-3 py-2" />
                      <input name="city" type="text" placeholder="City" className="border rounded px-3 py-2" required />
                      <input name="state" type="text" placeholder="State" className="border rounded px-3 py-2" required />
                      <input name="pincode" type="text" placeholder="Pincode" className="border rounded px-3 py-2" required />
                      <textarea name="billingAddress" placeholder="Billing Address" className="border rounded px-3 py-2 md:col-span-2" rows={3} required></textarea>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-2">
                        <select 
                          name="country" 
                          className="border rounded px-3 py-2 w-full" 
                          required
                        >
                          <option value="">Select Country</option>
                          {countryList.map(country => (
                            <option key={country.code} value={country.code}>{country.name}</option>
                          ))}
                        </select>
                      </div>
                      <select 
                        name="deliveryTerms"
                        className="border rounded px-3 py-2 w-full" 
                        required
                        onChange={(e) => {
                          const deliveryTerms = e.target.value;
                          const cifField = document.getElementById('cifPort') as HTMLInputElement;
                          const ddpField = document.getElementById('ddpAddress') as HTMLTextAreaElement;
                          if (cifField) cifField.style.display = (deliveryTerms === 'CIF' || deliveryTerms === 'CFR' || deliveryTerms === 'FOB') ? 'block' : 'none';
                          if (ddpField) ddpField.style.display = deliveryTerms === 'DDP' ? 'block' : 'none';
                        }}
                      >
                        <option value="">Select Delivery Terms</option>
                        <option value="EXW">EXW (Ex Works)</option>
                        <option value="FOB">FOB (Free on Board)</option>
                        <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                        <option value="CFR">CFR (Cost & Freight)</option>
                        <option value="DDP">DDP (Delivered Duty Paid)</option>
                      </select>
                      <input 
                        id="cifPort"
                        name="portOfDischarge"
                        type="text" 
                        placeholder="Port of Loading/Discharge" 
                        className="border rounded px-3 py-2 w-full" 
                        style={{display: 'none'}}
                      />
                      <textarea name="address" placeholder="Company Address" className="border rounded px-3 py-2 md:col-span-2" rows={3} required></textarea>
                      <textarea 
                        id="ddpAddress"
                        name="finalDeliveryAddress"
                        placeholder="Final Delivery Address" 
                        className="border rounded px-3 py-2 md:col-span-2" 
                        rows={3}
                        style={{display: 'none'}}
                      ></textarea>
                    </>
                  )}
                  
                  <textarea name="additionalRequirements" placeholder="Additional Requirements" className="border rounded px-3 py-2 md:col-span-2" rows={3}></textarea>
                </div>
                
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Technical Error</h4>
                    <p className="text-red-700 text-sm mb-3">
                      Please mail us your requirements directly:
                    </p>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm font-medium">Email: connect@vegnar.com</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Add products to cart, fill the form, and download PDF to send us your requirements.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Download PDF'}
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Free Samples CTA Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Need to Test Quality First?</h2>
            <p className="text-xl mb-6 text-green-100">
              Request samples of our premium sugarcane bagasse products before placing bulk orders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/request-samples"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
              >
                Request Samples
              </a>
              <span className="text-green-200 text-sm">
                ✓ Free shipping worldwide • ✓ 3-5 business days delivery • ✓ ₹3000 + GST per sample kit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PackingListPage() {
  return (
    <Suspense>
      <PackingListPageInner />
    </Suspense>
  );
}