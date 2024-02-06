import { Providers } from "@/redux/provider";

// import "./globals.css";
export const metadata = {
  title: "Todo List",
  description: "Todo List App",
};

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
