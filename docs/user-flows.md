# User and AI flows

[← Documentation home](../README.md)

## Access flow

```mermaid
flowchart TD
    Open[Open app] --> Token{JWT stored?}
    Token -- No --> Auth[OTP signup or login]
    Auth --> Token
    Token -- Yes --> User[Load MongoDB user]
    User --> Active{Subscribed?}
    Active -- No --> Plans[Choose plan and pay]
    Plans --> Active
    Active -- Yes --> Tools[Text / audio / image tools]
    Active -- Unsubscribe --> Off[Mark unsubscribed]
```

The frontend performs the subscription gate. AI endpoints are not protected by subscription middleware.

## AI flows

```mermaid
flowchart LR
    Text[Text + languages] --> Translate[Groq Llama translation]
    Translate --> TTS[Groq text-to-speech]

    Mic[Browser recording] --> Whisper[Groq Whisper translation]
    Whisper --> TTS

    File[Selected image] --> Cloud[Temporary Cloudinary upload]
    Cloud --> Vision[Groq vision analysis]
    Vision --> Delete[Delete uploaded image]
```

| Tool | Input | Output |
|---|---|---|
| Text | Text and language pair | Translation and optional speech |
| Audio | Browser WebM recording | Translated text and optional speech |
| Image | Uploaded image | Text description |
