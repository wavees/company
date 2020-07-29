<script>

  // Small Header Links array.
  let links = [
    {
      url: "https://wavees.ml",
      title: "Our Projects"
    },
    {
      type: "logotype"
    },
    {
      url: "https://github.com/wavees",
      title: "Get In Touch"
    }
  ]
</script>

<svelte:head>
  <title>Wavees Company - Explained</title>
  <link rel="stylesheet" href="./fonts/Junegull/junegull.css">
</svelte:head>

<!-- Site's main content -->
<main class="w-full relative">

  <!-- Header -->
  <div class="absolute inset-x-0 top-0 py-4 md:py-6 w-full flex justify-center items-center">

    <!-- Links -->
    {#each links as link}

      <!-- 
        Let's now determine the "type"
        of our link. -->
      {#if link.type == "logotype"}
        <div class="mx-6 text-center">
          <h1 style="font-family: Junegull;" class="text-xl">wavees</h1>
          <p class="text-gray-700 text-sm">company</p>
        </div>
      { :else }
        <a class="mx-4 text-sm hidden md:block" href="{link.url}">{link.title}</a>
      {/if}
    {/each}

  </div>

  <!-- Simple Hero (showing off some our projects) -->
  <div class="w-full h-100vh flex justify-center items-center bg-gray-100">
    <!-- Some Text -->
    <div style="" class="w-full md:w-2/4 lg:w-1/3 px-4 md:px-0 flex flex-col justify-center items-center text-center">
      <h1 class="text-2xl font-semibold">We're just getting started.</h1>
      <p class="text-gray-700 text-sm">There are only two developers on our team so far... That's why things are going so slowly. If you got here (how did you even find us?), you should just forget about what you just saw.</p>

      <p class="my-6">But if you insist...</p>

      <!-- Buttons -->
      <div class="flex">
        <!-- Github Button -->
        <button on:click={(e) => window.location.href = "https://github.com/wavees"} class="px-6 py-2 rounded-full bg-blue-400 text-white flex">
          <span style="width: 1.2rem;" class="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </span>

          <p>Our Github</p>
        </button>

        <!-- <button class="">
        
        </button> -->
      </div>
    </div>
    <!-- Some Projects -->

  </div>

</main>