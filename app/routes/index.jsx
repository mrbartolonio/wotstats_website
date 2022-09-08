import { useFetcher } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import React from "react";
import invariant from "tiny-invariant";
import { useSpinDelay } from "spin-delay";
import { PlayerCombobox } from "~/routes/resources/players";
import { Spinner } from "~/components/Spinner";
import { getPlayerInfo } from "~/models/player.server";

export async function action({ request }) {
  const formData = await request.formData();
  const player = formData.get("player");
  const region = formData.get("region");
  invariant(typeof player === "string", "player is required");
  invariant(typeof region === "string", "region is required");
  if (player.length > 3 && region.length > 1) {
    try {
      await getPlayerInfo(player, region);
      return redirect(`/${region}/${player}`);
    } catch (error) {
      console.log(error);
      return json({ error });
    }
  }

  /*   await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  }); */

  console.log(typeof player);
  console.log(player, region);
  //return redirect(`/${region}/${player}`);
}

export default function Index() {
  const fetcher = useFetcher();
  const loading = fetcher.state !== "idle";
  const showSpinner = useSpinDelay(loading, { delay: 300, minDuration: 200 });
  return (
    <fetcher.Form
      method="post"
      action="."
      className="flex w-full items-center justify-center "
    >
      <div className="mt-7 w-5/6 rounded-xl  bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 lg:w-1/2">
        <div className="p-4 sm:p-7">
          <div className="mb-7 text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Ciekawy statystyk?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Wyszukaj swój nick i sprawdź co potrafisz!
            </p>

            {fetcher.data && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Wystąpił błąd z serwerem! {fetcher.data.error.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center justify-between gap-2 rounded-lg bg-white px-2 py-1 md:flex-row md:gap-0">
            <PlayerCombobox />
            <button
              className="w-full rounded-lg bg-indigo-500 px-4 py-2 text-base font-thin text-white md:w-auto"
              type="submit"
              disabled={loading}
            >
              {showSpinner ? (
                <Spinner className="aspect-square h-full" />
              ) : (
                "Wyszukaj"
              )}
            </button>
          </div>
        </div>
      </div>
    </fetcher.Form>
  );
}
