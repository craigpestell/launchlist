---
source: 2b64b8b85659
title: "Encontrar y compartir su dirección IP"
summary: "Consulte las direcciones públicas que un sitio web o servicio ve para su computadora y envíelas a quien las necesite."
time: 5 minutos
cost: "Gratis"
linkLabel: "WhatIsMyIP.com"
linkUrl: https://www.whatismyip.com/
checklist:
  - "Desactivar su VPN, salvo que le hayan pedido la dirección de la VPN"
  - "Hacer clic en el botón WhatIsMyIP.com de arriba, o ir a www.whatismyip.com, en la computadora que se conectará"
  - "Hacer clic en \"Copy\" (copiar) junto a la dirección IPv4, y junto a la IPv6 si la página la muestra"
  - "Enviar las direcciones al proveedor tal como las copió"
  - "Indicar de qué computadora y conexión son, por ejemplo el servidor de la oficina o el Wi-Fi de su casa"
  - "Volver a consultar las direcciones si deja de funcionar una configuración que las usaba"
---
## Abrir WhatIsMyIP.com

Haga clic en el botón **WhatIsMyIP.com** de arriba, o escriba www.whatismyip.com en su navegador. Hágalo en **la computadora que se conectará al servicio**. La página muestra su dirección IP pública de inmediato, sin necesidad de registrarse. El sitio está en inglés.

Su dirección IP pública es la que ven los sitios web y los servicios. Pertenece a la conexión a internet, así que todos los dispositivos conectados al mismo Wi-Fi suelen mostrar la misma. Si un script de importación o una aplicación funciona en una computadora de la oficina o en un servidor en la nube, envíe la dirección de esa máquina, no la de su laptop en casa.

## IPv4 o IPv6

Una dirección IPv4 son cuatro números separados por puntos, como 203.0.113.25. Una dirección IPv6 es más larga, con letras, números y dos puntos, como 2001:db8::25. **Si ve las dos, envíe las dos.** Muchos servicios se conectan por IPv6 siempre que su conexión lo tenga, así que permitir solo la dirección IPv4 puede dejarlo bloqueado. Si la página muestra una sola fila, envíe esa. Use el botón "Copy" (copiar): si hace clic en la dirección, se abre una página de consulta.

## Sin navegador en la computadora

Los servidores muchas veces no tienen navegador. Ejecute `curl https://ifconfig.me` para mostrar la dirección IPv4, y `curl -6 https://ifconfig.me` para la dirección IPv6. Si el segundo comando falla, la computadora no tiene IPv6. En Windows PowerShell, escriba `curl.exe` en lugar de `curl`.

## Cuando la dirección cambia

La mayoría de los planes para hogares y pequeñas empresas tienen una **dirección dinámica**, que puede cambiar cuando se reinicia el módem. Con datos móviles, y con algunos proveedores, muchos clientes comparten una misma dirección IPv4 que cambia a menudo (carrier-grade NAT). Una lista de direcciones permitidas basada en ella puede dejar de funcionar sin aviso. Para una computadora que debe seguir permitida, use una conexión comercial por cable con una dirección estática, o pregunte al servicio qué otra cosa acepta.

## Con quién compartirla

Comparta las direcciones con el proveedor de hosting, el proveedor de productos, el procesador de pagos o el equipo de soporte que se las pidió, no en una publicación pública. Una dirección IP muestra su zona aproximada y su proveedor de internet, pero no su nombre ni su domicilio. La ciudad y el código postal que muestra WhatIsMyIP.com son estimaciones, a menudo de una ciudad cercana.
