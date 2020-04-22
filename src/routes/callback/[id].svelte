<script>
  // Импортим модули
  import { fade } from 'svelte/transition';

  import { stores } from "@sapper/app";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { api } from '../../config/global.js';

  import Cookie from 'cookie-universal'
  const cookies = Cookie();

  import Spinner from "../../components/Spinner.svelte";
  import Userbar from "../../components/Userbar.svelte";
  // import Userbar from "../../components/Userbar.svelte";
  // import { fade } from 'svelte/transition';

  const application = {
    defaultAvatar: $api.defaultAvatar,
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

  let currentPage = "login";
  let headerText = "Enter your email";
  let containerLoading = false;
  let data = {};
  let user = {};

  let error = null;

  onMount(() => {
    fetch(`${application.url}/callback/${id}`)
    .then((response) => response.json())
    .then((response) => {
      callback = response;

      updateAccount();
    });
  });

  function updateAccount() {
    // Некоторые проверочки...
    if (cookies.get('token')) {
      fetch(`${application.url}/user/${cookies.get('token')}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error == null) {
          currentPage = "redirect";
          user = response;

          data.email = user.email;

          loading.state = false;
        } else {
          loading.state = false;
        }
      });
    } else {
      if (cookies.get('login-email')) {
        if (currentPage == "login") {
          fetch(`${application.url}/user/check/${cookies.get('login-email')}`)
          .then((response) => response.json())
          .then((response) => {
            data.email = cookies.get('login-email');

            if (response.exists) {
              data.exists = true;

              currentPage = "pincode";
              headerText = "Write your pincode";
            
              loading.state = false;
            } else {
              data.exists = false;
                
              currentPage = "register";
              headerText = "Write your username";

              loading.state = false;
            }
          })
        }
      } else {
        loading.state = false;
      }
    };
  };

  function proceed(type) {
    containerLoading = true;
    if (type == "login") {
      fetch(`${application.url}/user/check/${data.email}`)
      .then((response) => response.json())
      .then((response) => {
        // Обрабатываем данные
        cookies.set('login-email', data.email);

        if (response.exists == false) {
          // Регистрация пользователя
          currentPage = "register";
          headerText = "Write your username"
        } else {
          // Пользователю надо вписать пинкод
          currentPage = "pincode";
          headerText = "write your pincode";
        };
        setTimeout(() => {
          containerLoading = false;
        }, 250);
      })
      .catch((error) => {
        console.log(error);
        console.log("ERROR");
      })
    } else if (type == "register") {
      fetch(`${application.url}/user/register`, {
        method: "POST",
        body: JSON.stringify({ email: data.email, username: data.username }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((data) => data.json())
      .then((data) => {
        // Обрабатываем полученный ответ...
        if (data.error) {
          switch (data.error) {
            case "WrongEmail":
              error = "Wrong email, please, try again.";

              break;
            case "ServerError":
              error = "ServerError. Please, try again.";
              
              break;

            default:
              break;
          };
          
          setTimeout(() => {
            containerLoading = false;
          }, 250);
        } else {
          currentPage = "pincode";
          headerText = "check email and write your pincode";
        }
      })
      .catch((error) => {
        console.log(error);
      })
    } else if (type == "pincode") {
      let inputs = document.getElementsByClassName("pincode");
      let pincode = [];

      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value != "") pincode.push(inputs[i].value);
      }

      fetch(`${application.url}/user/login`, {
        method: "POST",
        body: JSON.stringify({ email: data.email, pincode: pincode.join("") }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) {
          if (data.error == "InvalidPassword") {
            headerText = "invalid pincode. Try again"
          };
        } else {
          // Сохраняем это всё в сессию...
          cookies.set('token', data.token)

          currentPage = "redirect";
          headerText = "read carefully";
        };

        setTimeout(() => {
          containerLoading = false;
        }, 250);
      })
      .catch((error) => {
        console.log(error);
      });
    } else if (type == "redirect") {
      fetch(`${application.url}/callback/finish/${id}/${cookies.get('token')}`)
      .then((response) => response.json())
      .then((response) => {
        window.location.href = `http://${callback.url}/?token=${response.token}`;
      })
      .catch((error) => {
        console.log(error);
      })
    };
  }
</script>

<style>
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
  <!-- <Userbar applicationSlug="acc" /> -->

	<main style="overflow: auto;">
    { #if loading.state }
      <div transition:fade style="z-index: 999; width: 100%; height: 100vh;" class="bg-white absolute flex justify-center items-center text-center">
        <Spinner />

        {#if loading.message != null}
          <p class="text-sm">{loading.message}</p>
        {/if}
      </div>
    { /if }

    <div style="background-image: url('background.png'); background-size: cover; background-position: center center; width: 100%; height: 100vh; overflow: hidden" class="{ callback.error != "NotFound" ? "bg-gray-100" : "" } flex justify-center items-center">
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
            
            { #if error != null }
              <div style="z-index: 999;" class="w-full h-full flex-col bg-white absolute flex justify-center items-center">
                <p>{error}</p>

                <div class="w-full flex items-center justify-center">
                  <!-- <p class="m-6 w-full text-dark" style="cursor: pointer;">Report bug</p> -->
                  
                  <button on:click={(e) => {
                    containerLoading = true;
                      
                    currentPage = "login";
                    headerText = "please, login";
                    
                    error = null;

                    cookies.remove('login-email');
                    updateAccount();

                    setTimeout(() => {
                      containerLoading = false;
                    }, 350)
                  }} class="m-6 w-full bg-transparent hover:bg-blue-500 hover:text-white text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
                    Back to Login
                  </button>
                </div>
              </div>
            { /if }

            <div class="p-2 md:p-8">
              <!-- Logo -->

              <div class="w-full flex justify-center items-center">
                { #if data.email != null }
                  { #if currentPage != "login" }
                    <div class="mt-2 w-full flex-col flex justify-center items-center">
                      <div class="rounded-full" style="background-image: url({user.avatar == null ? application.defaultAvatar : user.avatar}); background-size: cover; background-position: center center; width: 8vw; height: 8vw;" alt="Avatar"></div>
                      <p class="mt-2">{data.email}</p>
                    </div>
                  { /if }
                { /if }
              </div>

              <!-- <div class="md:hidden">
                <div class="logotype w-full mb-4 md:mb-6 flex justify-center items-center">
                  <p class="logotype text-3xl">Wavees</p>

                  <img class="mx-4" src="icons/x.svg" alt="X">

                  <img src="icons/daddy.png" style="width: 10vw;" class="rounded-full" alt="Company avatar">
                </div>

                <div class="max-w-sm text-center mb-6 md:mb-12" style="font-size: 1.025em;">
                  <p>This application wants to access some data from your account. Sign in to continue.</p>
                </div>
              </div>

              DESKTOP VIEW
              <div class="hidden md:block">
                <div class="logotype w-full mb-4 md:mb-6 flex justify-center items-center">
                  <p class="logotype text-3xl" style="font-weight: 600;">Wavees</p>
                  <div id="line" class="logotype line_okay ml-2 mr-2" style="width: 2.2px; height: 2.2em; backgroundColor: #424242"></div>
                  <p class="logotype text-3xl">Auth</p>

                  <img class="mx-4" src="icons/x.svg" alt="X">

                  <img src="icons/daddy.png" style="width: 4vw;" class="rounded-full" alt="Company avatar">
                </div>

                <div class="max-w-sm text-center mb-6 md:mb-12" style="font-size: 1.025em;">
                  <h1 class="text-2xl">{headerText}</h1>
                  <p>to continue to <a href="google.com" class="text-decoration: none; color: #FF9800; border-bottom: 1px dotted #FF5722">{callback.name == null ? "Unknown Application" : callback.name}</a></p>
                </div>
              </div> -->
              { #if currentPage != "redirect" }
                <div class="max-w-sm text-center mb-6 md:mb-12" style="font-size: 1.025em;">
                  <h1 class="text-2xl">{headerText}</h1>
                  <p>to continue to <a href="google.com" class="text-decoration: none; color: #FF9800; border-bottom: 1px dotted #FF5722">{callback.name == null ? "Unknown Application" : callback.name}</a></p>
                </div>
              { /if }

              <!-- Container -->
              { #if currentPage == "login" }
                <div class="items-center text-center">
                  <input bind:value={data.email} id="email" class="appearance-none w-full py-2 px-3 border border-dashed" type="text" placeholder="email">
                  
                  <div class="flex w-full justify-center items-center">
                    <p class="m-6 text-dark w-full" style="cursor: pointer;" on:click={(e) => {
                    }}>Last used emails</p>
                    <button on:click={(e) => {
                      proceed("login");
                    }} class="m-6 w-full bg-transparent hover:bg-blue-500 hover:text-white text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
                      Continue
                    </button>
                  </div>

                  <div class="w-full text-center text-sm">
                    <p class="">By continuing, you agreeing to the <a href="google.com" style="text-decoration: none; color: #FF9800; border-bottom: 1px dotted #FF5722">User Agreement</a>.</p>
                  </div>
                </div>
              { :else if currentPage == "register" } 
                <div class="items-center text-center">
                  <input bind:value={data.username} id="username" class="appearance-none w-full py-2 px-3 border border-dashed" type="text" placeholder="username">
                  
                  <div class="w-full flex justify-center items-center">
                    <p class="m-6 w-full text-dark" style="cursor: pointer;" on:click={(e) => {
                      containerLoading = true;
                      
                      currentPage = "login";
                      headerText = "please, login";
                    
                      cookies.remove('login-email');
                      updateAccount();

                      setTimeout(() => {
                        containerLoading = false;
                      }, 350)
                    }}>Go back</p>

                    <button on:click={(e) => {
                      proceed("register");
                    }} class="m-6 w-full bg-transparent hover:bg-blue-500 hover:text-white text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
                      Register
                    </button>
                  </div>

                  <div class="w-full text-center text-sm">
                    <p class="mt-2 md:mt-6">By registering, you agreeing to the <a href="google.com" style="text-decoration: none; color: #FF9800; border-bottom: 1px dotted #FF5722">User Agreement</a>.</p>
                  </div>
                </div>
              { :else if currentPage == "pincode" }
                <div class="items-center text-center">

                  <div class="items-center text-center">
                    <input type="text" class="m-2 pincode">
                    <input type="text" class="m-2 pincode">
                    <input type="text" class="m-2 pincode">
                    <input type="text" class="m-2 pincode">
                  </div>

                  <button on:click={(e) =>{
                    proceed("pincode");
                  }} class="my-4 w-full bg-transparent hover:bg-gray-900 text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
                    Login
                  </button>

                  <div class="w-full flex justify-between">
                    <p class="text-dark" style="cursor: pointer;" on:click={(e) => {
                      containerLoading = true;
                      
                      currentPage = "login";
                      headerText = "please, login";
                    
                      cookies.remove('login-email');
                      updateAccount();

                      setTimeout(() => {
                        containerLoading = false;
                      }, 350)
                    }}>Use different account</p>

                    <p class="text-dark" style="cursor: pointer;">
                      Forgot pincode?
                    </p>
                  </div>
                </div>
              { :else if currentPage == "redirect" }
                <div class="mt-4 items-center text-center">
                  <div>
                    This site <a href="{callback.url}" style="text-decoration: none; color: #FF9800; border-bottom: 1px dotted #FF5722">({callback.url})</a> will have these permissions:

                    <!-- Permissions container -->
                    <div class="w-full justify-start">
                      <div class="flex my-2">
                        <img src="icons/check.svg" alt="Agree">
                        <p class="mx-4">See your Email</p>
                      </div>

                      <div class="flex my-2">
                        <img src="icons/check.svg" alt="Agree">
                        <p class="mx-4">See your Avatar</p>
                      </div>

                      <div class="flex my-2">
                        <img src="icons/check.svg" alt="Agree">
                        <p class="mx-4">Modify Application's storage</p>
                      </div>
                    </div>
                  </div>

                  <button on:click={(e) => {
                    proceed("redirect");
                  }} class="my-4 bg-transparent hover:bg-blue-500 hover:text-white text-dark font-semibold hover:text-white py-2 px-4 border border-dashed hover:border-transparent rounded">
                    I agree
                  </button>

                  <!-- <div class="text-sm w-full text-center"> -->
                    <!-- <p>This site is not part of the Wavees Group network.</p> -->
                  <!-- </div> -->

                  <div class="mt-4 w-full flex justify-between">
                    <p class="text-dark" style="cursor: pointer;" on:click={(e) => {
                      containerLoading = true;
                      
                      currentPage = "login";
                      headerText = "please, login";
                    
                      cookies.remove('token');
                      cookies.remove('login-email');
                      
                      updateAccount();

                      setTimeout(() => {
                        containerLoading = false;
                      }, 350)
                    }}>Use different account</p>

                    <p on:click={(e) =>{
                      goto('/');
                    }} class="text-dark" style="cursor: pointer;">
                      Go to the homepage
                    </p>
                  </div>
                </div>
              { /if }
            </div>
          </div>

          { #if currentPage == "register" }
            <div class="hidden lg:flex flex-col mx-6 max-w-xs text-sm">
              <h1 class="mb-4 text-xl font-semibold">Register to get access to:</h1>

              <div class="my-4">
                <div class="flex">
                  <img src="icons/logo/bokkr.svg" style="width: 2.1em;" alt="bokkr-logo">
                  <h1 class="ml-2 text-lg font-bold">bokkr</h1>
                </div>

                <p>bokkr - experimental site only for approved comics, books and so on. A lot of experiments and a lot of unforgetable adventures!</p>
              </div>

              <div class="my-4">
                <div class="flex items-center">
                  <img src="icons/logo/pigeon.svg" style="width: 1.8em;" alt="pigeon logo">
                  <h1 class="ml-2 text-lg font-bold">pigeon messenger</h1>
                </div>

                <p>Pigeon Messenger - is a messenger to rule them all! Now you needen't to switch between different web-messengers. Now all your chats will be in one place, without any switching!</p>
              </div>

              <div class="my-4">
                <div class="flex items-center">
                  <img src="icons/grid.svg" style="width: 1.8em;" alt="pigeon logo">
                  <h1 class="ml-2 text-lg font-bold">user apps</h1>
                </div>

                <p>Huge number of other applications created by other people! They can be quite interesting, but also there can be a lot of them!</p>
              </div>
            </div>
          { /if }

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

    <!-- FOOTER -->
    <div class="w-full flex justify-between px-4 absolute inset-x-0 bottom-0">
      <p class="logotype text-xl" style="font-weight: 600;">Wavees</p>

      <div class="flex text-sm">
        <p class="mx-2">Projects</p>
        <p class="mx-2">About</p>
        <p class="mx-2">Contact</p>
      </div>
      <!-- <p>Legal information</p> -->
      <!-- <div id="line" class="logotype line_okay ml-2 mr-2" style="width: 2.2px; height: 2.2em; backgroundColor: #424242"></div> -->
      <!-- <p class="logotype text-3xl">Auth</p> -->
    </div>

    </div>
  </main>
</div>