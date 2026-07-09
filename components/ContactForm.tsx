"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = Partial<
  Record<"firstName" | "lastName" | "email" | "phone", string>
>;

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function clearError(field: keyof Errors) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    // Honeypot: hidden field only bots fill in.
    if (get("company_website") !== "") {
      router.push("/thank-you");
      return;
    }

    const next: Errors = {};
    const first = get("firstName");
    const last = get("lastName");
    const email = get("email");
    const phone = get("phone");

    if (!first) next.firstName = "Please enter your first name.";
    if (!last) next.lastName = "Please enter your last name.";
    if (!email) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email)) next.email = "That email address doesn\u2019t look right.";
    if (phone && !/^[0-9()+\-.\s]{7,25}$/.test(phone))
      next.phone = "Use digits, spaces, and ( ) + - only.";

    if (Object.keys(next).length > 0) {
      setErrors(next);
      const firstBad = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstBad?.focus();
      return;
    }

    setErrors({});

    const payload = {
      firstName: first,
      lastName: last,
      businessName: get("businessName"),
      email,
      phone,
      locations: get("locations"),
      volume: get("volume"),
      interest: get("interest"),
      message: get("message"),
      company_website: get("company_website"),
    };

    setSubmitting(true);
    // The server validates again, builds a PDF of the details, and emails it.
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const result = await res.json().catch(() => ({}));
        if (res.ok && result.ok) {
          form.reset();
          const params = new URLSearchParams();
          if (result.downloadToken) params.set("dl", result.downloadToken);
          const qs = params.toString();
          router.push(`/thank-you${qs ? `?${qs}` : ""}`);
        } else {
          setSubmitError(
            result.error ||
              "Something went wrong submitting your request. Please try again."
          );
          setSubmitting(false);
        }
      })
      .catch(() => {
        setSubmitError("Network error — please check your connection and try again.");
        setSubmitting(false);
      });
  }

  const invalid = (f: keyof Errors) =>
    errors[f] ? { "aria-invalid": true as const } : {};

  return (
    <div className="contact-form">
      <div className="form-title">Request a Demo</div>
        <div className="form-sub">
          Fill out the form and a Juvida specialist will reach out within 1
          business day.
        </div>
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from humans, catches bots */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="company_website">Leave this field empty</label>
            <input
              type="text"
              id="company_website"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Marcus"
                required
                maxLength={60}
                autoComplete="given-name"
                onInput={() => clearError("firstName")}
                {...invalid("firstName")}
              />
              <div className="form-error" style={{ display: errors.firstName ? "block" : "none" }}>
                {errors.firstName}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Coleman"
                required
                maxLength={60}
                autoComplete="family-name"
                onInput={() => clearError("lastName")}
                {...invalid("lastName")}
              />
              <div className="form-error" style={{ display: errors.lastName ? "block" : "none" }}>
                {errors.lastName}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              placeholder="Coleman Tax Services"
              maxLength={120}
              autoComplete="organization"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="marcus@colemantax.com"
                required
                maxLength={120}
                autoComplete="email"
                inputMode="email"
                onInput={() => clearError("email")}
                {...invalid("email")}
              />
              <div className="form-error" style={{ display: errors.email ? "block" : "none" }}>
                {errors.email}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(404) 555-0100"
                maxLength={25}
                autoComplete="tel"
                inputMode="tel"
                onInput={() => clearError("phone")}
                {...invalid("phone")}
              />
              <div className="form-error" style={{ display: errors.phone ? "block" : "none" }}>
                {errors.phone}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="locations">Number of Locations</label>
              <select id="locations" name="locations" defaultValue="">
                <option value="">Select...</option>
                <option>1 location</option>
                <option>2–5 locations</option>
                <option>6–15 locations</option>
                <option>16+ locations</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="volume">Annual Return Volume</label>
              <select id="volume" name="volume" defaultValue="">
                <option value="">Select...</option>
                <option>Under 200</option>
                <option>200–500</option>
                <option>500–2,000</option>
                <option>2,000–10,000</option>
                <option>10,000+</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="interest">What are you most interested in?</label>
            <select id="interest" name="interest" defaultValue="">
              <option value="">Select a topic...</option>
              <option>E-filing platform overview</option>
              <option>Bank products &amp; RT</option>
              <option>Multi-office management</option>
              <option>White-label / branding</option>
              <option>Pricing &amp; plans</option>
              <option>Migration from current software</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (optional)</label>
            <textarea
              id="message"
              name="message"
              maxLength={1000}
              placeholder="Tell us about your bureau and any specific questions..."
            />
          </div>

          {submitError && (
            <div className="form-error" style={{ display: "block", marginBottom: "10px" }}>
              {submitError}
            </div>
          )}
          <button type="submit" className="form-submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Demo Request →"}
          </button>
        </form>
      </div>
  );
}
