import React from 'react';
import Navbar from '../components/Navbar';
import LandingPageCallToAction from '../components/LandingPageCallToAction';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function HomeScreen({ history }) {
  return (
    <>
      <Navbar history={history} />
      <LandingPageCallToAction />
      <HowItWorks />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}
