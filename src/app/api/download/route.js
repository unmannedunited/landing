import { NextResponse } from 'next/server';
import { sendDownloadEmail } from '../../../lib/email';

export async function POST(request) {
  try {
    const { userData, documentName } = await request.json();

    // Validación básica
    if (!userData || !documentName) {
      return NextResponse.json(
        { error: 'User data and document name are required' },
        { status: 400 }
      );
    }

    const { name, lastName, phone, email } = userData;

    // Validar campos obligatorios
    if (!name || !lastName || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, last name, phone, and email are required' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Enviar email a MAILJET_TO_EMAIL
    await sendDownloadEmail(userData, documentName);
    console.log('Download email successfully sent:', { userData, documentName });

    return NextResponse.json(
      { message: 'Download email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing download request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

