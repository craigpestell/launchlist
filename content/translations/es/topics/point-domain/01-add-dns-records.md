---
source: fbee0aa165bc
title: "Apuntar su dominio a su sitio web"
summary: "Su dominio y su sitio web suelen estar con empresas distintas, y los registros DNS conectan los dos."
time: 15 minutos, más hasta 48 horas para que surta efecto
cost: "Gratis"
checklist:
  - "Iniciar sesión en su proveedor de hosting y buscar su página para conectar un dominio o dominio personalizado"
  - "Anotar los registros DNS que pide, o usar su opción de conexión automática si la ofrece"
  - "Iniciar sesión donde compró su dominio y abrir su configuración de DNS"
  - "Agregar o cambiar solo los registros que indicó su proveedor de hosting, sin tocar los de correo"
  - "Esperar a que el cambio se propague y luego abrir su dominio para comprobar que el sitio carga"
  - "Guardar una nota de los valores anteriores por si necesita volver a ponerlos"
---
## Empezar en su proveedor de hosting

Su proveedor de hosting es la empresa que hace funcionar su sitio, como Shopify, Squarespace, Wix o una empresa de alojamiento web. Inicie sesión y busque **Dominios**, **Conectar un dominio** o **Dominio personalizado** (en inglés, "Domains", "Connect a domain" o "Custom domain"). Muchos proveedores pueden conectarlo por usted si inicia sesión en la empresa de su dominio desde ahí. Si el suyo puede, use esa opción y pase a la última sección.

Si no, el proveedor muestra los registros que debe agregar. Suelen verse así (estos valores son ejemplos):

- Un **registro A** para `@` (el dominio sin prefijo) que apunta a una dirección como `203.0.113.10`
- Un **registro CNAME** para `www` que apunta a un nombre de host como `shops.example.net`

## Abrir la configuración de DNS de su dominio

Inicie sesión en la empresa donde compró o renueva su dominio (su registrador), como GoDaddy, Namecheap, Cloudflare o un registrador canadiense. Abra el dominio y luego **DNS**, **Registros DNS** o **Administrar DNS** (en inglés, "DNS records" o "Manage DNS"). Si no sabe cuál es su registrador, busque en su correo electrónico el aviso de renovación del dominio. Los sitios de los registradores también funcionan en el navegador del celular, pero en una computadora es más fácil copiar los valores.

## Agregar los registros

Cambie el registro A que ya existe para `@` a la dirección que le dio su proveedor de hosting, o agregue uno si no hay. Haga lo mismo con el CNAME de `www`. Copie los valores exactamente, sin espacios de más. Algunos registradores muestran `@` como el nombre de su dominio o como un campo de host vacío. **No borre los registros MX ni TXT**: mantienen funcionando su correo electrónico y otros servicios. Antes de cambiar algo, anote los valores anteriores o tome una captura de pantalla.

Algunos proveedores le piden cambiar los **servidores de nombres** del dominio en lugar de agregar registros. Eso pasa todo su DNS al proveedor, incluida la configuración del correo, así que compruebe primero que sus registros de correo se copiaron.

## Esperar y comprobar

Los cambios suelen funcionar en menos de una hora, pero pueden tardar hasta 48 horas. Abra su dominio en una ventana privada o de incógnito para comprobarlo. El candado de seguridad (HTTPS) puede tardar un poco más, porque el proveedor lo configura después de ver los registros nuevos. Si después de un día sigue sin cargar, compare cada registro con lo que pidió su proveedor de hosting. Luego contacte a soporte de su proveedor con una captura de pantalla de su configuración de DNS.
