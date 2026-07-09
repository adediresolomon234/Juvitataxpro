import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
<div className="page active">

  <div className="contact-hero">
    <div className="hero-badge" style={{ marginBottom: "18px" }}>Get in Touch</div>
    <h1>Let's Build Your Bureau Together</h1>
    <p>Schedule a personalized demo or reach out to our team. We respond to every inquiry within one business day.</p>
  </div>

  <div className="contact-grid">
    <div className="contact-info">
      <h3>How Can We Help?</h3>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: "300", lineHeight: "1.7", marginBottom: "28px" }}>Whether you're evaluating platforms, need technical support, or want to discuss custom bureau arrangements, our team is ready.</p>

      <div className="contact-detail">
        <div className="contact-icon">
          <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <div>
          <div className="contact-detail-title">Email Us</div>
          <div className="contact-detail-val">support@juvidataxpro.com</div>
          <div className="contact-detail-val">sales@juvidataxpro.com</div>
        </div>
      </div>

      <div className="contact-detail">
        <div className="contact-icon">
          <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        </div>
        <div>
          <div className="contact-detail-title">Call Us</div>
          <div className="contact-detail-val">(800) 555-TAX-PRO</div>
          <div className="contact-detail-val" style={{ fontSize: "12px", marginTop: "2px" }}>Mon–Fri 8am–7pm EST · Sat 9am–3pm EST</div>
        </div>
      </div>

      <div className="contact-detail">
        <div className="contact-icon">
          <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div>
          <div className="contact-detail-title">Support Hours</div>
          <div className="contact-detail-val">Extended hours January–April 15</div>
          <div className="contact-detail-val" style={{ fontSize: "12px", marginTop: "2px" }}>24/7 emergency e-file support during tax season</div>
        </div>
      </div>

      <div className="office-card">
        <h4>Bureau Partner Program</h4>
        <p>Interested in offering Juvida Tax Pro to your downstream preparers? Ask about our service bureau revenue share and white-label licensing arrangements.</p>
      </div>
    </div>

    <ContactForm />
  </div>

  
</div>
  );
}
