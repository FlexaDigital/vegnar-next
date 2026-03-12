import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return & Cancellation Policy | Vegnar Green',
  description: 'Learn about our return and cancellation policy for retail and bulk orders. Terms, conditions, and process for returns.',
  alternates: {
    canonical: "https://www.vegnar.com/return-cancellation",
  },
  robots: "index, follow",
  authors: [{ name: "Vegnar Greens" }],
  publisher: "Vegnar Greens",
};

export default function ReturnCancellation() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Return & Cancellation Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              At Vegnar Green, we strive to ensure customer satisfaction. This policy outlines the terms and conditions for returns and cancellations.
            </p>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Order Cancellation</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Retail Orders</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Orders can be cancelled within 24 hours of placement</li>
              <li>Once the order is dispatched, cancellation is not possible</li>
              <li>Full refund will be processed for cancelled orders</li>
              <li>COD orders can be cancelled until the time of delivery</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Bulk Orders</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Cancellation allowed within 48 hours of order confirmation</li>
              <li>Once production begins, cancellation charges may apply</li>
              <li>Customized orders cannot be cancelled once production starts</li>
              <li>Advance payment refund subject to cancellation charges</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Returns</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Return Eligibility</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Products damaged during transit</li>
              <li>Wrong items delivered</li>
              <li>Manufacturing defects</li>
              <li>Significant quality issues</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Return Conditions</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Return request must be raised within 7 days of delivery</li>
              <li>Products must be unused and in original packaging</li>
              <li>Return shipping arranged by Vegnar Green for eligible returns</li>
              <li>Photo/video evidence required for damage claims</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Non-Returnable Items</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Used or contaminated products</li>
              <li>Products damaged by customer misuse</li>
              <li>Customized or personalized orders</li>
              <li>Products returned after 7 days of delivery</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Return Process</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Contact our customer service team</li>
              <li>Provide order details and reason for return</li>
              <li>Submit photos/videos if applicable</li>
              <li>Receive return authorization and instructions</li>
              <li>Pack items securely in original packaging</li>
              <li>Hand over to our pickup agent or courier</li>
              <li>Refund processed after quality inspection</li>
            </ol>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Refunds processed within 7-10 business days</li>
              <li>Amount credited to original payment method</li>
              <li>Shipping charges non-refundable (except for our errors)</li>
              <li>Bank processing may take additional 2-3 days</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Exchange Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Exchanges available for damaged or defective products</li>
              <li>Same product replacement subject to availability</li>
              <li>Alternative product exchange with price adjustment</li>
              <li>Exchange shipping costs borne by Vegnar Green</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Bulk Order Returns</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Quality inspection required before acceptance</li>
              <li>Returns accepted only for manufacturing defects</li>
              <li>Minimum 5% defect rate required for bulk returns</li>
              <li>Return shipping costs negotiated case by case</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700">For returns and cancellations, please contact us at:</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">📧 returns@vegnar.com</p>
              <p className="text-gray-700">📞 +919033331031</p>
              <p className="text-gray-700">🕒 Monday to Saturday: 9:00 AM - 6:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}