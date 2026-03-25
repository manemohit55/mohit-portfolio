import { useState } from "react";
import { motion } from "framer-motion";

const initialState = {
  name: "",
  email: "",
  message: "",
};

function validate(values) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim() || values.message.trim().length < 20) {
    errors.message = "Message should be at least 20 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }
      const next = { ...prev };
      delete next[name];
      return next;
    });
    if (status) {
      setStatus("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setValues(initialState);
  };

  return (
    <motion.form
      className="w-full space-y-4"
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label htmlFor="name" className="text-[0.72rem] font-semibold uppercase tracking-[0.11em] text-ink/50">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
          placeholder="Your name"
          className="focus-field"
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-[#b64242]" id="name-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-[0.72rem] font-semibold uppercase tracking-[0.11em] text-ink/50">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
          placeholder="you@example.com"
          className="focus-field"
        />
        {errors.email ? (
          <p className="mt-1 text-xs text-[#b64242]" id="email-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-[0.72rem] font-semibold uppercase tracking-[0.11em] text-ink/50"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
          placeholder="Tell me about your product, team, or opportunity."
          className="focus-field resize-none"
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-[#b64242]" id="message-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        className="inline-flex items-center rounded-full border border-moss bg-moss px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-moss-dark"
        type="submit"
      >
        Send Message
      </button>

      {status === "success" ? (
        <p className="text-sm text-moss" role="status" aria-live="polite">
          Thanks for reaching out. I will get back to you shortly.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="text-sm text-[#b64242]" role="alert">
          Please fix the highlighted fields.
        </p>
      ) : null}
    </motion.form>
  );
}
