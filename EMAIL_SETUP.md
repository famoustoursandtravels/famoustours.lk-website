# Email Configuration Setup

This app sends **internal notification emails only** (to `EMAIL_TO`). It does not email the customer a confirmation, and it does not attach PDFs.

Both endpoints use shared helpers in `lib/mail.ts`:

- `POST /api/send-booking` — new booking requests
- `POST /api/contact` — contact form messages

Each message is sent with `Reply-To` set to the visitor/customer address so you can reply from your inbox.

## Required environment variables

Create `.env.local` from `.env.example`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-or-smtp-password
EMAIL_FROM="Famous Tours & Travels <your-email@gmail.com>"
EMAIL_TO=inbox@example.com
```

| Variable | Purpose |
|----------|---------|
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | Usually `587` (STARTTLS) or `465` (SSL) |
| `SMTP_SECURE` | `true` only for SSL on port 465; otherwise `false` |
| `EMAIL_USER` | SMTP login username |
| `EMAIL_PASS` | SMTP password or app password |
| `EMAIL_FROM` | From header (falls back to `EMAIL_USER` if empty) |
| `EMAIL_TO` | Inbox that receives booking + contact notifications |

If any required variable is missing, the API returns HTTP 500 with a JSON error — it does not crash the server.

## Gmail (app password)

1. Enable 2-Step Verification on the Google account
2. Create an [App Password](https://myaccount.google.com/apppasswords) for Mail
3. Use:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM="Famous Tours & Travels <your-email@gmail.com>"
EMAIL_TO=your-email@gmail.com
```

## Other providers

Point `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` at your provider (Outlook, Yahoo, cPanel, etc.). No `service:` field is used — configuration is entirely via these env vars in `lib/mail.ts`.

## Testing

1. Fill `.env.local` and restart `npm run dev`
2. Submit the booking or contact form
3. Confirm a message arrives in `EMAIL_TO`
4. Reply to that message — it should go to the visitor (`Reply-To`)

## Security

- Never commit `.env.local`
- Prefer app passwords / SMTP credentials over your main account password
- Use a dedicated mailbox for the app when possible

## Troubleshooting

**Email not sending / API returns 500**

- Confirm every variable in `.env.example` is set in `.env.local`
- Restart the dev server after editing env vars
- Check the server console for `SMTP is not configured` / `missing EMAIL_TO` errors
- Verify host, port, and credentials with your provider

**Gmail rejects login**

- Use an app password, not your normal password
- Confirm 2-Step Verification is enabled
