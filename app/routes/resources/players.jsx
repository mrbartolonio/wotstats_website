import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import { useId, useState } from "react";
import invariant from "tiny-invariant";

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

export function CustomerCombobox({ error }) {
  const playersFetcher = useFetcher();
  const id = useId();
  const players = playersFetcher.data?.players ?? [];
  const [selectedRegion, setSelectedRegion] = useState(regions[0].id);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const cb = useCombobox({
    id,
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedCustomer(selectedItem);
    },
    items: players,
    itemToString: (item) => (item ? item.nickname : ""),
    onInputValueChange: (changes) => {
      if (!changes.inputValue) return;

      playersFetcher.submit(
        { query: changes.inputValue, region: selectedRegion },
        { method: "get", action: "/resources/players" }
      );
    },
  });

  const displayMenu = cb.isOpen && players.length > 0;

  return (
    <field>
      <div className="relative">
        <input name="player" type="hidden" value={selectedCustomer?.id ?? ""} />
        <div className="flex flex-wrap items-center gap-1">
          <label {...cb.getLabelProps()}>
            <labe>Customer</labe>
          </label>
          {error ? (
            <em id="customer-error" className="text-d-p-xs text-red-600">
              {error}
            </em>
          ) : null}
        </div>
        <div {...cb.getComboboxProps()}>
          <input
            {...cb.getInputProps({
              className: clsx(
                "text-lg w-full border border-gray-500 px-2 py-1",
                {
                  "rounded-t rounded-b-0": displayMenu,
                  rounded: !displayMenu,
                }
              ),
              "aria-invalid": Boolean(error) || undefined,
              "aria-errormessage": error ? "customer-error" : undefined,
            })}
          />
        </div>
        <ul
          {...cb.getMenuProps({
            className: clsx(
              "absolute z-10 bg-white shadow-lg rounded-b w-full border border-t-0 border-gray-500 max-h-[180px] overflow-scroll",
              { hidden: !displayMenu }
            ),
          })}
        >
          {cb.isOpen
            ? players.map((player, index) => (
                <li
                  className={clsx("cursor-pointer py-1 px-2", {
                    "bg-green-200": cb.highlightedIndex === index,
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
      <div>
        <select
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
      </div>
    </field>
  );
}
