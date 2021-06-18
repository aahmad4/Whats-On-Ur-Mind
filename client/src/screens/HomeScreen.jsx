import React from 'react';
import Navbar from '../components/Navbar';
import LandingPageCallToAction from '../components/HomeScreen/LandingPageCallToAction';
import HowItWorks from '../components/HomeScreen/HowItWorks';
import Features from '../components/HomeScreen/Features';
import Pricing from '../components/HomeScreen/Pricing';
import Footer from '../components/HomeScreen/Footer';

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
