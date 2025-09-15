import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Predict = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    try {
      // const response = await fetch(
      //   "http://127.0.0.1:8000/predict1",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ text: text }),
      //   }
      // );

         const response = await fetch(
        "https://model1.pixbit.me/predict1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text }),
        }
      );

      const data = await response.json();
      toast.success(" Message classified successfully!");

      setTimeout(() => {
        navigate("/predict1", {
          state: { result: data.prediction, message: text },
        });
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);

      setTimeout(() => {
        navigate("/predict1", { state: { result: "Error" } });
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-center" autoClose={3000} />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "rgba(0, 0, 0, 1)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            padding: "40px",
            fontFamily: '"Segoe UI", sans-serif',
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "28px",
              color: "#fff",
            }}
          >
            📩 Spam SMS Detector
          </h2>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "500",
                fontSize: "16px",
                color: "#ccc",
              }}
            >
              Enter your SMS message:
            </label>

            <textarea
              placeholder="Type your message here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              style={{
                width: "100%",
                height: "140px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ced4da",
                fontSize: "16px",
                marginBottom: "25px",
                resize: "none",
                backgroundColor: "#f8f9fa",
                color: "#212529",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: loading ? "#6c757d" : "#007bff",
                border: "none",
                color: "white",
                borderRadius: "10px",
                fontSize: "17px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => {
                if (!loading) e.target.style.backgroundColor = "#0056b3";
              }}
              onMouseOut={(e) => {
                if (!loading) e.target.style.backgroundColor = "#007bff";
              }}
            >
              {loading ? " Checking..." : "🔍 Check Message"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Predict;
