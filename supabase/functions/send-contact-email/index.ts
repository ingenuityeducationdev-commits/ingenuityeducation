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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: ContactFormData = await req.json();

    const emailBody = `
New Contact Form Submission

From: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

Message:
${formData.message}

---
This email was sent from the Ingenuity Education contact form.
    `;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #412751 0%, #79409c 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #412751; }
    .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e0e0e0; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${formData.name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value">${formData.phone || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Subject:</div>
        <div class="value">${formData.subject}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="footer">
        This email was sent from the Ingenuity Education contact form.
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Ingenuity Education <onboarding@resend.dev>',
        to: ['ingenuityeducation.dev@gmail.com'],
        reply_to: formData.email,
        subject: `Contact Form: ${formData.subject}`,
        text: emailBody,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Resend API error:', error);
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