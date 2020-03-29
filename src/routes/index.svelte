<script>
  import Userbar from "../components/Userbar.svelte";
</script>

<div style="overflow: hidden; width: 100%; height: 100vh;">
  <Userbar applicationSlug="home" />

	<main style="background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url('./images/home.jpg'); overflow: hidden; width: 100%; height: 100vh; z-index: 1">
    <div style="width: 100%; height: 100vh; background: linear-gradient(0deg, rgba(0,0,0,0.4962359943977591) 0%, rgba(0,0,0,0.19931722689075626) 100%); z-index: 2" class="flex flex-col justify-center items-center">
      <h1 style="font-family: 'Holiday'; font-size: 3em;" class="text-indigo-100">Coming soon</h1>
      <p class="text-white mt-6">Something's going to happen soon...</p>
    </div>
  </main>
</div>