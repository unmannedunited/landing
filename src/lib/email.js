import sgMail from '@sendgrid/mail';

// Configurar SendGrid con la API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendContactEmail(email, message) {
  try {
    const msg = {
      to: process.env.SENDGRID_TO_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@unmannedunited.com',
      replyTo: email, // Para que puedas responder directamente al remitente
      subject: 'New Unmanned United Message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #174F94; border-bottom: 2px solid #174F94; padding-bottom: 10px;">
            New Unmanned United Message
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact information:</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString('es-ES')}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #666;">
            <p>This message was sent from the Unmanned United contact form.</p>
          </div>
        </div>
      `,
      text: `
        Nuevo mensaje desde Unmanned United
        
        Email: ${email}
        Fecha: ${new Date().toLocaleString('es-ES')}
        
        Mensaje:
        ${message}
        
        ---
        Este mensaje fue enviado desde el formulario de contacto de Unmanned United.
      `,
    };

    const result = await sgMail.send(msg);
    console.log('Email enviado exitosamente via SendGrid:', result);
    return { success: true, messageId: result[0]?.headers?.['x-message-id'] };
    
  } catch (error) {
    console.error('Error enviando email via SendGrid:', error);
    throw new Error(`Error enviando email: ${error.message}`);
  }
}
