import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="page active">
      <div className="contact-hero">
        <div className="hero-badge" style={{ marginBottom: "18px" }}>
          Request Received
        </div>
        <h1>Thank You for Contacting Us</h1>
        <p>
          We have received your demo request. Your secure download link and demo
          login details have been sent to your email address.
        </p>
      </div>

      <div className="section" style={{ paddingTop: "0" }}>
        <div
          className="feature-card"
          style={{ maxWidth: "620px", margin: "0 auto", textAlign: "center" }}
        >
          <div className="feature-icon" style={{ margin: "0 auto 18px" }}>
            <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3>Check Your Email</h3>
          <p>
            The download link will expire in 24 hours. If you do not see the
            email shortly, please check your spam or junk folder.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            href="/"
            className="btn-outline"
            style={{ color: "var(--navy)", borderColor: "rgba(11,28,61,0.2)" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
