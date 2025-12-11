import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <div className="bg-gray-50 py-16" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900">Contact Us</h2>
          <p className="mt-4 text-gray-600 text-lg">
            Have questions or need automation solutions? We’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Contact Info */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-green-500">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900 text-white rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">Phone</h4>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900 text-white rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">Email</h4>
                  <p className="text-gray-600">info@dhartiautomation.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-900 text-white rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">Location</h4>
                  <p className="text-gray-600">
                    Dharti Automation, Patna, Bihar, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-green-500">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">
              Send Us a Message
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Type your message here"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;
