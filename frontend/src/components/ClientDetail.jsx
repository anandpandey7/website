import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Prefix API_BASE_URL to relative image src from CKEditor HTML
  const addBaseUrlToImages = (html = "") => {
    return html.replace(
      /<img\s+[^>]*src="([^"]+)"[^>]*>/gi,
      (match, src) => {
        if (
          src.startsWith("http://") ||
          src.startsWith("https://") ||
          src.startsWith("data:")
        ) {
          return match;
        }
        return match.replace(src, `${API_BASE_URL}${src}`);
      }
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
    const fetchClient = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/clients/${id}`);
        const data = await res.json();

        if (data.success) {
          setClient(data.project);
        } else {
          setError("Client not found");
        }
      } catch (err) {
        console.error("Fetch client error:", err);
        setError("Failed to load client");
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

  if (error || !client) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--accent)]">
        {error || "Client not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--secondary)] py-12 px-4">
      <div className="max-w-5xl mx-auto bg-[var(--surface)] rounded-xl shadow-lg p-8">

        {/* 🔹 WYSIWYG HTML from CKEditor */}
        <div
          className="prose max-w-none text-[var(--primary)]"
          dangerouslySetInnerHTML={{
            __html: addBaseUrlToImages(
              client.projectLongDescription ||
                "<p>No description provided.</p>"
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ClientDetail;
