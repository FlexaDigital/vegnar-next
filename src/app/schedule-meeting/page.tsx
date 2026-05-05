'use client';
import React, { useState } from 'react';
import { Calendar, Clock, Globe, Building2, User, Mail, Phone, MessageSquare, Video, Users, CheckCircle, Briefcase, TrendingUp } from 'lucide-react';

const timezones = [
  'Asia/Kolkata (IST)', 'America/New_York (EST)', 'America/Los_Angeles (PST)',
  'Europe/London (GMT)', 'Europe/Berlin (CET)', 'Asia/Dubai (GST)',
  'Asia/Singapore (SGT)', 'Asia/Tokyo (JST)', 'Australia/Sydney (AEST)',
  'America/Chicago (CST)', 'Pacific/Auckland (NZST)',
];

const meetingPurposes = [
  'Product Demo & Presentation', 'Bulk Order Discussion', 'Export Partnership',
  'Custom Product Inquiry', 'Pricing & Quotation', 'Quality & Certification Review',
  'Distribution Partnership', 'Other',
];

const businessTypes = [
  'Importer / Exporter', 'Distributor', 'Retailer', 'Wholesaler',
  'Restaurant / Hotel Chain', 'Corporate Buyer', 'NGO / Government', 'Other',
];

const industries = [
  'Food & Beverage', 'Hospitality', 'Retail & E-commerce', 'Healthcare',
  'Events & Catering', 'Education', 'Government', 'Other',
];

const orderVolumes = [
  'Under 10,000 units/month', '10,000 - 50,000 units/month',
  '50,000 - 1,00,000 units/month', '1,00,000 - 5,00,000 units/month',
  '5,00,000+ units/month',
];

interface FormData {
  fullName: string; email: string; phone: string; country: string;
  company: string; designation: string; businessType: string; industry: string;
  orderVolume: string; preferredDate: string; preferredTime: string;
  timezone: string; meetingType: string; meetingPurpose: string; message: string;
}

const initialForm: FormData = {
  fullName: '', email: '', phone: '', country: '', company: '',
  designation: '', businessType: '', industry: '', orderVolume: '',
  preferredDate: '', preferredTime: '', timezone: 'Asia/Kolkata (IST)',
  meetingType: 'Video Call (Google Meet)', meetingPurpose: '', message: '',
};

export default function ScheduleMeetingPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submit', ...form }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm(initialForm);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4d3a]/30 focus:border-[#0f4d3a] bg-white transition";
  const selectClass = inputClass + " cursor-pointer";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0faf5] to-[#e8f5ee] flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden text-center">
          <div className="bg-gradient-to-r from-[#0f4d3a] to-[#1a7a5e] p-10">
            <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Request Submitted!</h2>
            <p className="text-green-200 mt-2 text-sm">Your meeting request has been received.</p>
          </div>
          <div className="p-8">
            <p className="text-gray-600 text-sm leading-relaxed">
              We have received your meeting request and sent the details to our team. <br /><br />
              <strong className="text-gray-800">Our team will review your request and confirm the meeting shortly.</strong><br /><br />
              Once confirmed, you will receive a confirmation email with all the meeting details.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 w-full bg-[#0f4d3a] hover:bg-[#0d3f2d] text-white font-bold rounded-xl py-3 text-sm transition"
            >
              Schedule Another Meeting
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0faf5] to-[#e8f5ee]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0f4d3a] to-[#1a7a5e] py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 text-green-200 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            <Calendar className="w-4 h-4" /> Schedule a Meeting
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Book a Business Meeting<br />with Vegnar Greens</h1>
          <p className="text-green-200 text-base max-w-xl mx-auto">Connect with our team to discuss bulk orders, export partnerships, custom products, and sustainable packaging solutions.</p>
        </div>
      </div>

      

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Personal Info */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#0f4d3a]/10 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-[#0f4d3a]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
                <p className="text-xs text-gray-500">Your contact details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="John Smith" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" className={inputClass + " pl-10"} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98765 43210" className={inputClass + " pl-10"} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Country <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input name="country" value={form.country} onChange={handleChange} required placeholder="India" className={inputClass + " pl-10"} />
                </div>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#0f4d3a]/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#0f4d3a]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Business Information</h2>
                <p className="text-xs text-gray-500">Tell us about your company</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Company Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input name="company" value={form.company} onChange={handleChange} required placeholder="Your Company Ltd." className={inputClass + " pl-10"} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Your Designation <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input name="designation" value={form.designation} onChange={handleChange} required placeholder="CEO / Purchase Manager" className={inputClass + " pl-10"} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Business Type <span className="text-red-500">*</span></label>
                <select name="businessType" value={form.businessType} onChange={handleChange} required className={selectClass}>
                  <option value="">Select business type</option>
                  {businessTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Industry <span className="text-red-500">*</span></label>
                <select name="industry" value={form.industry} onChange={handleChange} required className={selectClass}>
                  <option value="">Select industry</option>
                  {industries.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}><TrendingUp className="inline w-4 h-4 mr-1 text-[#0f4d3a]" />Expected Annual Order Volume</label>
                <select name="orderVolume" value={form.orderVolume} onChange={handleChange} className={selectClass}>
                  <option value="">Select order volume</option>
                  {orderVolumes.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Meeting Details */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#0f4d3a]/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#0f4d3a]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Meeting Details</h2>
                <p className="text-xs text-gray-500">Choose your preferred schedule</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}><Calendar className="inline w-4 h-4 mr-1 text-[#0f4d3a]" />Preferred Date <span className="text-red-500">*</span></label>
                <input name="preferredDate" type="date" min={today} value={form.preferredDate} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}><Clock className="inline w-4 h-4 mr-1 text-[#0f4d3a]" />Preferred Time <span className="text-red-500">*</span></label>
                <input name="preferredTime" type="time" value={form.preferredTime} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}><Globe className="inline w-4 h-4 mr-1 text-[#0f4d3a]" />Timezone <span className="text-red-500">*</span></label>
                <select name="timezone" value={form.timezone} onChange={handleChange} required className={selectClass}>
                  {timezones.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Meeting Type <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: 'Video Call (Google Meet)', icon: <Video className="w-4 h-4" /> },
                    { value: 'Video Call (Zoom)', icon: <Video className="w-4 h-4" /> },
                    { value: 'Phone Call', icon: <Phone className="w-4 h-4" /> },
                    { value: 'In-Person Visit', icon: <Users className="w-4 h-4" /> },
                  ].map(({ value, icon }) => (
                    <label key={value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${form.meetingType === value ? 'border-[#0f4d3a] bg-[#0f4d3a]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="meetingType" value={value} checked={form.meetingType === value} onChange={handleChange} className="accent-[#0f4d3a]" />
                      <span className="text-[#0f4d3a]">{icon}</span>
                      <span className="text-sm font-medium text-gray-700">{value}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Meeting Purpose <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {meetingPurposes.map(p => (
                    <label key={p} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition text-sm ${form.meetingPurpose === p ? 'border-[#0f4d3a] bg-[#0f4d3a]/5 text-[#0f4d3a] font-semibold' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      <input type="radio" name="meetingPurpose" value={p} checked={form.meetingPurpose === p} onChange={handleChange} className="accent-[#0f4d3a] shrink-0" required />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="p-6 md:p-8 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#0f4d3a]/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#0f4d3a]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Additional Notes</h2>
                <p className="text-xs text-gray-500">Any specific requirements or questions</p>
              </div>
            </div>
            <textarea
              name="message" value={form.message} onChange={handleChange} rows={4}
              placeholder="Tell us about your specific requirements, products of interest, or any questions you'd like to discuss..."
              className={inputClass + " resize-none"}
            />
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="mt-5 w-full bg-[#0f4d3a] hover:bg-[#0d3f2d] disabled:opacity-60 text-white font-bold rounded-xl py-4 text-base transition flex items-center justify-center gap-2 shadow-lg shadow-[#0f4d3a]/20"
            >
              {loading ? (
                <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting Request...</>
              ) : (
                <><Calendar className="w-5 h-5" /> Submit Meeting Request</>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">By submitting, you agree to be contacted by our team regarding your meeting request.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
