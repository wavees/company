<script>
  // Импортим модули
  import { stores } from "@sapper/app";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { api } from '../../config/global.js';

  import Spinner from "../../components/Spinner.svelte";
  import Userbar from "../../components/Userbar.svelte";
  // import Userbar from "../../components/Userbar.svelte";
  // import { fade } from 'svelte/transition';

  const application = {
    url: $api.url
  };

  const { page } = stores();
  const { id } = $page.params;

  let loading = {
    state: true,
    message: null
  };
  let callback = {
    error: "NotFound"
  };

  onMount(() => {
    fetch(`${application.url}/callback/link/${id}`)
    .then((data) => data.json())
    .then((data) => {
      callback = data;
      loading.state = false;
    })
  });

  let currentPage = "login";
  let headerText = "please, login";
  let containerLoading = false;
  let data = {};

  function proceed(type) {
    containerLoading = true;
    if (type == "login") {
      fetch(`${application.url}/user/login`, {
        method: 'POST',
        body: JSON.stringify({ username: data.username, password: "0000" }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((data) => data.json())
      .then((data) => {
        // Обрабатываем данные
        if (data.message == "User not found") {
          // Регистрация пользователя
          currentPage = "register";
          headerText = "please, write your email"
        } else {
          // Пользователю надо вписать пинкод
          currentPage = "pincode";
          headerText = "write your pincode";
        };
        setTimeout(() => {
          containerLoading = false;
        }, 250);
      })
    }
  }
</script>

<style>
  .logotype {
    font-family: "Gotham-Thin", sans-serif
  }

  .line_okay {
    background: linear-gradient(180deg, rgba(147,100,187,1) 0%, rgba(234,26,126,1) 100%);
  }

  /* .line_error {
    background: linear-gradient(180deg, #FF7043 0%, #EF5350 100%);
  } */

  .pincode {
    width: 35px; 
    text-align: center; 
    height: 50px; 
    border: 0; 
    border-bottom: 2px solid rgba(0,0,0,0.3); 
    border-radius: 2px 2px 0 0; 
    font-size: 2em; 
    transition: background-color 0.3s, color 0.3s, opacity 0.3s; 
    cursor: default; 
    user-select: none;
  }
</style>

<!-- Две отдельные странички:
  1. Запись не найдена;
  2. Запись найдена, всё хорошо.
 -->

<div style="overflow: hidden; width: 100%; height: 100vh;">
  <Userbar applicationSlug="acc" />

	<main style="overflow: auto;">
    { #if loading.state }
      <div transition:fade style="z-index: 999; width: 100%; height: 100vh;" class="bg-white absolute flex justify-center items-center text-center">
        <Spinner />

        {#if loading.message != null}
          <p class="text-sm">{loading.message}</p>
        {/if}
      </div>
    { /if }

    <div style="width: 100%; height: 100vh; overflow: hidden" class="{ callback.error != "NotFound" ? "bg-gray-100" : "" } flex justify-center items-center">
      { #if callback.error == "NotFound" }
        <div style="width: 100%; height: 100vh" class="flex flex-col justify-center items-center">
          <p class="text-2xl text-semibold">Not found</p>
          <p class="text-sm text-center max-w-md">Requested content could not be found. You should double-check that the data is spelled correctly.</p>
          <button on:click={(e) => {
            goto('/');
          }} class="mt-4 bg-transparent hover:bg-blue-500 hover:text-white text-base text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
            Go home
          </button>
        </div>
      { :else if callback.error == null }
          <div class="w-2/6 md:bg-white md:rounded-lg md:shadow-xl relative" style="min-width: max-content;">
            
            { #if containerLoading }
              <div style="z-index: 999;" class="w-full h-full bg-white absolute flex justify-center items-center">
                <Spinner />
              </div>
            { /if }
            
            <div class="p-2 md:p-8">
              <!-- Logo -->

              <!-- MOBILE VIEW -->
              <div class="md:hidden">
                <div class="logotype w-full mb-4 md:mb-6 flex justify-center items-center">
                  <p class="logotype text-3xl">Wavees</p>

                  <img class="mx-4" src="icons/x.svg" alt="X">

                  <img src="icons/daddy.png" style="width: 10vw;" class="rounded-full" alt="Company avatar">
                </div>

                <div class="max-w-sm text-center mb-6 md:mb-12" style="font-size: 1.025em;">
                  <p>This application wants to access some data from your account. Sign in to continue.</p>
                </div>
              </div>

              <!-- DESKTOP VIEW -->
              <div class="hidden md:block">
                <div class="logotype w-full mb-4 md:mb-6 flex justify-center items-center">
                  <p class="logotype text-3xl" style="font-weight: 600;">Wavees</p>
                  <div id="line" class="logotype line_okay ml-2 mr-2" style="width: 2.2px; height: 2.2em; backgroundColor: #424242"></div>
                  <p class="logotype text-3xl">Auth</p>

                  <img class="mx-4" src="icons/x.svg" alt="X">

                  <img src="icons/daddy.png" style="width: 4vw;" class="rounded-full" alt="Company avatar">
                </div>

                <div class="max-w-sm text-center mb-6 md:mb-12" style="font-size: 1.025em;">
                  <p>This application wants to access some data from your account. Sign in to continue.</p>
                </div>
              </div>

              <!-- Container -->
              <p class="text-xl pb-2">{headerText}</p>
              { #if currentPage == "login" }
                <div class="items-center text-center">
                  <input bind:value={data.username} id="username" class="appearance-none w-full py-2 px-3 border border-dashed" type="text" placeholder="username">
                  <button on:click={(e) => {
                    proceed("login");
                  }} class="m-6 bg-transparent hover:bg-blue-500 hover:text-white text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
                    proceed
                  </button>
                </div>
              { :else if currentPage == "register" } 
                <div class="items-center text-center">
                  <input bind:value={data.email} id="email" class="appearance-none w-full py-2 px-3 border border-dashed" type="text" placeholder="email">
                  <button on:click={(e) => {
                    proceed("regitser");
                  }} class="m-6 bg-transparent hover:bg-blue-500 hover:text-white text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
                    register
                  </button>

                  <p class="text-dark" style="cursor: pointer;" on:click={(e) => {
                    containerLoading = true;
                    
                    currentPage = "login";
                    headerText = "please, login";
                  
                    setTimeout(() => {
                      containerLoading = false;
                    }, 350)
                  }}>fuck go back</p>
                </div>
              { :else if currentPage == "pincode" }
                <div class="items-center text-center">

                  <div class="items-center text-center">
                    <input type="text" class="m-2 pincode">
                    <input type="text" class="m-2 pincode">
                    <input type="text" class="m-2 pincode">
                    <input type="text" class="m-2 pincode">
                  </div>

                  <button class="m-6 bg-transparent hover:bg-gray-900 text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
                    login
                  </button>

                  <p class="text-dark" style="cursor: pointer;" on:click={(e) => {
                    containerLoading = true;
                    
                    currentPage = "login";
                    headerText = "please, login";
                  
                    setTimeout(() => {
                      containerLoading = false;
                    }, 350)
                  }}>fuck go back</p>
                </div>
              { /if }

              <div class="w-full text-center">
                <p class="mt-2 md:mt-6">By continuing, you agree to the <a href="google.com" style="text-decoration: none; color: #FF9800; border-bottom: 1px dotted #FF5722">User Agreement</a>.</p>
              </div>
            </div>
          </div>
      { :else }
        <div style="width: 100%; height: 100vh" class="flex flex-col justify-center items-center">
          <p class="text-2xl text-semibold">Uncaught error</p>
          <p class="text-sm text-center max-w-md">It's a very strange mistake... I don't know what to do with it!</p>
          <button on:click={(e) => {
            goto('/');
          }} class="mt-4 bg-transparent hover:bg-blue-500 hover:text-white text-base text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
            Go home
          </button>
        </div>
      { /if }
    </div>
  </main>
</div>