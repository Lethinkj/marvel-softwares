import { useState, useEffect } from 'react'
import Seo from '../components/Seo'
import { faqPageFaqs } from '../data/siteData'
import { trackFaqToggle } from '../utils/analytics'

export const Faq = () => {
  // Ensure the page always scrolls to the very top on mount/navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  // Single dropdown accordion state: only 1 dropdown open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => {
      const isCurrentlyOpen = prev === index
      const next = isCurrentlyOpen ? null : index
      trackFaqToggle(faqPageFaqs[index].question, !isCurrentlyOpen)
      return next
    })
  }

  return (
    <div className="w-full bg-white overflow-x-clip">
      <Seo
        title="Frequently Asked Questions (FAQ) | Marvel Softwares"
        description="Find answers to frequently asked questions about Marvel Softwares — our custom software development, websites, ERP systems, mobile applications, AI solutions, project process, and technical support."
        path="/faq"
        keywords="Marvel Softwares FAQ, software development questions, custom software FAQ, ERP development cost, mobile app development India, software development process, software company in India FAQ"
        faqs={faqPageFaqs}
      />

      <section className="faq-page" aria-labelledby="faq-page-title">
        <div aria-hidden="true" className="faq-page-glow" />

        <div className="container relative">
          <div className="faq-page-head text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h1
              id="faq-page-title"
              className="text-section-title faq-heading-single-line text-[#0033A0]"
            >
              Frequently Asked Questions
            </h1>
            <p className="section-subtitle faq-page-lead text-center mx-auto mt-3">
              Quick answers to the questions we hear most often. If you cannot find
              what you are looking for, reach out to our team and we will be glad to help.
            </p>
          </div>

          <div className="faq-list max-w-4xl mx-auto">
            {faqPageFaqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <details
                  key={faq.question}
                  className="faq-item"
                  open={isOpen}
                >
                  <summary
                    onClick={(e) => {
                      e.preventDefault()
                      handleToggle(index)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleToggle(index)
                      }
                    }}
                  >
                    {faq.question}
                  </summary>
                  {isOpen && <p>{faq.answer}</p>}
                </details>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Faq
