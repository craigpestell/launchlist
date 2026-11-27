---
title: Point your domain at your website
summary: Your domain and your website are often with different companies, and DNS records connect the two.
time: 15 minutes, plus up to 48 hours to take effect
cost: Free
checklist:
  - Sign in to your website host and find its connect a domain or custom domain page
  - Note the DNS records it asks for, or use its automatic connect option if it offers one
  - Sign in where you bought your domain and open its DNS settings
  - Add or change only the records your host listed, and leave email records alone
  - Wait for the change to spread, then open your domain to check the site loads
  - Keep a note of the old values in case you need to change them back
---

## Start at your website host

Your website host is the company that runs your site, like Shopify, Squarespace, Wix or a web hosting company. Sign in and look for **Domains**, **Connect a domain** or **Custom domain**. Many hosts can connect it for you once you sign in to your domain company from there. If yours can, use that and skip to the last section.

Otherwise the host shows the records to add. They usually look like this (the values here are examples):

- An **A record** for `@` (the bare domain) pointing to an address like `203.0.113.10`
- A **CNAME record** for `www` pointing to a host name like `shops.example.net`

## Open your domain's DNS settings

Sign in to the company where you bought or renew your domain (your registrar), such as GoDaddy, Namecheap, Cloudflare or a Canadian registrar. Open the domain, then **DNS**, **DNS records** or **Manage DNS**. If you don't know who your registrar is, search your email for the domain's renewal notice. Registrar sites work in a phone browser too, but a computer makes copying values easier.

## Add the records

Change the existing A record for `@` to the address your host gave you, or add one if there isn't one. Do the same for the `www` CNAME. Copy values exactly, with no extra spaces. Some registrars show `@` as your domain name or a blank host field. **Don't delete MX or TXT records**: those keep your email and other services working. Before you change anything, write down or screenshot the old values.

Some hosts ask you to change the domain's **nameservers** instead of adding records. That moves all of your DNS to the host, including email settings, so check your email records are copied over first.

## Wait and check

Changes usually work within an hour but can take up to 48 hours. Open your domain in a private or incognito window to check. A secure padlock (HTTPS) can take a little longer, since the host sets it up after it sees the new records. If it still doesn't load after a day, compare each record with what your host asked for, then contact your host's support with a screenshot of your DNS settings.
