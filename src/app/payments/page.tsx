import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Policy | Vegnar Green',
  description: 'Learn about our secure payment methods, terms, and conditions for retail and bulk orders.',
};

export default function Payments() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              At Vegnar Green, we offer secure and convenient payment options for all our customers. This policy outlines our accepted payment methods and terms.
            </p>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Accepted Payment Methods</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">For Retail Orders</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Credit Cards (Visa, MasterCard, American Express)</li>
              <li>Debit Cards</li>
              <li>Net Banking</li>
              <li>UPI (PhonePe, Google Pay, Paytm)</li>
              <li>Digital Wallets</li>
              <li>Cash on Delivery (COD) - Available for domestic orders only</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">For Bulk & Export Orders</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Bank Wire Transfer (SWIFT)</li>
              <li>Letter of Credit (L/C)</li>
              <li>Telegraphic Transfer (T/T)</li>
              <li>Documentary Collection</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Payment Terms</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Retail Orders</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Full payment required at the time of order placement</li>
              <li>COD orders require payment upon delivery</li>
              <li>All prices are inclusive of applicable taxes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Bulk Orders</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>30% advance payment upon order confirmation</li>
              <li>70% balance payment before shipment</li>
              <li>Payment terms may vary based on order value and customer relationship</li>
              <li>Letter of Credit accepted for international orders above $10,000</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Currency</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Domestic orders: Indian Rupees (INR)</li>
              <li>International orders: US Dollars (USD) or as mutually agreed</li>
              <li>Exchange rates are fixed at the time of order confirmation</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Security</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>All online transactions are secured with SSL encryption</li>
              <li>We do not store credit card information on our servers</li>
              <li>Payment processing is handled by certified payment gateways</li>
              <li>Your financial information is protected and never shared with third parties</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Refunds</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Refunds will be processed to the original payment method</li>
              <li>Processing time: 5-7 business days for online payments</li>
              <li>Bank processing may take additional 2-3 business days</li>
              <li>Refund eligibility subject to our Return & Cancellation Policy</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700">For payment-related queries, please contact us at:</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">📧 payments@vegnar.com</p>
              <p className="text-gray-700">📞 +919033331031</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}