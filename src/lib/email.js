import Mailjet from 'node-mailjet';

// Validar y configurar Mailjet con las API Keys
function getMailjetClient() {
  if (!process.env.MAILJET_API_KEY) {
    throw new Error(
      'MAILJET_API_KEY no está configurada. ' +
      'Crea un archivo .env.local en la raíz del proyecto con: MAILJET_API_KEY=tu_api_key_publica'
    );
  }
  if (!process.env.MAILJET_API_SECRET) {
    throw new Error(
      'MAILJET_API_SECRET no está configurada. ' +
      'Agrega MAILJET_API_SECRET=tu_api_key_secreta en tu archivo .env.local'
    );
  }
  if (!process.env.MAILJET_TO_EMAIL) {
    throw new Error(
      'MAILJET_TO_EMAIL no está configurada. ' +
      'Agrega MAILJET_TO_EMAIL=tu_email@ejemplo.com en tu archivo .env.local'
    );
  }
  return Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET
  );
}

export async function sendContactEmail(email, message) {
  try {
    const mailjet = getMailjetClient();
    const fromEmail = process.env.MAILJET_FROM_EMAIL || 'noreply@unmannedunited.com';
    
    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: 'Unmanned United'
            },
            To: [
              {
                Email: process.env.MAILJET_TO_EMAIL,
                Name: 'Unmanned United Team'
              }
            ],
            ReplyTo: {
              Email: email
            },
            Subject: 'New Unmanned United Message',
            HTMLPart: `
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
            TextPart: `
              Nuevo mensaje desde Unmanned United
              
              Email: ${email}
              Fecha: ${new Date().toLocaleString('es-ES')}
              
              Mensaje:
              ${message}
              
              ---
              Este mensaje fue enviado desde el formulario de contacto de Unmanned United.
            `
          }
        ]
      });

    console.log('Email enviado exitosamente via Mailjet:', result.body);
    return { 
      success: true, 
      messageId: result.body.Messages?.[0]?.To?.[0]?.MessageID || result.body.Messages?.[0]?.MessageID 
    };
    
  } catch (error) {
    console.error('Error enviando email via Mailjet:', error);
    throw new Error(`Error enviando email: ${error.message}`);
  }
}

export async function sendDownloadEmail(userData, documentName) {
  try {
    const mailjet = getMailjetClient();
    const { name, lastName, company, phone, email } = userData;
    const fromEmail = process.env.MAILJET_FROM_EMAIL || 'noreply@unmannedunited.com';
    
    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: 'Unmanned United'
            },
            To: [
              {
                Email: process.env.MAILJET_TO_EMAIL,
                Name: 'Unmanned United Team'
              }
            ],
            ReplyTo: {
              Email: email
            },
            Subject: 'Document Download Request - Unmanned United',
            HTMLPart: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #174F94; border-bottom: 2px solid #174F94; padding-bottom: 10px;">
                  Document Download Request
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #333; margin-top: 0;">User Information:</h3>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Last Name:</strong> ${lastName}</p>
                  <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Date:</strong> ${new Date().toLocaleString('es-ES')}</p>
                </div>
                
                <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                  <h3 style="color: #333; margin-top: 0;">Downloaded Document:</h3>
                  <p style="line-height: 1.6; color: #555; font-weight: bold;">${documentName}</p>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #666;">
                  <p>This notification was sent when a user downloaded a technical document from Unmanned United.</p>
                </div>
              </div>
            `,
            TextPart: `
              Document Download Request - Unmanned United
              
              User Information:
              Name: ${name}
              Last Name: ${lastName}
              Company: ${company || 'Not provided'}
              Phone: ${phone}
              Email: ${email}
              Date: ${new Date().toLocaleString('es-ES')}
              
              Downloaded Document: ${documentName}
              
              ---
              This notification was sent when a user downloaded a technical document from Unmanned United.
            `
          }
        ]
      });

    console.log('Email de descarga enviado exitosamente via Mailjet:', result.body);
    return { 
      success: true, 
      messageId: result.body.Messages?.[0]?.To?.[0]?.MessageID || result.body.Messages?.[0]?.MessageID 
    };
    
  } catch (error) {
    console.error('Error enviando email de descarga via Mailjet:', error);
    throw new Error(`Error enviando email: ${error.message}`);
  }
}
