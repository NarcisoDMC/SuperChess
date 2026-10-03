import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import "./globals.css";
import Navbar from "@/components/Home/navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SuperChess - El mejor profesor de Ajedrez",
    description: "Aprende ajedrez hasta convertirte en un gran maestro, compitiendo con personas de todo el mundo y Agentes de Inteligencia Artificial.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="es"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body
                suppressHydrationWarning
                className="min-h-full bg-background font-sans text-foreground antialiased"
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Navbar />
                    {children}
                    <ThemeToggleButton />
                </ThemeProvider>
            </body>
        </html>
    );
}
