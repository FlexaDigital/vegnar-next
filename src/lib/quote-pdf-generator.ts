import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { PDFDocument } from 'pdf-lib';
import { numberToWords } from './pdf-utils';

// Register Handlebars helpers
Handlebars.registerHelper('add', (a: number, b: number) => a + b);
Handlebars.registerHelper('formatNumber', (num: number) => {
  if (!num || isNaN(num)) return '0';
  return num.toLocaleString('en-IN');
});
Handlebars.registerHelper('formatCurrency', (num: number) => {
  if (num === null || num === undefined || isNaN(num)) return '0.00';
  return parseFloat(num.toString()).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
});
Handlebars.registerHelper('formatNumberWeight', (num: number) => {
  if (num === null || num === undefined || isNaN(num)) return '0.0';
  return parseFloat(num.toString()).toFixed(1);
});
Handlebars.registerHelper('formatNumberVolume', (num: number) => {
  if (num === null || num === undefined || isNaN(num)) return '0.000';
  return parseFloat(num.toString()).toFixed(3);
});

interface QuoteItem {
  product: {
    name: string;
    hsnCode: string;
    item_code: string;
    product: string;
    pcs_per_pack: number;
    color: string;
    pcs_per_carton: number;
  };
  quantity: number;
  unit: string;
  rate: number;
  description?: string;
  lineTotal: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
}

interface QuoteData {
  quoteNo: string;
  quoteDate: string;
  expiryDate: string;
  reference?: string;
  termsOfDelivery?: string;
  paymentTerms: string;
  customer: {
    name: string;
    address: string;
    phone?: string;
    email?: string;
    gstNumber?: string;
  };
  items: QuoteItem[];
  isDomestic: boolean;
  subTotal: number;
  taxBreakdown: Array<{
    cgstRate: number;
    cgstAmount: number;
    sgstRate: number;
    sgstAmount: number;
  }>;
  discount?: number;
  shippingCharge?: number;
  grandTotal: number;
  totalInWords: string;
  currencySymbol: string;
  logoBase64?: string;
  termsAndConditions?: string;
}

// Function to convert numbers to USD words
function numberToWordsUSD(num: number): string {
  const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
  const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
  
  const helper = (n: number): string => {
    if (n === 0) return '';
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' HUNDRED' + (n % 100 ? ' ' + helper(n % 100) : '');
    if (n < 1000000) return helper(Math.floor(n / 1000)) + ' THOUSAND' + (n % 1000 ? ' ' + helper(n % 1000) : '');
    return helper(Math.floor(n / 1000000)) + ' MILLION' + (n % 1000000 ? ' ' + helper(n % 1000000) : '');
  };

  const whole = Math.floor(num);
  if (whole === 0) return 'ZERO DOLLARS ONLY';
  
  const words = helper(whole).trim();
  return `${words} DOLLARS ONLY`;
}

async function launchBrowser() {
  const isLinux = process.platform === 'linux';

  if (isLinux) {
    // Production (Linux server / Vercel)
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteer = (await import('puppeteer-core')).default;
    const executablePath = await chromium.executablePath();
    return puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });
  } else {
    // Local development (Windows / Mac)
    const puppeteer = (await import('puppeteer')).default;
    return puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
}

export class QuotePDFGenerator {
  private templatePath: string;
  private template?: HandlebarsTemplateDelegate;
  private proformaTemplatePath: string;
  private proformaTemplate?: HandlebarsTemplateDelegate;

  constructor() {
    this.templatePath = path.join(process.cwd(), 'src', 'templates', 'quote-template.html');
    this.proformaTemplatePath = path.join(process.cwd(), 'src', 'templates', 'proforma-invoice-template.html');
  }

  private async ensureTemplatesLoaded() {
    if (this.template && this.proformaTemplate) return;

    try {
      if (!this.template) {
        const templateContent = await fs.promises.readFile(this.templatePath, 'utf-8');
        this.template = Handlebars.compile(templateContent);
      }

      if (!this.proformaTemplate) {
        try {
          const proformaContent = await fs.promises.readFile(this.proformaTemplatePath, 'utf-8');
          this.proformaTemplate = Handlebars.compile(proformaContent);
        } catch (e: any) {
          if (e.code !== 'ENOENT') {
            console.error('Error loading proforma template:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      throw new Error('Failed to load templates');
    }
  }

  private formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  private formatAddress(formData: FormData, isDomestic: boolean): string {
    const rawAddress = (formData.get('billingAddress') as string || formData.get('address') as string || 'N/A').toUpperCase();
    const city = (formData.get('city') as string || '').toUpperCase();
    const state = (formData.get('state') as string || '').toUpperCase();
    const pincode = (formData.get('pincode') as string || '').toUpperCase();

    let country = '';
    if (isDomestic) {
      country = 'INDIA';
    } else {
      const countryCode = formData.get('country') as string;
      const countryMap: Record<string, string> = {
        'US': 'UNITED STATES', 'GB': 'UNITED KINGDOM', 'CA': 'CANADA', 'AU': 'AUSTRALIA',
        'DE': 'GERMANY', 'FR': 'FRANCE', 'IT': 'ITALY', 'ES': 'SPAIN', 'NL': 'NETHERLANDS',
        'BE': 'BELGIUM', 'CH': 'SWITZERLAND', 'AT': 'AUSTRIA', 'SE': 'SWEDEN', 'NO': 'NORWAY',
        'DK': 'DENMARK', 'FI': 'FINLAND', 'PL': 'POLAND', 'CZ': 'CZECH REPUBLIC', 'HU': 'HUNGARY',
        'RO': 'ROMANIA', 'BG': 'BULGARIA', 'HR': 'CROATIA', 'SI': 'SLOVENIA', 'SK': 'SLOVAKIA',
        'LT': 'LITHUANIA', 'LV': 'LATVIA', 'EE': 'ESTONIA', 'IE': 'IRELAND', 'PT': 'PORTUGAL',
        'GR': 'GREECE', 'CY': 'CYPRUS', 'MT': 'MALTA', 'LU': 'LUXEMBOURG'
      };
      country = countryMap[countryCode] || countryCode?.toUpperCase() || '';
    }

    let result = rawAddress;
    if (city || state || pincode) {
      const cityStateZip = [city, state, pincode].filter(Boolean).join(' ');
      result += `\n${cityStateZip}`.trim();
    }
    if (country) {
      result += `\n${country}`.trim();
    }
    return result;
  }

  private calculateTotals(items: any[], isDomestic: boolean) {
    let subTotal = 0;
    let totalTax = 0;
    const taxBreakdown: { [key: string]: { cgstRate: number; cgstAmount: number; sgstRate: number; sgstAmount: number } } = {};

    const processedItems = items.map(item => {
      let rate = 0;
      let quantity = 0;

      if (isDomestic) {
        const pricePerPiece = this.getPricePerPiece(item.product, item.quantity, item.unit);
        quantity = item.unit === 'cartons' ? item.quantity * item.product.pcs_per_carton : item.quantity;
        rate = pricePerPiece;
      } else {
        const fobPricePerPiece = item.product.fob_price_usd || 0;
        quantity = item.unit === 'cartons' ? item.quantity * item.product.pcs_per_carton : item.quantity;
        rate = fobPricePerPiece;
      }

      const lineTotal = quantity * rate;
      const taxRate = isDomestic ? 5 : 0;
      const cgstRate = taxRate / 2;
      const sgstRate = taxRate / 2;
      const cgstAmount = isDomestic ? lineTotal * (cgstRate / 100) : 0;
      const sgstAmount = isDomestic ? lineTotal * (sgstRate / 100) : 0;

      subTotal += lineTotal;
      totalTax += cgstAmount + sgstAmount;

      if (isDomestic && taxRate > 0) {
        const key = `${taxRate}%`;
        if (!taxBreakdown[key]) {
          taxBreakdown[key] = { cgstRate, cgstAmount: 0, sgstRate, sgstAmount: 0 };
        }
        taxBreakdown[key].cgstAmount += cgstAmount;
        taxBreakdown[key].sgstAmount += sgstAmount;
      }

      return {
        ...item,
        rate: rate.toFixed(4),
        quantity: quantity,
        lineTotal,
        cgstRate,
        cgstAmount,
        sgstRate,
        sgstAmount,
        product: {
          ...item.product,
          name: item.product.product.toUpperCase(),
          hsnCode: item.product.hsn_code || '48237010'
        },
        unit: isDomestic ? 'Pcs' : 'PCS',
        description: isDomestic 
          ? `Set of ${item.product.pcs_per_pack} | ${item.product.color} | ${item.product.pcs_per_carton} Pack`
          : item.product.detailed_description || `Set of ${item.product.pcs_per_pack} | ${item.product.color}`
      };
    });

    return {
      processedItems,
      subTotal,
      totalTax,
      taxBreakdown: Object.values(taxBreakdown),
      grandTotal: subTotal + totalTax
    };
  }

  private getPricePerPiece(product: any, quantity: number, unit: string): number {
    const cartons = unit === 'cartons' ? quantity : Math.ceil(quantity / product.pcs_per_carton);

    let priceStr = product.price_1_to_10_box;
    if (cartons > 30) {
      priceStr = product.price_31_to_100_box;
    } else if (cartons > 10) {
      priceStr = product.price_11_to_30_box;
    }

    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
  }

  private generateTermsPage(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Terms & Conditions - Vegnar Global LLP</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Roboto', sans-serif; font-size: 10pt; color: #333; background: #fff; line-height: 1.5; }
            .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 12mm; background: #fff; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #1a7a2b; padding-bottom: 10px; }
            .page-title { font-size: 18pt; font-weight: 600; color: #333; }
            .term { margin-bottom: 18px; }
            .term-title { font-size: 12pt; font-weight: 700; color: #1a7a2b; margin-bottom: 6px; border-left: 4px solid #1a7a2b; padding-left: 8px; }
            .term-content { font-size: 10pt; color: #444; text-align: justify; line-height: 1.6; margin-left: 12px; }
            .footer { margin-top: 20px; text-align: center; font-size: 8pt; color: #666; border-top: 1px solid #ccc; padding-top: 8px; }
            @page { size: A4; margin: 0; }
            @media print { body { margin: 0; } .page { margin: 0; padding: 12mm; } }
        </style>
    </head>
    <body>
    <div class="page">
        <div class="header">
            <div class="page-title">Terms & Conditions</div>
        </div>
        <div class="term"><div class="term-title">1. Price Validity</div><div class="term-content">Prices quoted in this list are subject to change without prior notice. Unless otherwise stated in a formal proforma invoice, the prices applicable shall be those prevailing on the date of dispatch.</div></div>
        <div class="term"><div class="term-title">2. Taxes and Statutory Levies</div><div class="term-content">All prices are exclusive of Goods and Services Tax (GST) and any other applicable government duties or levies. These will be charged extra at the actual rates prevailing at the time of invoicing.</div></div>
        <div class="term"><div class="term-title">3. Terms of Delivery (Incoterms)</div><div class="term-content">All supplies are made on an Ex-Works (Rajkot) basis. The risk of loss or damage to the goods passes to the Buyer once the consignment is handed over to the carrier at our warehouse.</div></div>
        <div class="term"><div class="term-title">4. Minimum Order Value (MOV) & Surcharges</div><div class="term-content">Orders exceeding ₹1,00,000 qualify for standard handling.<br><br>Orders below ₹1,00,000 will incur a mandatory Local Handling & Transportation Surcharge of ₹1,500 to facilitate delivery to the transport booking point.</div></div>
        <div class="term"><div class="term-title">5. Lead Time and Dispatch</div><div class="term-content">The standard lead time for dispatch is 5 to 7 working days from the date of confirmed order and payment realization. Transit time is subject to the performance of the third-party logistics provider and is beyond the Seller's control.</div></div>
        <div class="term"><div class="term-title">6. Payment Terms</div><div class="term-content">Orders will be processed only upon receipt of 100% advance payment, unless alternative credit terms have been pre-approved in writing by the Management.</div></div>
        <div class="term"><div class="term-title">7. Order Finality and Negotiation</div><div class="term-content">Prices listed are fixed and non-negotiable to ensure transparency and fairness across our distribution network. No requests for further discounts or price adjustments will be entertained.</div></div>
        <div class="term"><div class="term-title">8. Shortages and Damages</div><div class="term-content">Any claims regarding quantity shortages or physical damage must be reported within 48 hours of receiving the goods, supported by unboxing videos or photographs and a copy of the acknowledged Lorry Receipt (LR) with a clear remark.</div></div>
        <div class="term"><div class="term-title">9. Jurisdiction</div><div class="term-content">All transactions and disputes arising thereof shall be subject to the exclusive jurisdiction of the courts in Rajkot, Gujarat only.</div></div>
        <div class="footer">This document is computer generated and forms an integral part of our quotation.<br>For queries contact: connect@vegnar.com | +91 9998040482</div>
    </div>
    </body>
    </html>
    `;
  }

  private async getLogoBase64(): Promise<string> {
    try {
      const logoPath = path.join(process.cwd(), 'public', 'assets', 'img', 'vegnar-green.png');
      const logoBuffer = await fs.promises.readFile(logoPath);
      return logoBuffer.toString('base64');
    } catch (error) {
      console.warn('Logo not found, continuing without logo');
      return '';
    }
  }

  private async getSignatureBase64(): Promise<string> {
    try {
      const sigPath = path.join(process.cwd(), 'public', 'assets', 'img', 'signature.png');
      const sigBuffer = await fs.promises.readFile(sigPath);
      return sigBuffer.toString('base64');
    } catch (error) {
      console.warn('Signature not found, continuing without signature');
      return '';
    }
  }

  public async generateQuotePDF(formData: FormData, cart: any[], orderType: 'domestic' | 'international', quoteNo: string): Promise<Buffer> {
    await this.ensureTemplatesLoaded();
    const isDomestic = orderType === 'domestic';
    const date = new Date();
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const { processedItems, subTotal, taxBreakdown, grandTotal } = this.calculateTotals(cart, isDomestic);

    const company = (formData.get('companyName') as string || 'Valued Customer').toUpperCase();
    const fullAddress = this.formatAddress(formData, isDomestic);

    const countryCode = formData.get('country') as string || '';
    const countryMap: Record<string, string> = {
      'US': 'UNITED STATES', 'GB': 'UNITED KINGDOM', 'CA': 'CANADA', 'AU': 'AUSTRALIA',
      'DE': 'GERMANY', 'FR': 'FRANCE', 'IT': 'ITALY', 'ES': 'SPAIN', 'NL': 'NETHERLANDS',
      'BE': 'BELGIUM', 'CH': 'SWITZERLAND', 'AT': 'AUSTRIA', 'SE': 'SWEDEN', 'NO': 'NORWAY',
      'DK': 'DENMARK', 'FI': 'FINLAND', 'PL': 'POLAND', 'CZ': 'CZECH REPUBLIC', 'HU': 'HUNGARY',
      'RO': 'ROMANIA', 'BG': 'BULGARIA', 'HR': 'CROATIA', 'SI': 'SLOVENIA', 'SK': 'SLOVAKIA',
      'LT': 'LITHUANIA', 'LV': 'LATVIA', 'EE': 'ESTONIA', 'IE': 'IRELAND', 'PT': 'PORTUGAL',
      'GR': 'GREECE', 'CY': 'CYPRUS', 'MT': 'MALTA', 'LU': 'LUXEMBOURG'
    };
    const countryName = isDomestic ? 'INDIA' : (countryMap[countryCode] || countryCode.toUpperCase());

    const logoBase64Data = await this.getLogoBase64();
    const signatureBase64Data = await this.getSignatureBase64();

    let html = '';

    if (isDomestic) {
      const quoteData: QuoteData = {
        quoteNo,
        quoteDate: this.formatDate(date),
        expiryDate: this.formatDate(expiryDate),
        reference: (formData.get('buyerRef') as string) || 'Online Inquiry',
        termsOfDelivery: formData.get('deliveryTerms') as string || 'Ex-works',
        paymentTerms: '100% advance',
        customer: {
          name: company,
          address: fullAddress,
          phone: formData.get('mobile') as string || undefined,
          email: formData.get('email') as string || undefined,
          gstNumber: formData.get('gstin') as string || undefined
        },
        items: processedItems,
        isDomestic,
        subTotal,
        taxBreakdown,
        grandTotal,
        totalInWords: numberToWords(Math.round(grandTotal)),
        currencySymbol: 'Rs. ',
        logoBase64: logoBase64Data
      };
      if (!this.template) throw new Error('Standard HTML template is not loaded');
      html = this.template(quoteData);
    } else {
      // Calculate weights and packing specs for Proforma Invoice
      let totalNetWeight = 0;
      let totalGrossWeight = 0;
      let totalCBM = 0;

      const piProducts = processedItems.map(item => {
        const totalPieces = item.unit === 'CARTON' 
          ? item.quantity * item.product.pcs_per_carton
          : item.quantity;
        
        const cartonsCount = Math.ceil(totalPieces / item.product.pcs_per_carton);
        const netW = (totalPieces / item.product.pcs_per_carton) * (item.product.net_weight_kg || 0);
        const grossW = netW + (cartonsCount * 0.7);

        const cbmPerCarton = (item.product.length_m || 0) * (item.product.width_m || 0) * (item.product.height_m || 0);
        const itemCBM = cartonsCount * cbmPerCarton;

        totalNetWeight += netW;
        totalGrossWeight += grossW;
        totalCBM += itemCBM;

        return {
          productName: item.product.name,
          productDescription: item.description || '',
          containerCount: 1,
          hsCode: item.product.hsnCode || '48237010',
          quantity: item.quantity,
          unit: item.unit,
          rate: parseFloat(item.rate),
          totalWeight: grossW, // Gross Weight of this item in kg
          netWeight: netW,     // Net Weight of this item in kg
          cbm: itemCBM,
          total: item.lineTotal
        };
      });

      const deliveryTerm = (formData.get('deliveryTerms') as string || 'FOB').toUpperCase();
      const portOfDischarge = (formData.get('portOfDischarge') as string || '-').toUpperCase();
      const finalDestination = (formData.get('finalDeliveryAddress') as string || formData.get('address') as string || '-').toUpperCase();

      const piInvoice = {
        isSampleKit: formData.get('isSampleKit') === 'true',
        company: {
          name: 'VEGNAR GLOBAL LLP',
          address: 'B-623, RK Iconic, 150 Feet Ring Road, Ayodhya Chowk',
          city: 'Rajkot',
          state: 'Gujarat',
          pincode: '360007',
          phoneNo: '+91 9998040373',
          email: 'connect@vegnar.com'
        },
        piNumber: quoteNo,
        invoiceDate: this.formatDate(date),
        deliveryTerm: deliveryTerm,
        paymentTerm: '100% ADVANCE PAYMENT',
        showToTheOrder: false,
        partyName: company,
        address: fullAddress,
        country: countryName,
        phone: formData.get('mobile') as string || '',
        email: formData.get('email') as string || '',
        preCarriageBy: 'BY ROAD',
        placeOfReceipt: 'RAJKOT',
        countryOfOrigin: 'INDIA',
        countryOfDestination: countryName,
        vesselFlightNo: '-',
        portOfLoading: 'MUNDRA PORT',
        portOfDischarge: portOfDischarge,
        finalDestination: finalDestination,
        buyerRef: (formData.get('buyerRef') as string) || '-',
        products: piProducts,
        currency: 'USD',
        subtotal: subTotal,
        freightCharges: 0,
        totalAmount: subTotal,
        totalWeight: totalNetWeight,
        totalGrossWeight: totalGrossWeight,
        totalCBM: totalCBM,
        selectedBank: {
          bankName: 'Axis Bank Limited',
          bankAddress: 'Ground floor Shop no 09-10 & First Floor, Shop no 109-110, The One World, R. S. No: - 516/2, Plot no 1, Nr Ayodhya Chowk, 150 Ft Ring road, Synergy Circle, Rajkot, Gujarat - 360007.',
          accountNumber: '925020013383048',
          ifscCode: 'UTIB0005420',
          swiftCode: 'AXISINBB087'
        },
        notes: formData.get('additionalRequirements') as string || ''
      };

      const quoteData = {
        piInvoice,
        amountInWords: numberToWordsUSD(subTotal),
        logoBase64: logoBase64Data,
        signatureBase64: signatureBase64Data
      };

      if (!this.proformaTemplate) throw new Error('Proforma HTML template is not loaded');
      html = this.proformaTemplate(quoteData);
    }

    const browser = await launchBrowser();

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' as any });

      const quotePdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
        displayHeaderFooter: false
      });

      if (isDomestic) {
        const termsHtml = this.generateTermsPage();
        const termsPage = await browser.newPage();
        await termsPage.setContent(termsHtml, { waitUntil: 'networkidle0' as any });

        const termsPdfBuffer = await termsPage.pdf({
          format: 'A4',
          printBackground: true,
          margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
          displayHeaderFooter: false
        });

        const mergedPdf = await PDFDocument.create();

        const quotePdf = await PDFDocument.load(quotePdfBuffer);
        const quotePages = await mergedPdf.copyPages(quotePdf, quotePdf.getPageIndices());
        quotePages.forEach((p) => mergedPdf.addPage(p));

        const termsPdf = await PDFDocument.load(termsPdfBuffer);
        const termsPages = await mergedPdf.copyPages(termsPdf, termsPdf.getPageIndices());
        termsPages.forEach((p) => mergedPdf.addPage(p));

        const mergedPdfBuffer = await mergedPdf.save();
        return Buffer.from(mergedPdfBuffer);
      } else {
        return Buffer.from(quotePdfBuffer);
      }
    } finally {
      await browser.close();
    }
  }

  public async downloadQuotePDF(formData: FormData, cart: any[], orderType: 'domestic' | 'international', quoteNo: string): Promise<void> {
    try {
      const pdfBuffer = await this.generateQuotePDF(formData, cart, orderType, quoteNo);

      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Vegnar_Quote_${quoteNo}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }
}

