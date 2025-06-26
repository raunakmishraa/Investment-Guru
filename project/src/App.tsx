import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Footer from './components/Footer';
import Contact from './components/contact';
import ScheduleConsultation from './pages/ScheduleConsultation';

function App() {
  return (
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <About />
        <Contact />
        <Footer />
        <BrowserRouter>
          <Routes>
            <Route path="/consultation" element={<ScheduleConsultation />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;