<script>
  // Import localization library.
  import { _ } from "svelte-i18n";

  import { goto } from "@sapper/app";

  // Import another components, needed for header.
  import Logotype from "./Branding/Logotype.svelte";
  import LanguagePicker from "./Pickers/LanguagePicker.svelte";
  import ProjectsDropdown from "./ProjectsDropdown.svelte";

  export let color = "#fff";
</script>

<!-- 
  @section Header div

  @warning It's code hasn't been refactored yet. 
 -->
<div style="z-index: 1; color: {color}" class="absolute inset-x-0 top-0 px-2 md:px-12 lg:px-24 w-full py-2 md:py-4 flex items-center justify-between">
  <div class="flex items-center">
    <Logotype title="@portal" />
  </div>

  <div class="flex text-sm items-center justify-center">
    <div class="mx-2 flex">
      <LanguagePicker color={color} />
    </div>

    <div class="hidden md:flex items-center justify-center">
      <ProjectsDropdown color={color} />

      <button on:click={(e) => {
        window.location.href = "https://twitter.com/wavees_hq";
      }} class="hidden md:block mx-2 px-4 py-2 rounded-full bg-white text-blue-600 shadow-xl hover:bg-blue-600 hover:text-white hover:mb-2 hover:shadow-2xl">
        📣 {$_("landing.header.contact", { default: "Contact" })}
      </button>
    </div>
  </div>
</div>