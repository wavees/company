<script>
  function getRandomAvatar() {
    let array = [
      "😀",
      "🥰",
      "🤗",
      "😎",
      "🤠",
      "🥳",
      "🐶",
      "🐕‍🦺",
      "🦁",
      "🦌",
      "🦅",
      "🐻"
    ];

    return array[Math.floor(Math.random() * array.length)];
  };

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
  }
</script>

<svelte:head>
  <title>Wavees Group - {getRandomTitle()}</title>
  <script src="js/landingParallax.js"></script>
</svelte:head>

<div style="overflow-x: hidden; width: 100%; height: 100vh;" class="relative">
  <!-- Header -->
  <div style="z-index: 1;" class="absolute inset-x-0 top-0 px-2 md:px-12 lg:px-24 w-full py-2 md:py-4 flex items-center justify-center md:justify-between">
    <div class="hidden md:flex items-center">
      <h1 class="text-2xl text-bold">Wavees</h1>
      
      <!-- Line -->
      <div style="width: 2.2px; height: 1.7em; background: linear-gradient(180deg, rgba(147,100,187,1) 0%, rgba(234,26,126,1) 100%);" class="mx-4"></div>

      <h2 class="text-xl text-semibold">Portal</h2>
    </div>

    <div class="hidden md:flex text-sm text-white items-center justify-center">
      <button class="mx-4">About</button>
      <button class="mx-4">Projects</button>
      <button class="mx-4">Contact</button>

      <div class="mx-6 flex">
        <button>
          EN
        </button>

        <div style="width: 2.2px; height: 1.7em; background: #fff" class="mx-2"></div>

        <button>
          РУ
        </button>
      </div>

      <button class="px-4 py-2 rounded-full bg-white text-blue-600 shadow-xl hover:bg-blue-600 hover:text-white hover:mb-2 hover:shadow-2xl">
        {getRandomAvatar()} Go to my Account
      </button>
    </div>
  </div>
  
  <!-- background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url('./background2.png');  -->
  <main style="width: 100%; height: 160vh; z-index: 0;" class="relative flex px-2 md:px-12 lg:px-24">
    <div style="width: 100%; height: 120vh; z-index: 999;" class="flex justify-center md:justify-start items-center">
      <div class="max-w-md">
        <h1 class="text-5xl">We're trying to make the Internet a little different.</h1>
        <p>😎 We also have a very cool slogan: "deadline for the faggots."</p>
      
        <!-- Buttons and other shit -->
        <div class="my-4">
          <input type="text" placeholder="email" class="rounded-full w-full px-6 py-4 bg-white shadow-xl">

          <div class="flex my-4 w-full items-center justify-between">
            <button class="text px-6 py-4">
              Learn more
            </button>
            <button class="px-6 py-4 rounded-full bg-white text-blue-600 shadow-xl hover:bg-blue-600 hover:text-white hover:mb-2 hover:shadow-2xl">
              📮 Register for updates
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

    <div class="w-full inset-x-0 bottom-0 absolute flex justify-center items-center" style="z-index: 3;">
      <img src="images/background/1.svg" alt="bg line">
      
      <!-- <div class="absolute flex md:mt-12">
        <img src="icons/chevron-down.svg" alt="Chevron Down">
        <h1 class="text-lg">Projects</h1>
      </div> -->
    </div>
  </main>

  <!-- SECTION: Projects -->

  <!-- <section class="px-4 md:px-12 lg:px-24" style="width: 100%; height: 100vh;">
    <div cl>

    </div>
  </section> -->
</div>