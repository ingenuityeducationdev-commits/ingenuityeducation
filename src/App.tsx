import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Teachers from './components/Teachers';
import Courses from './components/Courses';
import Intensives from './components/Intensives';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Contact from './components/Contact';

function HomePage() {
  return (
    <>
      <Hero />
      <Teachers />
      <Features />
      <Testimonials />
      <Courses />
      <Intensives />
    </>
  );
}

function ContactPage() {
  return <Contact />;
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
