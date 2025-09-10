// Configuración de Mailchimp
// Necesitarás configurar estas variables de entorno en tu archivo .env.local

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // ej: us1, us2, etc.
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

export async function addToMailchimp(email, message) {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_LIST_ID) {
    throw new Error('Mailchimp configuration is missing');
  }

  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      MESSAGE: message
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Mailchimp API error: ${errorData.detail || 'Unknown error'}`);
  }

  return await response.json();
}

export async function sendContactEmail(email, message) {
  // Alternativa: usar un servicio de email como Resend, SendGrid, etc.
  // Por ahora, solo logueamos
  console.log('Contact email:', { email, message });
  
  // Aquí podrías integrar con tu servicio de email preferido
  return { success: true };
}
