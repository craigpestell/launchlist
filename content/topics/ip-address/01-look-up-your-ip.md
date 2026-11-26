---
title: Look up your IP address
summary: See the public addresses a website or service sees for your computer, in under a minute.
time: 2 minutes
cost: Free
linkLabel: WhatIsMyIP.com
linkUrl: https://www.whatismyip.com/
checklist:
  - Turn off your VPN, unless you were asked for the VPN's address
  - Open WhatIsMyIP.com on the computer that will connect to the service
  - Click Copy beside the IPv4 address and paste it somewhere you can find it
  - Copy the IPv6 address the same way if the page shows one
---

## What you're looking up

Your **public IP address** is the one websites and services see. It belongs to your internet connection, not to one computer, so every device on the same Wi-Fi usually shows the same address.

## Use the computer that connects

Look it up on **the computer that will connect to the service**. If an import script or app runs on an office machine or a cloud server, its address is the one to send, not your laptop's at home. Home Wi-Fi, the office, mobile data and a VPN each show a different address.

## IPv4 or IPv6

An IPv4 address is four numbers with dots, like 203.0.113.25. An IPv6 address is longer, with letters, numbers and colons, like 2001:db8::25. **If you see both, copy both.** Many services connect over IPv6 whenever your connection has it, so allowing only the IPv4 address can leave you blocked. If the page shows only one row, that is the only kind your connection has, so send that one.

## No browser on the computer

Servers often have no browser. Run `curl https://ifconfig.me` to print the IPv4 address, and `curl -6 https://ifconfig.me` for the IPv6 address. If the second one fails, the computer has no IPv6. In Windows PowerShell, type `curl.exe` instead of `curl`.

## Use the Copy button

Clicking the address itself opens a lookup page instead of copying it. The page also lists a city, postal code and your internet provider. These are estimates for your provider's network, so they are often a nearby city, and you don't need them.
