<script>
  import { locale, locales } from "svelte-i18n";
  
  import Cookie from "cookie-universal";
  const cookies = Cookie();

  function changeLocale(lang) {
    cookies.set('locale', lang);
    locale.set(lang);
  }

</script>

<div class="flex">
  { #each $locales as locale }
    <button class="mx-2" on:click={(e) => {
      changeLocale(locale);
    }}>
      {locale.toUpperCase()}
    </button>

    <!-- <div style="width: 2.2px; height: 1.7em; background: #fff" class="mx-2"></div> -->
  { /each }
</div>