# Architecture

[← Documentation home](../README.md)

## System

```mermaid
flowchart LR
    U[Browser]

    subgraph FE[Angular 19]
        Shell[App shell]
        AuthUI[Login + OTP]
        Tools[AI tools]
        Billing[Plans + refund]
    end

    subgraph BE[Express API]
        AuthAPI[Auth + OTP]
        AIAPI[AI proxy]
        PayAPI[Subscription proxy]
    end

    U --> Shell
    Shell --> AuthUI & Tools & Billing
    AuthUI --> AuthAPI
    Tools --> AuthAPI & AIAPI
    Billing --> AuthAPI & PayAPI
    AuthAPI --> DB[(MongoDB)] & Mail[Gmail SMTP] & Cloud[Cloudinary]
    AIAPI --> Groq[Groq AI]
    PayAPI --> Cashfree[Cashfree Sandbox]
```

## Frontend components

```mermaid
flowchart TD
    App[AppComponent] --> Top[Top bar]
    App --> Side[Left sidebar]
    App --> Home[Home]
    App --> Text[Text tool]
    App --> Audio[Audio tool]
    App --> Image[Image tool]
    Top --> Login[Login modal]
    Home --> Monthly & Quarterly & Yearly & Refund
    Side -. "#text / #audio / #image" .-> App
```

Angular routes are empty. The app shell reads hash anchors and conditionally shows standalone components.

## Repository

```text
cashfree-ai-new-final/
├── angular_front/
│   └── src/app/components/  # UI, AI tools, auth and payments
└── backend/
    ├── controllers/         # Business and integration logic
    ├── routes/              # Express endpoints
    ├── models/              # User and OTP schemas
    ├── middleware/          # JWT verification
    └── server.js            # API entry point
```
