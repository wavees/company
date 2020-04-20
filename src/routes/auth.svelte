<script>
  import { onMount } from "svelte";
  import Cookie from 'cookie-universal'
  const cookies = Cookie();

  onMount(() => {
    if (cookies.get('token') == null) {
      let urlParams = new URLSearchParams(window.location.search);
      let token = urlParams.get('token');

      if (token) {
        cookies.set('token', token);
      }
    }

    window.location.href = "/";
  });
</script>