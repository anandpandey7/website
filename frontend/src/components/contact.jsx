import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../config/apiConfig";

const ContactSection = ({ settings }) => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", domain: "",
    message: "", country: "", state: "", city: "",
    contactNo1: "", contactNo2: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation Logic based on inquirySchema
  const validateField = (name, value) => {
    let error = "";
    const trimmedValue = value?.trim();

    if (!trimmedValue) {
      error = "Required";
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(trimmedValue)) {
        error = "Invalid email address";
      }
      if (name === "contactNo1") {
      if (!/^\d+$/.test(trimmedValue)) {
        error = "Only digits allowed";
      } else if (trimmedValue.length < 10) {
        error = "Min 10 digits";
      }
    }

    if (name === "contactNo2") {
      if (!/^\d+$/.test(trimmedValue)) {
        error = "Only digits allowed";
      } else if (trimmedValue.length < 8) {
        error = "Min 8 digits";
      }
    }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error locally when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Validation check
  const newErrors = {};
  Object.keys(formData).forEach((key) => {
    const err = validateField(key, formData[key]);
    if (err) newErrors[key] = err;
  });

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    const firstErrorField = Object.keys(newErrors)[0];
    toast.error(`Please fix the ${firstErrorField} field`);
    return;
  }

  setLoading(true);
  try {
    // 2. Fetch Call
    const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: "POST", // Specify POST
      headers: {
        "Content-Type": "application/json", // Tell server we are sending JSON
      },
      body: JSON.stringify(formData), // Send the actual data
    });

    // Parsing the JSON response
    const data = await response.json();

    if (!response.ok || !data.success) {
      if (Array.isArray(data.errors)) {
        data.errors.forEach(e => toast.error(e.msg || e));
      } else if (typeof data.errors === "object") {
        Object.values(data.errors).forEach(msg => toast.error(msg));
      } else {
        toast.error(data.message || "Something went wrong");
      }
      return;
    }

    toast.success("Inquiry sent successfully! We'll contact you soon.");
    
    // Reset form
    setFormData({
      firstName: "", lastName: "", email: "", domain: "",
      message: "", country: "", state: "", city: "",
      contactNo1: "", contactNo2: "",
    });
  } catch (err) {
    console.error("Submission Error:", err);
    toast.error("Failed to send message. Please check your connection.");
  } finally {
    setLoading(false);
  }
};

  // Input styling with caret-black and theme awareness
  const inputClass = (name) => `
    w-full border rounded-lg px-4 py-3 outline-none transition-all focus:ring-2 caret-black
    ${errors[name] ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[var(--accent)]"}
  `;

  return (
    <div className="bg-gray-50 py-16" id="contact" style={{ 
        "--accent": settings?.colours?.accent || "#1ea914",
        "--primary": settings?.colours?.primary || "#022f88" 
    }}>
      {/* ToastContainer is required to actually see the popups */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold" style={{ color: "var(--primary)" }}>Contact Us</h2>
          <p className="mt-4 text-gray-600 text-lg">{settings?.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Info Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border-t-4" style={{ borderColor: "var(--accent)" }}>
            <h3 className="text-2xl font-semibold mb-6" style={{ color: "var(--primary)" }}>Get In Touch</h3>
            <div className="space-y-6">
              <ContactInfoItem Icon={Phone} title="Phone" value={`+91 ${settings?.phoneNo}`} />
              <ContactInfoItem Icon={Mail} title="Email" value={settings?.email} />
              <ContactInfoItem Icon={MapPin} title="Location" value={settings?.location} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 border-t-4" style={{ borderColor: "var(--accent)" }} noValidate>
            <h3 className="text-2xl font-semibold mb-6" style={{ color: "var(--primary)" }}>Message Engineering</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} classes={inputClass} />
              <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} classes={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} classes={inputClass} />
              <FormInput label="Domain/Requirement" name="domain" value={formData.domain} onChange={handleChange} error={errors.domain} classes={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <FormInput label="Country" name="country" value={formData.country} onChange={handleChange} error={errors.country} classes={inputClass} />
              <FormInput label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} classes={inputClass} />
              <FormInput label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} classes={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput label="Primary Contact" name="contactNo1" value={formData.contactNo1} onChange={handleChange} error={errors.contactNo1} classes={inputClass} />
              <FormInput label="Secondary Contact" name="contactNo2" value={formData.contactNo2} onChange={handleChange} error={errors.contactNo2} classes={inputClass} />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Message</label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your requirement..."
                className={inputClass("message")}
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white py-4 rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg disabled:bg-gray-400"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {loading ? "Processing..." : <><Send className="w-5 h-5" /> Send Inquiry</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Sub-components ---

const ContactInfoItem = ({ Icon, title, value }) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 text-white rounded-lg" style={{ backgroundColor: "var(--primary)" }}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="text-lg font-semibold" style={{ color: "var(--primary)" }}>{title}</h4>
      <p className="text-gray-600 font-medium">{value}</p>
    </div>
  </div>
);

const FormInput = ({ label, name, type = "text", value, onChange, error, classes }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className={classes(name)}
    />
    {error && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{error}</p>}
  </div>
);

export default ContactSection;