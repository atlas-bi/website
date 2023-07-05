---
title: Contributing
tags: Library
description: Learn about how you can contribute to the Atlas Library project. Contributions are welcome.
keywords: atlas, atlas library, unified report library, data governance, database, congributing, useful tools
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Contributing
  title: Contributing
  parent: Library
  order: 10
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
      - name: Library
        url: '{{ site.url }}/docs/library/'
        position: 3
---

# Contributing to Atlas Library

Contributions to the Atlas tools are welcome! Contributions are best made through a [pull request](https://github.com/atlas-bi/Library/pulls) on the Github repository.

When possible commit using `npm run commit` to help us create semantic change notes.

## Saml Server

When developing it is handy to have a dev `saml` server available. We include the `saml-idp` project here so you can quickly test out SSO features.

First, update the git submodules:

```bash
git submodule update --init --rebase --remote; cd idp/; npm install
```

Next, create a certificate (only works on linux/gitbash)

```bash
cd ..
openssl req -x509 -new -newkey rsa:2048 -nodes -subj '/C=US/ST=California/L=San Francisco/O=JankyCo/CN=Test Identity Provider' -keyout idp/idp-private-key.pem -out idp/idp-public-cert.pem -days 7300
```

Convert the cert/key pair to a pfx (only works on linux/gitbash). When prompted for a password you can use "password".

```bash
cd idp
openssl pkcs12 -export -in idp-public-cert.pem -inkey idp-private-key.pem -out idp.pfx
```

The following config can be added to the `appsettings.cust.Development.json` file.

```json
"Saml2": {
  "IdPMetadata": "http://localhost:7000/metadata",
  "Issuer": "atlas-library",
  "SignatureAlgorithm": "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256",
  "SigningCertificateFile": "C:\\user\\me\\Documents\\projects\\atlas\\idp\\idp.pfx",
  "SigningCertificatePassword": "password",
  "SignatureValidationCertificateFile": "C:\\Users\\me\\Documents\\projects\\atlas\\idp\\idp.pfx",
  "CertificateValidationMode": "None", // "ChainTrust"
  "RevocationMode": "NoCheck"
}
```

Finally, start the `idp` and the library.

```bash
npm run start:saml
```

## Database Updates

Database changes are all done through `ef` migrations.

After editing the model files a new migration can be added with `dotnet ef migrations add <DescriptiveText> --project web/web.csproj` and then applied to the database with `dotnet ef database update --project web/web.csproj -v`
