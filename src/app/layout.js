import "./globals.css";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../../components/nav/nav"), { ssr: false });

export const metadata = {
  title: "UNIVERSAL MEAT EXPO",
  description: "Search for the best Meat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/cow.png" />
      </head>
      <body>
        <Nav />
        <div className="main">{children}</div>
      </body>
    </html>
  );
}
