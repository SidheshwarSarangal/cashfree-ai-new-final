# AI Translation & Image Analysis Platform

**Cashfree-powered subscriptions unlock a single toolkit for AI translation, speech, and image understanding.**

> Demo project · Cashfree Sandbox · Not production payments

## The product

```mermaid
flowchart LR
    User((User)) --> Pay[Cashfree subscription]
    Pay --> Access[Subscriber access]
    Access --> AI{AI toolkit}

    AI --> Text[Translate text]
    AI --> Voice[Translate voice]
    AI --> Listen[Generate speech]
    AI --> Image[Understand images]

    style Pay fill:#635bff,color:#fff
    style AI fill:#16a34a,color:#fff
```

## User journey

```mermaid
flowchart LR
    Visit[Visit] --> Account[Sign up / Log in]
    Account --> Verify[Email OTP]
    Verify --> Plan[Choose plan]
    Plan --> Gateway[Cashfree payment]
    Gateway --> Unlock[Unlock AI tools]
    Unlock --> Use[Translate / Listen / Analyse]
```

## AI toolkit

```mermaid
flowchart TD
    Toolkit{AI toolkit}

    Toolkit --> T[Text]
    T --> T1[Choose languages]
    T1 --> T2[Translate]
    T2 --> T3[Listen]

    Toolkit --> A[Audio]
    A --> A1[Record voice]
    A1 --> A2[Translate speech]
    A2 --> A3[Play result]

    Toolkit --> I[Image]
    I --> I1[Upload image]
    I1 --> I2[AI description]
```

## Subscription experience

```mermaid
sequenceDiagram
    actor User
    participant App
    participant Cashfree
    participant AI as AI Toolkit

    User->>App: Select monthly / quarterly / yearly
    App->>Cashfree: Start subscription flow
    Cashfree-->>App: Payment response
    App-->>User: Subscriber access
    User->>AI: Use text, audio and image tools
```

| Monthly | Quarterly | Yearly |
|---:|---:|---:|
| ₹200 | ₹500 | ₹1500 |

## Who it helps

```mermaid
flowchart LR
    App[One AI application] --> Languages[Multilingual communication]
    App --> Study[Study and work]
    App --> Audio[Listen instead of read]
    App --> Visual[Understand image content]
    App --> Learn[Explore AI + payments]
```

## See it in action

▶️ **[Watch the working demo](https://drive.google.com/file/d/1IH2008CVZ6tj2KDCoMRpZgcPchyR0jQv/view)**

## Documentation map

| Start here | Go deeper |
|---|---|
| [Architecture](docs/architecture.md) | [API and data](docs/api-and-data.md) |
| [User and AI flows](docs/user-flows.md) | [Local setup](docs/setup.md) |
| [Subscriptions](docs/subscriptions.md) | [Current implementation](docs/current-implementation.md) |

## Behind the scenes

```mermaid
flowchart LR
    Browser --> Angular
    Angular --> Express
    Express --> MongoDB[(MongoDB)]
    Express --> Groq[Groq AI]
    Express --> Cloudinary
    Express --> Gmail[Email OTP]
    Express --> Cashfree[Cashfree Sandbox]
```

## Run locally

```bash
cd backend
npm install
npm start
```

```bash
cd angular_front
npm install
npm start
```

Open `http://localhost:4200`; the API is expected on `http://localhost:5000`. See [Local setup](docs/setup.md) for `.env` configuration.
