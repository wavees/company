<script>
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";

  let projects = [
    "bokkr",
    "pigeon",
    "unicorn"
  ];

  function getRandomTitle() {
    let array = [
      "Oh hello there",
      "Oh shit, not again",
      "Goodbye",
      "Mommy help",
      "Мама помоги",
      "Мы русские, с нами бог",
      "Русские вперёд!",
      "Патриарх Кирилл ведёт!",
      "Камелион сосёт кста"
    ];

    return array[Math.floor(Math.random() * array.length)];
  };

  function getRandomLinkIcon() {
    let array = [
      "🚶‍♂️",
      "🏂",
      "🏄",
      "🏊‍♂️",
      "⛹️‍♂️",
      "🚵‍♂️",
      "🤹‍♂️"
    ];

    return array[Math.floor(Math.random() * array.length)];
  }
</script>

<!-- 
  @section Head
  @description Head of page. It contains title, it includes some
  usefull scripts and so on.
 -->
<svelte:head>
  <title>Wavees Group - {getRandomTitle()}</title>
  <script src="js/landingParallax.js"></script>
</svelte:head>

<!-- 
  @section Body
  @description Body of this page

  @warning Some elements are hard-coded. And that's very bad.
 -->

<div style="overflow: hidden; width: 100%; height: 100vh;" class="relative">
  <!-- Header -->
  <Header />
  
  <!-- background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url('./background2.png');  -->
  <main style="width: 100%; height: 160vh; z-index: 0;" class="relative flex px-6 md:px-12 lg:px-24">
    <div style="width: 100%; height: 120vh; z-index: 999;" class="flex justify-center md:justify-start items-center">
      <div id="about" class="max-w-md">
        <h1 class="text-5xl">{$_("landing.hero.title", { default: "We're trying to make the Internet a little different." })}</h1>
        <p>{$_("landing.hero.subtitle", { default: "😎 We also have a very cool slogan: 'deadline for the faggots.'" })}</p>
      
        <!-- Buttons and other shit -->
        <div class="my-4">
          <input type="text" placeholder="email" class="rounded-full w-full px-6 py-4 bg-white shadow-xl">

          <div class="flex my-4 w-full items-center justify-between">
            <button class="text px-6 py-4">
              {$_("landing.hero.more", { default: "Learn more" })}
            </button>
            <button class="px-6 py-4 rounded-full bg-white text-blue-600 shadow-xl hover:bg-blue-600 hover:text-white hover:mb-2 hover:shadow-2xl">
              {$_("landing.hero.register", { default: "📮 Register for updates" })}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden lg:block">
      <div class="parallax absolute inset-y-0 right-0" style="margin: -1.5rem; z-index: 1;">
        <img style="width: 55vw;" src="images/background/2.svg" alt="bg 1">
      </div>

      <!-- Background #2 -->
      <div class="parallax absolute top-0 right-0" style="margin: -3rem; z-index: 2;">
        <img style="width: 40vw;" src="images/background/3.svg" alt="bg 2">
      </div>

      <!-- Background #3 -->
      <div class="parallax absolute bottom-0 right-0" style="margin-right: -3rem; margin-bottom: 12rem; z-index: 2;">
        <img style="width: 20vw;" src="images/background/4.svg" alt="bg 3">
      </div>

      <!-- Background #4 -->
      <div class="parallax absolute inset-y-0 right-0" style="margin-right: 2rem; margin-top: -1rem; z-index: 0;">
        <img style="width: 55vw;" src="images/background/5.svg" alt="bg 4">
      </div>
    </div>

    <!-- "Line" -->

    <!-- <div class="w-full inset-x-0 bottom-0 absolute flex justify-center items-center" style="z-index: 3;">
      <img src="images/background/1.svg" alt="bg line">
      
      <div class="absolute flex md:mt-12">
        <img src="icons/chevron-down.svg" alt="Chevron Down">
        <h1 class="text-lg">{$_("landing.projects.title", { default: "Our prpjects" })}</h1>
      </div>
    </div> -->
  </main>

  <!-- SECTION: Projects -->
<!-- 
  <section id="projects" class="px-4 md:px-6 bg-gray-100 relative" style="width: 100%; height: 100vh; z-index: 4;">
    <div class="flex flex-wrap justify-center">
      {#each projects as project}
        <div class="flex-grow max-w-sm w-full relative px-4 md:px-6 py-4 mx-2 md:mx-6 my-4 overflow-hidden shadow-lg hover:shadow-2xl bg-white rounded-lg">
          
          Header
          <div>
            <div class="flex flex-col mb-4 items-center justify-center">
              <img src="icons/logo/{project}.svg" style="width: 3em;" alt="{project} logo">
              <h1 class="text-lg font-bold">{$_(`landing.projects.list.${project}.title`, { default: "Unknown title" })}</h1>
            </div>
            <p class="text-sm">{$_(`landing.projects.list.${project}.subtitle`, { default: "Unknown subtitle" })}</p>
          </div>

          Content
          <div class="text-base my-4 mb-24 text-center">
            <p>{$_(`landing.projects.list.${project}.description`, { default: "Unknown description" })}</p>
          </div>

          Footer

          <div class="w-full px-6 md:px-12 py-6 absolute inset-x-0 bottom-0 flex flex-col justify-center text-center">
            <button class="my-4 px-4 py-2 rounded-full bg-white text-blue-600 shadow-xl hover:bg-blue-600 hover:text-white hover:mb-2 hover:shadow-2xl">
              {getRandomLinkIcon()} {$_("landing.projects.toSite", { default: "Go to site" })}
            </button>

            <p style="cursor: pointer;">{$_("landing.projects.more", { default: "Learn more" })}</p>
          </div>

        </div>
      {/each}
    </div>

    <Footer />
  
  </section> -->
</div>