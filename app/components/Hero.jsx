import React from "react";
import axios from "axios";

function Hero() {
  const [search, setSearch] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState(null);

  const suggestClick = (text) => {
    setSearch(text);
    setSuggestions(null);
  };

  const onChange = (text) => {
    if (text.length > 4) {
      axios
        .get(
          `https://api.worldoftanks.eu/wot/account/list/?application_id=26279dc6f98afb8f849533c6c8a75c92&search=${text}`
        )
        .then(function (response) {
          // handle success
          setSuggestions(response.data.data.slice(0, 5));
          console.log(response.data.data.slice(0, 5));
        })
        .catch(function (error) {
          // handle error
          setSuggestions(null);
          console.log(error);
        });
    } else {
      setSuggestions(null);
    }
    setSearch(text);
  };

  return (
    <main
      id="content"
      role="main"
      className="m-t mx-auto min-h-max w-full max-w-6xl p-6"
    >
      <div className="mt-7 rounded-xl  bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4 sm:p-7">
          <div className="mb-7 text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Ciekawy statystyk?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Wyszukaj swój nick i sprawdź co potrafisz!
            </p>
          </div>

          <div className="items-center justify-between overflow-hidden rounded-lg bg-white px-2 py-1 sm:flex">
            <input
              className="flex-grow px-2 text-base text-gray-400 outline-none "
              type="text"
              placeholder="Wpisz swój nick"
              onChange={(e) => onChange(e.target.value)}
              value={search}
            />

            <div className="ms:flex mx-auto items-center space-x-4 rounded-lg px-2 ">
              <select
                id="Com"
                className="rounded-lg border-2 px-4 py-2 text-base text-gray-800 outline-none"
                defaultValue={"eu"}
              >
                <option value="eu">EU server</option>
                <option value="na">NA server</option>
                <option value="ru">РУ сервер</option>
                <option value="sea">SEA server</option>
              </select>
              <button className="rounded-lg bg-indigo-500 px-4 py-2 text-base font-thin text-white">
                Wyszukaj
              </button>
            </div>
          </div>
          {suggestions && (
            <div className="m-t absolute mx-auto min-h-max w-full max-w-6xl rounded-lg bg-white p-6 pb-2 pt-2 pl-4 pr-4">
              {suggestions.map((suggest) => (
                <div
                  onClick={() => suggestClick(suggest.nickname)}
                  className=" bg-white hover:bg-slate-100"
                  key={suggest.account_id}
                >
                  {suggest.nickname}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Hero;
