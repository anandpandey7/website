import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Prefix API_BASE_URL to all relative <img src="">
  const addBaseUrlToImages = (html) => {
    if (!html) return "";

    return html.replace(
      /<img\s+[^>]*src="([^"]+)"[^>]*>/gi,
      (match, src) => {
        if (
          src.startsWith("http://") ||
          src.startsWith("https://") ||
          src.startsWith("data:")
        ) {
          return match; // already absolute or base64
        }

        return match.replace(src, `${API_BASE_URL}${src}`);
      }
    );
  };

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/clients/${id}`);
        const data = await res.json();
        if (data.success) {
          setClient(data.project);
        }
      } catch (err) {
        console.error("Fetch client error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--primary)]">
        Loading...
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--accent)]">
        Client not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--secondary)] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-[var(--surface)] rounded-xl shadow-lg p-8">
        
        {/* 🔹 Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`${API_BASE_URL}${client.logo}`}
            alt={client.clientName}
            className="h-16 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold text-[var(--primary)]">
              {client.clientName}
            </h1>
            <p className="text-[var(--accent)] font-medium">
              {client.projectName}
            </p>
          </div>
        </div>

        {/* 🔹 Full WYSIWYG HTML from CKEditor */}
        <div
          className="prose max-w-none text-[var(--primary)]"
          dangerouslySetInnerHTML={{
            __html: addBaseUrlToImages(
              client.projectLongDescription || "<p>No description provided.</p>"
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ClientDetail;
