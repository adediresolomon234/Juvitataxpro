import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="nav-logo">
            <div className="nav-logo-mark">JT</div>
            <div className="nav-logo-text">
              Juvida Tax <span>Pro</span>
            </div>
          </div>
          <p>
            Professional tax software built for service bureaus. Powered by
            Juvida Tax Services — delivering technology that grows with your
            practice.
          </p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/features">Pricing</Link>
            </li>
            <li>
              <a>Bank Products</a>
            </li>
            <li>
              <a>API &amp; Integrations</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <a>Careers</a>
            </li>
            <li>
              <a>Press</a>
            </li>
            <li>
              <a>Partner Program</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <a>Knowledge Base</a>
            </li>
            <li>
              <a>Status Page</a>
            </li>
            <li>
              <a>Training Portal</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2025 Juvida Tax Services. All rights reserved. Juvida Tax Pro is an
          authorized IRS e-file provider.
        </p>
        <p className="powered">
          A <span>Juvida Tax Services</span> Product
        </p>
      </div>
    </footer>
  );
}
