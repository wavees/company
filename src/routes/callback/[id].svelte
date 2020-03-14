<script>
  // Импортим модули
  import { stores } from "@sapper/app"
  import { onMount } from "svelte";
  import { api } from '../../config/global.js';

  import Spinner from "../../components/Spinner.svelte";
  // import Userbar from "../../components/Userbar.svelte";
  import { fade } from 'svelte/transition';

  const application = {
    url: $api.url
  };

  const { page } = stores();
  const { id } = $page.params;

  let loading = true;
  let callback = {
    error: "NotFound"
  };

  onMount(() => {
    fetch(`${application.url}/callback/link/${id}`)
    .then((data) => data.json())
    .then((data) => {
      callback = data;
      loading = false;
    })
  });
</script>

<!-- Две отдельные странички:
  1. Запись не найдена;
  2. Запись найдена, всё хорошо.
 -->

{ #if loading }
  <div transition:fade style="z-index: 999; width: 100%; height: 100vh;" class="bg-white absolute flex justify-center items-center">
    <Spinner />
  </div>
{ /if }

<div style="width: 100%; height: 100vh; overflow: hidden" class="{ callback.error != "NotFound" ? "bg-gray-100" : "" } flex justify-center items-center">
  { #if callback.error == "NotFound" }
    <div style="width: 100%; height: 100vh" class="bg-red-500 flex justify-center items-center">
      <div>
        <p>Page Not Found!</p>
      </div>
    </div>
  { :else }
    <div class="w-2/6 md:bg-white md:rounded-lg md:shadow-xl" style="min-width: max-content;">
      <div class="p-2 md:p-8">
        <p class="text-xl pb-2">please, login</p>
        <div class="items-center text-center">
          <input id="username" class="appearance-none w-full py-2 px-3 border border-dashed" type="text" placeholder="username">
          <button class="m-6 bg-transparent hover:bg-blue-500 hover:text-white text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
            proceed
          </button>
        </div>
      </div>
    </div>
  { /if }
</div>