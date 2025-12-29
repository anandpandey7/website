import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fix relative image URLs in CKEditor HTML
  const addBaseUrlToImages = (html) => {
    if (!html) return "";
    return html.replace(
      /<img\s+[^>]*src="([^"]+)"[^>]*>/gi,
      (match, src) => {
        if (src.startsWith("http")) return match;
        return match.replace(src, `${API_BASE_URL}${src}`);
      }
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services/${id}`);
        const data = await res.json();
        if (data.success) {
          setService(data.service);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
      >
        Loading...
      </div>
    );
  }

  if (!service) {
    return (
      <div
        className="text-center py-20"
        style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
      >
        Service not found
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: "var(--secondary)" }}
    >
      <div
        className="max-w-5xl mx-auto rounded-xl shadow-lg p-8"
        style={{ backgroundColor: "var(--surface)" }}
      >

        {/* 🔹 CKEditor WYSIWYG HTML */}
        <div
          className="prose max-w-none"
          style={{
            color: "var(--primary)",
          }}
          dangerouslySetInnerHTML={{
            __html: addBaseUrlToImages(
              service.longDescription || "<p>No description provided.</p>"
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ServiceDetail;
