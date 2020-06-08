<script>
  import { goto } from "@sapper/app";
  import { slide, fade } from "svelte/transition";

  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import Spinner from "../components/Spinner.svelte";
  import PagePicker from "../components/Pickers/PagePicker.svelte";

  let backgrounds = [
    {
      src: "2.svg",
      size: "2"
    },
    {
      src: "2.svg",
      size: "2"
    },
    {
      src: "2.svg",
      size: "2"
    }  
  ];
</script>

<!-- 
  @section Head
  @description Head of page. It contains title, it includes some
  usefull scripts and so on.
 -->
<svelte:head>
  <title>🧑‍🤝‍🧑 Wavees Company</title>
</svelte:head>

<!-- 
  @section Body
  @description Body of this page

  @warning Some elements are hard-coded. And that's very bad.
 -->

<div on:wheel={(e) => {
  if (e.deltaY >= 0) {
    goto('/philosophy/simplicity');
  };
}} style="width: 100%; height: 100vh; overflow: hidden;" class="relative">
  <!-- Header -->
  <Header />
  
  <!-- background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url('./background2.png');  -->
  <main style="width: 100%; height: 100vh; z-index: 0;" class="relative flex px-6 md:px-12 lg:px-24">
    <div style="width: 100%; height: 120vh; z-index: 999;" class="flex justify-center items-center">
      <div id="about" class="max-w-2xl text-center flex flex-col justify-center items-center">
        <h1 class="text-5xl">{$_("landing.hero.title", { default: "The magic is in simplicity" }).toUpperCase()}</h1>
        <p>{$_("landing.hero.subtitle", { default: "😎 Scroll to see more cool things about us." })}</p>
      </div>
    </div>

    <!-- Footer dots -->
    <PagePicker />

    <!--Static Backgrounds ahoy -->
    <div class="absolute top-0 right-0" style="z-index: 2; margin: -45rem; margin-right: -8rem;">
      <div style="width: 55em; height: 55em; background: #ffbd3b;" class="rounded-full"></div>
    </div>

    <div class="absolute bottom-0 left-0" style="z-index: 2; margin: -25rem; margin-left: -2rem;">
      <div style="width: 35em; height: 35em; background: #fe295c;" class="rounded-full"></div>
    </div>

    <!-- Randomly generated backgrounds -->
    {#each backgrounds as item}
      <div class="background absolute inset-0" style="z-index: 1; margin: {Math.floor(Math.random() * 41)}em {Math.floor(Math.random() * 101)}em;">
        <img src="./images/background/{item.src}" alt="Background image" style="width: {item.size}em; height: {item.size}em;">
      </div>
    {/each}
  </main>
</div>