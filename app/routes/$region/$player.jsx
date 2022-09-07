import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

export async function loader({ params }) {
  const { region, player } = params;
  invariant(typeof player === "string", "player is required");
  invariant(typeof region === "string", "region is required");
  return json({ region, player });
}

export default function Player() {
  const data = useLoaderData();

  return <h1>hello</h1>;
}
