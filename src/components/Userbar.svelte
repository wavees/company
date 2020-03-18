<!-- 
  @section SCRIPTS
  @description Scripts section of this component.
  Here we'll fetch our user and list of links, that'll
  be nedeed in SERVICE LIST
 -->

<script>
  import { goto } from "@sapper/app";
  
  let applicationSlug = "wvees"

  let serviceList = [
    { 
      slug: "wvees",
      name: "Home",
      url: "/",
    },
    { 
      slug: "rptr",
      name: "Raptor",
      url: "https://3000-dc796a6f-35b6-40da-90d8-e230ed30118c.ws-eu01.gitpod.io/",
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

  export let style = "white";
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
      <p class="mx-2">SniperFox</p>
      <img src="./icons/chevron-down.svg" alt="Arrow down">
    </button>

    <!-- <img src="./icons/hexagon.svg" alt="Hexagon"> -->
  </div>
</div>