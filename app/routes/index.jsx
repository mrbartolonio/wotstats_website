import { useFetcher } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import Hero from "~/components/Hero";
import { Footer } from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { CustomerCombobox } from "~/routes/resources/players";

export async function action({ request }) {
  const formData = await request.formData();
  const player = formData.get("player");
  const region = formData.get("region");
  console.log(player, region);
  return redirect("/asd");
}

export default function Index() {
  const fetcher = useFetcher();
  const loading = fetcher.status === "idle";
  return (
    <main className="flex h-screen flex-col justify-between bg-gray-900">
      <Navbar />
      <fetcher.Form method="post" action=".">
        <CustomerCombobox />
        <button type="submit" disable={!loading}>
          {loading ? "Submit" : "Submiting..."}
        </button>
      </fetcher.Form>
      <Hero className="mb-auto" />
      <Footer />
    </main>
  );
}
