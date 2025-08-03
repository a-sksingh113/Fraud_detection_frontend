import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Error from "./components/pages/Error/Error";
import ScrollToTop from "../src/ScrollToTop";
import Home from "./components/pages/Home/Home";
import Predict2 from "./components/pages/Model2/Predict";
import Result2 from "./components/pages/Model2/Result";
import Predict1 from "./components/pages/Model1/Predict";
import Result1 from "./components/pages/Model1/Result";
import Predict3 from "./components/pages/Model3/Predict";
import Result3 from "./components/pages/Model3/Result";
import Aboutfraud from "./components/pages/About-fraud/Aboutfraud";
import AboutUs from "./components/pages/About Us/AboutUs";
import AboutProject from "./components/pages/AboutProject/AboutProject";
import bgImage from './assets/b4.jpg';
import Chatbot from './components/pages/Chatbot/Chatbot'
import Securitytips from "./components/pages/Securitytips/Securitytips";
import Message from "./components/pages/Message/Message";
import Faq from "./components/pages/Faq/Faq";
import BankDashboard from "./components/pages/BankSimulation/BankDashboard";
function App() {
  return (
    <>
    <img
        src={bgImage}
        alt="background"
        className="fullscreen-bg"
      />
    
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/model2" element={<Predict2 />} />
        <Route path="/predict2" element={<Result2 />} />
        <Route path="/model1" element={<Predict1 />} />
        <Route path="/predict1" element={<Result1 />} />
        <Route path="/model3" element={<Predict3 />} />
        <Route path="/predict3" element={<Result3 />} />
        <Route path="/about-fraud" element={<Aboutfraud />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/AboutProject" element={<AboutProject/>}/>
        <Route path="/Chatbot" element={<Chatbot/>}/>
        <Route path="/Securitytips" element={<Securitytips/>}/>
        <Route path="/Faq" element={<Faq/>}/>
        <Route path="/Message" element={<Message/>}/>
         <Route path="/BankDashboard" element={<BankDashboard/>}/>

      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
