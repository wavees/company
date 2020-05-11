<script>
  import { landingPages } from "../../config/global.js";
  import { goto } from "@sapper/app";

  export let page = "index";
</script>

<!-- Footer dots -->
<div class="absolute inset-x-0 bottom-0 w-full hidden md:flex justify-center items-center py-4" style="z-index: 3;">

  {#each $landingPages as item}
    <span on:click={(e) => {
      goto(item.url);
    }} style="width: {item.id == page ? "1.4" : "0.8"}rem; height: {item.id == page ? "1.4" : "0.8"}rem; background: {item.id == page ? item.color : "#d4d7e0"};" class="mx-4 rounded-full"></span>
  {/each}

</div>