# Famous Tours & Travels

Next.js website for Famous Tours & Travels — Sri Lanka tour packages, booking requests, and contact form.

## Features

- Tour package pages driven by `data/packages.json`
- Booking form with client-side validation
- Contact form
- Internal notification emails via Nodemailer (SMTP)
- Responsive UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Email**: Nodemailer (custom SMTP via `lib/mail.ts`)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy environment variables and fill in SMTP credentials:

```bash
cp .env.example .env.local
```

Required variables (see `.env.example`):

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-smtp-username
EMAIL_PASS=your-smtp-password
EMAIL_FROM="Famous Tours & Travels <noreply@example.com>"
EMAIL_TO=inbox@example.com
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Email behaviour (current)

Both `/api/send-booking` and `/api/contact`:

1. Validate the submitted fields
2. Create an SMTP transport with `getTransporter()` from `lib/mail.ts`
3. Send **one** email to `EMAIL_TO` (your inbox)
4. Set `Reply-To` to the visitor/customer so you can reply directly

There is **no** automated customer confirmation email and **no** PDF attachment in the current codebase. See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for provider setup and troubleshooting.

## Booking process

1. User fills the booking form (`TourBookingForm`)
2. Form posts JSON to `/api/send-booking`
3. API emails the booking details to `EMAIL_TO`
4. Success notification is shown in the browser

## Project Structure

```
├── app/
│   ├── api/contact/          # Contact form email API
│   ├── api/send-booking/     # Booking request email API
│   ├── booking/              # Booking page
│   └── ...
├── components/
│   ├── TourBookingForm.tsx
│   ├── ContactForm.tsx
│   └── ...
├── data/
│   └── packages.json         # Tour package content
├── lib/
│   └── mail.ts               # Nodemailer SMTP helpers
└── public/images/            # Static assets
```

## Deploy

Deploy on [Vercel](https://vercel.com) or any Node host. Set the same env vars in the hosting dashboard. Do not commit `.env.local`.
