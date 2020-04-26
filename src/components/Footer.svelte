<script>
  import { _ } from "svelte-i18n";
  import LanguagePicker from "./Pickers/LanguagePicker.svelte";
</script>

<div class="w-full flex justify-between px-4 absolute inset-x-0 bottom-0">
  <div class="flex items-center justify-center">
    <a href="http://wvees.herokuapp.com/" class="logotype text-xl" style="font-weight: 600;">Wavees</a>
    <div class="mx-6 text-sm">
      <LanguagePicker />
    </div>
  </div>

  <div class="flex items-center text-sm text-dark">
    <a href="http://wvees.herokuapp.com/#projects" class="mx-2">{$_("landing.header.projects")}</a>
    <a href="http://wvees.herokuapp.com/#about" class="mx-2">{$_("landing.header.about")}</a>
    <a href="http://wvees.herokuapp.com/" class="mx-2">{$_("landing.header.contact")}</a>
  </div>

</div>