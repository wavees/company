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

<svelte:head>
	<link rel="stylesheet" href="./fonts/Junegull/junegull.css">
</svelte:head>

{ #if $isLoading || loading } 
	<div style="height: 100vh; z-index: 2;" class="absolute bg-white w-full flex justify-center items-center">
		<!-- Branding -->
		<div class="flex flex-col justify-center items-center">
			<div class="flex mb-6 items-center">
				<h1 style="font-family: Junegull" class="text-2xl text-bold">wavees</h1>
			</div>

			<Spinner size="25" />
		</div>
	</div>
{ /if }

<div>
  <slot></slot>
</div>