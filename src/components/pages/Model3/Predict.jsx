import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import axios from "axios";

const genderMap = { E: 0, F: 1, M: 2, U: 3 };

const ageMap = {
  "0-20": 0,
  "20-30": 1,
  "30-40": 2,
  "40-50": 3,
  "50-60": 4,
  "60-70": 5,
  "70+": 6,
  U: 7,
};

const categoryMap = {
  "es_transportation": 0,
  "es_health": 1,
  "es_otherservices": 2,
  "es_food": 3,
  "es_hotelservices": 4,
  "es_barsandrestaurants": 5,
  "es_tech": 6,
  "es_sportsandtoys": 7,
  "es_wellnessandbeauty": 8,
  "es_hyper": 9,
  "es_fashion": 10,
  "es_home": 11,
  "es_contents": 12,
  "es_travel": 13,
  "es_leisure": 14,
};

const merchantMap = {
  "M1823072687": 299693,
  "M348934600": 205426,
  "M85975013": 26254,
  "M1053599405": 6821,
  "M151143676": 6373,
  "M855959430": 6098,
  "M1946091778": 5343,
  "M1913465890": 3988,
  "M209847108": 3814,
  "M480139044": 3508,
  "M349281107": 2881,
  "M1600850729": 2624,
  "M1535107174": 1868,
  "M980657600": 1769,
  "M78078399": 1608,
  "M1198415165": 1580,
  "M840466850": 1399,
  "M1649169323": 1173,
  "M547558035": 949,
  "M50039827": 916,
  "M1888755466": 912,
  "M692898500": 900,
  "M1400236507": 776,
  "M1842530320": 751,
  "M732195782": 608,
  "M97925176": 599,
  "M45060432": 573,
  "M1741626453": 528,
  "M1313686961": 527,
  "M1872033263": 525,
  "M1352454843": 370,
  "M677738360": 358,
  "M2122776122": 341,
  "M923029380": 323,
  "M3697346": 308,
  "M17379832": 282,
  "M1748431652": 274,
  "M1873032707": 250,
  "M2011752106": 244,
  "M1416436880": 220,
  "M1294758098": 191,
  "M1788569036": 181,
  "M857378720": 122,
  "M348875670": 107,
  "M1353266412": 78,
  "M495352832": 69,
  "M933210764": 69,
  "M2080407379": 48,
  "M117188757": 21,
  "M1726401631": 3,
};

const Predict = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    step: 1,
    customer: 12345,
    age: "30-40",
    gender: "F",
    merchant: 67890,
    category: "es_food",
    amount: 500.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const mappedData = {
        step: Number(form.step),
        customer: Number(form.customer),
        age: ageMap[form.age],
        gender: genderMap[form.gender],
        merchant: merchantMap[form.merchant],
        category: categoryMap[form.category],
        amount: Number(form.amount),
      };

      // const res = await axios.post("http://127.0.0.1:8001/predict3", {
      //   data: mappedData,
      // });

       const res = await axios.post("https://model3.pixbit.me/predict3", {
        data: mappedData,
      });

      navigate("/predict3", { state: res.data });
    } catch (err) {
      alert("Prediction failed: " + err.message);
    }
  };

  return (
    <Layout>
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
            borderRadius: "1rem",
            padding: "2rem",
          }}
        >
          <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ marginBottom: "24px", color: "white" }}>Bank Fraud Detection</h2>

            {[
              { label: "Step", type: "number", name: "step" },
              { label: "Customer ID", type: "string", name: "customer" },
              { label: "Age Group", type: "select", name: "age", options: Object.keys(ageMap) },
              { label: "Gender", type: "select", name: "gender", options: Object.keys(genderMap) },
              { label: "Merchant ID", type: "string", name: "merchant" },
              { label: "Transaction Category", type: "select", name: "category", options: Object.keys(categoryMap) },
              { label: "Amount", type: "number", name: "amount" },
            ].map(({ label, type, name, options }) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  color: "white",
                }}
              >
                <label style={{ width: "40%", fontWeight: "bold" }}>{label}:</label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    style={{ width: "55%", padding: "6px", borderRadius: "4px" }}
                  >
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    style={{ width: "55%", padding: "6px", borderRadius: "4px" }}
                  />
                )}
              </div>
            ))}

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1E90FF",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Submit & Predict
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Predict;
