import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Users, Heart, TrendingUp, Award, Globe, Target, Lightbulb, Shield, Leaf } from 'lucide-react';

export default function Career() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    navigate('/jobs'); // Navigate to the "/jobs" route
  };
  const cultureValues = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "People at the Forefront",
      description: "Our employees are our greatest assets. We foster a people-centric culture built on trust, care, collaboration, and mutual respect."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Celebrating Diversity",
      description: "We value each individual's uniqueness. Our inclusive environment fuels collective excellence and drives innovation."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Passion for the Future",
      description: "Committed to excellence and cutting-edge technology, we create solutions that shape tomorrow."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Customer-Centric Excellence",
      description: "We co-create value with our clients by aligning with their vision and exceeding expectations through reliable, future-ready solutions."
    }
  ];

  const stats = [
    { number: "15,000+", label: "Employees" },
    { number: "18", label: "Manufacturing Facilities" },
    { number: "8", label: "R&D Centres" },
    { number: "2005", label: "Founded" }
  ];

  const benefits = [
    { icon: <Target className="w-6 h-6" />, title: "Career Growth", desc: "Continuous learning and development opportunities" },
    { icon: <Lightbulb className="w-6 h-6" />, title: "Innovation Culture", desc: "Encouraged to think creatively and push boundaries" },
    { icon: <Shield className="w-6 h-6" />, title: "Job Security", desc: "Stable environment with a leading automation provider" },
    { icon: <Globe className="w-6 h-6" />, title: "Global Exposure", desc: "Work with international brands and technologies" },
    { icon: <Users className="w-6 h-6" />, title: "Collaborative Teams", desc: "Work with passionate, skilled professionals" },
    { icon: <Leaf className="w-6 h-6" />, title: "Sustainability", desc: "Contribute to eco-friendly automation practices" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">


      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Life at Dharti Automation</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Where careers grow, ideas flourish, and success is shared
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-transform hover:shadow-lg "
            onClick={handleClick}
            >
              Explore Career Opportunities
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">A Brand That Helps Brands Grow</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dharti Automation stands as India's leading provider of automation solutions, steadily growing over the years. 
            We're not just a workplace, but a place where careers flourish and innovation thrives.
          </p>
        </div>
      </div>

      {/* Culture Values */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Culture & Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Join Dharti Automation?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 transition-colors">
              <div className="flex-shrink-0 text-blue-600">{benefit.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Core Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-4">01</div>
              <h3 className="text-xl font-bold mb-3">Building Trust</h3>
              <p className="text-gray-300">Transparent communication and lasting relationships, cultivating deep trust through reliability, integrity, and shared success.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-4">02</div>
              <h3 className="text-xl font-bold mb-3">Passion for Excellence</h3>
              <p className="text-gray-300">Driven by relentless pursuit of innovation, improvement, and operational excellence — pushing boundaries to stay ahead.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-4">03</div>
              <h3 className="text-xl font-bold mb-3">Integrity at the Core</h3>
              <p className="text-gray-300">We hold ourselves accountable to the highest ethical standards in every action and decision we make.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for a Career That Challenges and Rewards?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join us and experience why Dharti Automation is not just a workplace, but a place where careers grow, ideas flourish, and success is shared.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            onClick={handleClick}>
              View Open Positions
            </button>
          </div>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 font-medium">Let's build together!</p>
          <p className="text-gray-500 text-sm mt-2">
            We work closely with leading global and domestic brands to deliver reliable, cost-effective, and scalable automation solutions.
          </p>
        </div>
      </div>
    </div>
  );
}