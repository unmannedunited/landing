# Configuración de Email para el Formulario de Contacto

## Configuración de SendGrid para envío de emails

Para que el formulario de contacto envíe emails a `achinahas95@gmail.com` usando SendGrid, necesitas configurar las siguientes variables de entorno:

### 1. Crear archivo `.env.local`

Crea un archivo `.env.local` en la raíz de tu proyecto con las siguientes variables:

```env
# Configuración de SendGrid
SENDGRID_API_KEY=tu_api_key_de_sendgrid
SENDGRID_FROM_EMAIL=noreply@unmannedunited.com
```

### 2. Configurar SendGrid

Para usar SendGrid, necesitas:

1. **Crear una cuenta en SendGrid**:
   - Ve a https://sendgrid.com/
   - Regístrate con tu email
   - Verifica tu cuenta

2. **Obtener tu API Key**:
   - Inicia sesión en SendGrid
   - Ve a Settings → API Keys
   - Haz clic en "Create API Key"
   - Dale un nombre como "Unmanned United Website"
   - Selecciona "Restricted Access"
   - En "Mail Send", selecciona "Full Access"
   - Copia la API Key generada

3. **Verificar tu dominio** (opcional pero recomendado):
   - Ve a Settings → Sender Authentication
   - Selecciona "Authenticate Your Domain"
   - Sigue las instrucciones para verificar tu dominio

### 3. Variables de entorno

```env
# Ejemplo de configuración
SENDGRID_API_KEY=SG.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz.1234567890abcdef
SENDGRID_FROM_EMAIL=noreply@unmannedunited.com
```

**⚠️ IMPORTANTE:**
- La API Key de SendGrid comienza con `SG.`
- El email `SENDGRID_FROM_EMAIL` debe estar verificado
- Nunca subas el archivo `.env.local` a Git

### 4. Verificar email de envío

Para que SendGrid funcione correctamente:

1. **Verifica tu email de envío**:
   - Ve a Settings → Sender Authentication
   - Selecciona "Single Sender Verification"
   - Agrega el email que usarás para enviar (ej: `noreply@unmannedunited.com`)
   - Verifica el email siguiendo las instrucciones

2. **Configura DNS** (opcional pero recomendado):
   - Ve a Settings → Sender Authentication
   - Selecciona "Authenticate Your Domain"
   - Agrega los registros SPF, DKIM y DMARC
   - Esto mejora la deliverabilidad del email

### 5. Probar la configuración

1. Configura las variables de entorno
2. Reinicia el servidor: `npm run dev`
3. Ve a `/contact` y envía un formulario de prueba
4. Verifica que recibas el email en `achinahas95@gmail.com`

### 6. Formato del email

El email que recibirás tendrá:
- **Asunto:** "Nuevo mensaje desde Unmanned United"
- **Remitente:** El email configurado en `SENDGRID_FROM_EMAIL`
- **Reply-To:** El email de quien llenó el formulario
- **Contenido:** Email del remitente, fecha, y mensaje completo
- **Formato:** HTML con diseño profesional

### 7. Ventajas de SendGrid

- **100 emails gratis** por día (3,000/mes)
- **Alta deliverabilidad**: Los emails llegan a la bandeja de entrada
- **Analytics detallados**: Estadísticas de envío, apertura, clics
- **Profesional**: Excelente reputación en el mercado
- **Escalable**: Maneja millones de emails
- **Fácil configuración**: API simple y documentación clara

### 8. Solución de problemas

#### Error: "Invalid API key"
- Verifica que la API Key comience con `SG.`
- Asegúrate de que la API Key tenga permisos de "Mail Send"

#### Error: "From email not verified"
- Verifica tu email en Settings → Sender Authentication
- Completa el proceso de verificación

#### Error: "Domain not verified"
- Verifica tu dominio en Settings → Sender Authentication
- Completa el proceso de verificación del dominio

### 9. Límites y precios

- **Plan gratuito**: 100 emails/día (3,000/mes)
- **Planes pagos**: Desde $19.95/mes para más emails
- **Sin límite de destinatarios** en el plan gratuito

### 10. Seguridad

- **Nunca** hardcodees las credenciales en el código
- Usa siempre variables de entorno
- Mantén tu API Key segura
- Considera rotar las API Keys periódicamente
- Usa permisos restringidos en la API Key

## Soporte

Si tienes problemas con la configuración:
1. Verifica que las variables de entorno estén configuradas correctamente
2. Revisa los logs del servidor para errores específicos
3. Consulta la documentación de SendGrid
4. Verifica que tu email/dominio esté correctamente verificado
5. Revisa el dashboard de SendGrid para estadísticas de envío
