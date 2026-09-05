"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { budgetRanges, projectTypes } from "@/data/company";
import { contact, whatsappLink } from "@/data/site";
import {
  emptyEnquiry,
  SUCCESS_MESSAGE,
  validateEnquiry,
  type Enquiry,
  type EnquiryField,
  type Errors,
} from "@/lib/enquiry";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "validated-not-delivered" }
  | { kind: "error"; message: string };

const fieldClasses =
  "w-full border bg-charcoal-850 px-4 py-4 text-white placeholder:text-concrete-400 transition-colors duration-300";

/* `appearance-none` strips the native caret, so draw one back in — a select
   with no visible affordance reads as a disabled text input. */
const selectClasses =
  "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%20stroke%3D%22%23aeb4ba%22%20stroke-width%3D%221.4%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-12";

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const honeypot = useRef<HTMLInputElement>(null);

  const set = (field: EnquiryField) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear an error as soon as the visitor starts fixing it.
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  };

  const fieldId = (field: EnquiryField) => `${id}-${field}`;
  const errorId = (field: EnquiryField) => `${id}-${field}-error`;

  const borderFor = (field: EnquiryField) =>
    errors[field]
      ? "border-state-error"
      : "border-concrete-700 focus:border-bronze-500";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateEnquiry(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0] as EnquiryField;
      document.getElementById(fieldId(first))?.focus();
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: honeypot.current?.value ?? "",
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        delivered?: boolean;
        errors?: Errors;
      };

      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
        return;
      }

      if (!response.ok || !data.ok) {
        setStatus({
          kind: "error",
          message:
            "Something went wrong sending your enquiry. Please call or WhatsApp us and we'll pick it up straight away.",
        });
        return;
      }

      if (data.delivered) {
        setStatus({ kind: "sent" });
        setValues(emptyEnquiry);
      } else {
        // Honest state: the details are valid but no delivery service is
        // connected yet, so nothing was actually sent to anyone.
        setStatus({ kind: "validated-not-delivered" });
      }
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn't reach the server. Please check your connection, or call or WhatsApp us directly.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div
        role="status"
        className="border border-state-success/50 bg-charcoal-850 p-8 lg:p-10"
      >
        <p className="type-eyebrow text-state-success">Enquiry received</p>
        <p className="type-h4 mt-4 text-white">{SUCCESS_MESSAGE}</p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          ref={honeypot}
          id={`${id}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Full name"
          required
          id={fieldId("name")}
          error={errors.name}
          errorId={errorId("name")}
        >
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => set("name")(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            placeholder="Your name"
            className={cn(fieldClasses, borderFor("name"))}
          />
        </Field>

        <Field
          label="Email address"
          required
          id={fieldId("email")}
          error={errors.email}
          errorId={errorId("email")}
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => set("email")(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            placeholder="you@example.co.za"
            className={cn(fieldClasses, borderFor("email"))}
          />
        </Field>

        <Field
          label="Phone number"
          required
          id={fieldId("phone")}
          error={errors.phone}
          errorId={errorId("phone")}
        >
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => set("phone")(event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            placeholder="082 526 9192"
            className={cn(fieldClasses, borderFor("phone"))}
          />
        </Field>

        <Field
          label="Project type"
          required
          id={fieldId("projectType")}
          error={errors.projectType}
          errorId={errorId("projectType")}
        >
          <select
            id={fieldId("projectType")}
            name="projectType"
            value={values.projectType}
            onChange={(event) => set("projectType")(event.target.value)}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={
              errors.projectType ? errorId("projectType") : undefined
            }
            className={cn(fieldClasses, borderFor("projectType"), selectClasses)}
          >
            <option value="">Please select…</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Estimated budget"
        id={fieldId("budget")}
        error={errors.budget}
        errorId={errorId("budget")}
        hint="Optional — a rough range helps us give you useful advice early."
      >
        <select
          id={fieldId("budget")}
          name="budget"
          value={values.budget}
          onChange={(event) => set("budget")(event.target.value)}
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={errors.budget ? errorId("budget") : undefined}
          className={cn(fieldClasses, borderFor("budget"), selectClasses)}
        >
          <option value="">Prefer not to say</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Message"
        required
        id={fieldId("message")}
        error={errors.message}
        errorId={errorId("message")}
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => set("message")(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          placeholder="Tell us about the project — where it is, what you have in mind, and where you are in the process."
          className={cn(fieldClasses, borderFor("message"), "resize-y")}
        />
      </Field>

      {status.kind === "validated-not-delivered" ? (
        <p
          role="status"
          className="border border-bronze-500/50 bg-charcoal-850 p-5 text-sm text-concrete-300"
        >
          <span className="type-eyebrow block text-bronze-400">
            Not sent yet
          </span>
          <span className="mt-3 block">
            Your details are complete and valid, but this website has no email
            or form service connected yet, so nothing has been delivered. Please
            call{" "}
            <a href={contact.phone.href} className="text-white underline">
              {contact.phone.label}
            </a>{" "}
            or{" "}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              message us on WhatsApp
            </a>{" "}
            and we&rsquo;ll pick it up straight away.
          </span>
        </p>
      ) : null}

      {status.kind === "error" ? (
        <p
          role="alert"
          className="border border-state-error/60 bg-charcoal-850 p-5 text-sm text-concrete-300"
        >
          <span className="type-eyebrow block text-state-error">
            Couldn&rsquo;t send
          </span>
          <span className="mt-3 block">{status.message}</span>
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={status.kind === "submitting"}
          aria-busy={status.kind === "submitting"}
        >
          {status.kind === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-xs text-concrete-400">
          We reply to every enquiry. Your details are never shared.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  error,
  errorId,
  hint,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  errorId: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="type-eyebrow text-concrete-300">
        {label}
        {required ? (
          <span className="text-bronze-500"> *</span>
        ) : (
          <span className="text-concrete-400"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-concrete-400">{hint}</p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-state-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
