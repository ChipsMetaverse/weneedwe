// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Follow this setup guide to integrate the Deno runtime and Resend in a Supabase Function: 
// https://supabase.com/docs/guides/functions/import-maps

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log("Initializing contact notification function")

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Resend API key from environment variable
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    // Initialize Resend
    const resend = new Resend(RESEND_API_KEY)

    // Parse webhook payload
    const payload = await req.json()
    const contact = payload.record
    
    console.log("Received contact form submission:", contact)

    // Get the Supabase URL and key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase URL or Service Role Key')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'WeNeedWe Contact Form <notifications@resend.dev>',
      to: ['jmjones@ufcinc.org'],  // Update with the correct recipient email
      subject: 'New Contact Form Submission on WeNeedWe',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
            <p><strong>Submitted at:</strong> ${new Date(contact.created_at).toLocaleString()}</p>
          </div>
          <p>You can reply directly to this email to contact this person.</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            This is an automated notification from the WeNeedWe website contact form.
          </p>
        </div>
      `,
      reply_to: contact.email,
    })
    
    if (error) {
      console.error("Error sending email:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }
    
    console.log("Email sent successfully, ID:", data?.id)

    // Update the contact_requests record to mark the email as sent
    const { error: updateError } = await supabase
      .from('contact_requests')
      .update({ email_sent: true })
      .eq('id', contact.id)

    if (updateError) {
      console.error("Error updating contact request:", updateError)
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      messageId: data?.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: unknown) {
    console.error("Function error:", error instanceof Error ? error.message : String(error))
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:0/functions/v1/contact-notification' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
