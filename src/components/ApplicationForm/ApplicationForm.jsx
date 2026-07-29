import { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineDocumentText,
  HiOutlineCloudArrowUp,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import "./ApplicationForm.css";

const SERVICES = [
  { value: "", label: "Select a service" },
  { value: "trade-licence", label: "Trade Licence" },
  { value: "emirates-id", label: "Emirates ID" },
  { value: "passport", label: "Passport Services" },
  { value: "visa", label: "Visa Assistance" },
];

const WEB3FORMS_ACCESS_KEY = "6136904a-2b55-4364-b3af-5027b5b88c7d";
const HCAPTCHA_SITE_KEY = "YOUR_SITE_KEY_HERE";

export default function ApplicationForm() {
  const [service, setService] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      setFileName("");
    } else if (files.length === 1) {
      setFileName(files[0].name);
    } else {
      setFileName(`${files.length} files selected`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        e.target.reset();
        setService("");
        setFileName("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="apply" className="apply-section">
        <div className="apply-blob apply-blob-1"></div>
        <div className="apply-blob apply-blob-2"></div>
        <div className="apply-success">
          <HiOutlineCheckCircle size={52} />
          <h3>Application Submitted!</h3>
          <p>
            Thank you — we've received your request and will contact you
            within 24-48 hours.
          </p>
          <button
            type="button"
            className="apply-submit-btn"
            onClick={() => setStatus("idle")}
          >
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="apply-section">
      <div className="apply-blob apply-blob-1"></div>
      <div className="apply-blob apply-blob-2"></div>

      <div className="apply-container">
        <div className="apply-header">
          <h2>Start Your Application</h2>
          <p>
            Fill out the form below and our team will guide you through the
            entire process — quick, simple, and fully supported.
          </p>
        </div>

        <form className="apply-form" onSubmit={handleSubmit}>
          {/* Hidden field for Web3Forms */}
          <input
            type="hidden"
            name="subject"
            value="New Application — The Lighthouse"
          />

          {/* Personal Info */}
          <div className="apply-row">
            <div className="apply-field">
              <label>
                <HiOutlineUser size={16} /> Full Name
              </label>
              <input
                type="text"
                name="full_name"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="apply-field">
              <label>
                <HiOutlinePhone size={16} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+971 50 000 0000"
                required
              />
            </div>
          </div>

          <div className="apply-field">
            <label>
              <HiOutlineEnvelope size={16} /> Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Service selection */}
          <div className="apply-field">
            <label>
              <HiOutlineDocumentText size={16} /> Service Required
            </label>
            <select
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            >
              {SERVICES.map((s) => (
                <option
                  key={s.value}
                  value={s.value}
                  disabled={s.value === ""}
                >
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional fields based on service */}
          {service === "trade-licence" && (
            <div className="apply-row apply-conditional">
              <div className="apply-field">
                <label>Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Your company name"
                />
              </div>
              <div className="apply-field">
                <label>Licence Type</label>
                <select name="licence_type">
                  <option value="new">New Licence</option>
                  <option value="renewal">Renewal</option>
                </select>
              </div>
            </div>
          )}

          {service === "emirates-id" && (
            <div className="apply-field apply-conditional">
              <label>Emirates ID Number (if renewing)</label>
              <input
                type="text"
                name="emirates_id_number"
                placeholder="784-XXXX-XXXXXXX-X"
              />
            </div>
          )}

          {service === "passport" && (
            <div className="apply-row apply-conditional">
              <div className="apply-field">
                <label>Passport Number</label>
                <input
                  type="text"
                  name="passport_number"
                  placeholder="Passport number"
                />
              </div>
              <div className="apply-field">
                <label>Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  placeholder="Your nationality"
                />
              </div>
            </div>
          )}

          {service === "visa" && (
            <div className="apply-field apply-conditional">
              <label>Visa Type</label>
              <select name="visa_type">
                <option value="employment">Employment Visa</option>
                <option value="visit">Visit Visa</option>
                <option value="family">Family/Dependent Visa</option>
              </select>
            </div>
          )}

          {/* Additional details */}
          <div className="apply-field">
            <label>Additional Details (optional)</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Any specific requirements or questions..."
            />
          </div>

          {/* File upload */}
          <div className="apply-field">
            <label>
              <HiOutlineCloudArrowUp size={16} /> Upload Documents
            </label>
            <div className="apply-file-upload">
              <input
                type="file"
                name="attachment"
                id="apply-file"
                multiple
                onChange={handleFileChange}
              />
              <label htmlFor="apply-file" className="apply-file-label">
                <HiOutlineCloudArrowUp size={20} />
                {fileName || "Click to upload (passport copy, photos, ID)"}
              </label>
            </div>
          </div>

          {/* hCaptcha widget */}
          <div className="h-captcha" data-sitekey={HCAPTCHA_SITE_KEY}></div>

          <button
            type="submit"
            className="apply-submit-btn"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Submitting..." : "Submit Application"}
          </button>

          {status === "error" && (
            <p className="apply-error-msg">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}