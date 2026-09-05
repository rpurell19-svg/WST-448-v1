import { NextResponse } from "next/server";
import { emptyEnquiry, validateEnquiry, type Enquiry } from "@/lib/enquiry";

/**
 * Enquiry endpoint.
 *
 * ── HOW TO CONNECT A REAL BACKEND ────────────────────────────────────────────
 * The form is fully wired; only delivery is left to configure. Pick one:
 *
 *   1. Webhook (Formspree, Zapier, Make, n8n, a CRM inbox…)
 *        ENQUIRY_WEBHOOK_URL=https://…
 *      The validated enquiry is POSTed to that URL as JSON.
 *
 *   2. Transactional email (Resend)
 *        RESEND_API_KEY=re_…
 *        ENQUIRY_TO_EMAIL=ronald@westsidetrading448.co.za
 *        ENQUIRY_FROM_EMAIL=website@westsidetrading448.co.za   (verified sender)
 *
 * With neither configured the route responds `delivered: false` and the form
 * says so plainly, offering the phone and WhatsApp numbers instead. It never
 * claims an email was sent when nothing was sent.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const runtime = "nodejs";

type Payload = Partial<Enquiry> & { company?: string };

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Honeypot: real people leave this hidden field empty. Answer as if accepted
  // so bots get no signal, but deliver nothing.
  if (body.company) {
    return NextResponse.json({ ok: true, delivered: false, reason: "ignored" });
  }

  const values: Enquiry = { ...emptyEnquiry };
  for (const key of Object.keys(emptyEnquiry) as (keyof Enquiry)[]) {
    values[key] = typeof body[key] === "string" ? body[key].trim() : "";
  }

  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  try {
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "westsidetrading448.co.za",
          receivedAt: new Date().toISOString(),
          ...values,
        }),
      });

      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
      return NextResponse.json({ ok: true, delivered: true });
    }

    if (resendKey && to && from) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: values.email,
          subject: `Website enquiry — ${values.name} (${values.projectType})`,
          text: [
            `Name:          ${values.name}`,
            `Email:         ${values.email}`,
            `Phone:         ${values.phone}`,
            `Project type:  ${values.projectType}`,
            `Budget:        ${values.budget || "Not supplied"}`,
            "",
            "Message:",
            values.message,
          ].join("\n"),
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend responded ${response.status}`);
      }
      return NextResponse.json({ ok: true, delivered: true });
    }
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  // Validated, but there is nowhere to send it yet — say so honestly.
  return NextResponse.json({
    ok: true,
    delivered: false,
    reason: "not_configured",
  });
}
