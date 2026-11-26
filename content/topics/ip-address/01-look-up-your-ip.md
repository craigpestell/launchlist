---
title: Find and share your IP address
summary: Look up the public addresses a website or service sees for your computer, and send them to the people who need them.
time: 5 minutes
cost: Free
linkLabel: WhatIsMyIP.com
linkUrl: https://www.whatismyip.com/
checklist:
  - Turn off your VPN, unless you were asked for the VPN's address
  - Click the WhatIsMyIP.com button above, or go to www.whatismyip.com, on the computer that will connect
  - Click Copy beside the IPv4 address, and beside the IPv6 address if the page shows one
  - Send the addresses to the provider exactly as you copied them
  - Say which computer and connection they are from, such as the office server or home Wi-Fi
  - Look the addresses up again if a setting that used them stops working
---

## Open WhatIsMyIP.com

Click the **WhatIsMyIP.com** button above, or type www.whatismyip.com into your browser. Do this on **the computer that will connect to the service**. The page shows your public IP address straight away, with nothing to sign up for.

Your public IP address is the one websites and services see. It belongs to the internet connection, so every device on the same Wi-Fi usually shows the same one. If an import script or app runs on an office machine or a cloud server, its address is the one to send, not your laptop's at home.

## IPv4 or IPv6

An IPv4 address is four numbers with dots, like 203.0.113.25. An IPv6 address is longer, with letters, numbers and colons, like 2001:db8::25. **If you see both, send both.** Many services connect over IPv6 whenever your connection has it, so allowing only the IPv4 address can leave you blocked. If the page shows only one row, send that one. Use the Copy button: clicking the address itself opens a lookup page instead.

## No browser on the computer

Servers often have no browser. Run `curl https://ifconfig.me` to print the IPv4 address, and `curl -6 https://ifconfig.me` for the IPv6 address. If the second one fails, the computer has no IPv6. In Windows PowerShell, type `curl.exe` instead of `curl`.

## When the address changes

Most home and small business plans have a **dynamic address** that can change when the modem restarts. On mobile data, and with some providers, many customers share one IPv4 address that changes often (carrier-grade NAT), so an allow list built on it may stop working without warning. For a computer that has to stay allowed, use a wired business connection with a static address, or ask the service what else it accepts.

## Who to share it with

Share the addresses with the web host, supplier, payment provider or support team that asked for them, not in a public post. An IP address shows your approximate area and internet provider, but not your name or street address. The city and postal code WhatIsMyIP.com shows are estimates, often a nearby city.
