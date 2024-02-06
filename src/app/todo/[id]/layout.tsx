import { Providers } from "@/redux/provider";

// import "./globals.css";
export const metadata = {
    title: "Todo List",
    description: "Todo List App",
  };
  
  export default function TodoByIdLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
      </html>
    );
  }
  