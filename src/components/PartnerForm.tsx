'use client';

import { FaCheck, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useState } from 'react';

// Add countries array at the top of the file
const countries = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GR', name: 'Greece' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'North Korea' },
  { code: 'KR', name: 'South Korea' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome and Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VA', name: 'Vatican City' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
];

export default function PartnerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Get selected product interests
    const interests = formData.getAll('interest');
    
    // Create the payload
    const formPayload = new FormData();
    formPayload.append('Full Name', formData.get('fullname') as string);
    formPayload.append('Company', formData.get('company') as string);
    formPayload.append('Email', formData.get('email') as string);
    formPayload.append('Country', formData.get('country') as string);
    formPayload.append('Product Interests', interests.join(', '));
    formPayload.append('Message', formData.get('message') as string);
    
    // Add form configuration
    formPayload.append('_subject', 'New Partnership Inquiry - Vegnar Green');
    formPayload.append('_template', 'table');
    formPayload.append('_captcha', 'false');
    formPayload.append('_replyto', formData.get('email') as string);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/vegnargreens@gmail.com",
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
          },
          body: formPayload,
        }
      );

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#e6f7f0] min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="bg-[#0a6a52] text-white p-10 md:w-1/2 flex flex-col justify-center space-y-6 text-sm">
          <h1 className="text-3xl font-extrabold">Become a Partner</h1>
          <p className="leading-relaxed max-w-md">
            Join our mission to reduce plastic waste and offer sustainable
            alternatives to your customers. Fill out the form and our
            partnership team will contact you within 24 hours.
          </p>
          <div>
            <h2 className="font-bold text-lg mb-4">What to expect:</h2>
            <ul className="space-y-3 max-w-md">
              {[
                'Dedicated account manager',
                'Product samples and catalogs',
                'Competitive wholesale pricing',
                'Marketing support materials'
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3bbf9b]">
                    <FaCheck className="text-white text-xs" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 max-w-md space-y-2">
            <p className="font-bold">Have questions?</p>
            <p className="flex items-center space-x-2">
              <FaEnvelope />
              <span>vegnargreens@gmail.com</span>
            </p>
            <p className="flex items-center space-x-2">
              <FaPhone />
              <span>+91 9998040373</span>
            </p>
          </div>
        </div>
        <form
          className="p-10 md:w-1/2 space-y-6 text-sm"
          onSubmit={handleSubmit}
          aria-label="Partnership inquiry form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="fullname" className="font-medium text-[#1a254f]">
                Full Name*
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a6a52] focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="company" className="font-medium text-[#1a254f]">
                Company Name*
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a6a52] focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-[#1a254f]">
                Email Address*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a6a52] focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="font-medium text-[#1a254f]">
                Country*
              </label>
              <select
                id="country"
                name="country"
                required
                defaultValue=""
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a6a52] focus:border-transparent"
              >
                <option value="" disabled>Select your country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <fieldset className="space-y-3">
            <legend className="font-medium text-[#1a254f]">
              Product Interest (Select all that apply)
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[#1a254f]">
              {[
                { value: 'bagasse', label: 'Bagasse Tableware' },
                { value: 'bio-carry-bags', label: 'Bio Carry Bags' },
                { value: 'compostable-cutlery', label: 'Compostable Cutlery' },
                { value: 'custom-solutions', label: 'Custom Solutions' }
              ].map((item) => (
                <label key={item.value} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="interest"
                    value={item.value}
                    className="rounded border-gray-300 text-[#0a6a52] focus:ring-[#0a6a52]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col">
            <label htmlFor="message" className="font-medium text-[#1a254f]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your business and partnership interests..."
              className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a52] focus:border-transparent resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#0a6a52] text-white font-semibold py-3 rounded-lg transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0a6a52cc]'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
          </button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="text-green-600 text-center font-medium">
              Thank you for your inquiry! We'll get back to you within 24 hours.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="text-red-600 text-center font-medium">
              There was an error submitting your form. Please try again or contact us directly.
            </div>
          )}
        </form>
      </div>
    </section>
  );
} 