import { NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/email';

export async function POST(request) {
  try {
    const { message, email } = await request.json();

    // Validación básica
    if (!message || !email) {
      return NextResponse.json(
        { error: 'Message and email are required' },
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

    // Enviar email a SENDGRID_TO_EMAIL
    await sendContactEmail(email, message);
    console.log('Email successfully sent:', { email, message });

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
