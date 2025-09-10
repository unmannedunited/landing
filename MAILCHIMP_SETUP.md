# Configuración de Mailchimp para el Formulario de Contacto

## Pasos para obtener tu API Key de Mailchimp

### 1. Acceder a tu cuenta de Mailchimp
- Ve a [mailchimp.com](https://mailchimp.com) e inicia sesión
- Asegúrate de tener una cuenta activa

### 2. Obtener tu API Key
1. En el dashboard de Mailchimp, haz clic en tu nombre de usuario (esquina superior derecha)
2. Selecciona **"Account"** del menú desplegable
3. En la barra lateral izquierda, busca **"Extras"** y haz clic en **"API keys"**
4. Si no tienes una API key, haz clic en **"Create A Key"**
5. Dale un nombre descriptivo como "Unmanned United Website"
6. Copia la API key generada (tendrá formato: `abc123def456-us1`)

### 3. Obtener tu Server Prefix
- El server prefix es la parte después del guión en tu API key
- Por ejemplo, si tu API key es `abc123def456-us1`, tu server prefix es `us1`
- Los valores comunes son: `us1`, `us2`, `us3`, `us4`, `us5`, `us6`, `us7`, `us8`, `us9`, `us10`, `us11`, `us12`, `us13`, `us14`, `us15`, `us16`, `us17`, `us18`, `us19`, `us20`

### 4. Obtener tu List ID
1. En el dashboard de Mailchimp, ve a **"Audience"**
2. Selecciona **"All contacts"** o la audiencia que quieras usar
3. Haz clic en **"Settings"** (en la barra superior)
4. Selecciona **"Audience name and defaults"**
5. En la parte inferior de la página, encontrarás tu **"Audience ID"** (este es tu List ID)
6. Copia este ID (tendrá formato: `1234567890`)

### 5. Configurar las variables de entorno
1. Crea un archivo `.env.local` en la raíz de tu proyecto (si no existe)
2. Agrega las siguientes variables:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=tu_api_key_aqui
MAILCHIMP_SERVER_PREFIX=tu_server_prefix_aqui
MAILCHIMP_LIST_ID=tu_list_id_aqui
```

**Ejemplo:**
```env
MAILCHIMP_API_KEY=abc123def456-us1
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=1234567890
```

### 6. Configurar campos personalizados (opcional)
Si quieres capturar el mensaje del formulario en Mailchimp:

1. Ve a **"Audience"** > **"Settings"** > **"Audience fields and |MERGE| tags"**
2. Haz clic en **"Add A Field"**
3. Selecciona **"Text"** como tipo de campo
4. Nombre del campo: `MESSAGE`
5. Etiqueta: `Message`
6. Haz clic en **"Save"**

### 7. Probar la integración
1. Reinicia tu servidor de desarrollo: `npm run dev`
2. Ve a `/contact` en tu sitio web
3. Envía un formulario de prueba
4. Verifica en Mailchimp que el contacto se agregó correctamente

## Solución de problemas

### Error: "Invalid API Key"
- Verifica que copiaste la API key completa
- Asegúrate de que no hay espacios extra al inicio o final

### Error: "Invalid Server Prefix"
- El server prefix debe coincidir exactamente con el de tu API key
- No incluyas el guión, solo la parte después del guión

### Error: "Invalid List ID"
- Verifica que el List ID sea correcto
- Asegúrate de que la audiencia esté activa

### El formulario funciona pero no se agrega a Mailchimp
- Revisa la consola del navegador para errores
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de que el servidor se reinició después de agregar las variables

## Notas importantes

- **Seguridad**: Nunca subas tu archivo `.env.local` a Git
- **Límites**: Mailchimp tiene límites en su plan gratuito (2,000 contactos, 10,000 emails/mes)
- **Campos personalizados**: El mensaje se guardará en el campo `MESSAGE` si lo configuraste
- **Fallback**: Si Mailchimp falla, el sistema usará un método alternativo para registrar el contacto

## Soporte adicional

Si tienes problemas con la configuración, puedes:
1. Revisar la [documentación oficial de Mailchimp API](https://mailchimp.com/developer/marketing/api/)
2. Contactar al soporte de Mailchimp
3. Verificar los logs del servidor para más detalles del error
