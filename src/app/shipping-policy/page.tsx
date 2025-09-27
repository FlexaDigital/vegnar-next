import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Vegnar Green',
  description: 'Learn about our shipping policy for domestic, international, and bulk orders. Production timelines, delivery estimates, and shipping terms.',
};

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              At Vegnar Green, we are committed to delivering your orders safely and on time. This Shipping Policy outlines the estimated production and delivery timelines for domestic, international, and bulk shipments.
            </p>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Domestic Shipping (Within India)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Orders are typically processed within 1–2 business days.</li>
              <li>Standard delivery time is 5–7 business days after dispatch, depending on your location.</li>
              <li>Remote areas may take up to 10 business days.</li>
              <li>Customers will receive tracking details once the order is shipped.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">International Shipping (Retail Orders)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Orders are processed within 2–3 business days.</li>
              <li>Estimated delivery time is 10–15 business days, depending on the destination country and customs clearance.</li>
              <li>In some cases, delivery may take up to 20 business days due to international logistics or unforeseen delays.</li>
              <li>Customers will receive tracking details once the order is shipped.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Bulk Orders & Container Shipments</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>For bulk export orders and container shipments, production lead time is 15–20 days, depending on order size and customization requirements.</li>
              <li>We handle both FCL (Full Container Load) and LCL (Less than Container Load) shipments based on buyer requirements.</li>
            </ul>

            <p className="text-gray-700 mt-4">International bulk orders are shipped under globally accepted Incoterms such as:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>FOB (Free On Board)</strong> – Buyer arranges freight and insurance after loading at origin port.</li>
              <li><strong>CIF (Cost, Insurance & Freight)</strong> – We arrange freight and insurance to the destination port.</li>
              <li><strong>DDP (Delivered Duty Paid)</strong> – Door-to-door delivery including customs clearance and duties, wherever applicable.</li>
            </ul>

            <p className="text-gray-700 mt-4">Once production is completed, dispatch timelines will follow the agreed Incoterm and shipping method.</p>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Shipping Charges</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Shipping charges are calculated at checkout for retail orders.</li>
              <li>For bulk orders, charges depend on Incoterms, shipment mode (FCL/LCL), and destination.</li>
              <li>International orders may attract additional customs duties, taxes, or import fees levied by the destination country, which are the responsibility of the customer (unless covered under DDP).</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Order Tracking</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Once your order has been dispatched, a tracking link will be shared via email or SMS.</li>
              <li>Bulk shipments include shipping line details, container numbers, and Bill of Lading information for tracking.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700">For any shipping-related queries, please contact us at:</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">📧 info@vegnar.com</p>
              <p className="text-gray-700">📞 +919033331031</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}