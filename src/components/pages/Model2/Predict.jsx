import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Predict = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    const features = input.split(",").map(Number);
    if (features.length !== 30) {
      toast.error(" Please enter exactly 30 comma-separated values.");
      setLoading(false);
      return;
    }

    try {
      // const response = await fetch("http://127.0.0.1:8002/predict2", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ features }),
      // });

        const response = await fetch("https://model2.pixbit.me/predict2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });

      const data = await response.json();
      toast.success(" Prediction complete!");

      setTimeout(() => {
        navigate("/predict2", {
          state: {
            result: data.prediction,
            features: input,
          },
        });
      }, 1200);
    } catch (err) {
      toast.error(" Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-center" autoClose={2500} />
      {/* <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6"> */}
        {/* <div className="w-full max-w-2xl bg-white text-black rounded-2xl p-8 shadow-2xl"> */}
        <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1rem",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
         <div
          className="text-center"
          style={{
            maxWidth: "900px",
            width: "100%",
            backgroundColor: "rgba(13, 50, 89, 0.8)",
           //backgroundColor: "		rgb(218, 165, 32,0.5)",
            borderRadius: "1rem",
            padding: "2rem",
            //color: "white",
          }}
        >
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
             Credit Card Fraud Detection
          </h1>

          <form onSubmit={handleSubmit} style={{
            display:'flex',
            flexDirection:'column',
          }}>
            <label className="text-gray-800 font-semibold mb-2 block text-lg">
              Input 30 comma-separated transaction features:
            </label>
            <textarea
              style={{
               borderRadius:'14px',
               marginBottom:'10px'
              }}
              rows={6}
              className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-gray-50 text-black"
              value={input}
              placeholder="Example: 0.0, -1.23, ..., 149.62"
              onChange={(e) => setInput(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
            
               className={`mt-6 px-6 py-3 mx-auto border-2 border-white rounded-xl bg-transparent font-semibold text-lg transition-all duration-300 ${
               loading
                ? "bg-blue-300 text-white cursor-not-allowed"
               : "text-white hover:bg-white hover:text-blue-600"
              }`}

            >
              {loading ? " Predicting..." : " Predict Transaction"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Predict;
