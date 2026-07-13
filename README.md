# AI Translation & Image Analysis Platform

An Angular 19 + Express application for subscriber-only text translation, speech translation, text-to-speech, image analysis, and Cashfree Sandbox subscriptions.

> [Working demo video](https://drive.google.com/file/d/1IH2008CVZ6tj2KDCoMRpZgcPchyR0jQv/view)

## System map

```mermaid
flowchart LR
    U[User / Browser]

    subgraph FE[Angular 19 frontend]
        Shell[App shell]
        AuthUI[Login + OTP UI]
        Tools[Text / Audio / Image tools]
        Billing[Plans / Refund UI]
    end

    subgraph BE[Express backend]
        AuthAPI[/Auth + OTP API/]
        AIAPI[/AI API/]
        PayAPI[/Subscription API/]
    end

    DB[(MongoDB)]
    Mail[Gmail SMTP]
    Groq[Groq AI]
    Cloud[Cloudinary]
    Cashfree[Cashfree Sandbox]

    U --> Shell
    Shell --> AuthUI & Tools & Billing
    AuthUI --> AuthAPI
    Tools --> AIAPI
    Tools --> AuthAPI
    Billing --> PayAPI
    Billing --> AuthAPI
    AuthAPI --> DB
    AuthAPI --> Mail
    AuthAPI --> Cloud
    AIAPI --> Groq
    PayAPI --> Cashfree
```

## User journey

```mermaid
flowchart TD
    Open[Open application] --> Token{JWT in localStorage?}
    Token -- No --> Login[Log in or sign up]
    Login --> OTP[Email OTP verification]
    OTP --> Account[Create account]
    Account --> Login2[Log in and store 7-day JWT]
    Token -- Yes --> Profile[Load user from MongoDB]
    Login2 --> Profile
    Profile --> Active{Subscribed?}
    Active -- No --> Plans[Choose ₹200 / ₹500 / ₹1500 plan]
    Plans --> Cashfree[Create subscription and authorize payment]
    Cashfree --> Save[Store subscription details on User]
    Save --> Active
    Active -- Yes --> AI[Use text, audio, and image tools]
    Active -- Unsubscribe --> Stop[Calculate refund display and mark unsubscribed]
```

The UI performs the subscription gate. The backend AI endpoints themselves currently have no JWT/subscription middleware.

## Frontend composition

```mermaid
flowchart TD
    App[AppComponent]
    App --> Top[TopBarComponent]
    App --> Side[LeftSidebarComponent]
    App --> Home[HomeComponent]
    App --> Text[TextComponent]
    App --> Audio[AudioComponent]
    App --> Image[ImageComponent]

    Top --> Login[LoginModalComponent]
    Home --> Monthly[Monthly payment]
    Home --> Quarterly[Quarterly payment]
    Home --> Yearly[Yearly payment]
    Home --> Refund[Refund / unsubscribe]

    Side -. "#text / #audio / #image" .-> App
    Home -. subscribedStatus .-> Top
```

Angular routes are empty. `AppComponent` reads hash-anchor navigation and conditionally displays standalone components.

## AI pipelines

```mermaid
flowchart LR
    subgraph TextFlow[Text]
        T1[Input text + languages] --> T2[POST /ai/text-text]
        T2 --> T3[Groq Llama 3.3 translation]
        T3 --> T4[Translated text]
        T4 --> T5[Groq PlayAI TTS]
    end

    subgraph AudioFlow[Audio]
        A1[Browser MediaRecorder] --> A2[Temporary WebM upload]
        A2 --> A3[Groq Whisper translation]
        A3 --> A4[Translated text]
        A4 --> A5[Groq PlayAI TTS]
    end

    subgraph ImageFlow[Image]
        I1[Select image] --> I2[Temporary Cloudinary upload]
        I2 --> I3[Groq Llama 4 vision]
        I3 --> I4[Image description]
        I4 --> I5[Delete Cloudinary image]
    end
```

## Subscription sequence

```mermaid
sequenceDiagram
    actor User
    participant Angular
    participant API as Express API
    participant CF as Cashfree Sandbox
    participant DB as MongoDB

    User->>Angular: Select plan and enter payment details
    Angular->>API: POST /api/subscription/create
    API->>CF: Create subscription
    CF-->>API: Authorization details
    API-->>Angular: Subscription response
    User->>Angular: Select UPI / eNACH / card mode
    Angular->>API: POST /api/subscription/pay
    API->>CF: Raise authorization charge
    CF-->>API: Payment response + redirect URL
    API-->>Angular: Payment response + redirect URL
    Angular->>API: POST /api/auth/updateSubscriptionStatus
    API->>DB: Mark user subscribed
    Angular->>User: Open Cashfree redirect
```

| UI plan | Displayed charge | Intended duration | Current stored expiry |
|---|---:|---|---|
| Monthly | ₹200 | 1 month | +1 month |
| Quarterly | ₹500 | 3 months | +1 month |
| Yearly | ₹1500 | 1 year | +1 month |

## Data model

```mermaid
erDiagram
    USER {
        ObjectId id PK
        string name
        string email UK
        string passwordHash
        boolean subscribed
        string subscriptionId
        string paymentId
        string cfPaymentId
        string subscriptionType
        datetime subscriptionStartsAt
        datetime subscriptionExpiresAt
    }

    OTP {
        ObjectId id PK
        string email UK
        string otp
        datetime createdAt "TTL: 5 minutes"
    }

    USER ||..o| OTP : "same email during signup"
```

## API surface

| Group | Endpoints | Purpose |
|---|---|---|
| Auth | `POST /signup`, `/login`, `/updateSubscriptionStatus`, `/unsubscribe/:id`, `/upload-image`, `/delete-image`; `GET /user-info`, `/me` | Accounts, JWT lookup, subscription state, temporary images |
| OTP | `POST /request-otp`, `/verify-otp`, `/send-otp-mail` | Five-minute email OTP flow |
| AI | `POST /text-text`, `/text-speech`, `/audio-translate`, `/analyse-image` | Groq translation, speech, and vision proxy |
| Subscription | `POST /create`, `/create-plan`, `/manage/:id`, `/payment-methods`, `/pay`, `/simulate-payment`, `/refund`; `GET /subscription-info/:id`, `/simulate/:id`, `/payment/:subscriptionId/:paymentId` | Cashfree Sandbox proxy |

All paths above are mounted below `/api/{group}`.

## Repository map

```text
cashfree-ai-new-final/
├── angular_front/
│   ├── src/app/components/    # UI, AI tools, auth, plans and refund
│   ├── src/app/app.component  # Hash-driven application shell
│   └── src/server.ts          # Angular SSR Express host
└── backend/
    ├── controllers/           # Auth, OTP, AI and Cashfree orchestration
    ├── routes/                # Express endpoint definitions
    ├── models/                # MongoDB User and OTP schemas
    ├── middleware/            # JWT verifier
    ├── utils/                 # Manual subscription-expiry updater
    └── server.js              # Backend entry point
```

## Local setup

```mermaid
flowchart LR
    Env[Create backend/.env] --> API[npm install + npm start]
    API --> P5000[Backend on :5000]
    Front[npm install + npm start] --> P4200[Angular on :4200]
    P4200 --> P5000
```

`backend/.env`:

```dotenv
PORT=5000
MONGODB_URI=
JWT_SECRET=
GROQ_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
CASHFREE_API_VERSION=
CASHFREE_CLIENT_ID=
CASHFREE_CLIENT_SECRET=
```

Run in two terminals:

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

Open `http://localhost:4200`. The frontend has `http://localhost:5000` embedded as its API base URL, so the backend must use `PORT=5000`. The Angular SSR build can instead be served with `npm run serve:ssr:angular_front` after a build.

## Current implementation notes

```mermaid
flowchart TD
    Risk[Before production]
    Risk --> Auth[Protect AI, billing, upload, update and unsubscribe APIs]
    Risk --> Payment[Verify Cashfree server-side with webhook before activating access]
    Risk --> Plans[Correct quarterly/yearly intervals, expiry and yearly charge]
    Risk --> Config[Move API URL to Angular environment configuration]
    Risk --> Refund[Use environment credentials and actual verified refund values]
    Risk --> Cleanup[Remove tracked temporary audio files and automate cleanup]
```

| Area | Current code behavior |
|---|---|
| Authorization | Only `GET /api/auth/me` uses `verifyToken`; most mutation and AI routes are public. |
| Protected user lookup | `/me` reads `req.user.userId`, while login signs the JWT with `id`; `/user-info` is the path used by the frontend. |
| Payment trust | The browser marks the user subscribed when a payment response contains a redirect URL; no webhook verification is implemented. |
| Plans | Quarterly is configured as a one-month interval; all plans store a one-month expiry; yearly raises `amount = 200` despite displaying ₹1500. |
| Refund | The backend refund handler contains placeholder client credentials; the UI sends `refundAmount: 0` and unsubscribe does not invoke the refund function. |
| Startup | `server.js` configures Cloudinary before its own `dotenv.config()` call and currently relies on `db.js` loading the environment as an import side effect. |
| Expiry | `utils/checkSubscriptions.js` can clear expired subscriptions, but it is a manual script and is not scheduled by the server. |
| Testing | Angular has generated component smoke tests; the backend test script is a placeholder. |
