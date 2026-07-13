# AI Translation & Image Analysis Platform

**Cashfree-powered subscriptions unlock a single toolkit for AI translation, speech, and image understanding.**

The platform demonstrates how useful AI services can be packaged as a subscription product. Users manage access through Cashfree and then use all supported AI tools from one account.

> Demo project · Cashfree Sandbox · Not production payments

## The product

The project has two connected parts: Cashfree provides the subscription journey, while the AI toolkit provides the value users receive after subscribing.

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

This connection between **paid access** and **practical AI features** is the central idea of the project.

## AI toolkit

The toolkit supports three everyday input types—written text, recorded voice, and images—without requiring the user to switch applications.

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

- **Text:** translate between selected languages and hear the result.
- **Audio:** record speech, convert it to translated text, and play it aloud.
- **Image:** upload a picture and receive an AI-generated explanation.

## Subscription experience

Cashfree Sandbox is used to demonstrate recurring-plan creation and payment authorization. The current plans are presented as follows:

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

The application connects the subscription response with the user’s access status. Production payment verification is not yet implemented; see [Current implementation](docs/current-implementation.md).

## User journey

The experience is designed as one continuous path, from account verification to payment and finally to the AI tools.

```mermaid
flowchart LR
    Visit[Visit] --> Account[Sign up / Log in]
    Account --> Verify[Email OTP]
    Verify --> Plan[Choose plan]
    Plan --> Gateway[Cashfree payment]
    Gateway --> Unlock[Unlock AI tools]
    Unlock --> Use[Translate / Listen / Analyse]
```

Email OTP verifies new accounts. The user then chooses a plan, completes the Cashfree flow, and receives subscriber access.

## Who it helps

The concept is useful wherever language, audio accessibility, or quick visual understanding can reduce effort.

```mermaid
flowchart LR
    App[One AI application] --> Languages[Multilingual communication]
    App --> Study[Study and work]
    App --> Audio[Listen instead of read]
    App --> Visual[Understand image content]
    App --> Learn[Explore AI + payments]
```

It also serves as a reference project for developers learning how AI integrations and a payment gateway can work together.

## See it in action

▶️ **[Watch the working demo](https://drive.google.com/file/d/1IH2008CVZ6tj2KDCoMRpZgcPchyR0jQv/view)**

## Behind the scenes

Angular provides the user interface, while the Express server coordinates the database and external services.

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

Groq powers translation, speech, and image analysis; Cloudinary temporarily hosts images; MongoDB stores users and subscription data.

## Documentation map

The README gives the product overview. These smaller guides contain the technical and implementation details:

| Start here | Go deeper |
|---|---|
| [Architecture](docs/architecture.md) | [API and data](docs/api-and-data.md) |
| [User and AI flows](docs/user-flows.md) | [Local setup](docs/setup.md) |
| [Subscriptions](docs/subscriptions.md) | [Current implementation](docs/current-implementation.md) |

## Run locally

Run the backend and frontend in separate terminals:

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
