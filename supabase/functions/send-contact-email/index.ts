import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function base64UrlEncode(str: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  let base64 = btoa(String.fromCharCode(...data));
  base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return base64;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: ContactFormData = await req.json();

    const PICA_SECRET_KEY = Deno.env.get('PICA_SECRET_KEY');
    const PICA_GMAIL_CONNECTION_KEY = Deno.env.get('PICA_GMAIL_CONNECTION_KEY');

    if (!PICA_SECRET_KEY || !PICA_GMAIL_CONNECTION_KEY) {
      throw new Error('PICA_SECRET_KEY or PICA_GMAIL_CONNECTION_KEY is not configured');
    }

    const emailBody = `New Contact Form Submission

From: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

Message:
${formData.message}

---
This email was sent from the Ingenuity Education contact form.`;

    const mimeMessage = `To: ingenuityeducation.dev@gmail.com
Subject: Contact Form: ${formData.subject}
Content-Type: text/plain; charset=UTF-8

${emailBody}`;

    const raw = base64UrlEncode(mimeMessage);

    const res = await fetch('https://api.picaos.com/v1/passthrough/users/me/messages/send', {
      method: 'POST',
      headers: {
        'x-pica-secret': PICA_SECRET_KEY,
        'x-pica-connection-key': PICA_GMAIL_CONNECTION_KEY,
        'x-pica-action-id': 'conn_mod_def::F_JeJ_A_TKg::cc2kvVQQTiiIiLEDauy6zQ',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Gmail API error:', error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await res.json();

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});