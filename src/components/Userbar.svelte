<!-- 
  @section SCRIPTS
  @description Scripts section of this component.
  Here we'll fetch our user and list of links, that'll
  be nedeed in SERVICE LIST
 -->

<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  export let applicationSlug = "home";
  
  import { api } from '../config/global.js';

  import Cookie from 'cookie-universal'
  const cookies = Cookie();
  
  const application = {
    defaultAvatar: $api.defaultAvatar,
    url: $api.url
  };

  let user = null;

  function updateAccount() {
    if (cookies.get('token')) {
      if (user == null) {
        fetch(`${application.url}/user/${cookies.get('token')}`)
        .then((response) => data.json())
        .then((response) => {
          if (response.error != null) {
            user = response;
          };
        })
        .catch((error) => {
          console.log(error);
          console.log("ERROR FUCK");
        });
      }
    } else {
      user = null;
    }
  };

  function proceed(type) {
    if (type == "login") {
      fetch(`${application.url}/callback`,
      {
        method: "POST",
        body: JSON.stringify({ url: "localhost:3000/auth" }),
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
    setInterval(() => {
      updateAccount();
    }, 2000)
  });

  let serviceList = [
    {
      slug: "home",
      name: "Home",
      url: "/"
    },
    { 
      slug: "dev",
      name: "Developers",
      url: "/developers",
    },
    { 
      slug: "acc",
      name: "Account",
      url: "/account",
    }
  ];

  // ---------------------
  // Parse Service List and
  // find current application.

  serviceList.forEach((value, index) => {
    if (value.slug == applicationSlug) {
      let entry = value;
      entry.current = true;

      serviceList[index] = entry;
    }
  });
</script>

<!-- 
  @section STYLE
  @description Styles for our page
 -->

<style>
  .url {
    cursor: pointer;
  }
</style>

<!-- 
  @section BODY
  @description Body section of this component.
 -->

<div style="font-size: 0.85em;" class="w-full py-2 px-2 md:px-6 flex justify-between">
  
  <!-- 
    SERVICE LIST
    @description Here you can find all services
    in Wavees network. It's very comfortable, I think.
   -->
  <div class="flex flex-row">
    { #each serviceList as entry }
      <a href="{entry.url}" class="url px-2 mx-2 { entry.current ? "bg-blue-500 rounded-lg text-white" : "" } ">
        { entry.name }
      </a>
    { /each }
  </div>

  <!--
    USER ACCOUNT
    @description Here you can see your user account
    and login if nedeed.
   -->
  <div class="flex flex-row items-center">
    <button class="mx-4 md:mx-6 flex flex-row items-center">

      { #if user == null }
        <p on:click={(e) =>{
          proceed("login");
        }} class="mx-2">Account</p>
        <img src="./icons/chevron-down.svg" alt="Arrow down">
      { :else }
        <div class="rounded-full" style="background-image: url({user.avatar == null ? application.defaultAvatar : user.avatar}); background-size: cover; background-position: center center; width: 8vw; height: 8vw;" alt="User Icon"></div>
        <p class="mx-2">{user.username}</p>

        <img src="./icons/chevron-down.svg" alt="Arrow down">
      { /if }
    </button>

    <!-- <img src="./icons/hexagon.svg" alt="Hexagon"> -->
  </div>
</div>