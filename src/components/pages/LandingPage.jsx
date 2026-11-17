// =========================================
// IMPORT LAYOUT
// =========================================

import { useEffect } from 'react'

import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'

// =========================================
// IMPORT SECTIONS
// =========================================

import Hero from '../sections/Hero'
import WhyDreams from '../sections/WhyDreams'
import ProductShowcase from '../sections/ProductShowcase'
import HowItWorks from '../sections/HowItWorks'
import Testimonials from '../sections/Testimonials'
import Partners from '../sections/Partners'
import CTA from '../sections/CTA'

// =========================================
// IMPORT FLOATING ACTIONS
// =========================================

import FloatingActions from '../common/FloatingActions'

// =========================================
// LANDING PAGE
// =========================================

function LandingPage() {
  // =========================================
  // SCROLL TO SECTION FROM URL HASH
  // =========================================

  useEffect(() => {
    const hash = window.location.hash

    if (!hash) return

    // Tunggu section selesai dirender
    requestAnimationFrame(() => {
      const targetSection = document.querySelector(hash)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    })
  }, [])

  // =========================================
  // RENDER
  // =========================================

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <WhyDreams />
        <ProductShowcase />
        <HowItWorks />
        <Testimonials />
        <Partners />
        <CTA />
      </main>

      <Footer />

      {/* Floating WhatsApp & Back To Top */}
      <FloatingActions />
    </>
  )
}

export default LandingPage
