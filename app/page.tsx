import Link from "next/link";

export default function HomePage() {
  return (
<div className="page active">

  <section className="hero">
    <div className="hero-grid">
      <div>
        <div className="hero-badge">Service Bureau Platform</div>
        <h1>Tax Software <em>Built for</em> Professionals</h1>
        <p className="hero-sub">Juvida Tax Pro gives independent tax preparers and service bureaus the enterprise-grade platform they need — e-filing, client management, compliance, and real-time reporting under one roof.</p>
        <div className="hero-actions">
          <Link href="/contact" className="btn-primary">Request a Demo →</Link>
          <Link href="/features" className="btn-outline">Explore Features</Link>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card">
          <div className="hero-card-header">
            <span className="hero-card-title">Season Dashboard</span>
            <span className="hero-card-badge">● Live</span>
          </div>
          <div className="stat-row">
            <div className="stat-item"><span className="stat-num">1,847</span><span className="stat-lbl">Returns Filed</span></div>
            <div className="stat-item"><span className="stat-num">$284K</span><span className="stat-lbl">Refunds Processed</span></div>
            <div className="stat-item"><span className="stat-num">99.2%</span><span className="stat-lbl">Acceptance Rate</span></div>
          </div>
          <div className="progress-row">
            <div className="progress-item">
              <span className="progress-label">Federal</span>
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "92%" }}></div></div>
              <span className="progress-val">92%</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">State</span>
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "87%" }}></div></div>
              <span className="progress-val">87%</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">Extensions</span>
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "64%" }}></div></div>
              <span className="progress-val">64%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div className="stats-strip">
    <div className="stats-inner">
      <div><span className="strip-stat-num">50+</span><span className="strip-stat-lbl">States Supported</span></div>
      <div><span className="strip-stat-num">24/7</span><span className="strip-stat-lbl">Technical Support</span></div>
      <div><span className="strip-stat-num">IRS</span><span className="strip-stat-lbl">Authorized E-file Provider</span></div>
      <div><span className="strip-stat-num">99.9%</span><span className="strip-stat-lbl">Platform Uptime</span></div>
    </div>
  </div>

  <div className="section">
    <div className="section-tag">Core Platform</div>
    <h2 className="section-title">Everything Your Bureau Needs</h2>
    <p className="section-sub">From solo preparers to multi-office service bureaus, Juvida Tax Pro scales with your business and keeps you compliant every step of the way.</p>
    <div className="features-grid">
      <div className="feature-card">
        <div className="feature-icon">
          <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        </div>
        <h3>Federal &amp; State E-Filing</h3>
        <p>File 1040, 1120, 1065, 1041 and all state equivalents directly through our IRS-authorized platform with real-time acknowledgment tracking.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">
          <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <h3>Client Management Portal</h3>
        <p>Secure client portal for document collection, e-signatures, status updates, and direct messaging — fully branded to your bureau.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">
          <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <h3>Real-Time Reporting</h3>
        <p>Track production, revenue, and performance metrics across all preparers and locations from a centralized service bureau dashboard.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">
          <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        </div>
        <h3>Bank Products Integration</h3>
        <p>Offer Refund Transfer (RT), Same-Day ACH, and other bank products directly through our integrated financial partners with same-day funding.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">
          <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        </div>
        <h3>Compliance &amp; Audit Tools</h3>
        <p>Built-in due diligence checklists, EITC compliance workflows, preparer alerts, and audit trail documentation to protect your EFIN.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">
          <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
        </div>
        <h3>Multi-Office Management</h3>
        <p>Manage unlimited locations from one bureau admin account. Assign roles, control access, and monitor all offices in one consolidated view.</p>
      </div>
    </div>
  </div>

  <div className="trust-section">
    <div className="trust-inner">
      <div>
        <div className="section-tag">Why Preparers Choose Us</div>
        <h2 className="section-title" style={{ color: "white" }}>Your Success Is Our Business Model</h2>
        <p className="section-sub" style={{ color: "rgba(255,255,255,0.55)" }}>We operate as your silent partner — providing the technology backbone so you can focus on growing your client base.</p>
        <ul className="trust-list">
          <li><div className="trust-check"></div>No per-return fees during slow seasons — pay only for what you use</li>
          <li><div className="trust-check"></div>White-label options to brand the platform as your own</li>
          <li><div className="trust-check"></div>Dedicated service bureau support line with 2-hour response SLA</li>
          <li><div className="trust-check"></div>Annual training and certification program for all preparers</li>
          <li><div className="trust-check"></div>Revenue sharing on bank products for qualifying bureaus</li>
        </ul>
      </div>
      <div>
        <div className="testimonial-card">
          <p className="testimonial-quote">"Juvida Tax Pro transformed how I run my bureau. The multi-office dashboard alone saves me hours every week, and my clients love the secure portal."</p>
          <div className="testimonial-author">
            <div className="t-avatar">MC</div>
            <div>
              <div className="t-name">Marcus Coleman</div>
              <div className="t-title">Owner — Coleman Tax Services, Atlanta GA</div>
            </div>
          </div>
        </div>
        <div className="testimonial-card" style={{ marginTop: "16px" }}>
          <p className="testimonial-quote">"The bank product integration is seamless. My clients get their refunds faster and I earn additional revenue I wasn't capturing before."</p>
          <div className="testimonial-author">
            <div className="t-avatar">TR</div>
            <div>
              <div className="t-name">Tanya Rivera</div>
              <div className="t-title">Franchise Owner — 3 Locations, Houston TX</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="home-cta">
    <div className="section-tag" style={{ textAlign: "center" }}>Ready to Grow?</div>
    <h2 className="section-title" style={{ color: "white", textAlign: "center", maxWidth: "600px", margin: "0 auto 16px" }}>Join Hundreds of Service Bureaus Already on the Platform</h2>
    <p className="section-sub" style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", margin: "0 auto 36px" }}>Get onboarded before next tax season. No setup fees, no contracts — just results.</p>
    <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
      <Link href="/contact" className="btn-primary">Schedule a Demo →</Link>
      <Link href="/features" className="btn-outline">View All Features</Link>
    </div>
  </div>

  
</div>
  );
}
