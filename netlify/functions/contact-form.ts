import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const handler: Handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Initialize Resend with API key from environment
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }
    
    const resend = new Resend(apiKey);
    
    // Parse form data
    const formData: ContactFormData = JSON.parse(event.body || '{}');
    
    console.log('Form data received:', formData);
    console.log('API Key present:', !!apiKey);
    console.log('From email:', process.env.RESEND_FROM_EMAIL);
    console.log('To email:', process.env.RESEND_TO_EMAIL);
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.RESEND_TO_EMAIL || 'delivered@resend.dev'],
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      text: `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phoneNumber || 'Not provided'}

Message:
${formData.message}

---
Submitted: ${new Date().toISOString()}
Source: True North Property Group Website
      `.trim(),
      // Optional: Use HTML template
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phoneNumber || 'Not provided'}</p>
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
      `
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email', details: error })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Thank you for contacting us! We will respond within 24 hours.',
        id: data?.id 
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
