import { readable } from 'svelte/store';

export const api = 
readable({ 
  defaultAvatar: "https://cdn.dribbble.com/users/45488/screenshots/9084073/media/f889543c2e901048f8da2d9915d0bf37.jpg",

  url: "https://wv-core.glitch.me", 
  version: 1 
});