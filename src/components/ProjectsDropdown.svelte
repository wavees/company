<script>
  import { _ } from "svelte-i18n";

  let projects = [
    "Bokkr",
    "Unicorn",
    "Pigeon",
    "Paradise"
  ]

  function drop() {
    if (dropdown) {
      dropdown = false;
    } else {
      dropdown = true;
    }
  }

  export let dropdown;
</script>

<div class="dropdown relative">
  { #if dropdown }
    <button on:click={(e) => {
      drop()
    }} class="text-white p-2 rounded-lg hover:shadow-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
  { :else }
    <button on:click={(e) => {
      drop()
    }} class="text-white p-2 rounded-lg hover:shadow-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    </button>

  { /if }

  <!-- DROPDOWN -->
  { #if dropdown }
    <div on:mouseout={(e) => {
      let parent = e.relatedTarget.parentElement;
      
      if (!parent.classList.contains("dropdown")) {
        dropdown = false;
      }
    }} class="dropdown text-black text-center absolute right-0 mt-2 px-2 md:px-6 py-6 w-64 bg-white rounded-lg shadow-xl">
      <h1 class="text-xl font-semibold">{$_("landing.projects.title", { default: "Our services" })}</h1>
      
      <div class="dropdown flex flex-wrap items-center justify-center">
        { #each projects as project}
          <div style="cursor: pointer;" class="dropdown flex flex-col justify-center items-center p-4 my-2 w-24 h-24 rounded-lg hover:bg-gray-100">
            <img style="width: 2.1em; height: 2.1em;" src="./icons/logo/{project.toLowerCase()}.svg" alt="{project} logo">
            <p class="text-sm">{project}</p>
          </div>
        { /each }

      <!-- <div class="dropdown flex flex-wrap items-center justify-center">
        <div style="cursor: pointer;" class="dropdown flex flex-col justify-center items-center p-4 my-2 w-24 h-24 rounded-lg hover:bg-gray-100">
          <img style="width: 2.1em; height: 2.1em;" src="./icons/logo/bokkr.svg" alt="bokkr logo">
          <p class="text-sm">Bokkr</p>
        </div>
        
        <div style="cursor: pointer;" class="dropdown flex flex-col justify-center items-center p-4 my-2 w-24 h-24 rounded-lg hover:bg-gray-100">
          <img style="width: 2.1em; height: 2.1em;" src="./icons/logo/unicorn.svg" alt="unicorn logo">
          <p class="text-sm">Unicorn</p>
        </div>

        <div style="cursor: pointer;" class="dropdown flex flex-col justify-center items-center p-4 my-2 w-24 h-24 rounded-lg hover:bg-gray-100">
          <img style="width: 2.1em; height: 2.1em;" src="./icons/logo/pigeon.svg" alt="pigeon logo">
          <p class="text-sm">Pigeon</p>
        </div>

        <div style="cursor: pointer;" class="dropdown flex flex-col justify-center items-center p-4 my-2 w-24 h-24 rounded-lg hover:bg-gray-100">
          <img style="width: 2.1em; height: 2.1em;" src="./icons/logo/paradise.svg" alt="paradise logo">
          <p class="text-sm">Paradise</p>
        </div>
      </div> -->
      </div>

      <p class="my-4 underline">{$_("landing.projects.developers", { default: "For developers" })}</p>

      <p class="text-sm">{$_("landing.projects.soon", { default: "Soon..." })}</p>
    </div>
  { /if }
</div>