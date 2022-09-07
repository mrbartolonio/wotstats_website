import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

const {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} = require("@remix-run/react");

const tailwindStylesheetUrl = require("./styles/tailwind.css");

export const links = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta = () => ({
  charset: "utf-8",
  title: "Wot stats",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="pl" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col justify-between bg-gray-900">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
