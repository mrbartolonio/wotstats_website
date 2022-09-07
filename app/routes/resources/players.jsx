import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import { useId, useState, useRef } from "react";
import invariant from "tiny-invariant";
import { debounce } from "lodash";

const regions = [
  { id: "eu", name: "EU server" },
  { id: "com", name: "NA server" },
  { id: "ru", name: "РУ сервер" },
  { id: "asia", name: "SEA server" },
];

export async function loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const region = url.searchParams.get("region");
  invariant(typeof query === "string", "query is required");
  invariant(typeof region === "string", "region is required");

  try {
    const res = await fetch(
      `https://api.worldoftanks.${region}/wot/account/list/?application_id=${process.env.WOT_TOKEN}&search=${query}`
    );
    const { data } = await res.json();
    return json({
      players: data,
    });
  } catch (e) {
    throw e;
  }
}

export function PlayerCombobox({ error }) {
  const playersFetcher = useFetcher();
  const id = useId();
  const players = playersFetcher.data?.players ?? [];
  const [selectedRegion, setSelectedRegion] = useState(regions[0].id);

  const debouncedSearch = useRef(
    debounce((value) => {
      if (!value) return;

      playersFetcher.submit(
        { query: value, region: selectedRegion },
        { method: "get", action: "/resources/players" }
      );
    }, 300)
  ).current;

  const cb = useCombobox({
    id,
    items: players,
    itemToString: (item) => (item ? item.nickname : ""),
    onInputValueChange: ({ inputValue }) => {
      debouncedSearch(inputValue);
    },
  });

  const displayMenu = cb.isOpen && players.length > 0;

  return (
    <>
      <div className="relative w-full grow">
        <div className="flex flex-wrap items-center gap-1">
          <label {...cb.getLabelProps()}></label>
          {error ? (
            <em id="player-error" className="text-d-p-xs text-red-600">
              {error}
            </em>
          ) : null}
        </div>
        <div {...cb.getComboboxProps()}>
          <input
            name="player"
            {...cb.getInputProps({
              className: clsx(
                "flex-grow p-2 text-base  border-grey-300 border-2 w-full",
                {
                  "rounded-t rounded-b-0": displayMenu,
                  rounded: !displayMenu,
                }
              ),
              "aria-invalid": Boolean(error) || undefined,
              "aria-errormessage": error ? "player-error" : undefined,
            })}
          />
        </div>
        <ul
          {...cb.getMenuProps({
            className: clsx(
              "absolute z-10 bg-white shadow-lg rounded-b w-full border border-t-0 border-gray-400 max-h-[180px] overflow-y-scroll ",
              { hidden: !displayMenu }
            ),
          })}
        >
          {cb.isOpen
            ? players.map((player, index) => (
                <li
                  className={clsx("cursor-pointer py-1 px-2", {
                    "bg-indigo-200": cb.highlightedIndex === index,
                  })}
                  key={player.account_id}
                  {...cb.getItemProps({ item: player, index })}
                >
                  {player.nickname}
                </li>
              ))
            : null}
        </ul>
      </div>

      <select
        className="w-full rounded-lg border-2 px-4 py-2 text-base text-gray-800 outline-none md:w-auto"
        name="region"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>
    </>
  );
}
