import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Single brand font via next/font (self-hosted, non-blocking)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Famous Tours and Travels",
  description: "Explore Sri Lanka like never before!",
  icons: {
    icon: [{ url: "/Favicon.png", type: "image/png" }],
    shortcut: ["/Favicon.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* JSON-LD only — not render-blocking third-party scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Famous Tours & Travels",
              url: "https://famoustoursandtravels.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://famoustoursandtravels.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["TouristAgency", "TravelAgency", "LocalBusiness"],
              name: "Famous Tours & Travels",
              telephone: "+94 77 349 9157",
              email: "info@famoustoursandtravels.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "330/25, Prison Camp Road",
                addressLocality: "Dalupotha",
                addressCountry: "Sri Lanka",
              },
              url: "https://famoustoursandtravels.com",
              logo: "https://famoustoursandtravels.com/images/logo.webp",
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://famoustoursandtravels.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Packages",
                  item: "https://famoustoursandtravels.com/packages",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Contact Us",
                  item: "https://famoustoursandtravels.com/contact-us",
                },
              ],
            }),
          }}
        />
      </head>

      <body className="font-poppins antialiased overflow-x-hidden max-w-full">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
