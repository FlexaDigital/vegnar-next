import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faBriefcase, 
  faGraduationCap, 
  faHandshake, 
  faGlobe, 
  faChartLine,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import BecomePartnerSection from '@/components/BecomePartnerSection';

export const metadata: Metadata = {
  title: "Careers at Vegnar Green | Join Our Sustainable Mission",
  description: "Join the Vegnar Green team and be part of our mission to create sustainable alternatives to plastic. Explore career opportunities in our eco-friendly company.",
  keywords: [
    "Vegnar careers",
    "sustainable jobs",
    "eco-friendly employment",
    "green industry jobs",
    "bagasse product careers",
    "environmental jobs",
    "sustainability careers"
  ],
};

const jobOpenings = [
  {
    id: 1,
    title: "Export Executive",
    location: "Rajkot, Gujarat",
    type: "Full-time",
    department: "Export",
    description: "Handle international export operations and develop relationships with global distributors for our sustainable products.",
    responsibilities: [
      "Manage export documentation and compliance requirements",
      "Coordinate with logistics partners for international shipments",
      "Process export orders and ensure timely delivery",
      "Maintain relationships with international clients and distributors"
    ],
    requirements: [
      "Bachelor's degree in Business, Commerce, or related field",
      "2+ years of experience in export operations",
      "Knowledge of international trade documentation and regulations",
      "Strong communication and organizational skills"
    ]
  },
  {
    id: 2,
    title: "Field Sales Executive",
    location: "Rajkot, India",
    type: "Full-time",
    department: "Sales",
    description: "Develop and maintain relationships with local businesses to promote our sustainable bagasse products.",
    responsibilities: [
      "Identify and pursue new business opportunities in assigned territories",
      "Conduct product demonstrations and presentations to potential clients",
      "Meet or exceed monthly sales targets",
      "Provide feedback on market trends and customer requirements"
    ],
    requirements: [
      "Bachelor's degree in any discipline",
      "1+ years of experience in field sales",
      "Excellent communication and negotiation skills",
      "Self-motivated with ability to work independently"
    ]
  },
  {
    id: 3,
    title: "International Sales Representative - UK",
    location: "UK",
    type: "Full-time",
    department: "Sales",
    description: "Expand our presence in the UK market by developing relationships with distributors and clients.",
    responsibilities: [
      "Identify and pursue new business opportunities in the UK market",
      "Build and maintain relationships with UK-based clients",
      "Represent Vegnar at trade shows and industry events",
      "Develop market-specific strategies for the UK region"
    ],
    requirements: [
      "Bachelor's degree in Business, Marketing, or related field",
      "3+ years of experience in sales within the UK market",
      "Knowledge of sustainable products industry preferred",
      "Strong network within food service or retail industries"
    ]
  },
  {
    id: 4,
    title: "International Sales Representative - USA",
    location: "USA",
    type: "Full-time",
    department: "Sales",
    description: "Develop and grow our presence in the US market by establishing relationships with distributors and clients.",
    responsibilities: [
      "Identify and pursue new business opportunities in the US market",
      "Build and maintain relationships with US-based clients",
      "Represent Vegnar at trade shows and industry events",
      "Develop market-specific strategies for the US region"
    ],
    requirements: [
      "Bachelor's degree in Business, Marketing, or related field",
      "3+ years of experience in sales within the US market",
      "Knowledge of FDA regulations for food packaging",
      "Strong network within food service or retail industries"
    ]
  },
  {
    id: 5,
    title: "Graphic Designer",
    location: "Remote",
    type: "Full-time",
    department: "Marketing",
    description: "Create visually compelling designs for our sustainable product packaging, marketing materials, and digital assets.",
    responsibilities: [
      "Design product packaging that highlights our sustainability mission",
      "Create marketing materials including brochures, banners, and social media graphics",
      "Maintain brand consistency across all visual communications",
      "Collaborate with marketing team to develop campaign visuals"
    ],
    requirements: [
      "Bachelor's degree in Graphic Design, Visual Arts, or related field",
      "2+ years of experience in graphic design",
      "Proficiency with Adobe Creative Suite (Illustrator, Photoshop, InDesign)",
      "Strong portfolio demonstrating packaging design experience"
    ]
  },
  {
    id: 6,
    title: "Content Creator",
    location: "Remote",
    type: "Full-time",
    department: "Marketing",
    description: "Develop engaging content that communicates our sustainability mission and promotes our eco-friendly products.",
    responsibilities: [
      "Create compelling written content for website, blog, and social media",
      "Develop video scripts and storyboards for product demonstrations",
      "Write copy for marketing materials and email campaigns",
      "Research and create educational content about sustainability"
    ],
    requirements: [
      "Bachelor's degree in Communications, Journalism, or related field",
      "2+ years of experience in content creation",
      "Excellent writing and editing skills",
      "Knowledge of SEO best practices and content marketing strategies"
    ]
  },
  {
    id: 7,
    title: "Domestic Sales Manager",
    location: "Rajkot, Gujarat",
    type: "Full-time",
    department: "Sales",
    description: "Lead our domestic sales team to achieve revenue targets and expand our presence in the Indian market.",
    responsibilities: [
      "Develop and implement domestic sales strategies",
      "Manage and mentor a team of field sales executives",
      "Establish relationships with key accounts and distributors",
      "Analyze market trends and competitor activities"
    ],
    requirements: [
      "Bachelor's degree in Business, Marketing, or related field",
      "5+ years of experience in sales with at least 2 years in a managerial role",
      "Proven track record of achieving sales targets",
      "Strong leadership and team management skills"
    ]
  }
];

const benefits = [
  {
    icon: faLeaf,
    title: "Mission-Driven Work",
    description: "Be part of a company making a real environmental impact"
  },
  {
    icon: faGraduationCap,
    title: "Learning & Development",
    description: "Continuous training and professional growth opportunities"
  },
  {
    icon: faHandshake,
    title: "Collaborative Culture",
    description: "Work in a supportive team environment that values your input"
  },
  {
    icon: faGlobe,
    title: "Environmental Impact",
    description: "Directly contribute to reducing plastic waste globally"
  },
  {
    icon: faChartLine,
    title: "Growth Opportunities",
    description: "Join a rapidly expanding company in the sustainable products sector"
  }
];

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-[#f3faf5]">
  
      <section className="bg-gradient-to-br from-green-50 to-green-100 pt-24 pb-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            CAREERS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Join Our Mission for a Greener Future
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10">
            At Vegnar Green, we're not just creating products – we're building a sustainable future. Join our team and be part of the solution to plastic pollution.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white transform -skew-y-1"></div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-12 relative -mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Join Vegnar Green</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <FontAwesomeIcon icon={benefit.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0b3d13] mb-4">Current Openings</h2>
            <p className="text-xl text-[#0b3d13]/70 max-w-3xl mx-auto">
              Explore our available positions and find your place in our mission
            </p>
          </div>

          <div className="space-y-8">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-[#0b3d13]">{job.title}</h3>
                      <div className="flex items-center mt-2 text-gray-600">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-green-600" />
                        <span>{job.location}</span>
                        <span className="mx-2">•</span>
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-green-600" />
                        <span>{job.type}</span>
                        <span className="mx-2">•</span>
                        <span>{job.department}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/contact?job=${job.title}`}
                      className="mt-4 md:mt-0 inline-flex items-center justify-center bg-gradient-to-r from-[#1a7a2b] to-[#2d8f3f] text-white font-semibold rounded-lg px-6 py-2 hover:from-[#0f5a1f] hover:to-[#1a7a2b] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Apply Now
                    </Link>
                  </div>
                  <p className="text-[#0b3d13]/70 mb-6">{job.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#0b3d13] mb-2">Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-[#0b3d13]/70">
                        {job.responsibilities.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0b3d13] mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-[#0b3d13]/70">
                        {job.requirements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Openings Match? */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#0b3d13] mb-6">Don't See a Position That Matches Your Skills?</h2>
          <p className="text-lg text-[#0b3d13]/80 mb-8 max-w-3xl mx-auto">
            We're always interested in connecting with talented individuals who are passionate about sustainability. Send us your resume and tell us how you can contribute to our mission.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a7a2b] to-[#2d8f3f] text-white font-semibold rounded-lg px-8 py-4 hover:from-[#0f5a1f] hover:to-[#1a7a2b] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Submit Your Resume
          </Link>
        </div>
      </section>

      <BecomePartnerSection />
    </div>
  );
}