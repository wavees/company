<script>
  // Import localization module
  import { _, locale, locales } from "svelte-i18n";

  // We'll save our current language to cookies.
  // Soo, we need some cookie library, yeah?
  import Cookie from "cookie-universal";
  const cookies = Cookie();

  // Function for changing localization.
  // Pretty straightforward, isn't it?
  function changeLocale(lang) {
    cookies.set('locale', lang);
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
</script>

<!-- 
  @section Component
  Component design and layout
 -->
<div class="language-dropdown relative">
  { #if dropdown }
    <!-- 
      Chevron-down:
      we use it when our dropdown menu is
      opened. -->
    <button on:click={(e) => {
      drop()
    }} class="text-white p-2 rounded-lg hover:shadow-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
  { :else }
    <!-- 
      Flag icon:
      we use this icon when our dropdown menu
      is closed. It is easily recognizable and so on. -->
    <button on:click={(e) => {
      drop()
    }} class="text-white p-2 rounded-lg hover:shadow-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
    </button>
  { /if }

  <!-- 
    @section Dropdown layout
    Main dropdown layout. Nothing special:
    just another absolute positioned div.
   -->
  { #if dropdown }
    <!-- 
      @explanation We'll check for mouseout event.
      @bugs Knows bugs:
      
      1. It only works when mouseover event
      is fired. So, if you open this menu and instantaneously
      point your mouse somewhere else - this dropdown won't close.

     -->
    <div on:mouseout={(e) => {
      let parent = e.relatedTarget.parentElement;
      
      if (!parent.classList.contains("language-dropdown")) {
        dropdown = false;
      }
    }} class="language-dropdown text-black text-center absolute right-0 mt-2 px-2 md:px-6 py-6 w-40 bg-white rounded-lg shadow-xl">
      <!-- 
        @section Language list
        Just simple language list. Yes, we use PNG icons for flags.
        Yes, this is dumb, I know. We'll fix it later and we will
        use SVG icons instead. I swear!
       -->
      <h1 class="text-xl font-semibold">{$_("languagePicker.language", { default: "Language" })}</h1>

      <div class="language-dropdown flex flex-col flex-wrap items-center justify-center">
        { #each $locales as locale}

          <!-- Change localization on div click and than close our dropdown -->
          <div on:click={(e) => {
            changeLocale(locale);
            drop();
          }} style="cursor: pointer;" class="language-dropdown w-full flex justify-start items-center p-4 my-2 rounded-lg hover:bg-gray-100">
            <!-- Localization name and icon -->
            <img style="height: 2.1em;" src="./icons/flags/{locale.toLowerCase()}.png" alt="{locale} flag">
            <p class="text-sm mx-4">{locale.toUpperCase()}</p>
          </div>
        { /each }
      </div>
    </div>
  { /if }
</div>