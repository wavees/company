<svelte:head>
  <title>wavees for developers</title>
</svelte:head>

<style>
  .logotype {
    font-family: "Gotham-Thin", sans-serif
  }

  /* .markdown { */
    /* color: #FF9800;  */
    /* border-bottom: 1px dotted #FF5722; */
  /* } */
</style>

<!-- HEADER -->
<div class="w-full bg-gray-900 py-4 px-2 md:px-10 text-white flex flex-row justify-between items-center">
  <div class="logotype flex flex-row justify-center items-center">
    <p class="logotype text-xl" style="font-weight: 600;">Wavees</p>
    <div id="line" class="logotype ml-2 mr-2" style="width: 2.2px; height: 1.4em; background: linear-gradient(180deg, rgba(147,100,187,1) 0%, rgba(234,26,126,1) 100%);"></div>
    <p class="logotype text-xl">Developers</p>
  </div>

  <a class="mx-4" href="/">Features</a>
  <a class="mx-4" href="/">Services</a>
  <a class="mx-4" href="/">Documentation</a>
  <a class="mx-4 flex flex-row items-center" href="/"><img class="rounded-full mx-4" style="height: 2.1em;" src="./icons/daddy.png" alt="Avatar">My Dashboard</a>
</div>

<!-- HERO -->
<div style="width: 100%; height: 100vh;" class="bg-gray-900 flex flex-col md:flex-row md:justify-around items-center">
  <div class="text-white px-4 md:px-0">
    <div class="w-full text-left flex flex-col justify-center items-center">
      <p class="font-medium text-3xl">Make your own working prototypes easy and fast</p>
      <p class="font-thin text-center text-base md:max-w-xl">With these services, you can quickly and easily create stunning prototypes of your future large applications. It's all free, and all for you.</p>
    
      <button class="mt-4 bg-transparent hover:bg-blue-500 hover:text-white text-base text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
        See it in action
      </button>
    </div>
  </div>
</div>
