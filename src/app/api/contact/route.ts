import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/contact-schema";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return "Unable to send message right now. Please try again shortly or reach out directly by email.";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const fromAddress = process.env.RESEND_FROM?.trim();
    const toAddress = process.env.CONTACT_TO?.trim();

    if (!resend) {
      return NextResponse.json(
        {
          success: false,
          error: "Email delivery is not configured yet. Set RESEND_API_KEY and RESEND_FROM in your environment variables.",
        },
        { status: 500 }
      );
    }

    if (!fromAddress || !toAddress) {
      return NextResponse.json(
        {
          success: false,
          error: "Contact email settings are incomplete. Please configure RESEND_FROM and CONTACT_TO.",
        },
        { status: 500 }
      );
    }

    const { name, email, message } = parsed.data;
    const result = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
      html: `<p>${message.replace(/\n/g, "<br />")}</p><p><strong>From:</strong> ${name} (${email})</p>`,
    });

    if (result.error) {
      throw new Error(result.error.message ?? "Resend rejected the message.");
    }

    return NextResponse.json({ success: true, messageId: result.data?.id ?? null });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
