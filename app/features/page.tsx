import Link from "next/link";

export default function FeaturesPage() {
  return (
<div className="page active">

  <div className="features-hero">
    <div className="hero-badge" style={{ marginBottom: "18px" }}>Full Feature Suite</div>
    <h1>Built for the Way Bureaus Work</h1>
    <p>Every tool you need to run a profitable, compliant, and scalable tax preparation business.</p>
  </div>

  <div className="feature-cat">
    <div className="feature-cat-inner">
      <div>
        <span className="feature-cat-tag">E-Filing &amp; Returns</span>
        <h2>Comprehensive Return Preparation</h2>
        <p>Juvida Tax Pro supports all major federal and state return types with intelligent form navigation, error checking, and direct IRS e-file transmission — all in a single, intuitive workflow.</p>
        <ul className="feature-list">
          <li>Individual (1040 &amp; variants), Business (1120, 1120S, 1065), Estates (1041)</li>
          <li>All 50 states + D.C. e-file support with real-time acknowledgment</li>
          <li>Automated error and reject resolution with guided correction tools</li>
          <li>Prior-year data import from 40+ competing software platforms</li>
          <li>Batch e-filing for high-volume bureaus</li>
        </ul>
      </div>
      <div className="ui-mockup">
        <div className="mockup-bar">
          <div className="mockup-dot" style={{ background: "#FF5F57" }}></div>
          <div className="mockup-dot" style={{ background: "#FEBC2E" }}></div>
          <div className="mockup-dot" style={{ background: "#28C840" }}></div>
        </div>
        <div className="mockup-row">
          <div className="mockup-cell wide highlight">● IRS: Accepted — 00:04:32</div>
          <div className="mockup-cell full">Ref: TX-2025-0091</div>
        </div>
        <div className="mockup-row">
          <div className="mockup-cell full">Client: J. Anderson</div>
          <div className="mockup-cell full">Return: 1040-EIC</div>
          <div className="mockup-cell full highlight">$3,420 Refund</div>
        </div>
        <div className="mockup-row">
          <div className="mockup-cell wide">State: TX — No Income Tax</div>
          <div className="mockup-cell full">Bank RT: Active</div>
        </div>
        <div className="mockup-row">
          <div className="mockup-cell full">Preparer: M. Williams</div>
          <div className="mockup-cell full">Office: Main St.</div>
          <div className="mockup-cell full">Fee: $285</div>
        </div>
        <div style={{ marginTop: "14px", padding: "12px", background: "rgba(11,155,68,0.08)", borderRadius: "8px", border: "1px solid rgba(11,155,68,0.2)" }}>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>EITC Due Diligence</div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span style={{ background: "rgba(75,200,120,0.15)", color: "#4BC878", border: "1px solid rgba(75,200,120,0.3)", fontSize: "11px", padding: "3px 9px", borderRadius: "4px" }}>✓ Form 8867</span>
            <span style={{ background: "rgba(75,200,120,0.15)", color: "#4BC878", border: "1px solid rgba(75,200,120,0.3)", fontSize: "11px", padding: "3px 9px", borderRadius: "4px" }}>✓ Docs Verified</span>
            <span style={{ background: "rgba(75,200,120,0.15)", color: "#4BC878", border: "1px solid rgba(75,200,120,0.3)", fontSize: "11px", padding: "3px 9px", borderRadius: "4px" }}>✓ Identity Check</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="feature-cat">
    <div className="feature-cat-inner rev">
      <div>
        <span className="feature-cat-tag">Service Bureau Control</span>
        <h2>Centralized Multi-Location Management</h2>
        <p>Operate your entire bureau network from a single admin console. Control who sees what, track every return across every location, and monitor performance in real time — no more spreadsheets.</p>
        <ul className="feature-list">
          <li>Unlimited offices and preparer seats under one bureau account</li>
          <li>Role-based access: bureau admin, office manager, preparer, reviewer</li>
          <li>Cross-office production reports with drill-down capability</li>
          <li>Custom fee schedules per office or preparer</li>
          <li>Centralized client database shared across all locations</li>
        </ul>
      </div>
      <div className="ui-mockup">
        <div className="mockup-bar">
          <div className="mockup-dot" style={{ background: "#FF5F57" }}></div>
          <div className="mockup-dot" style={{ background: "#FEBC2E" }}></div>
          <div className="mockup-dot" style={{ background: "#28C840" }}></div>
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "14px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Bureau Overview — All Offices</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "rgba(11,155,68,0.1)", border: "1px solid rgba(11,155,68,0.2)", borderRadius: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4BC878", flexShrink: "0" }}></div>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", flex: "1" }}>Main Street Office</span>
            <span style={{ fontSize: "12px", color: "var(--green)", fontWeight: "600" }}>482 returns</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4BC878", flexShrink: "0" }}></div>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", flex: "1" }}>Westside Branch</span>
            <span style={{ fontSize: "12px", color: "var(--green)", fontWeight: "600" }}>317 returns</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FEBC2E", flexShrink: "0" }}></div>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", flex: "1" }}>Northgate Pop-Up</span>
            <span style={{ fontSize: "12px", color: "var(--green)", fontWeight: "600" }}>96 returns</span>
          </div>
        </div>
        <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontFamily: "var(--font-playfair), serif", fontWeight: "700", color: "var(--green)" }}>$142K</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>Revenue MTD</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontFamily: "var(--font-playfair), serif", fontWeight: "700", color: "#4BC878" }}>98.7%</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>Accept Rate</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="feature-cat">
    <div className="feature-cat-inner">
      <div>
        <span className="feature-cat-tag">Bank Products</span>
        <h2>Refund Transfer &amp; Same-Day Funding</h2>
        <p>Offer your clients the fastest possible refund options while generating additional revenue for your bureau through our integrated bank product partnerships.</p>
        <ul className="feature-list">
          <li>Refund Transfer (RT) with no out-of-pocket cost to client</li>
          <li>Same-Day ACH and prepaid card disbursement options</li>
          <li>Automated tax preparation fee collection through RT</li>
          <li>Bureau revenue share on every bank product originated</li>
          <li>Real-time funding status for all disbursements</li>
        </ul>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ background: "var(--white)", border: "1px solid rgba(1,36,78,0.06)", borderRadius: "12px", padding: "22px" }}>
          <div style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px" }}>Refund Timeline</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--green-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "var(--green)", flexShrink: "0" }}>1</div>
              <div><div style={{ fontSize: "13px", fontWeight: "600", color: "var(--navy)" }}>Return Accepted</div><div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Same day</div></div>
            </div>
            <div style={{ width: "1px", height: "14px", background: "var(--border)", marginLeft: "16px" }}></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--green-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "var(--green)", flexShrink: "0" }}>2</div>
              <div><div style={{ fontSize: "13px", fontWeight: "600", color: "var(--navy)" }}>IRS Processes Refund</div><div style={{ fontSize: "11px", color: "var(--text-muted)" }}>8–21 days</div></div>
            </div>
            <div style={{ width: "1px", height: "14px", background: "var(--border)", marginLeft: "16px" }}></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E8F9EF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "#2D9E5D", flexShrink: "0" }}>✓</div>
              <div><div style={{ fontSize: "13px", fontWeight: "600", color: "var(--navy)" }}>Client Funded via RT</div><div style={{ fontSize: "11px", color: "#2D9E5D", fontWeight: "500" }}>Same-day disbursement</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* PRICING */}
  <div style={{ background: "var(--navy)", padding: "80px 5%" }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
      <div className="section-tag">Transparent Pricing</div>
      <h2 className="section-title" style={{ color: "white", margin: "0 auto 12px" }}>Plans for Every Bureau Size</h2>
      <p className="section-sub" style={{ color: "rgba(255,255,255,0.5)", margin: "0 auto" }}>No hidden fees, no per-return surprises. Choose the plan that fits your season volume.</p>
      <div className="pricing-grid">
        <div className="plan-card">
          <div className="plan-name">Starter</div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "300", marginBottom: "0" }}>For solo preparers getting started</p>
          <div className="plan-price">$299</div>
          <div className="plan-period">per tax season</div>
          <div className="plan-divider"></div>
          <ul className="plan-features">
            <li><div className="plan-check">✓</div>Up to 200 federal returns</li>
            <li><div className="plan-check">✓</div>1 preparer seat</li>
            <li><div className="plan-check">✓</div>Federal &amp; state e-file</li>
            <li><div className="plan-check">✓</div>Client portal access</li>
            <li><div className="plan-check">✓</div>Email support</li>
          </ul>
          <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center", background: "var(--navy)", color: "white", border: "1px solid rgba(11,155,68,0.3)" }}>Get Started</Link>
        </div>
        <div className="plan-card featured">
          <div className="plan-badge">Most Popular</div>
          <div className="plan-name">Bureau Pro</div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: "300", marginBottom: "0" }}>Multi-preparer offices &amp; small bureaus</p>
          <div className="plan-price">$799</div>
          <div className="plan-period">per tax season</div>
          <div className="plan-divider"></div>
          <ul className="plan-features">
            <li><div className="plan-check">✓</div>Up to 1,000 federal returns</li>
            <li><div className="plan-check">✓</div>10 preparer seats</li>
            <li><div className="plan-check">✓</div>3 office locations</li>
            <li><div className="plan-check">✓</div>Bank products enabled</li>
            <li><div className="plan-check">✓</div>Priority phone support</li>
            <li><div className="plan-check">✓</div>Advanced reporting</li>
          </ul>
          <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Get Started</Link>
        </div>
        <div className="plan-card">
          <div className="plan-name">Enterprise</div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "300", marginBottom: "0" }}>Large bureaus with unlimited needs</p>
          <div className="plan-price">Custom</div>
          <div className="plan-period">tailored to your volume</div>
          <div className="plan-divider"></div>
          <ul className="plan-features">
            <li><div className="plan-check">✓</div>Unlimited returns</li>
            <li><div className="plan-check">✓</div>Unlimited seats &amp; offices</li>
            <li><div className="plan-check">✓</div>White-label branding</li>
            <li><div className="plan-check">✓</div>Dedicated account manager</li>
            <li><div className="plan-check">✓</div>2-hour SLA support</li>
            <li><div className="plan-check">✓</div>Revenue share program</li>
          </ul>
          <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center", background: "var(--navy)", color: "white", border: "1px solid rgba(11,155,68,0.3)" }}>Contact Sales</Link>
        </div>
      </div>
    </div>
  </div>

  
</div>
  );
}
