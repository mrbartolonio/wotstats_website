import React from "react";

function Hero() {
  return (
    <main
      id="content"
      role="main"
      class="m-t mx-auto min-h-max w-full max-w-6xl p-6"
    >
      <div class="mt-7 rounded-xl  bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div class="p-4 sm:p-7">
          <div class="mb-7 text-center">
            <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
              Ciekawy statystyk?
            </h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Wyszukaj swój nick i sprawdź co potrafisz!
            </p>
          </div>

          <div class="items-center justify-between overflow-hidden rounded-lg bg-white px-2 py-1 sm:flex">
            <input
              class="flex-grow px-2 text-base text-gray-400 outline-none "
              type="text"
              placeholder="Wpisz swój nick"
            />
            <div class="ms:flex mx-auto items-center space-x-4 rounded-lg px-2 ">
              <select
                id="Com"
                class="rounded-lg border-2 px-4 py-2 text-base text-gray-800 outline-none"
              >
                <option value="eu" selected>
                  EU server
                </option>
                <option value="na">NA server</option>
                <option value="ru">РУ сервер</option>
                <option value="sea">SEA server</option>
              </select>
              <button class="rounded-lg bg-indigo-500 px-4 py-2 text-base font-thin text-white">
                Wyszukaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
