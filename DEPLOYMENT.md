# Configuración de Despliegue

## Variables de Entorno por Entorno

### 🏠 **Desarrollo Local**
```bash
# .env.local (opcional)
BASE_PATH=
ASSET_PREFIX=
```

**URL resultante:** `localhost:3000`

### 🧪 **Staging (GitHub Pages)**
```bash
# .env.production
BASE_PATH=/unmanned
ASSET_PREFIX=/unmanned
```

**URL resultante:** `miurl.github.io/unmanned`

### 🚀 **Producción (Dominio Propio)**
```bash
# .env.production
BASE_PATH=
ASSET_PREFIX=
```

**URL resultante:** `new.unmannedunited.com`

## Scripts de Build

### Para Staging (GitHub Pages):
```bash
BASE_PATH=/unmanned ASSET_PREFIX=/unmanned npm run build
```

### Para Producción (Dominio Propio):
```bash
npm run build
```

## Configuración de GitHub Actions

Para GitHub Pages, agrega estas variables en tu repositorio:
- `BASE_PATH=/unmanned`
- `ASSET_PREFIX=/unmanned`

## Uso de Imágenes y Links

### ✅ **Correcto - Usar rutas relativas:**
```jsx
<img src="/unmanned-logo.png" alt="Logo" />
<Link href="/contact">Contact</Link>
```

### ❌ **Incorrecto - Rutas absolutas:**
```jsx
<img src="https://miurl.github.io/unmanned/unmanned-logo.png" />
```

## Notas Importantes

1. **Next.js maneja automáticamente** el `basePath` y `assetPrefix`
2. **Las rutas relativas** funcionan en todos los entornos
3. **No hardcodees URLs** completas en el código
4. **Usa variables de entorno** para configurar cada entorno
