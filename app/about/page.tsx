
export default function AboutPage() {
  return (
<div className="page active">

  <div className="about-hero">
    <div className="about-hero-inner">
      <div className="hero-badge" style={{ marginBottom: "24px" }}>Our Story</div>
      <h1>Built by Tax Professionals, for Tax Professionals</h1>
      <p>Juvida Tax Services was founded with a single mission: give independent tax preparers access to the same powerful software and support infrastructure that large firms take for granted.</p>
    </div>
  </div>

  <div className="about-grid">
    <div className="about-text">
      <div className="section-tag">Who We Are</div>
      <h2>Technology That Understands Your Business</h2>
      <p>Juvida Tax Services is the parent company behind Juvida Tax Pro — a service bureau platform designed from day one for professional tax preparers who want to run scalable, compliant, profitable practices.</p>
      <p>We know the challenges you face because we've lived them. From managing EFIN compliance and bank product relationships, to keeping up with ever-changing IRS regulations, our platform was built to solve real problems that real bureaus encounter every tax season.</p>
      <p>Today, Juvida Tax Pro supports service bureaus ranging from single-preparer offices to multi-state franchise operations, providing the tools, training, and technology backbone to compete at any scale.</p>
    </div>
    <div>
      <div className="section-tag">Our Values</div>
      <h2 className="section-title" style={{ fontSize: "26px", marginBottom: "24px" }}>What Drives Everything We Do</h2>
      <div className="value-cards">
        <div className="value-card">
          <h4>Preparer-First Design</h4>
          <p>Every feature is built with the working tax professional in mind — not the enterprise IT buyer.</p>
        </div>
        <div className="value-card">
          <h4>Radical Transparency</h4>
          <p>Clear pricing, honest SLAs, no surprises. We earn trust through consistency, not just promises.</p>
        </div>
        <div className="value-card">
          <h4>Compliance Always</h4>
          <p>We stay ahead of IRS changes so your bureau stays protected every season, automatically.</p>
        </div>
        <div className="value-card">
          <h4>Shared Success</h4>
          <p>When your bureau grows, we grow. Our model aligns our incentives directly with yours.</p>
        </div>
      </div>
    </div>
  </div>

  <div className="team-section">
    <div className="team-inner">
      <div style={{ textAlign: "center", marginBottom: "0" }}>
        <div className="section-tag">Leadership</div>
        <h2 className="section-title" style={{ color: "white", textAlign: "center" }}>The Team Behind the Platform</h2>
        <p className="section-sub" style={{ color: "rgba(255,255,255,0.5)", margin: "0 auto 0" }}>Experienced professionals with deep roots in tax services, fintech, and business operations.</p>
      </div>
      <div className="team-grid">
        <div className="team-card">
          <div className="team-avatar">VO</div>
          <div className="team-name">Victoria Olorede</div>
          <div className="team-role">Chief Executive Officer</div>
          <div className="team-bio">Visionary leader with extensive experience in homecare and professional services, driving Juvida's strategic growth and product direction.</div>
        </div>
        <div className="team-card">
          <div className="team-avatar">JA</div>
          <div className="team-name">Joshua</div>
          <div className="team-role">Chief Information Officer</div>
          <div className="team-bio">Oversees IT infrastructure, business development, and the technology roadmap that powers Juvida Tax Pro's service bureau capabilities.</div>
        </div>
        <div className="team-card">
          <div className="team-avatar">PT</div>
          <div className="team-name">Platform Team</div>
          <div className="team-role">Engineering &amp; Support</div>
          <div className="team-bio">A dedicated team of engineers, compliance specialists, and support professionals committed to platform reliability and preparer success.</div>
        </div>
      </div>
    </div>
  </div>

  <div style={{ background: "var(--off-white)", padding: "80px 5%" }}>
    <div className="stat-grid-4" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "32px", textAlign: "center" }}>
      <div>
        <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "44px", fontWeight: "700", color: "var(--navy)" }}>2019</div>
        <div style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: "300", marginTop: "6px" }}>Year Founded</div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "44px", fontWeight: "700", color: "var(--navy)" }}>500+</div>
        <div style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: "300", marginTop: "6px" }}>Active Bureau Partners</div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "44px", fontWeight: "700", color: "var(--navy)" }}>2M+</div>
        <div style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: "300", marginTop: "6px" }}>Returns Filed to Date</div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "44px", fontWeight: "700", color: "var(--navy)" }}>48</div>
        <div style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: "300", marginTop: "6px" }}>States Actively Served</div>
      </div>
    </div>
  </div>

  
</div>
  );
}
