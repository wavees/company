<script>
  import Userbar from "../components/Userbar.svelte";
</script>

<div style="overflow: hidden; width: 100%; height: 100vh;">
  <Userbar />

  <main style="overflow: auto;">
	  <slot></slot>
  </main>
</div>