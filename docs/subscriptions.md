# Subscriptions

[← Documentation home](../README.md)

## Payment flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Angular
    participant API as Express
    participant CF as Cashfree Sandbox
    participant DB as MongoDB

    User->>UI: Choose plan and payment method
    UI->>API: Create subscription
    API->>CF: POST subscription
    CF-->>API: Authorization details
    API-->>UI: Subscription result
    UI->>API: Raise charge
    API->>CF: POST payment
    CF-->>API: Redirect URL
    API-->>UI: Payment result
    UI->>API: Update subscription status
    API->>DB: Mark user subscribed
```

The UI supports UPI, eNACH, and a card-labelled path. Cashfree calls use Sandbox endpoints.

## Plans

| Plan | Display | Intended term | Current stored expiry |
|---|---:|---|---|
| Monthly | ₹200 | 1 month | +1 month |
| Quarterly | ₹500 | 3 months | +1 month |
| Yearly | ₹1500 | 1 year | +1 month |

The plan components share almost identical logic. See [Current implementation](current-implementation.md) for mismatches.
