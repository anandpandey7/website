import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Shield } from 'lucide-react';
import { API_BASE_URL } from '../config/apiConfig';

const CertificationSection = () => {
  const [certificationData, setCertificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    scrollTo(0, 0);
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL + '/api/certifications');
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        setCertificationData(result.data[0]);
      } else {
        setError('No certification data available');
      }
    } catch (err) {
      setError('Error fetching certifications: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading certifications...</p>
        </div>
      </div>
    );
  }

  if (error || !certificationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4 flex items-center justify-center">
        <p className="text-white text-lg">{error || 'No data available'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Certifications & 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Affiliations</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Trusted & Verified</span>
          </div>
        </div>

        {/* Description Card */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <p className="text-xl text-white/90 leading-relaxed text-center">
              {certificationData.description.split("\r\n").map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
                ))}
            </p>
          </div>
        </div>

        {/* Affiliated Logos Section */}
        {certificationData.logos && certificationData.logos.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Proud Partners
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            <div className=" gap-6 flex items-center justify-center flex-wrap">
              {certificationData.logos.map((logo, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex items-center justify-center"
                >
                  <img
                    src={API_BASE_URL + logo}
                    alt={`Partner ${index + 1}`}
                    className="h-16 w-auto object-contain filter grayscale-75 hover:scale-110 group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificate Images Section */}
        {certificationData.certificates && certificationData.certificates.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Our Certificates
                </h3>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
            </div>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {certificationData.certificates.map((certificate, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img
                    src={API_BASE_URL + certificate}
                    alt={`Certificate ${index + 1}`}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <p className="font-semibold">Certificate {index + 1}</p>
                    <p className="text-sm text-white/80">Click to view full size</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Badge */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-8 py-4 border border-white/20">
            <Shield className="w-6 h-6 text-green-400" />
            <span className="text-white font-semibold">Verified & Authenticated</span>
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-15"
          onClick={() => setSelectedCertificate(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-blue-400 text-4xl font-light transition-colors"
              onClick={() => setSelectedCertificate(null)}
            >
              ×
            </button>
            <img
              src={`http://localhost:5000${selectedCertificate}`}
              alt="Certificate"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationSection;