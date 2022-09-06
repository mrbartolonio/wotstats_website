import { Link } from "@remix-run/react";
import Hero from "~/components/Hero";
import { Footer } from "~/components/Footer";
import Navbar from "~/components/Navbar";
export default function Index() {
  return (
    <main className="flex h-screen flex-col justify-between bg-gray-900">
      <Navbar />
      <Hero className="mb-auto" />
      <Footer />
    </main>
  );
}
