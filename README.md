# Práctica: React + Docker Hub + GitHub Actions + OCI

Aplicación React creada con Vite, empaquetada en una imagen Docker de dos etapas y servida con Nginx.

Cada `push` a la rama `main` ejecuta GitHub Actions, construye la imagen y la publica automáticamente en Docker Hub como:

```text
karitoziss/practica-react-oci:latest
karitoziss/practica-react-oci:<SHA-del-commit>
```

## Desarrollo local

```bash
npm install
npm run dev
```

## Docker

```bash
docker build -t practica-react-oci:1.0 .
docker run -d --name practica-react -p 80:80 --restart unless-stopped practica-react-oci:1.0
```

Abrir `http://localhost` o la IP pública de la máquina virtual.

## Ejecutar desde Docker Hub en la VM

```bash
docker pull karitoziss/practica-react-oci:latest
docker run -d \
  --name practica-react \
  --restart unless-stopped \
  -p 80:80 \
  karitoziss/practica-react-oci:latest
```

## Configuración requerida en GitHub

- Variable `DOCKERHUB_USERNAME`: nombre de usuario de Docker Hub.
- Secreto `DOCKERHUB_TOKEN`: token de acceso de Docker Hub con permiso de lectura y escritura.
