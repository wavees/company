<script>
  import { _ } from "svelte-i18n";

  import { goto } from "@sapper/app"
</script>

<svelte:head>
  <title>WIP - Wavees Portal</title>
</svelte:head>

<div style="width: 100%; height: 100vh; overflow: hidden" class="flex justify-center items-center bg-gray-100">
  <div class="text-center px-6">
    <p class="my-4">{$_("account.wip", { default: "Work in progress." })}</p>
    
    <button on:click={(e) => {
      goto('/');
    }} class="w-full text-center px-4 py-2 rounded-full bg-white text-blue-600 shadow-xl hover:bg-blue-600 hover:text-white hover:mb-2 hover:shadow-2xl">
      🏘️ {$_("account.home", { default: "Back home" })}
    </button>
  </div>
</div>