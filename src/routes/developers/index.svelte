<script>
  import { onMount } from "svelte";

  import { fade } from 'svelte/transition';
  import Userbar from "../../components/Userbar.svelte";

  import Cookie from 'cookie-universal'
  const cookies = Cookie();

  let userExists = null;

  function updateAccount() {
    if (cookies.get('token')) {
      userExists = true;
    } else {
      userExists = false;
    }
  };

  function proceed(type) {
    if (type == "signup") {
      fetch(`${application.url}/callback`,
      {
        method: "POST",
        body: JSON.stringify({ url: "wvees.herokuapp.com:3000/auth" }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.url != null) {
          window.location.href = `${response.url}`;
        } else {
          console.log("ERROR");
        }
      });
    }
  }

  onMount(() => {
    updateAccount();

    setInterval(() => {
      updateAccount();
    }, 2000);
  });
</script>

<svelte:head>
  <title>wavees for developers</title>
</svelte:head>

<style>
  .header {
    font-family: "Gotham-Thin", sans-serif
  }
  
  .header_links a {
    font-family: "Gotham-Thin", sans-serif
  }
</style>

<div style="overflow: hidden; width: 100%; height: 100vh;">
  <Userbar applicationSlug="dev" />

	<main style="overflow: auto;">
    <div in:fade style="overflow-y: scroll; width: 100%; height: 100vh;" class="bg-gray-900">
      <!-- HEADER -->
      <div class="w-full header_links bg-gray-800 py-4 px-2 md:px-10 text-white flex flex-row justify-between items-center">
        <div class="header flex flex-row justify-center items-center">
          <p class="header text-xl" style="font-weight: 600;">Wavees</p>
          <div id="line" class="header ml-2 mr-2" style="width: 2.2px; height: 1.4em; background: linear-gradient(180deg, rgba(147,100,187,1) 0%, rgba(234,26,126,1) 100%);"></div>
          <p class="header text-xl">Developers</p>
        </div>

        <a class="mx-4" href="/">Features</a>
        <a class="mx-4" href="/">Services</a>
        <a class="mx-4" href="/">Documentation</a>

        { #if userExists }
        <!-- <img class="rounded-full mx-4" style="height: 2.1em;" src="./icons/daddy.png" alt="Avatar"> -->
          <p class="mx-4 flex flex-row items-center">My Dashboard</p>
        { :else }
          <p on:click={(e) => {
            proceed("signup");
          }} class="mx-4 flex flex-row items-center" style="cursor: pointer;">Sign up</p>
        { /if }
      </div>

      <!-- HERO -->
      <div style="width: 100%; height: 100vh; border-radius: 0 0 85% 85% / 25%;" class="bg-gray-800 flex flex-col md:flex-row md:justify-around items-center">
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

      <!-- See it in action: databases -->
      <div style="width: 100%; height: 100vh;" class="relative bg-gray-900 flex justify-center items-center">
        <div class="w-full flex justify-center items-center py-4 absolute top-0">
          <div style="background: linear-gradient(45deg, rgba(147,100,187,1) 0%, rgba(234,26,126,1) 100%);" class="shadow-2xl p-2 items-center text-indigo-100 leading-none flex rounded-tl-full rounded-br-full">
            <span class="mx-2">Databases</span>
          </div>
        </div>
        <div class="text-white text-2xl">
          Fucking frontend developing. I don't even know what to do here! Oh, shit...
        </div>
      </div>
    </div>
  </main>
</div>