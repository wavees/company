<script>
  import { _ } from "svelte-i18n";
  import LanguagePicker from "./Pickers/LanguagePicker.svelte";
</script>

<div class="w-full flex justify-between px-4 absolute inset-x-0 bottom-0">
  <div class="flex items-center justify-center">
    <p class="logotype text-xl" style="font-weight: 600;">Wavees</p>
    <div class="mx-6 text-sm">
      <LanguagePicker />
    </div>
  </div>

  <div class="flex items-center text-sm text-dark">
    <p class="mx-2">{$_("landing.header.projects")}</p>
    <p class="mx-2">{$_("landing.header.about")}</p>
    <p class="mx-2">{$_("landing.header.contact")}</p>
  </div>

</div>