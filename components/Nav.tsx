"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav>
      <Link href="/" className="nav-logo" aria-label="Go to home">
        <Image
          src="/logo-icon.png"
          alt="Juvida Tax Pro"
          width={44}
          height={36}
          className="nav-logo-mark"
          priority
        />
        <div className="nav-logo-text">
          Juvida Tax <span>Pro</span>
        </div>
      </Link>

      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="navLinks"
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links${open ? " open" : ""}`} id="navLinks">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={pathname === l.href ? "active" : undefined}
            >
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" className="nav-cta">
            Get Started
          </Link>
        </li>
      </ul>
    </nav>
  );
}
