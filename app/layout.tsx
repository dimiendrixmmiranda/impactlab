import type { Metadata } from "next";
import {
	Geist,
	Geist_Mono,
	Oswald,
	Share_Tech,
	Exo_2,
	Roboto,
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const oswald = Oswald({
	variable: "--font-oswald",
	subsets: ["latin"],
});

const shareTech = Share_Tech({
	variable: "--font-share-tech",
	weight: "400",
	subsets: ["latin"],
});

const exo2 = Exo_2({
	variable: "--font-exo-2",
	subsets: ["latin"],
});

const roboto = Roboto({
	variable: "--font-roboto",
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ImpactLab",
	description: "Transformando colisões em cálculos.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="pt-br"
			className={`
			${geistSans.variable}
			${geistMono.variable}
			${oswald.variable}
			${shareTech.variable}
			${exo2.variable}
			${roboto.variable}
			h-full
			antialiased
		`}
		>
			<body className="min-h-full bg-background text-foreground">
				{children}
			</body>
		</html>
	);
}