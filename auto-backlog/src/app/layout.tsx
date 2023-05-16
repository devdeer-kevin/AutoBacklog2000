import "./globals.css";

export const metadata = {
  title: "AutoBacklog",
  description: "Automated Backlog Generation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
