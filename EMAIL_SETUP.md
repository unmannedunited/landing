# Configuración de Email para el Formulario de Contacto

## Configuración de Mailjet para envío de emails

Para que el formulario de contacto envíe emails a `achinahas95@gmail.com` usando Mailjet, necesitas configurar las siguientes variables de entorno:

### 1. Crear archivo `.env.local`

Crea un archivo `.env.local` en la raíz de tu proyecto con las siguientes variables:

```env
# Configuración de Mailjet
MAILJET_API_KEY=tu_api_key_publica
MAILJET_API_SECRET=tu_api_key_secreta
MAILJET_FROM_EMAIL=noreply@unmannedunited.com
MAILJET_TO_EMAIL=achinahas95@gmail.com
```

### 2. Configurar Mailjet

Para usar Mailjet, necesitas:

1. **Crear una cuenta en Mailjet**:
   - Ve a https://www.mailjet.com/
   - Regístrate con tu email
   - Verifica tu cuenta

2. **Obtener tus API Keys**:
   - Inicia sesión en Mailjet
   - Ve a Account Settings → API Keys
   - Encontrarás tu **API Key** (clave pública) y **Secret Key** (clave secreta)
   - Copia ambas claves

3. **Verificar tu email de envío** (recomendado):
   - Ve a Senders & Domains → Sender Email Addresses
   - Haz clic en "Add a sender"
   - Ingresa el email que usarás para enviar (ej: `noreply@unmannedunited.com`)
   - Verifica el email siguiendo las instrucciones

### 3. Variables de entorno

```env
# Ejemplo de configuración
MAILJET_API_KEY=abc123def456ghi789jkl012mno345pqr
MAILJET_API_SECRET=xyz789uvw456rst123opq890lmn567ijk
MAILJET_FROM_EMAIL=noreply@unmannedunited.com
MAILJET_TO_EMAIL=achinahas95@gmail.com
```

**⚠️ IMPORTANTE:**
- La API Key y Secret Key son diferentes (no confundirlas)
- El email `MAILJET_FROM_EMAIL` debe estar verificado en Mailjet
- Nunca subas el archivo `.env.local` a Git

### 4. Verificar email de envío

Para que Mailjet funcione correctamente:

1. **Verifica tu email de envío**:
   - Ve a Senders & Domains → Sender Email Addresses
   - Agrega el email que usarás para enviar (ej: `noreply@unmannedunited.com`)
   - Verifica el email siguiendo las instrucciones que recibirás por correo

2. **Configura DNS** (opcional pero recomendado):
   - Ve a Senders & Domains → Sender Domains
   - Agrega tu dominio
   - Configura los registros SPF, DKIM y DMARC
   - Esto mejora la deliverabilidad del email

### 5. Probar la configuración

1. Configura las variables de entorno
2. Reinicia el servidor: `npm run dev`
3. Ve a `/contact` y envía un formulario de prueba
4. Verifica que recibas el email en `achinahas95@gmail.com`

### 6. Formato del email

El email que recibirás tendrá:
- **Asunto:** "New Unmanned United Message"
- **Remitente:** El email configurado en `MAILJET_FROM_EMAIL`
- **Reply-To:** El email de quien llenó el formulario
- **Contenido:** Email del remitente, fecha, y mensaje completo
- **Formato:** HTML con diseño profesional

### 7. Ventajas de Mailjet

- **6,000 emails gratis** por mes (200/día)
- **Alta deliverabilidad**: Los emails llegan a la bandeja de entrada
- **Analytics detallados**: Estadísticas de envío, apertura, clics
- **Profesional**: Excelente reputación en el mercado
- **Escalable**: Maneja millones de emails
- **Fácil configuración**: API simple y documentación clara
- **Soporte en español**: Documentación y soporte disponibles en español

### 8. Solución de problemas

#### Error: "Unauthorized" o "401"
- Verifica que `MAILJET_API_KEY` y `MAILJET_API_SECRET` estén correctamente configuradas
- Asegúrate de que las claves sean válidas y no hayan expirado

#### Error: "From email not verified"
- Verifica tu email en Senders & Domains → Sender Email Addresses
- Completa el proceso de verificación

#### Error: "Domain not verified"
- Verifica tu dominio en Senders & Domains → Sender Domains
- Completa el proceso de verificación del dominio

### 9. Límites y precios

- **Plan gratuito**: 6,000 emails/mes (200/día)
- **Planes pagos**: Desde €15/mes para más emails
- **Sin límite de destinatarios** en el plan gratuito

### 10. Seguridad

- **Nunca** hardcodees las credenciales en el código
- Usa siempre variables de entorno
- Mantén tus API Keys seguras
- Considera rotar las API Keys periódicamente
- Usa permisos restringidos en las API Keys cuando sea posible

## Soporte

Si tienes problemas con la configuración:
1. Verifica que las variables de entorno estén configuradas correctamente
2. Revisa los logs del servidor para errores específicos
3. Consulta la documentación de Mailjet: https://documentation.mailjet.com/
4. Verifica que tu email/dominio esté correctamente verificado
5. Revisa el dashboard de Mailjet para estadísticas de envío
