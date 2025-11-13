# Configuración de GitHub Actions para Despliegue

## 🔧 **Secrets Necesarios en GitHub**

Ve a tu repositorio → Settings → Secrets and variables → Actions → New repository secret

### **Secrets Requeridos:**

1. **`MAILJET_API_KEY`**
   - Valor: Tu API Key pública de Mailjet
   - Ejemplo: `abc123def456ghi789jkl012mno345pqr`

2. **`MAILJET_API_SECRET`**
   - Valor: Tu Secret Key de Mailjet
   - Ejemplo: `xyz789uvw456rst123opq890lmn567ijk`

3. **`MAILJET_FROM_EMAIL`**
   - Valor: Email verificado en Mailjet para enviar
   - Ejemplo: `noreply@unmannedunited.com`

4. **`MAILJET_TO_EMAIL`**
   - Valor: Email donde recibirás las notificaciones
   - Ejemplo: `achinahas95@gmail.com`

## 🚀 **Configuración del Workflow**

El workflow ya está configurado para:

- ✅ **BASE_PATH=/unmanned** (hardcodeado para GitHub Pages)
- ✅ **ASSET_PREFIX=/unmanned** (hardcodeado para GitHub Pages)
- ✅ **NODE_ENV=production** (automático)
- ✅ **Output estático** (automático con `static_site_generator: next`)

## 📁 **Estructura de Despliegue**

### **URLs Resultantes:**
- **Staging**: `tuusuario.github.io/unmanned`
- **Producción**: `new.unmannedunited.com` (cuando configures el dominio)

### **Archivos Generados:**
- Los archivos se generan en la carpeta `./out`
- GitHub Pages los sirve automáticamente

## 🔄 **Flujo de Despliegue**

1. **Push a main** → Trigger del workflow
2. **Build** → Genera archivos estáticos con basePath
3. **Deploy** → Sube a GitHub Pages
4. **Resultado** → Sitio disponible en `tuusuario.github.io/unmanned`

## ⚙️ **Configuración de GitHub Pages**

1. Ve a tu repositorio → Settings → Pages
2. Source: "GitHub Actions"
3. El workflow se ejecutará automáticamente

## 🧪 **Testing Local del Build**

Para probar el build localmente como en GitHub Pages:

```bash
# Simular el build de GitHub Pages
BASE_PATH=/unmanned ASSET_PREFIX=/unmanned npm run build

# Servir los archivos generados
npx serve out
```

## 📝 **Notas Importantes**

- ✅ **No necesitas** configurar `BASE_PATH` y `ASSET_PREFIX` como secrets
- ✅ **Están hardcodeados** en el workflow para GitHub Pages
- ✅ **Solo necesitas** configurar los secrets de Mailjet
- ✅ **El workflow maneja** automáticamente la configuración estática

## 🚨 **Solución de Problemas**

### Error: "Build failed"
- Verifica que los secrets estén configurados correctamente
- Revisa que las API Keys de Mailjet sean válidas
- Asegúrate de que `MAILJET_API_KEY` y `MAILJET_API_SECRET` estén configuradas

### Error: "Images not loading"
- Las imágenes se optimizan automáticamente para GitHub Pages
- Verifica que las rutas sean relativas (sin `/unmanned/` hardcodeado)

### Error: "404 on routes"
- GitHub Pages requiere `trailingSlash: true` (ya configurado)
- Verifica que el `basePath` esté configurado correctamente
