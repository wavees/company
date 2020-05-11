<script>
  // Import some animations from svelte/transition
  import { fade, slide } from "svelte/transition";

  // Import localization module
  import { _, locale, locales } from "svelte-i18n";

  // Importing languages configuration. You'll see where we'll need
  // it.
  import { languages } from "../../config/global.js";

  import moment from "moment";

  // Let's count different parts of world based
  // on our languages files!
  let regions = [];
  let regionCountries = {};

  $locales.forEach((l) => {
    let region = l.split('-')[0];

    if ($_(`worldRegions.${region}`, { default: null }) != null) {
      if (!regions.includes(region)) {
        regions.push(region);
      };

      if (regionCountries[region] == null) {
        regionCountries[region] = [l.split('-')[1]];
      } else {
        regionCountries[region].push(l.split('-')[1]);
      }
    };
  });

  let currentRegion = regions[0];

  // We'll save our current language to cookies.
  // Soo, we need some cookie library, yeah?
  import Cookie from "cookie-universal";
  const cookies = Cookie();

  // Function for changing localization.
  // Pretty straightforward, isn't it?
  function changeLocale(lang) {
    cookies.set('locale', lang, {
      expires: moment().add(1, 'y').toDate()  
    });
    locale.set(lang);
  };

  // Variable, that'll show: is our dropdown
  // menu visible or not.
  let dropdown = false;

  // Function that will change our dropdown
  // variable. Just a little switcher.
  function drop() {
    if (dropdown) {
      dropdown = false;
    } else {
      dropdown = true;
    }
  };

  // 
  // Export one config variable, that'll be needed
  // to properly show this language picker.

  // Icon color
  export let color = "#fff";
</script>

<!-- 
  @section Component
  Component design and layout
 -->
<div class="language-dropdown text-dark">
  { #if dropdown }
    <!-- 
      Chevron-down:
      we use it when our dropdown menu is
      opened. -->
    <button on:click={(e) => {
      drop()
    }} class="text-white p-2 rounded-lg hover:shadow-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
  { :else }
    <!-- 
      Flag icon:
      we use this icon when our dropdown menu
      is closed. It is easily recognizable and so on. -->
    <button on:click={(e) => {
      drop()
    }} class="text-white p-2 rounded-lg hover:shadow-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
    </button>
  { /if }

  <!-- 
    @section Dropdown layout
    Main dropdown layout. Nothing special:
    just another absolute positioned div.
   -->
  { #if dropdown }
    <!-- 
      @explanation We'll check for mouseclick event.
     -->

    <div on:click={(e) => {
      let element = e.originalTarget;

      if (element.classList.contains("language-dropdown")) {
        drop()
      };
    }} class="language-dropdown w-full h-full fixed text-black inset-x-0 top-0 flex justify-center items-center" style="background-color: rgba(0,0,0,0.8); z-index: 999;">
      <div in:slide out:fade class="flex justify-center items-cente rounded-lg shadow-xl bg-gray-200">
        <!-- 
          @section Regions list
          Just a simple list of different regions. And yes, all of this
          regions are auto generated! That's cool, isn't it?
         -->
        <div style="height: auto;" class="hidden md:flex flex-col w-max-md h-full bg-white rounded-lg px-6 py-12 relative">
          {#each regions as region}
            <p on:click={(e) => {
              currentRegion = region;
            }} class="text-xl" style="cursor: pointer; border-bottom: 1px solid #37474F">{$_(`worldRegions.${region}`, { default: region })}</p>
            <!-- Region's countrie -->
            <div class="my-2 pl-4">
              { #each regionCountries[region] as country }
                <p on:click={(e) => {
                  changeLocale(`${region}-${country}`);
                  drop();
                }} class="text-sm my-2" style="cursor: pointer;">{$languages[country] != null ? $languages[country] : country.toUpperCase()}</p>
              { /each }
            </div>
          {/each}
        </div>

        <div class="flex flex-col text-center justify-center items-center px-12 py-6 md:py-12">
          <h2 class="text-xl">Languages in this Region:</h2>
          <!-- 
            @section Languages list based on current region
            Show all languages based on currently choosed
            region.
            -->
          <div class="flex flex-wrap px-4 md:px-12 py-4">
            {#each $locales as locale}
              { #if locale.split('-')[0] == currentRegion }
                <!-- Change localization on div click and than close our dropdown -->
                <div on:click={(e) => {
                  changeLocale(locale);
                  drop();
                }} style="cursor: pointer; width: 10rem;" class="flex justify-start items-center p-4 my-2 mx-4 rounded-lg hover:bg-white">
                  <!-- Localization name and icon -->
                  <img style="height: 2.1em;" src="./icons/flags/{locale.toLowerCase()}.png" alt="{locale.split('-')[1]} flag">
                  <p class="text-sm mx-4 w-full">{$languages[locale.split('-')[1]] != null ? $languages[locale.split('-')[1]] : locale.split('-')[1].toUpperCase()}</p>
                </div>
              { /if }
            {/each}
          </div>

          <h1 class="w-full text-xl text-center">Other languages in other regions:</h1>

          <!-- 
            @section Languages list
            Show all languages, despite their regions
           -->
          <div class="flex flex-wrap px-4 md:px-12 py-4">
            {#each $locales as locale}
              { #if locale.split('-')[0] != currentRegion }
                <!-- Change localization on div click and than close our dropdown -->
                <div on:click={(e) => {
                  changeLocale(locale);
                  drop();
                }} style="cursor: pointer; width: 10rem;" class="flex justify-start items-center p-4 my-2 mx-4 rounded-lg hover:bg-white">
                  <!-- Localization name and icon -->
                  <img style="height: 2.1em;" src="./icons/flags/{locale.toLowerCase()}.png" alt="{locale.split('-')[1]} flag">
                  <p class="text-sm mx-4 w-full">{$languages[locale.split('-')[1]] != null ? $languages[locale.split('-')[1]] : locale.split('-')[1].toUpperCase()}</p>
                </div>
              { /if }
            {/each}
          </div>
        </div>
      </div>
    </div>
  { /if }
</div>