import "./globals.css";
// import dynamic from 'next/dynamic'
// const Nav = dynamic(() => import("../../components/nav/nav"), {ssr: false})
import Nav from "../../components/nav/nav";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div className="main">{children}</div>
      </body>
    </html>
  );
}