import Seo from '../components/Seo'
import { faqPageFaqs } from '../data/siteData'

export const Faq = () => {
  return (
    <div className="w-full bg-white overflow-x-clip">
      <Seo
        title="Frequently Asked Questions | Marvel Softwares"
        description="Find answers to frequently asked questions about Marvel Softwares — our services, custom software, websites, ERP, mobile apps, internships, project kickoff and support."
        path="/faq"
        faqs={faqPageFaqs}
      />

      <section className="faq-page" aria-labelledby="faq-page-title">
        <div aria-hidden="true" className="faq-page-glow" />

        <div className="container relative">
          <div className="faq-page-head">
            <span className="eyebrow">FAQ</span>
            <h1 id="faq-page-title" className="text-page-title" style={{ marginTop: 14 }}>
              Frequently Asked Questions (FAQ)
            </h1>
            <p className="text-body faq-page-lead">
              Quick answers to the questions we hear most often. If you cannot find
              what you are looking for, reach out to our team and we will be glad to help.
            </p>
          </div>

          <div className="faq-list">
            {faqPageFaqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Faq
