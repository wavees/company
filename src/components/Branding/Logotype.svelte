<script>
  import { _ } from "svelte-i18n";

  // Path for title in localization files.
  // export let title = "@portal";
</script>

<div class="flex items-center">
  <img style="height: 1.25em;" src="./icons/logo/wavees.svg" alt="wavees logo">
      
  <!-- Line -->
  <!-- <div style="width: 2.2px; height: 1.7em; background: linear-gradient(180deg, rgba(147,100,187,1) 0%, rgba(234,26,126,1) 100%);" class="mx-4"></div> -->

  <!-- 
    @explanation Should we find that title in localization
    file or should we just show it? Let's check this.
   -->
  <!-- <h2 class="mx-2 text-xl text-semibold">
    { #if title.split('').includes("@") }
      {$_(`titles.${title.replace("@", "")}`, { default: "Portal" })}
    { :else }
      {title}
    { /if }
  </h2> -->
</div>