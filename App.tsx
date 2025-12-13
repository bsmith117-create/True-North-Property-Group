import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BuyersPage from './pages/BuyersPage';
import SellersPage from './pages/SellersPage';
import AboutUsPage from './pages/AboutUsPage';
import MortgageCalculatorPage from './pages/MortgageCalculatorPage';
import ContactPage from './pages/ContactPage';
import FinancialAssessmentPage from './pages/FinancialAssessmentPage';
import ClosingCostEstimator from './pages/ClosingCostEstimator';


const App: React.FC = () => {
  // Scroll to top on page change
  const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
  };

  return (
    <Router>
      <div className="bg-tn-light font-sans text-tn-dark antialiased">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<><ScrollToTop /><HomePage /></>} />
            <Route path="/buyers" element={<><ScrollToTop /><BuyersPage /></>} />
            <Route path="/sellers" element={<><ScrollToTop /><SellersPage /></>} />
            <Route path="/about" element={<><ScrollToTop /><AboutUsPage /></>} />
            <Route path="/mortgage-calculator" element={<><ScrollToTop /><MortgageCalculatorPage /></>} />
            <Route path="/closing-cost-estimator" element={<><ScrollToTop /><ClosingCostEstimator /></>} />
            <Route path="/financial-assessment" element={<><ScrollToTop /><FinancialAssessmentPage /></>} />
            <Route path="/contact" element={<><ScrollToTop /><ContactPage /></>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;