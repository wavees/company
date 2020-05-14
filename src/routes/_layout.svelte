<script>
  import { fade } from 'svelte/transition';
  import { onMount } from "svelte";
  
  import { isLoading } from "svelte-i18n"; 
  import Spinner from "../components/Spinner.svelte";

  import { locale, locales } from "svelte-i18n"

  import Cookie from "cookie-universal";
  const cookies = Cookie();

  let loading = true;

  function checkLanguage() {
    let currentLocale = cookies.get('locale');

    if (currentLocale) {
      if ($locales.includes(currentLocale)) {
        locale.set(currentLocale);
      }
    };

    setTimeout(() => {
      loading = false;
    }, 150);
  };

  onMount(() => {
    checkLanguage();
  });
</script>

{ #if $isLoading || loading }
  <div in:fade out:fade class="absolute flex justify-center items-center bg-white" style="width: 100%; height: 100vh; z-index: 999;">
    <div class="flex flex-col justify-center items-center">
      <Spinner />
      <p class="text-sm">Loading locales...</p>
    </div>
  </div>
{ /if }

<div>
  <slot></slot>
</div>