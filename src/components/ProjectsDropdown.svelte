<script>
  // Import localization library.
  import { _ } from "svelte-i18n";

  // Import projects array and general settings from global config.
  import { projects, general } from '../config/global.js';

  projects.updateProjects(4);

  // Variable that'll show: is our dropdown is closed
  // or opened.
  let dropdown;

  // Function that just "switches" dropdown variable
  // from True to false and otherwise.
  function drop() {
    if (dropdown) {
      dropdown = false;
    } else {
      dropdown = true;
    }
  };

  export let color = "#fff";
</script>

<!-- 
  @section Component
  Component design and layout.
 -->
<div class="dropdown relative">
  { #if dropdown }
    <!-- 
      Chevron-down:
      we use it when our dropdown menu is
      opened. -->
    <button on:click={(e) => {
      drop()
    }} class="text-white p-2 rounded-lg hover:shadow-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
  { :else }
    <!-- 
      Grid icon:
      we use this icon when our dropdown menu
      is closed. It is easily recognizable and so on on on. -->
    <button on:click={(e) => {
      drop()
    }} class="text-white p-2 rounded-lg hover:shadow-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    </button>

  { /if }

  <!-- 
    @section Dropdown layout
    Main dropdown layout. Nothing special:
    just another absolute positioned div.
   -->
  { #if dropdown }
    <!-- 
      @explanation We'll check for mouseout event.
      @bugs Knows bugs:
      
      1. It only works when mouseover event
      is fired. So, if you open this menu and instantaneously
      point your mouse somewhere else - this dropdown won't close.

     -->
    <div on:mouseout={(e) => {
      let parent = e.relatedTarget.parentElement;
      
      if (!parent.classList.contains("dropdown")) {
        dropdown = false;
      }
    }} class="dropdown text-black text-center absolute right-0 mt-2 px-2 md:px-6 py-6 w-64 bg-white rounded-lg shadow-xl">
      <h1 class="text-xl font-semibold">{$_("landing.projects.title", { default: "Our services" })}</h1>
      
      <!-- 
        @section Projects list
        Here we'll list all projects and perform
        some actions on them.
       -->

      <div class="dropdown flex flex-wrap items-center justify-center">
        { #each $projects as project}
          { #if project.type != "promotion" }
            <!-- 
              About on:click event: I don't fucking know
              why I do this in this way. Just forget about
              it.
             -->
            <div on:click={(e) => {
              if (project.url.split('').includes("@")) {
                window.location.href = `https://${project.url.split('@')[1]}.${$general.url}`;
              } else {
                if (project.url.split(':').includes('http')) {
                  window.location.href = project.url;
                } else {
                  window.location.href = `http://${project.url}`;
                }
              }
            }} style="cursor: pointer;" class="dropdown relative flex flex-col justify-center items-center p-4 my-2 w-24 h-24 rounded-lg hover:bg-gray-100">            
              <img style="width: 2.1em; height: 2.1em;" src="{project.icon}" alt="{project.icon} logo">
              
              <!-- If project name contains "@" - that we need to
                get the translation for this title in lozalization files. -->
              { #if project.name.split('').includes("@") }
                <p class="text-sm">{$_(project.name.replace("@", ""), { default: "Unknown application" })}</p>
              { :else }
                <p class="text-sm">{project.name}</p>
              { /if }
            </div>
          { /if }
        { /each }
      </div>

      <p class="text-sm">{$_("projectDropdown.other", { default: "And so on..." })}</p>

      <div class="dropdown my-6">
        <button on:click={(e) => {
          window.location.href = "https://wavees.co.vu/?focus=projects";
        }} class="mx-2 px-4 py-2 rounded-full bg-blue-600 text-white shadow-xl hover:bg-white hover:text-blue-600 hover:mb-2 hover:shadow-2xl">
          🚀 {$_("projectDropdown.more", { default: "See more on Space" })}
        </button>
      </div>
    </div>
  { /if }
</div>