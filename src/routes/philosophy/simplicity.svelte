<script>
  import { goto } from "@sapper/app";
  import { slide, fade } from "svelte/transition";

  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import Footer from "../../components/Footer.svelte";
  import Header from "../../components/Header.svelte";
  import PagePicker from "../../components/Pickers/PagePicker.svelte";

  let scrollEnabled = false;
  onMount(() => {
    setTimeout(() => {
      scrollEnabled = true;
    }, 250);
  });
</script>

<!-- 
  @section Head
  @description Head of page. It contains title, it includes some
  usefull scripts and so on.
 -->
<svelte:head>
  <title>Wavees | Portal</title>
</svelte:head>

<!-- 
  @section Body
  @description Body of this page

  @warning Some elements are hard-coded. And that's very bad.
 -->

<div on:wheel={(e) => {
  if (scrollEnabled) {
    if (e.deltaY >= 0) {
      goto('/philosophy/beauty');
    } else {
      goto('/');
    };
  }
}} style="width: 100%; height: 100vh; overflow: hidden;" class="relative">
  <!-- Header -->
  <Header color="#000" />
  
  <!-- background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url('./background2.png');  -->
  <main style="width: 100%; height: 100vh; z-index: 0;" class="relative flex px-6 md:px-12 lg:px-24">
    <div style="width: 100%; height: 100vh; z-index: 999;" class="flex justify-center items-center">
      <div id="about" class="w-full text-center flex flex-col justify-center items-center">
        <p class="text-center bg-gray-200 rounded-full text-gray-800 px-3 py-1 text-sm">{$_("landing.simplicity.tag", { default: "Our philosophy" })}</p>
        <h1 class="text-5xl">{$_("landing.simplicity.title", { default: "We like simplicity." }).toUpperCase()}</h1>
        <h2 class="text-xl">{$_("landing.simplicity.subtitle", { default: "And we will share it with you." })}</h2>

        <p class="mt-6 max-w-md">{$_("landing.simplicity.text", { default: "All people are complicated, and that's a problem. We want to share our simplicity with you. That's why every service we provide is incredibly simple and intuitive." })}</p>
      </div>
    </div>

    <!--  -->
    <div class="hidden h-full w-full md:flex flex-col justify-center items-center">
      <img style="width: 65%;" src="./images/simpl_illustration.svg" alt="Simple illustration">
      <a href="https://www.drawkit.io/product/watermelon-illustrations" class="my-2 text-xs">by DrawKit</a>
    </div>

    <!-- Footer dots -->
    <PagePicker page="philosophy/simplicity" />
  </main>
</div>