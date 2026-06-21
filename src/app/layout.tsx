import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Vikas Kumar | Senior Full Stack Developer Portfolio",
  description: "Professional developer portfolio of Vikas Kumar, Senior Full Stack Developer. Expert in MERN/PERN, backend microservices, large-scale database migrations, and high-performance React/Next.js architectures.",
  keywords: [
    "Vikas Kumar",
    "Senior Full Stack Developer",
    "Node.js Microservices",
    "MERN Stack Developer",
    "PERN Stack Developer",
    "Next.js Developer",
    "Database Migration Expert",
    "Hyderabad Software Engineer"
  ],
  authors: [{ name: "Vikas Kumar" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
